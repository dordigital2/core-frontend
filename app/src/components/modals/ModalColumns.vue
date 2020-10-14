<template>
  <div class="modal-card" style="width: 960px">
    <header class="modal-card-head">
      <p class="modal-card-title">Choose which columns to display</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>

    <ValidationObserver v-slot="{ passes }" @submit.prevent slim>
      <section class="modal-card-body">
        <VField label="Selected columns" rules="">
          <b-taginput v-model="selectedColumns" type="is-dark" :maxtags="0"
            ><template #tag="{tag}">{{
              getField(tag).display_name
            }}</template></b-taginput
          >
        </VField>

        <VField label="Column list" rules="required">
          <div>
            <div class="is-size-6">
              <a @click.prevent="selectAll">Select all</a> |
              <a @click.prevent="selectNone">Select none</a>
            </div>
            
            <div class="checkbox-list is-2">
              <b-checkbox
                v-for="(field, index) in table.fields"
                :key="'check' + index"
                v-model="selectedColumns"
                :native-value="field.name"
              >
                {{ field.display_name }}
              </b-checkbox>
            </div>
          </div>
        </VField>

        <VField label="Column list" rules="required">
          <FilterEnum
            v-model="selectedColumns"
            :choices="table.fields.map(e => e.display_name)"
            autoupdate
          />
        </VField>
      </section>
      <footer class="modal-card-foot">
        <b-button type="is-dark is-outlined" @click="$emit('close')">
          Cancel
        </b-button>
        <b-button type="is-primary" @click="passes(save)" v-bind="{ loading }"
          >Save</b-button
        >
        <b-button type="is-dark" @click="passes(submit)">Apply</b-button>
      </footer>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'ModalColumns',
  props: {
    table: Object
  },
  data() {
    return {
      selectedColumns: [...this.table.default_fields],
      loading: false
    }
  },
  mounted() {
    if (this.$route.query.__fields != null)
      this.selectedColumns = this.$route.query.__fields.split(',')
  },
  methods: {
    getField(name) {
      return this.table.fields.find(c => c.name == name)
    },
    submit() {
      this.loading = false

      this.$router
        .push({
          query: Object.assign({}, this.$route.query, {
            __fields: this.selectedColumns.join(',')
          })
        })
        .catch(() => {})
        .then(() => {
          this.$emit('close')
          this.$emit('update')
        })
    },
    save() {
      this.loading = true

      this.$store
        .dispatch('data/patchTable', {
          idTable: this.table.id,
          data: {
            default_fields: this.selectedColumns.map(e => this.getField(e).id)
          }
        })
        .then(this.submit)
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

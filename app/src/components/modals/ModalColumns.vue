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
              getColumnName(tag)
            }}</template></b-taginput
          >
        </VField>

        <VField label="Column list" rules="required">
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
        </VField>
      </section>
      <footer class="modal-card-foot">
        <b-button class="is-dark is-outlined" @click="$emit('close')">
          Cancel
        </b-button>
        <b-button class="is-dark" @click="passes(submit)">Apply</b-button>
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
      selectedColumns: this.table.default_fields,
      // selectedColumns: [],
      columnMap: {}
    }
  },
  mounted() {
    if (this.$route.query.__fields != null)
      this.selectedColumns = this.$route.query.__fields.split(',')
  },
  methods: {
    getColumnName(name) {
      return this.table.fields.find(c => c.name == name).display_name
    },
    submit() {
      this.$router
        .push({
          query: Object.assign({}, this.$route.query, {
            __fields: this.selectedColumns.join(',')
          })
        })
        .catch(() => {})
        .then(() => {
          this.$emit('close')
        })
    }
  }
}
</script>

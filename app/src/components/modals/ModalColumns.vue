<template>
  <div class="modal-card" style="width: 960px">
    <header class="modal-card-head">
      <p class="modal-card-title">Choose which columns to display</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>

    <ValidationObserver v-slot="{ passes }" @submit.prevent slim>
      <section class="modal-card-body">
        <VField label="Selected columns" rules="">
          <b-taginput v-model="selectedColumns" type="is-dark" :maxtags="0" />
        </VField>

        <VField label="Column list" rules="required|over:2|under:7">
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
// @TODO: disable checkboxes? :disabled="selectedColumns.length == 7 && selectedColumns.indexOf(field) == -1"

export default {
  name: 'ModalColumns',
  props: {
    table: Object
  },
  data() {
    return {
      selectedColumns: this.table.default_fields,
      columnMap: this.table.fields.map(e => {
        return { [e.name]: e.display_name }
      })
    }
  },
  mounted() {
    if (this.$route.query.__fields != null)
      this.selectedColumns = this.$route.query.__fields.split(',')
  },
  methods: {
    columnTags() {
      // return this.selectedColumns.map(e => this.columns.find(c => c.name == e))
    },
    compareArrays(a, b) {
      return JSON.stringify(a) == JSON.stringify(b)
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

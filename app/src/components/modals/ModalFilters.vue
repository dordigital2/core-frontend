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
          <div class="checkbox-list is-size-6">
            <b-checkbox
              v-for="(col, index) in table.fields"
              :key="'check' + index"
              v-model="selectedColumns"
              :native-value="col.name"
            >
              {{ col.display_name }}
            </b-checkbox>
          </div>
        </VField>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-dark is-outlined" @click="$emit('close')">
          Cancel
        </button>
        <button class="button is-dark" @click="passes(submit)">Apply</button>
      </footer>
    </ValidationObserver>
  </div>
</template>

<script>
// @TODO: disable checkboxes? :disabled="selectedColumns.length == 7 && selectedColumns.indexOf(col) == -1"

export default {
  name: 'ModalColumns',
  props: {
    table: Object
  },
  data() {
    return {
      selectedColumns: this.table.default_fields
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
          this.$store
            .dispatch('data/getTableEntries', {
              idTable: Number(this.$route.params.idTable),
              query: this.$route.query
            })
            .then(() => {
              this.$emit('close')
            })
        })
    }
  }
}
</script>

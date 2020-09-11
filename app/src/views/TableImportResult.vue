<template>
  <div>
    <BaseTitle title="Table import result" :hasBackButton="false" />

    <template v-if="importData">
      <BaseCard
        :title="`Table ${name && JSON.stringify(name)} has been created`"
      >
        <template #actions v-if="importData.imports_count" class="da">
          <router-link
            class="button is-dark"
            :to="{ name: 'table-view', params: { idTable: importData.table } }"
            >View table</router-link
          >
        </template>

        <div class="card-container">
          {{ importData.imports_count }} rows have been imported successfully!
        </div>
      </BaseCard>

      <BaseCard
        :title="`${importData.errors_count} rows have errors`"
        v-if="importData.errors_count"
      >
        <template #default>
          <b-table :data="importData.errors">
            <b-table-column
              v-for="(field, index) in importData.csv_field_mapping"
              :key="`column-${index}`"
              v-bind="{
                label: field.field_name
              }"
            >
              <template v-slot="props"
                ><span
                  :class="{
                    'has-text-danger is-bold': props.row.errors[field.field_name]
                  }"
                  >{{ props.row.row[field.field_name] }}</span
                ></template
              >
            </b-table-column>
          </b-table>
        </template>

        <template #actions>
          <a class="button is-primary" target="_blank" :href="exportPath()"
            >Download these fields</a
          >
        </template>
      </BaseCard>
    </template>
  </div>
</template>

<script>
import ApiService from '@/services/api'
import { mapState } from 'vuex'

export default {
  name: 'TableImportResult',
  data() {
    return {
      idImport: this.$route.params.idImport,
      name: this.$route.query.name || ''
    }
  },
  computed: mapState('data', {
    importData: state => state.import
  }),
  mounted() {
    this.$store.dispatch('data/getImportData', this.idImport)
  },
  methods: {
    exportPath() {
      return ApiService.getPath(
        `csv-imports/${this.idImport}/export-errors/`,
        true
      )
    }
  }
}
</script>

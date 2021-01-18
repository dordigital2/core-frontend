<template>
  <div v-if="table">
    <BaseTitle :title="`Import data into ${table.name}`" />

    <ValidationObserver v-slot="{ passes }" @submit.prevent slim>
      <BaseCard title="Match data columns between tables" v-bind="{ loading }">
        <template #title>
          <div class="info">
            <div>
              In order to import the data to an existing table, you have to
              match the columns in the file you are importing to the columns in
              the existing table. This matching will allow the platform to
              understand and transfer the data in the right columns, to prevent
              errors. <br />
              We will set the default column correlation based on the import
              file used to create the table.
            </div>
          </div>
        </template>

        <template #default>
          <div class="card-container" v-if="fields">
            <br />
            <div class="columns is-size-6">
              <div class="column is-6">
                The columns below are extracted from the table you want to
                import.
              </div>
              <div class="column is-6">
                Select the corresponding destination column from the existing
                table.
              </div>
            </div>

            <div
              class="columns"
              v-for="(field, index) in fields"
              :key="`cname-${index}`"
            >
              <div class="column is-6">
                <VField :label="`Column #${index + 1}`" rules="required">
                  <b-input :value="field.original_name" readonly />
                </VField>
              </div>
              <div class="column is-6">
                <VField
                  :label="
                    `Column #${index + 1} ${getFieldType(
                      getTableField(field.table_field).field_type
                    )}`
                  "
                  rules=""
                  grouped
                >
                  <b-select v-model="field.table_field" expanded>
                    <option
                      v-for="(tfield, index) in table.sorted_fields"
                      :key="`tname-${index}`"
                      :value="tfield.id"
                      v-text="tfield.display_name"
                    />
                  </b-select>

                  <b-button class="is-white" :disabled="fields.length == 1">
                    <ActionButtonDelete
                      :dialogTitle="
                        `Delete column ${
                          field.display_name != null
                            ? JSON.stringify(field.display_name)
                            : ''
                        }`
                      "
                      dialogMessage="Are you sure?"
                      :bypassDialog="!field.original_name.length"
                      @on-confirm="deleteColumn(index)"
                  /></b-button>
                </VField>

                <VField
                  v-if="isFormatted(field.table_field)"
                  :label="`Column format #${index + 1}`"
                  rules="required"
                >
                  <VDateformat v-model="field.field_format" />
                </VField>
              </div>
            </div>
          </div>
        </template>

        <template #footer>
          <b-button class="is-primary" @click="passes(submit)">
            Continue
          </b-button>
        </template>
      </BaseCard>
    </ValidationObserver>
  </div>
</template>

<script>
import FieldService from '@/services/field'
import ActionButtonDelete from '@/components/table/ActionButtonDelete'
import { mapState } from 'vuex'

export default {
  name: 'TableImportEdit',
  components: { ActionButtonDelete },
  data() {
    return {
      idTable: Number(this.$route.params.idTable),
      idImport: this.$route.query.idImport,
      name: this.$route.query.name,
      fields: null,
      loading: false
    }
  },
  computed: {
    ...mapState('data', {
      database: state => state.database,
      table: function(state) {
        return state.table[this.idTable]
      },
      importData: state => state.import
    })
  },
  mounted() {
    if (!this.database) this.$store.dispatch('data/getDatabase')

    this.$store.dispatch('data/getTable', this.idTable)
    this.$store.dispatch('data/getImportData', this.idImport).then(response => {
      this.fields = response.csv_field_mapping
    })
  },
  methods: {
    getFieldType(type) {
      const t = FieldService.getFieldTypes()[type]
      return t ? `– ${t}` : ''
    },
    isFormatted(id) {
      if (id == null) return false

      const field = this.getTableField(id)
      return field.field_type == 'date'
    },
    getTableField(id) {
      if (id == null) return { field_type: null }
      return this.table.fields.find(e => e.id == id)
    },
    deleteColumn(index) {
      this.fields.length > 1 && this.fields.splice(index, 1)
    },
    submit() {
      this.loading = true

      this.$store
        .dispatch('data/manualImport', {
          idTable: this.idTable,
          data: { fields: this.fields, import_id: this.idImport }
        })
        .then(response => {
          this.loading = false

          this.$router.push({
            name: 'table-import-result',
            params: { idImport: response.import_id }
          })
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

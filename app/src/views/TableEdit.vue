<template>
  <div v-if="table">
    <BaseTitle :title="title" />

    <ValidationObserver v-slot="{ passes }" @submit.prevent slim>
      <BaseCard :title="title">
        <b-loading :is-full-page="false" v-model="loading" />

        <div class="card-container">
          <div class="columns">
            <div class="column is-4">
              <VField label="Table name">
                <b-input v-model="name" />
              </VField>
            </div>
            <div class="column is-8">
              <div
                class="columns field-list"
                v-for="(field, index) in fields"
                :key="`cname-${index}`"
              >
                <div class="column is-7">
                  <VField :label="`Column name #${index + 1}`" rules="required">
                    <div class="field-container">
                      <b-input v-model="field.display_name" placeholder="" />
                      <b-tag
                        v-if="
                          false &&
                            idImport &&
                            importData &&
                            importData.fields[index]
                        "
                        class="csv-field"
                        >{{ importData.fields[index].display_name }}</b-tag
                      >
                    </div>
                  </VField>
                </div>
                <div class="column is-5">
                  <VField
                    :label="`Column type #${index + 1}`"
                    rules="required"
                    grouped
                  >
                    <b-select
                      v-model="field.field_type"
                      placeholder=""
                      :disabled="field.disabled"
                      expanded
                    >
                      <option
                        v-for="(type, key) in fieldTypes"
                        :key="key"
                        :value="key"
                        >{{ type }}</option
                      >
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
                        :bypassDialog="!idTable"
                        @on-confirm="deleteColumn(index)"
                    /></b-button>
                  </VField>

                  <VField
                    v-if="idImport && field.field_type == 'date'"
                    :label="`Column format #${index + 1}`"
                    rules="required"
                  >
                    <b-input
                      v-if="idImport && field.field_type == 'date'"
                      v-model="field.field_format"
                    />
                  </VField>
                </div>
              </div>

              <div class="columns">
                <div class="column is-7">
                  <br />
                  <b-button class="is-dark" @click="addColumn" expanded
                    >Add another column</b-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <b-button class="is-primary" @click="passes(submit)">
            {{ idTable ? 'Save changes' : 'Finalize' }}
          </b-button>
        </template>
      </BaseCard>
    </ValidationObserver>
  </div>
</template>

<script>
import ActionButtonDelete from '@/components/table/ActionButtonDelete'
import FieldService from '@/services/field'
import { ToastService } from '@/services/buefy'
import { TableService } from '@/services/data'
import { mapState } from 'vuex'

export default {
  name: 'TableEdit',
  components: { ActionButtonDelete },
  data() {
    return {
      idTable: Number(this.$route.params.idTable),
      idImport: this.$route.query.idImport,
      name: this.$route.query.name,
      fields: [{ display_name: null, field_type: null, field_format: null }],
      fieldTypes: FieldService.getFieldTypes(),
      loading: false
    }
  },
  computed: {
    ...mapState('data', {
      database: state => state.database,
      table: function(state) {
        return this.idTable ? state.table[this.idTable] : {}
      },
      importData: state => state.import
    }),
    title() {
      return this.idTable && !this.idImport
        ? `Edit table — ${this.table.name}`
        : 'Build table'
    }
  },
  mounted() {
    if (!this.database) this.$store.dispatch('data/getDatabase')

    // this.$store.dispatch('data/getImportData', this.idImport).then(() => {
    //   this.fields = [...this.importData.fields]
    // })
    // @TODO: Update fields after `getImportData` contains initial detected columns if user refreshes page
    // temp fix: go back and reimport

    if (this.idImport) {
      if (!this.importData) {
        this.$router.go(-1)
        return
      }
    }

    if (this.idTable) {
      this.$store.dispatch('data/getTable', this.idTable).then(() => {
        this.name = this.table.name
        this.fields = this.table.fields.map(e => ({
          ...e,
          disabled: true
        }))
      })
    } else if (this.idImport) {
      this.fields = [...this.importData.fields]
    }
  },
  methods: {
    addColumn() {
      this.fields.push({
        display_name: null,
        field_type: null,
        field_format: null
      })
    },
    deleteColumn(index) {
      this.fields.length > 1 && this.fields.splice(index, 1)
    },
    submit() {
      const resource = {
        database: this.database.id,
        name: this.name,
        fields: this.fields,
        active: true
      }

      if (this.idImport) {
        this.loading = true
        TableService.postTable({
          import_id: this.importData.import_id,
          ...resource
        }).then(() => {
          ToastService.open('Table was imported successfuly.')
          this.$router
            .push({
              name: 'table-import-result',
              params: { idImport: this.importData.import_id },
              query: { name: this.$route.query.name }
            })
            .catch(() => {
              this.loading = false
            })
        })
      } else if (!this.idTable)
        TableService.postTable(resource).then(() => {
          ToastService.open('Table was created successfuly.')
          this.$router.push({
            name: 'table-view',
            params: { idTable: this.idTable }
          })
        })
      else
        TableService.putTable(this.idTable, resource).then(() => {
          ToastService.open('Table was updated successfuly.')
          this.$router.push({
            name: 'table-view',
            params: { idTable: this.idTable }
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.field-list {
  .column {
    margin-bottom: -15px;
  }
}

.field-container {
  position: relative;

  .csv-field {
    z-index: 5;
    position: absolute;
    top: 6px;
    right: 6px;
  }
}
</style>

<template>
  <div v-if="table">
    <BaseTitle :title="title" />

    <ValidationObserver v-slot="{ passes }" @submit.prevent slim>
      <BaseCard :title="title">
        <div class="card-container">
          <div class="columns">
            <div class="column is-4">
              <VField label="Table name">
                <b-input v-model="name" :disabled="!idTable" />
              </VField>
            </div>
            <div class="column is-5">
              <VField
                v-for="(field, index) in fields"
                :key="`cname-${index}`"
                :label="`Column name #${index + 1}`"
                rules="required"
              >
                <b-input v-model="field.name" placeholder="" />
              </VField>

              <br />
              <b-button class="is-dark" @click="addColumn" expanded
                >Add another column</b-button
              >
            </div>
            <div class="column is-3">
              <VField
                v-for="(field, index) in fields"
                :key="`ctype-${index}`"
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
                    v-for="(type, key) in field_types"
                    :key="key"
                    :value="key"
                    >{{ type }}</option
                  >
                </b-select>

                <b-button class="is-white" :disabled="fields.length == 1">
                  <ActionButtonDelete
                    :dialogTitle="
                      `Delete column ${
                        field.name != null
                          ? JSON.stringify(field.name)
                          : ''
                      }`
                    "
                    dialogMessage="Are you sure?"
                    :bypassDialog="!idTable"
                    @on-confirm="deleteColumn(index)"
                /></b-button>
              </VField>
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

    <BaseCard
      ><pre>{{ importData }}</pre></BaseCard
    >
  </div>
</template>

<script>
import ActionButtonDelete from '@/components/table/ActionButtonDelete'
import FieldService from '@/services/field'
import { ToastService } from '@/services/buefy'
import { TableService, ImportService } from '@/services/data'
import { mapState } from 'vuex'

export default {
  name: 'TableEdit',
  components: { ActionButtonDelete },
  data() {
    return {
      idTable: Number(this.$route.params.idTable),
      name: this.$route.query.name,
      fields: [{ name: null, field_type: null }],
      field_types: FieldService.getFieldTypes()
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
      return this.idTable ? `Edit table — ${this.table.name}` : 'Build table'
    }
  },
  mounted() {
    if (!this.database) this.$store.dispatch('data/getDatabase')

    if (this.importData) {
      this.fields = [...this.importData.fields]
    } else if (this.idTable)
      this.$store.dispatch('data/getTable', this.idTable).then(() => {
        this.name = this.table.name
        this.fields = this.table.fields.map(e => ({ ...e, disabled: true }))
      })
  },
  methods: {
    addColumn() {
      this.fields.push({ name: null, field_type: null })
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

      if (this.importData) {
        TableService.putTable(this.idTable, resource).then(() => {
          ImportService.run(this.idTable, this.importData.import_id).then(() => {
            ToastService.open('Table was imported successfuly.')
            this.$router.push({ name: 'database-view' })
          })
        })
      } else if (!this.idTable)
        TableService.postTable(resource).then(() => {
          ToastService.open('Table was created successfuly.')
          this.$router.push({ name: 'database-view' })
        })
      else
        TableService.putTable(this.idTable, resource).then(() => {
          ToastService.open('Table was updated successfuly.')
          this.$router.push({ name: 'database-view' })
        })
    }
  }
}
</script>

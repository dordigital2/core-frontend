<template>
  <ValidationObserver v-slot="{ passes }" @submit.prevent slim>
    <BaseCard title="Add a table view">
      <div class="card-container" v-if="database">
        <div class="columns">
          <div class="column">
            <VField label="Source field">
              <b-select
                placeholder="Select a field"
                v-model="source"
                @input="field = null"
                expanded
              >
                <option
                  v-for="(field, index) in table.fields"
                  :value="index"
                  :key="field.id"
                >
                  {{ field.display_name }}
                </option>
              </b-select>
            </VField>
          </div>
          <div class="column">
            <VField label="Table">
              <b-select
                placeholder="Select a table"
                v-model="idLinkTable"
                @input="getTableFields"
                expanded
              >
                <option
                  v-for="table in database.active_tables"
                  :value="table.id"
                  :key="table.id"
                >
                  Table – {{ table.data.name }}
                </option>
              </b-select>
            </VField>
          </div>

          <div class="column">
            <VField label="Linked field">
              <b-select
                placeholder="Select a field"
                v-model="field"
                :loading="loading"
                expanded
              >
                <option
                  v-for="field in fields"
                  :value="field.name"
                  :key="field.id"
                  :disabled="checkLinkFieldtype(field.field_type)"
                >
                  {{ field.display_name }}
                </option>
              </b-select>
            </VField>
          </div>
        </div>
      </div>

      <template #footer>
        <button class="button is-dark" @click="passes(addTableView)">
          Add view
        </button>
      </template>
    </BaseCard>
  </ValidationObserver>
</template>

<script>
import { TableService } from '@/services/data'
import { mapState } from 'vuex'

export default {
  name: 'TableEntityLinkCard',
  components: {},
  data() {
    return {
      field: null,
      source: null,
      idLinkTable: null,
      loading: false,
      fields: []
    }
  },
  props: {
    idTable: Number
  },
  computed: mapState({
    database: state => state.data.database,
    table: function(state) {
      return state.data.table[this.idTable]
    }
  }),
  methods: {
    getTableFields() {
      this.loading = true
      this.field = null

      TableService.getTable(this.idLinkTable).then(response => {
        this.fields = response.fields
        this.loading = false
      })
    },
    addTableView() {
      this.$emit('input', {
        idLinkTable: this.idLinkTable,
        linkField: this.field,
        sourceField: this.table.fields[this.source].name
      })
    },
    checkLinkFieldtype(type) {
      if (this.source == null) return false

      return this.table.fields[this.source].field_type != type
    }
  },
  mounted() {
    if (!this.database) this.$store.dispatch('data/getDatabase')
  }
}
</script>

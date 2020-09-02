<template>
  <ValidationObserver v-slot="{ passes }" @submit.prevent slim>
    <BaseCard title="Add a table view">
      <div class="card-container" v-if="database">
        <div class="columns">
          <div class="column">
            <VField label="Select table">
              <b-select v-model="idTable" @input="getTableFields" expanded>
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
            <VField label="Select linked field">
              <b-select
                v-model="field"
                :loading="loading"
                :disabled="loading"
                expanded
              >
                <option
                  v-for="field in fields"
                  :value="field.name"
                  :key="field.id"
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
      idTable: null,
      available_tables: [],
      fields: [],
      field: null,
      loading: false
    }
  },
  computed: mapState({
    database: state => state.data.database
  }),
  methods: {
    getTableFields() {
      TableService.get(this.idTable).then(response => {
        this.fields = response.fields
      })
    },
    removeTableFromList(id) {
      console.log('removeTableFromList', id)

      const index = this.available_tables.map(e => e.id).indexOf(id)
      this.available_tables.slice(index, 1)
    },
    addTableView() {
      // this.removeTableFromList(this.idTable)
      this.$emit('input', { idTable: this.idTable, linkField: this.field })
    }
  },
  mounted() {
    if (!this.database) this.$store.dispatch('data/getDatabase')
    // this.available_tables = this.database.active_tables.slice()
  }
}
</script>

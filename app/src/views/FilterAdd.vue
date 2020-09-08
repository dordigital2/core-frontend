<template>
  <div v-if="database">
    <BaseTitle title="Add view" />

    <ValidationObserver v-slot="{ passes }" @submit.prevent slim>
      <BaseCard title="Select tables for linking">
        <div
          class="card-container"
          v-for="(link, link_index) in links"
          :key="`link-${link_index}`"
        >
          <div class="columns is-multiline">
            <div class="column is-6">
              <VField label="Select a table">
                <b-select
                  v-model="link.idTable"
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
            <div class="column is-4">
              <VField
                label="Link field"
                labelInfo="Field types must match"
                v-if="table[link.idTable]"
              >
                <b-select v-model="link.field" expanded>
                  <option
                    v-for="field in table[link.idTable].fields"
                    :value="field.name"
                    :key="field.id"
                    :disabled="
                      link_index > 0
                        ? checkLinkFieldtype(field.field_type)
                        : false
                    "
                  >
                    {{ field.display_name }}
                  </option>
                </b-select>
              </VField>
            </div>

            <div class="column is-12" v-if="table[link.idTable]">
              <VField
                label="Select which columns you wish to keep"
                rules="required|over:2"
              >
                <div class="checkbox-list">
                  <b-checkbox
                    v-for="(field, index) in table[link.idTable].fields"
                    :key="'check' + index"
                    v-model="link.selectedColumns"
                    :native-value="field.name"
                  >
                    {{ field.display_name }}
                  </b-checkbox>
                </div>
              </VField>
            </div>
          </div>
        </div>

        <template #footer>
          <b-button class="is-primary" @click="passes(submit)"
            >Continue</b-button
          >
        </template>

        <pre>{{ links }}</pre>
      </BaseCard>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'FilterAdd',
  data() {
    return {
      links: [
        { idTable: null, field: null, selectedColumns: [] },
        { idTable: null, field: null, selectedColumns: [] }
      ]
    }
  },
  computed: mapState('data', {
    database: state => state.database,
    table: state => state.table
  }),
  mounted() {
    this.$store.dispatch('data/getDatabase')
  },
  methods: {
    getTableFields(value) {
      this.$store.dispatch('data/getTable', value).then(() => {})
    },
    checkLinkFieldtype(type) {
      if (this.links[0].field == null) return false

      return (
        this.table[this.links[0].idTable].fields.find(
          e => e.name == this.links[0].field
        ).field_type != type
      )
    },
    submit() {
      console.log('submit')
      this.$router.push({
        name: 'filter-table-view',
        params: {
          idTable: 4
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  &:not(:last-child) {
    border-bottom: 1px solid $grey;
  }
}
</style>

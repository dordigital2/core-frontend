<template>
  <div v-if="table">
    <BaseCard title="Filtering">
      <template #actions>
        <div class="buttons">
          <b-button class="is-light" @click="resetFilters">
            Reset filters
          </b-button>
          <b-button class="is-dark" @click="openModalFilters">
            {{ filtersNotEmpty ? 'Edit filters' : 'Add filters' }}
          </b-button>

          <template v-if="filterMode">
            <b-button class="is-primary" @click="saveFilters">Save</b-button>
          </template>
        </div>
      </template>

      <template #default v-if="filtersNotEmpty">
        <div class="card-container">
          <FilterDisplay
            :fields="table.fields"
            :filterData="filters"
            :filterMode="filterMode"
            class="is-horizontal"
          />
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<script>
import ModalFilters from '@/components/modals/ModalFilters'
import FilterDisplay from '@/components/filters/FilterDisplay'
import ApiService from '@/services/api'
import { ToastService } from '@/services/buefy'

import { mapState } from 'vuex'

export default {
  name: 'FilterHead',
  components: { FilterDisplay },
  props: {
    table: Object,
    filterMode: Boolean,
    filterData: Object,
    viewType: String
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('data', {
      filters: function(state) {
        return state.filters[this.table.id]
      }
    }),
    filtersNotEmpty() {
      return this.filters && Object.keys(this.filters).length
    }
  },
  mounted() {
    if (this.filterMode) {
      this.$store.commit('data/setFilters', {
        idTable: this.table.id,
        filter: this.filterData
      })

      if (this.filterData) this.updateFilterQuery()
    }
  },
  methods: {
    openModalFilters() {
      this.$buefy.modal.open({
        parent: this,
        component: ModalFilters,
        hasModalCard: true,
        trapFocus: true,
        props: {
          table: this.table
        },
        events: {
          submit: () => {
            this.updateFilterQuery()
          }
        }
      })
    },

    saveFilters() {
      const id =
        this.viewType == 'charts' ? this.$route.params.idChart : this.table.id

      ApiService.patch(`${this.viewType}/${id}/`, {
        filters: this.filters
      }).then(() => {
        ToastService.open('Filters have been saved')
      })
    },

    resetFilters() {
      this.$store.commit('data/setFilters', {
        idTable: this.table.id,
        filter: null
      })

      const __fields = this.$route.query.__fields
      const query = { ...(__fields && { __fields }) }

      this.$router.replace({ query }).catch(() => {})
      this.$emit('update', query)
    },

    updateFilterQuery() {
      // processing filterData object from Modal and updating page query

      const filterData = this.filters
      let query = {}

      Object.keys(filterData).forEach(key => {
        let e = filterData[key]

        if (e != null) {
          if (Array.isArray(e) && e.length) {
            query[key] = e.join(',')
          } else if (typeof e == 'object') {
            if (e.type == 'interval') {
              query[`${key}__gte`] = e.values[0]
              query[`${key}__lte`] = e.values[1]
            } else {
              query[`${key}__${e.type}`] = e.values[0]
            }
          } else if (typeof e == 'boolean') {
            query[`${key}`] = e
          } else query[`${key}__icontains`] = e.toString()
        }
      })

      const __fields = this.$route.query.__fields
      const newQuery = Object.assign({ ...(__fields && { __fields }) }, query)

      this.$router
        .replace({
          query: newQuery
        })
        .catch(() => {})
        .then(() => {})

      this.$emit('update', newQuery)
    }
  }
}
</script>

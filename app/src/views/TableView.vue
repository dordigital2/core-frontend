<template>
  <div v-if="table">
    <BaseTitle :title="title" />

    <BaseCard title="Filtering">
      <template #actions>
        <div class="buttons">
          <b-button class="is-light" @click="resetFilters">
            Reset filters
          </b-button>
          <b-button class="is-dark" @click="openModalFilters">
            Add filters
          </b-button>

          <template v-if="filterMode">
            <b-button class="is-primary" @click="saveFilters">Save</b-button>
          </template>
        </div>
      </template>

      <template #default v-if="filters">
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

    <BaseCard :title="titleWithCount">
      <template #actions>
        <div class="buttons">
          <b-button class="is-dark" @click="openModalColumns">
            Change view
          </b-button>

          <router-link
            class="button is-primary"
            :to="{
              name: filterMode ? `filter-edit` : `table-edit`,
              params: { idTable }
            }"
          >
            Edit table
          </router-link>

          <router-link
            v-if="!filterMode"
            class="button is-primary"
            :to="{ name: `entity-edit`, params: { idTable } }"
          >
            Add new entity
          </router-link>

          <a :href="exportPath" class="button is-primary" target="_blank">
            Export
          </a>
        </div>
      </template>

      <template #default>
        <div class="card-container">
          Last edit: {{ table.last_edit_date | parseDate }}
          <span v-if="table.last_edit_user"
            >by
            <router-link :to="`user-profile/${table.last_edit_user.id}`">{{
              table.last_edit_user.first_name +
                ' ' +
                table.last_edit_user.last_name
            }}</router-link></span
          >
        </div>

        <BaseTableAsync
          :table="table"
          :tableEntries="tableEntries || []"
          :filterMode="filterMode"
          updateQueryNav
        />
      </template>
    </BaseCard>
  </div>
</template>

<script>
import ModalColumns from '@/components/modals/ModalColumns'
import ModalFilters from '@/components/modals/ModalFilters'
import FilterDisplay from '@/components/filters/FilterDisplay'

import ApiService from '@/services/api'
import { TableViewService } from '@/services/data'
import { ToastService } from '@/services/buefy'

import { mapState } from 'vuex'

export default {
  name: 'TableView',
  components: { FilterDisplay },
  props: { filterMode: Boolean },
  data() {
    return {
      idTable: Number(this.$route.params.idTable)
    }
  },
  computed: {
    ...mapState('data', {
      table: function(state) {
        return this.filterMode ? state.tableView : state.table[this.idTable]
      },
      tableEntries: function(state) {
        return this.filterMode ? state.tableViewEntries : state.tableEntries
      },
      filters: function(state) {
        return state.filters[this.idTable]
      }
    }),
    title() {
      return 'Table – ' + this.table.name
    },
    titleWithCount() {
      return (
        this.title +
        (this.tableEntries
          ? ` <span class='entries'>${this.tableEntries.count} entries</span>`
          : '')
      )
    },
    exportPath() {
      return ApiService.getPath(
        `${this.filterMode ? 'filters' : 'tables'}/${this.idTable}/csv-export/`,
        true,
        this.$route.query
      )
    }
  },
  mounted() {
    this.$store
      .dispatch(
        this.filterMode ? 'data/getTableView' : 'data/getTable',
        this.idTable
      )
      .then(() => {
        if (this.filterMode) {
          this.$store.commit('data/setFilters', {
            idTable: this.idTable,
            filter: this.table.filters
          })

          if (this.table.filters) this.updateFilterQuery()
        }
      })

    this.getTableEntries()
  },
  methods: {
    getTableEntries() {
      this.$store.dispatch(
        this.filterMode ? 'data/getTableViewEntries' : 'data/getTableEntries',
        {
          idTable: this.idTable,
          query: Object.assign({}, this.$route.query)
        }
      )
    },

    openModalColumns() {
      this.$buefy.modal.open({
        parent: this,
        component: ModalColumns,
        hasModalCard: true,
        trapFocus: true,
        props: {
          table: this.table
        }
      })
    },

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
      TableViewService.patchTableView(this.idTable, {
        filters: this.filters
      }).then(() => {
        ToastService.open('Filtered view has been saved')
      })
    },

    resetFilters() {
      this.$store.commit('data/setFilters', {
        idTable: this.idTable,
        filter: null
      })

      const __fields = this.$route.query.__fields

      this.$router
        .push({
          query: { ...(__fields && { __fields }) }
        })
        .catch(() => {})
    },

    updateFilterQuery() {
      const filterData = Object.assign({}, this.filters)
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
            // } else if (typeof e == 'string') query[`${key}__icontains`] = e
          } else query[`${key}__icontains`] = e.toString()
        }
      })

      const __fields = this.$route.query.__fields

      this.$router
        .push({
          query: Object.assign({ ...(__fields && { __fields }) }, query)
        })
        .catch(() => {})
        .then(() => {})
    }
  },
  watch: {
    '$route.query'() {
      this.getTableEntries()
    }
  }
}
</script>

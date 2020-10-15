<template>
  <div v-if="table">
    <BaseTitle
      :title="title"
      :backTo="filterMode ? 'filter-view' : 'database-view'"
    />

    <FilterHead
      v-bind="{
        table,
        filterMode,
        filterData: table.filters,
        viewType: filterMode ? 'filters' : null
      }"
      @update="getTableEntries"
    />

    <BaseCard :title="title">
      <template #title v-if="tableEntries">
        <span class="entries">{{ tableEntries.count }} entries</span>
      </template>
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
          v-bind="{ table, filterMode }"
          :tableEntries="tableEntries || {}"
          @update="getTableEntries"
          updateQueryNav
        />
      </template>
    </BaseCard>
  </div>
</template>

<script>
import ModalColumns from '@/components/modals/ModalColumns'
import FilterHead from '@/components/filters/FilterHead'

import ApiService from '@/services/api'
import { mapState } from 'vuex'

export default {
  name: 'TableView',
  components: { FilterHead },
  props: {
    filterMode: Boolean
  },
  data() {
    return {
      idTable: Number(this.$route.params.idTable)
    }
  },
  computed: {
    // @TODO: parameter for filter/table/chart api + simplify `tableViewEntries`, `tableView``

    ...mapState('data', {
      table: function(state) {
        return this.filterMode ? state.tableView : state.table[this.idTable]
      },
      tableEntries: function(state) {
        return this.filterMode ? state.tableViewEntries : state.tableEntries
      }
    }),
    title() {
      return (
        (this.filterMode ? 'Filtered view' : 'Table') + ' – ' + this.table.name
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
    this.$store.commit('data/setTableLinks', null)

    this.$store
      .dispatch(
        this.filterMode ? 'data/getTableView' : 'data/getTable',
        this.idTable
      )
      .then(() => {
        if (!this.table.filters) this.getTableEntries()
      })
  },
  methods: {
    getTableEntries() {
      this.$store.dispatch(
        this.filterMode ? 'data/getTableViewEntries' : 'data/getTableEntries',
        {
          idTable: this.idTable,
          query: this.$route.query
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
          table: this.table,
          filterMode: this.filterMode
        },
        events: {
          update: this.getTableEntries
        }
      })
    }
  }
}
</script>

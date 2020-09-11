// import router from '@/router'
import Vue from 'vue'
import {
  DatabaseService,
  TableService,
  ImportService,
  TableViewService
} from '@/services/data'
import { ToastService } from '@/services/buefy'

export default {
  namespaced: true,
  state: {
    database: null,
    table: {},
    tableEntries: null,
    tableViewEntries: null,
    entity: null,
    import: null,
    filters: {},
    tableView: null,
    tableViews: null,
    loading: {}
  },
  mutations: {
    setDatabase(state, data) {
      state.database = data[0]
    },
    setTable(state, { idTable, data }) {
      Vue.set(state.table, idTable, data)
      // state.table = data
    },
    setTableEntries(state, data) {
      // Vue.set(state.tableEntries, idTable, data)
      state.tableEntries = data
    },
    setEntity(state, data) {
      state.entity = data
    },
    setFilters(state, { idTable, filter }) {
      // state.filters = data
      Vue.set(state.filters, idTable, filter)
    },
    setImport(state, data) {
      state.import = data
    },
    setTableView(state, data) {
      state.tableView = data
    },
    setTableViewEntries(state, data) {
      state.tableViewEntries = data
    },
    setTableViews(state, data) {
      state.tableViews = data
    },
    setLoading(state, { idTable, status }) {
      Vue.set(state.loading, idTable, status)
    }
  },
  actions: {
    // DATABASE
    //
    getDatabase({ commit }) {
      return DatabaseService.getDatabase().then(response => {
        commit('setDatabase', response)
      })
    },

    // TABLE
    //
    getTable({ commit }, idTable) {
      return TableService.getTable(idTable).then(response => {
        commit('setTable', { idTable, data: response })
      })
    },

    getTableEntries({ commit }, { idTable, query }) {
      commit('setLoading', { idTable, status: true })

      return TableService.getEntries(idTable, query).then(response => {
        commit('setTableEntries', response)
        commit('setLoading', { idTable, status: false })
      })
    },

    getEntity({ commit }, { idTable, idEntity }) {
      return TableService.getEntity(idTable, idEntity).then(response => {
        commit('setEntity', response)
      })
    },

    patchTable({ dispatch }, { idTable, data }) {
      return TableService.patchTable(idTable, data).then(() => {
        dispatch('getDatabase').then(
          ToastService.open('The table has been updated')
        )
      })
    },

    deleteTable({ dispatch }, idTable) {
      return TableService.deleteTable(idTable).then(() => {
        dispatch('getDatabase').then(
          ToastService.open('The table has been deleted')
        )
      })
    },

    deleteEntity({ dispatch }, { idTable, idEntity }) {
      return TableService.deleteEntity(idTable, idEntity).then(() => {
        dispatch('getTableEntries', { idTable }).then(() => {
          ToastService.open('The entity has been deleted')
        })
      })
    },

    // IMPORT
    //
    getImportData({ commit }, idImport) {
      return ImportService.getData(idImport).then(response => {
        commit('setImport', response)
      })
    },

    manualImport({ commit }, { idTable, data }) {
      return ImportService.manual(idTable, data).then(response => {
        commit('setImport', response)
        return response
      })
    },

    prepareImport({ commit }, data) {
      return ImportService.prepare(data).then(response => {
        commit('setImport', response)
        return response
      })
    },

    // TABLE VIEWS
    //
    getTableViews({ commit }) {
      return TableViewService.getTableViews().then(response => {
        commit('setTableViews', response)
      })
    },

    getTableView({ commit }, id) {
      return TableViewService.getTableView(id).then(response => {
        commit('setTableView', response)
      })
    },

    getTableViewEntries({ commit }, { idTable, query }) {
      commit('setLoading', { idTable, status: true })
      return TableViewService.getEntries(idTable, query).then(response => {
        commit('setTableViewEntries', response)
        commit('setLoading', { idTable, status: false })
      })
    },

    deleteTableView({ dispatch }, idTable) {
      return TableViewService.deleteTableView(idTable).then(() => {
        dispatch('getTableViews').then(() => {
          ToastService.open('The view has been deleted')
        })
      })
    }
  }
}

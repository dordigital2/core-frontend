// import router from '@/router'

import { DatabaseService, TableService } from '@/services/data'
import { ToastService } from '@/services/buefy'

export default {
  namespaced: true,
  state: {
    database: null,
    table: null,
    tableEntries: null,
    entity: null
  },
  mutations: {
    setDatabase(state, data) {
      state.database = data[0]
    },
    setTable(state, data) {
      state.table = data
    },
    setTableEntries(state, data) {
      state.tableEntries = data
    },
    setEntity(state, data) {
      state.entity = data
    }
  },
  actions: {
    getDatabase({ commit }) {
      return DatabaseService.getDatabase().then(response => {
        commit('setDatabase', response)
      })
    },

    getTable({ commit }, idTable) {
      return TableService.getTable(idTable).then(response => {
        commit('setTable', response)
      })
    },

    getTableEntries({ commit }, idTable) {
      return TableService.getEntries(idTable).then(response => {
        commit('setTableEntries', response)
      })
    },

    getEntity({ commit }, { idTable, idEntity }) {
      return TableService.getEntity(idTable, idEntity).then(response => {
        commit('setEntity', response)
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
        dispatch('getTableEntries', idTable).then(() => {
          ToastService.open('The entity has been deleted')
        })
      })
    }
  }
}

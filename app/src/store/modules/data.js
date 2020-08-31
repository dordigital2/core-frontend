// import router from '@/router'

import { DatabaseService, TableService } from '@/services/data'

export default {
  namespaced: true,
  state: {
    database: [],
    table: {},
    tableEntries: [],
    entity: {}
  },
  mutations: {
    setDatabase(state, data) {
      state.database = data
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
      DatabaseService.get().then(response => {
        commit('setDatabase', response.data)
        // console.log(response)
      })
    },

    getTable({ commit }, id) {
      return TableService.get(id).then(response => {
        commit('setTable', response.data)

        TableService.getEntries(id).then(entries => {
          commit('setTableEntries', entries.data)
        })
      })
    },

    getEntity({ commit }, { idTable, idEntity }) {
      return TableService.getEntity(idTable, idEntity).then(response => {
        commit('setEntity', response.data)
      })
    }
  }
}

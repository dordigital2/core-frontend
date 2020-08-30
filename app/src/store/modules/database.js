// import router from '@/router'

import DatabaseService from '@/services/database'

export default {
  namespaced: true,
  state: {
    database: []
  },
  mutations: {
    set(state, data) {
      state.database = data
    }
  },
  actions: {
    get({ commit }) {
      DatabaseService.get().then(response => {
        commit('set', response.data)
        // console.log(response)
      })
    }
  }
}

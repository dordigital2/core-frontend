// import router from '@/router'

import DatabaseService from '@/services/database'

export default {
  namespaced: true,
  state: {
    database: []
  },
  mutations: {
    get(state, data) {
      state.database = data
    }
  },
  actions: {
    get({ commit }) {
      DatabaseService.get().then(response => {
        commit('get', response.data)
        // console.log(response)
      })
    }
  }
}

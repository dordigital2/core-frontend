import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import UserService from '@/services/user'
import TokenService from '@/services/storage'

import data from './modules/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: TokenService.getToken()
  },
  mutations: {
    login(state, token) {
      state.token = token
    },
    logout(state) {
      state.token = null
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      return UserService.login(username, password)
        .then(response => {
          commit('login', response)
          
          router.replace(
            router.history.current.query.redirect || '/app/dashboard'
          )
        })
        .catch(() => {})
    },

    logout({ commit }) {
      UserService.logout()
      commit('logout')
      
      router.push('/')
    }
  },
  modules: {
    data
  }
})

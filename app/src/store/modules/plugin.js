import Vue from 'vue'
import PluginService from '@/services/plugins'
// import { ToastService } from '@/services/buefy'

export default {
  namespaced: true,
  state: {
    service: null,
    task: null,
    taskOptions: null,
    loading: {}
  },
  mutations: {
    setPlugin(state, plugin) {
      state.service = new PluginService(plugin)
    },
    setTask(state, data) {
      state.task = data
    },
    setTaskOptions(state, data) {
      state.taskOptions = data
    },
    setLoading(state, action, status) {
      Vue.set(state.loading, action, status)
    }
  },
  actions: {
    getTask({ commit, state }, idTask) {
      return state.service.getTask(idTask).then(response => {
        commit('setTask', response)
      })
    },

    getTaskOptions({ commit, state }, idTask) {
      return state.service.getTaskOptions(idTask).then(response => {
        commit('setTaskOptions', response.actions.POST)
      })
    }
  }
}

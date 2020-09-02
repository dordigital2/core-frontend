import Vue from 'vue'

import axios from 'axios'
import TokenService from './storage'

// import { ToastProgrammatic as Toast } from 'buefy'

const ApiService = {
  init(baseURL) {
    console.log('baseURL', baseURL)
    axios.defaults.baseURL = baseURL

    axios.interceptors.response.use(
      response => response.data,
      err => {
        // this.$store.commit('loading_stop')
        let msg = JSON.stringify(
          err.response.data.non_field_errors || err.response.data
        )
        if (err.response.status == null)
          msg = 'Check internet connection'

        // console.log('err', JSON.stringify(err.response))

        Vue.prototype.$buefy.toast.open({
          message: `Error<br> ${msg}`,
          type: 'is-danger'
        })

        return Promise.reject(err)
      }
    )
  },

  setHeader() {
    const token = TokenService.getToken()

    if (token) axios.defaults.headers.common['Authorization'] = `Token ${token}`
  },

  removeHeader() {
    axios.defaults.headers.common = {}
  },

  get(resource) {
    return axios.get(resource)
  },

  post(resource, data) {
    return axios.post(resource, data)
  },

  put(resource, data) {
    return axios.put(resource, data)
  },

  delete(resource) {
    return axios.delete(resource)
  },

  customRequest(data) {
    return axios(data)
  }
}

export default ApiService

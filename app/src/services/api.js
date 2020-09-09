import axios from 'axios'
import TokenService from './storage'
import { ToastService } from './buefy'

import { QueryString } from '@/utils/helpers'

// import { ToastProgrammatic as Toast } from 'buefy'

const ApiService = {
  init(baseURL) {
    // console.log('baseURL', baseURL)
    axios.defaults.baseURL = baseURL

    axios.interceptors.response.use(
      response => response.data,
      err => {
        // this.$store.commit('loading_stop')
        // console.log('err', JSON.stringify(err))

        let msg =
          err.response.data.detail ||
          (err.response.data.non_field_errors &&
            err.response.data.non_field_errors[0]) ||
          err.response.status ||
          'unknown'

        if (err.response.status == null) msg = 'Check internet connection'

        ToastService.open(`Server error<br> ${msg}`, {
          type: 'is-danger'
        })

        return Promise.reject(err)
      }
    )
  },

  getPath(path, appendToken, query) {
    const newPath = axios.defaults.baseURL.slice(-1) == '/' ? path : '/' + path

    return (
      axios.defaults.baseURL +
      newPath +
      (appendToken && `?token=${TokenService.getToken()}`) +
      (query && `${appendToken ? '&' : '?'}${QueryString(query)}`)
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

  patch(resource, data) {
    return axios.patch(resource, data)
  },

  delete(resource) {
    return axios.delete(resource)
  },

  customRequest(data) {
    return axios(data)
  }
}

export default ApiService

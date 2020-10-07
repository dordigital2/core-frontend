import ApiService from './api'
import TokenService from './storage'

import { QueryString } from '@/utils/helpers'

const UserService = {
  login: function(username, password) {
    return ApiService.post('/api-token-auth/', {
      username,
      password
    }).then(response => {
      TokenService.saveToken(response.token)
      ApiService.setHeader()

      return response.access_token
    })
  },

  logout() {
    TokenService.removeToken()
    ApiService.removeHeader()
  },

  getUsers(query) {
    const queryString = query != null ? '?' + QueryString(query) : ''
    return ApiService.get(`users/${queryString}`)
  },

  getUser(id) {
    return ApiService.get(`users/${id}/`)
  },

  putUser(id, data) {
    return ApiService.put(`users/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  patchUser(id, data) {
    return ApiService.patch(`users/${id}/`, data)
  },

  getActiveUser() {
    return ApiService.get('user/')
  },

  getRights() {
    return ['No rights', 'Can view', 'Can edit']
  }
}

export default UserService

import ApiService from './api'
import TokenService from './storage'

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
  }
}

export default UserService

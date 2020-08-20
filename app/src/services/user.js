import ApiService from './api'
import TokenService from './storage'

const UserService = {
  login: function(username, password) {
    return ApiService.post('/api-token-auth/', {
      username,
      password
    }).then(response => {
      // console.log(response)

      TokenService.saveToken(response.data.token)
      ApiService.setHeader()

      return response.data.access_token
    })
  },

  logout() {
    TokenService.removeToken()
    ApiService.removeHeader()
  }
}

export default UserService

// export { UserService, AuthenticationError }

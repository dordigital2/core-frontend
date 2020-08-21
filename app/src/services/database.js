import ApiService from './api'

const DatabaseService = {
  get() {
    return ApiService.get('databases/')
  }
}

export default DatabaseService

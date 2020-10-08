import ApiService from './api'
// import { QueryString } from '@/utils/helpers'

class PluginService {
  constructor(plugin) {
    this.plugin = plugin ? plugin + '/' : ''
  }

  getTasks() {
    return ApiService.get(`${this.plugin}tasks/`)
  }

  createTask(data) {
    return ApiService.post(`${this.plugin}tasks/`, data)
  }

  getTask(id) {
    return ApiService.get(`${this.plugin}tasks/${id}/`)
  }
}

export default PluginService

import ApiService from './api'

const DatabaseService = {
  get() {
    return ApiService.get('databases/')
  }
}

const TableService = {
  get(id) {
    const query = 'tables/' + (id != null ? id + '/' : '')
    return ApiService.get(query)
  },

  getEntries(id) {
    return ApiService.get(`tables/${id}/entries/`)
  },

  getEntity(idTable, idEntity) {
    return ApiService.get(`tables/${idTable}/entries/${idEntity}/`)
  }
}

export { DatabaseService, TableService }

import ApiService from './api'
import { QueryString } from '@/utils/helpers'

const DatabaseService = {
  getDatabase() {
    return ApiService.get('databases/')
  }
}

const TableService = {
  getTable(id) {
    const query = 'tables/' + (id != null ? `${id}/` : '')
    return ApiService.get(query)
  },

  deleteTable(id) {
    return ApiService.delete(`tables/${id}/`)
  },

  getEntries(id) {
    return ApiService.get(`tables/${id}/entries/`)
  },

  getEntity(idTable, idEntity) {
    return ApiService.get(`tables/${idTable}/entries/${idEntity}/`)
  },

  getEntityByQuery(idTable, query) {
    return ApiService.get(`tables/${idTable}/entries/?${QueryString(query)}`)
  },

  putEntity(idTable, idEntity, data) {
    return ApiService.put(`tables/${idTable}/entries/${idEntity}/`, data)
  },

  deleteEntity(idTable, idEntity) {
    return ApiService.delete(`tables/${idTable}/entries/${idEntity}/`)
  }
}

export { DatabaseService, TableService }

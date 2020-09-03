import router from '@/router/'
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
    // console.log(id, router)
    const fields = router.currentRoute.query.__fields

    const query = {}
    if (fields != null) query.__fields = fields

    const queryString = query != null ? '?' + QueryString(query) : ''

    return ApiService.get(`tables/${id}/entries/${queryString}`)
  },

  getEntity(idTable, idEntity) {
    return ApiService.get(`tables/${idTable}/entries/${idEntity}/`)
  },

  putEntity(idTable, idEntity, data) {
    return ApiService.put(`tables/${idTable}/entries/${idEntity}/`, data)
  },

  deleteEntity(idTable, idEntity) {
    return ApiService.delete(`tables/${idTable}/entries/${idEntity}/`)
  }
}

export { DatabaseService, TableService }

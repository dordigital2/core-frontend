import ApiService from './api'
import { QueryString } from '@/utils/helpers'

const DatabaseService = {
  getDatabase() {
    return ApiService.get('databases/')
  }
}

const TableService = {
  getTable(idTable) {
    const path = 'tables/' + (idTable != null ? `${idTable}/` : '')
    return ApiService.get(path)
  },
  postTable(data) {
    return ApiService.post(`tables/`, data)
  },
  putTable(idTable, data) {
    return ApiService.put(`tables/${idTable}/`, data)
  },
  deleteTable(idTable) {
    return ApiService.delete(`tables/${idTable}/`)
  },
  exportTable(idTable) {
    return ApiService.get(`tables/${idTable}/csv-export/`)
  },

  getEntries(id, query) {
    const queryString = query != null ? '?' + QueryString(query) : ''
    return ApiService.get(`tables/${id}/entries/${queryString}`)
  },

  getEntity(idTable, idEntity) {
    return ApiService.get(`tables/${idTable}/entries/${idEntity}/`)
  },
  postEntity(idTable, data) {
    // console.log(JSON.stringify(data))
    return ApiService.post(`tables/${idTable}/entries/`, data)
  },
  putEntity(idTable, idEntity, data) {
    return ApiService.put(`tables/${idTable}/entries/${idEntity}/`, data)
  },
  deleteEntity(idTable, idEntity) {
    return ApiService.delete(`tables/${idTable}/entries/${idEntity}/`)
  }
}

const ImportService = {
  getData(idImport) {
    return ApiService.get(`csv-imports/${idImport}/`)
  },

  prepare(data) {
    return ApiService.post(`csv-imports/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  manual(idTable, data) {
    return ApiService.put(`tables/${idTable}/csv-manual-import/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  run(idTable, idImport) {
    return ApiService.post(`tables/${idTable}/csv-import/${idImport}/`, {
      id: idTable,
      csv_import_pk: idImport
    })
  }
}

const TableViewService = {
  getTableViews() {
    return ApiService.get('filters/')
  }
}

export { DatabaseService, TableService, ImportService, TableViewService }

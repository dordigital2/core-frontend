// import router from '@/router/'

const Parser = {
  date: date =>
    date ? new Date(date).toLocaleDateString('ro-RO').replace(/\./g, '/') : '',
  datetime: date =>
    date ? new Date(date).toLocaleString('ro-RO').replace(/\./g, '/') : ''
}

const QueryString = function(params) {
  return Object.keys(params)
    .map(key => key + '=' + params[key])
    .join('&')
}

const FilterQuery = function(filterData) {
  const query = {}

  Object.keys(filterData).forEach(key => {
    let e = filterData[key]

    if (e != null) {
      if (Array.isArray(e) && e.length) {
        query[key] = e.join(',')
      } else if (typeof e == 'object') {
        if (e.type == 'interval') {
          query[`${key}__gte`] = e.values[0]
          query[`${key}__lte`] = e.values[1]
        } else {
          query[`${key}__${e.type}`] = e.values[0]
        }
      } else if (typeof e == 'boolean') {
        query[`${key}`] = e
      } else query[`${key}__icontains`] = e.toString()
    }
  })

  return query
}

export { Parser, QueryString, FilterQuery }

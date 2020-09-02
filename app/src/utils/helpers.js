const Parser = {
  date: date => new Date(date).toLocaleDateString('ro-RO').replace(/\./g, '/'),
  datetime: date => new Date(date).toLocaleString('ro-RO').replace(/\./g, '/')
}

const QueryString = function(params) {
  return Object.keys(params)
    .map(key => key + '=' + params[key])
    .join('&')
}

export { Parser, QueryString }

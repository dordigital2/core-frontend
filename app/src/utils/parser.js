const Parser = {
  date: date => new Date(date).toLocaleDateString('ro-RO'),
  datetime: date => new Date(date).toLocaleString('ro-RO')
}

export default Parser

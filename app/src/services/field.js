import Parser from '@/utils/parser'

const FieldService = {
  getColumns() {},
  getParsedValue(value, type) {
    if (Parser[type] != null) {
      return Parser[type](value)
    }

    return value
  }
}

export default FieldService

import { Parser } from '@/utils/helpers'

const FieldComponentMap = {
  enum: 'VSelect',
  bool: 'b-checkbox',
  date: 'VDate'
}

const FieldService = {
  getColumns() {},
  getParsedValue(value, type) {
    return Parser[type] ? Parser[type](value) : value
  },
  // getWidgetValue()
  getComponent(type) {
    return FieldComponentMap[type] ? FieldComponentMap[type] : 'b-input'
  }
}

export default FieldService

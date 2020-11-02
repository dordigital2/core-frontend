import { Parser } from '@/utils/helpers'
import getNestedObj from 'lodash.get'

const FieldComponentMap = {
  enum: 'VSelect',
  // bool: 'b-checkbox',
  date: 'VDate'
}

const FieldFilterComponentMap = {
  enum: 'FilterTypeEnum',
  // bool: 'b-checkbox',
  date: 'FilterTypeDate',
  int: 'FilterTypeNumeric',
  float: 'FilterTypeNumeric'
}

const FieldTypes = {
  enum: 'Enumeration (Set of predefined values)',
  date: 'Date',
  int: 'Integer (whole number)',
  float: 'Float (decimal number)',
  // bool: 'Yes/No',
  text: 'Text'
}

const FilterOptions = {
  int: {
    gt: 'Greater than',
    gte: 'Greater than or equal',
    lt: 'Lower than',
    lte: 'Lower than or equal',
    exact: 'Equal to',
    interval: 'Interval'
  },
  float: {
    gt: 'Greater than',
    gte: 'Greater than or equal',
    lt: 'Lower than',
    lte: 'Lower than or equal',
    exact: 'Equal to',
    interval: 'Interval'
  },
  date: {
    gt: 'After date',
    gte: 'After date, including',
    lt: 'Before date',
    lte: 'Before date, including',
    exact: 'Exact date',
    interval: 'Date interval'
  }
}

const FieldService = {
  getColumns() {},
  getParsedValue(value, type) {
    return Parser[type] ? Parser[type](value) : value
  },
  getFieldTypes() {
    return FieldTypes
  },
  getComponent(type) {
    return FieldComponentMap[type] ? FieldComponentMap[type] : 'b-input'
  },

  getFilterComponent(type) {
    return FieldFilterComponentMap[type]
      ? FieldFilterComponentMap[type]
      : 'FilterTypeText'
  },

  getSortFunction(field) {
    return (a, b, isAsc) => {
      let x = getNestedObj(a.data, field)
      let y = getNestedObj(b.data, field)

      const order = isAsc ? 1 : -1

      if (x === y) return 0
      else return x > y ? order : -order
    }
  },

  isNumeric(field) {
    return ['int', 'float'].indexOf(field.field_type) != -1
  }
}

export default FieldService

export { FilterOptions }

import { extend, localize, setInteractionMode } from 'vee-validate'

import {
  required,
  email,
  max,
  min,
  length,
  size,
  confirmed,
  image
} from 'vee-validate/dist/rules'

import ro from './locale/ro.json'

const rules = { required, max, min, length, email, size, confirmed, image }

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

extend('under', {
  validate(value, args) {
    console.log('under', value.length, args.length)
    return value.length <= args.length
  },
  params: ['length']
})

extend('over', {
  validate(value, args) {
    console.log('over', value.length, args.length)
    return value.length >= args.length
  },
  params: ['length']
})

localize('ro', ro)
// setInteractionMode('lazy')
setInteractionMode('eager')

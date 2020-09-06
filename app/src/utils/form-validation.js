import { extend, setInteractionMode, localize } from 'vee-validate'

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

import en from './locale/en.json'

const rules = { required, max, min, length, email, size, confirmed, image }

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

extend('under', {
  validate(value, args) {
    return value.length <= args.length
  },
  params: ['length']
})

extend('over', {
  validate(value, args) {
    return value.length >= args.length
  },
  params: ['length']
})

localize('en', en)
// setInteractionMode('lazy')
setInteractionMode('eager')

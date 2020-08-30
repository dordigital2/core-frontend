import Vue from 'vue'
import { ValidationObserver } from 'vee-validate'

Vue.component('ValidationObserver', ValidationObserver)

const requireComponent = require.context('./', false, /V[A-Z]\w+\.(vue)$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')

  // console.log(componentName, componentConfig.default || componentConfig)

  Vue.component(componentName, componentConfig.default || componentConfig)
})

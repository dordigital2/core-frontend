import Vue from 'vue'
import Buefy from './utils/buefy'

import App from './App.vue'
import router from './router'
import store from './store'

import ApiService from './services/api'

import './components/form/'
import './utils/form-validation'

// Styles
import './assets/style/base.scss'

// Vendor init
Vue.use(Buefy)

// Services
ApiService.init('http://dev.api.paul.ro:8000/')
// ApiService.init(process.env.VUE_APP_ROOT_API)
ApiService.setHeader()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

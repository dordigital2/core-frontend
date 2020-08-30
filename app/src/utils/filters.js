import Vue from 'vue'

const parseDate = function(date) {
  return new Date(date).toLocaleDateString('ro-RO')
}

Vue.filter('parseDate', parseDate)

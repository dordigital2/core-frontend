import Vue from 'vue'
import Parser from './parser'

Vue.filter('parseDate', Parser.date)
Vue.filter('parseDatetime', Parser.datetime)
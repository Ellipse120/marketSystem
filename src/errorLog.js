import Vue from 'vue'
import store from './store'

Vue.config.errorHandler = function (error, vm, info) {
  Vue.nextTick(() => {
  })
  console.log(error, info)
}

import Vue from 'vue'
import store from './store'

Vue.config.errorHandler = function (err, vm, info) {
  Vue.nextTick(() => {
    store.dispatch('addErrorLog', {
      err,
      vm,
      info,
      url: window.location.href
    })
  })
}

import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import bloomConfig from './modules/bloomConfig'
import codeConfig from './modules/codeConfig'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    bloomConfig,
    codeConfig
  },
  getters
})

export default store

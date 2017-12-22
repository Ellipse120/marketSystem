import {
  getContractTypes,
  getPriceTypes,
  getBloombergRequestTypes,
  getWarehouses,
  getMarketTypes,
  getQuotationSources,
  getDurations
} from '../../api/enum'

import { Message } from 'element-ui'

const enums = {
  state: {
    marketTypes: [],
    priceTypes: [],
    requestTypes: [],
    bloombergRequestTypes: [],
    quotationSources: []
  },

  getters: {
    marketTypes: state => state.marketTypes,
    priceTypes: state => state.priceTypes,
    requestTypes: state => state.requestTypes,
    bloombergRequestTypes: state => state.bloombergRequestTypes,
    quotationSources: state => state.quotationSources
  },

  mutations: {
    allMarketTypes: (state, data) => {
      state.marketTypes = data
    },
    allPriceTypes: (state, data) => {
      state.priceTypes = data
    },
    allRequestTypes: (state, data) => {
      state.requestTypes = data
    },
    allBloombergRequestTypes: (state, data) => {
      state.bloombergRequestTypes = data
    },
    allQuotationSources: (state, data) => {
      state.quotationSources = data
    }
  },

  actions: {
    getMarketTypes: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getMarketTypes()
          .then(response => {
            commit('allMarketTypes', response.Data)
            resolve()
          })
          .catch(err => {
            Message({
              message: `${err.response.data.Message}`,
              type: 'error',
              duration: 2 * 1000
            })
            reject(err)
          })
      })
    },
    getPriceTypes: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getPriceTypes()
          .then(response => {
            commit('allPriceTypes', response.Data)
            resolve()
          })
          .catch(err => reject(err))
      })
    },
    getAllRequestTypes: ({ commit }) => {
    },
    getAllBloombergRequestTypes: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getBloombergRequestTypes()
          .then(response => {
            commit('allBloombergRequestTypes', response.Data)
            resolve()
          })
          .catch(err => reject(err))
      })
    },
    getAllQuotationSources: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getQuotationSources()
          .then(response => {
            commit('allQuotationSources', response.Data)
            resolve()
          })
          .catch(err => reject(err))
      })
    }
  }
}

export default enums

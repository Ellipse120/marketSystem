import {
  getContractTypes,
  getPriceTypes,
  getBloombergRequestTypes,
  getWarehouses,
  getMarketTypes,
  getQuotationSources,
  getInterestDurations
} from '../../api/enum'

import { Message } from 'element-ui'

const enums = {
  state: {
    marketTypes: [],
    priceTypes: [],
    bloombergRequestTypes: [],
    quotationSources: [],
    warehouses: [],
    contractTypes: [],
    interestDurations: []
  },

  getters: {
    marketTypes: state => state.marketTypes,
    priceTypes: state => state.priceTypes,
    bloombergRequestTypes: state => state.bloombergRequestTypes,
    quotationSources: state => state.quotationSources,
    warehouses: state => state.warehouses,
    contractTypes: state => state.contractTypes,
    interestDurations: state => state.interestDurations
  },

  mutations: {
    allMarketTypes: (state, data) => {
      state.marketTypes = data
    },
    allPriceTypes: (state, data) => {
      state.priceTypes = data
    },
    allBloombergRequestTypes: (state, data) => {
      state.bloombergRequestTypes = data
    },
    allQuotationSources: (state, data) => {
      state.quotationSources = data
    },
    allWarehouses: (state, data) => {
      state.warehouses = data
    },
    allContractTypes: (state, data) => {
      state.contractTypes = data
    },
    allInterestRates: (state, data) => {
      state.interestDurations = data
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
      })
    },
    getAllBloombergRequestTypes: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getBloombergRequestTypes()
          .then(response => {
            commit('allBloombergRequestTypes', response.Data)
            resolve()
          })
      })
    },
    getAllQuotationSources: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getQuotationSources()
          .then(response => {
            commit('allQuotationSources', response.Data)
            resolve()
          })
      })
    },
    getWarehouses: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getWarehouses()
          .then(response => {
            commit('allWarehouses', response.Data)
            resolve()
          })
      })
    },
    getContractTypes: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getContractTypes()
          .then(response => {
            commit('allContractTypes', response.Data)
            resolve()
          })
      })
    },
    getInterestDurations: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getInterestDurations()
          .then(response => {
            commit('allInterestRates', response.Data)
            resolve()
          })
      })
    }
  }
}

export default enums

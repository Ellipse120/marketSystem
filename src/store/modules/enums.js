import {
  getContractTypes,
  getPriceTypes,
  getBloombergRequestTypes,
  getWarehouses,
  getMarketTypes,
  getQuotationSources,
  getDurations
} from '../../api/enum'

const enums = {
  state: {
    marketTypes: [],
    priceTypes: [],
    requestTypes: []
  },

  getters: {
    marketTypes: state => state.marketTypes,
    priceTypes: state => state.priceTypes,
    requestTypes: state => state.requestTypes
  },

  mutations: {
    allMarketTypes: (state, data) => {
      state.marketTypes = data
    },
    allPriceTypes: (state, data) => {
      state.priceTypes = data
    },
    allRequestTypes: (state, { requestTypes }) => {
      state.requestTypes = requestTypes
    }
  },

  actions: {
    getMarketTypes: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getMarketTypes().then(response => {
          commit('allMarketTypes', response.Data)
        })
      })
    },
    getPriceTypes: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getPriceTypes().then(response => {
          commit('allPriceTypes', response.Data)
        })
      })
    },
    getAllRequestTypes: ({ commit }) => {
    }
  }
}

export default enums

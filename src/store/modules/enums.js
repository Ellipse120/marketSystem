import {
  getContractTypes,
  getPriceTypes,
  getBloombergRequestTypes,
  getWarehouses,
  getMarketTypes,
  getQuotationSources,
  getInterestDurations,
  getMDBCodes
} from '../../api/enum'

const enums = {
  state: {
    marketTypes: [],
    priceTypes: [],
    bloombergRequestTypes: [],
    quotationSources: [],
    warehouses: [],
    contractTypes: [],
    interestDurations: [],
    allMDBCodes: []
  },

  getters: {
    marketTypes: state => state.marketTypes,
    priceTypes: state => state.priceTypes,
    bloombergRequestTypes: state => state.bloombergRequestTypes,
    quotationSources: state => state.quotationSources,
    warehouses: state => state.warehouses,
    contractTypes: state => state.contractTypes,
    interestDurations: state => state.interestDurations,
    mDBCodes: state => state.allMDBCodes
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
    },
    allMDBCodes: (state, data) => {
      state.allMDBCodes = data
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
    },
    getMDBCodes: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getMDBCodes()
          .then(response => {
            commit('allMDBCodes', response.Data)
          })
      })
    }
  }
}

export default enums

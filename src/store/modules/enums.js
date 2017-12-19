const enums = {
  state: {
    marketTypes: [],
    requestTypes: []
  },

  getters: {
    marketTypes: state => state.marketTypes,
    requestTypes: state => state.requestTypes
  },

  mutations: {
    allMarketTypes: (state, { marketTypes }) => {
      state.marketTypes = marketTypes
    },
    allRequestTypes: (state, { requestTypes }) => {
      state.requestTypes = requestTypes
    }
  },

  actions: {
    getMarketTypes: ({ commit }) => {
    },
    getAllRequestTypes: ({ commit }) => {
    }
  }
}

export default enums

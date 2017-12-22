import {
  getAllMDBCodeConfigs,
  getAllFutureContracts,
  getAllForexes,
  addFutureCode,
  addForexCode,
  addInterestRateCode,
  getAllInterestRates,
  deleteFutureCode,
  updateFutureCode
} from '../../api/code-config'

const codeConfig = {
  state: {
    // isShowDialog: false,
    MDBCodeConfigList: [],
    codeConfigItem: {},
    futureContracts: {},
    forexes: {},
    interestRates: {}
  },

  getters: {
    // isShow: state => state.isShowDialog,
    allMDBCodeConfigs: state => state.MDBCodeConfigList,
    codeConfigItem: state => state.codeConfigItem,
    futureContracts: state => state.futureContracts,
    forexes: state => state.forexes,
    interestRates: state => state.interestRates
  },

  mutations: {
    resetCodeConfigItem: (state) => {
      state.codeConfigItem = {
        Code: '',
        DisplayName: '',
        Id: '',
        MarketType: '',
        ObjectId: '',
        FutureContractId: '',
        ForexId: '',
        InterestRateId: ''
      }
    },
    GET_ITEM_BY_ID: (state, val) => {
      state.codeConfigItem = state.MDBCodeConfigList.List.find(p => p.Id === val)
    },
    allMDBCodeConfigs: (state, data) => {
      state.MDBCodeConfigList = data
    },
    allFutureContracts: (state, data) => {
      state.futureContracts = data
    },
    allForexes: (state, data) => {
      state.forexes = data
    },
    allInterestRates: (state, data) => {
      state.interestRates = data
    }
  },

  actions: {
    allMDBCodeConfigs ({ commit }, query) {
      return new Promise((resolve, reject) => {
        getAllMDBCodeConfigs(query)
          .then(response => {
            commit('allMDBCodeConfigs', response.Data)
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    allFutureContracts ({ commit }) {
      return new Promise((resolve, reject) => {
        getAllFutureContracts()
          .then(response => {
            commit('allFutureContracts', response.Data)
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    allForexes ({ commit }) {
      return new Promise((resolve, reject) => {
        getAllForexes()
          .then(response => {
            commit('allForexes', response.Data)
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    allInterestRates ({ commit }) {
      return new Promise((resolve, reject) => {
        getAllInterestRates()
          .then(response => {
            commit('allInterestRates', response.Data)
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    addFutureCode ({ commit }, data) {
      return new Promise((resolve, reject) => {
        addFutureCode(data)
          .then(response => {
            console.log(response)
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    addForexCode ({ commit }, data) {
      return new Promise((resolve, reject) => {
        addForexCode(data)
          .then(response => {
            console.log(response)
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    addInterestRateCode ({ commit }, data) {
      return new Promise((resolve, reject) => {
        addInterestRateCode(data)
          .then(response => {
            console.log(response)
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    updateFutureCode ({ commit }, data) {
      return new Promise((resolve, reject) => {
        updateFutureCode(data)
          .then(response => {
            console.log(response)
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    deleteFutureCode ({ commit }, data) {
      return new Promise((resolve, reject) => {
        deleteFutureCode(data)
          .then(response => {
            resolve()
          })
          .catch(err => reject(err))
      })
    }
  }
}

export default codeConfig

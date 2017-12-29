import {
  getAllMDBCodeConfigs,
  getAllFutureContracts,
  getAllForexes,
  addFutureCode,
  addForexCode,
  addInterestRateCode,
  getAllInterestRates,
  deleteFutureCode,
  updateFutureCode,
  doPreviewMDBFutureCode,
  doImportMDBFutureCode,
  doPreviewMDBForexCode,
  doImportMDBForexCode,
  doPreviewMDBInterestRateCode,
  doImportMDBInterestRateCode
} from '../../api/code-config'

const codeConfig = {
  state: {
    MDBCodeConfigList: [],
    codeConfigItem: {},
    futureContracts: {},
    forexes: {},
    interestRates: {}
  },

  getters: {
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
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    addForexCode ({ commit }, data) {
      return new Promise((resolve, reject) => {
        addForexCode(data)
          .then(response => {
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    addInterestRateCode ({ commit }, data) {
      return new Promise((resolve, reject) => {
        addInterestRateCode(data)
          .then(response => {
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    updateFutureCode ({ commit }, data) {
      return new Promise((resolve, reject) => {
        updateFutureCode(data)
          .then(response => {
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
    },

    doPreviewMDBFutureCode ({ commit }, data) {
      return new Promise((resolve, reject) => {
        doPreviewMDBFutureCode(data)
          .then(response => {
            resolve(response)
          })
          .catch(err => reject(err))
      })
    },

    doImportMDBFutureCode ({ commit }, data) {
      return new Promise((resolve, reject) => {
        doImportMDBFutureCode(data)
          .then(response => {
            resolve(response)
          })
          .catch(err => reject(err))
      })
    },

    doPreviewMDBForexCode ({ commit }, data) {
      return new Promise((resolve, reject) => {
        doPreviewMDBForexCode(data)
          .then(response => {
            resolve(response)
          })
          .catch(err => reject(err))
      })
    },

    doImportMDBForexCode ({ commit }, data) {
      return new Promise((resolve, reject) => {
        doImportMDBForexCode(data)
          .then(response => {
            resolve(response)
          })
          .catch(err => reject(err))
      })
    },

    doPreviewMDBInterestRateCode ({ commit }, data) {
      return new Promise((resolve, reject) => {
        doPreviewMDBInterestRateCode(data)
          .then(response => {
            resolve(response)
          })
          .catch(err => reject(err))
      })
    },

    doImportMDBInterestRateCode ({ commit }, data) {
      return new Promise((resolve, reject) => {
        doImportMDBInterestRateCode(data)
          .then(response => {
            resolve(response)
          })
          .catch(err => reject(err))
      })
    }
  }

}

export default codeConfig

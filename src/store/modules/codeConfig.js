import {
  getAllMDBCodeConfigs,
  getAllFutureContracts,
  addFutureCode,
  deleteFutureCode,
  updateFutureCode
} from '../../api/code-config'

const codeConfig = {
  state: {
    isShowDialog: false,
    all: [ // FIXME 测试数据,以后删除
      {
        Code: '1',
        DisplayName: '1',
        Id: '1',
        MarketType: '1',
        ObjectId: '1',
        FutureContractId: '1'
      },
      {
        Code: '2',
        DisplayName: '1',
        Id: '1',
        MarketType: '1',
        ObjectId: '1',
        FutureContractId: '1'
      }
    ],
    MDBCodeConfigList: [],
    codeConfigItem: {},
    futureContracts: {}
  },

  getters: {
    isShow: state => state.isShowDialog,
    allCodeConfigs: state => state.all,
    allMDBCodeConfigs: state => state.MDBCodeConfigList,
    codeConfigItem: state => state.codeConfigItem,
    futureContracts: state => state.futureContracts
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
        InterestRateId: '',
        ForexId: ''
      }
    },
    GET_BY_CODEID: (state, val) => {
      state.codeConfigItem = state.MDBCodeConfigList.List.find(p => p.Code === val)
    },
    allMDBCodeConfigs: (state, data) => {
      state.MDBCodeConfigList = data
    },
    allFutureContracts: (state, data) => {
      state.futureContracts = data
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

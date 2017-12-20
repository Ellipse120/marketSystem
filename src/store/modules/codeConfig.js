import { getAllFutureContracts } from '../../api/code-config'

const codeConfig = {
  state: {
    isShowDialog: false,
    all: [
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
    codeConfigItem: {},
    futureContracts: {}
  },

  getters: {
    isShow: state => state.isShowDialog,
    allCodeConfigs: state => state.all,
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
      state.codeConfigItem = state.all.find(p => p.Code === val)
    },
    allFutureContracts: (state, data) => {
      state.futureContracts = data
    }
  },

  actions: {
    allFutureContracts ({ commit }) {
      return new Promise((resolve, reject) => {
        getAllFutureContracts()
          .then(response => {
            commit('allFutureContracts', response.Data)
            resolve()
          })
          .catch(err => reject(err))
      })
    }
  }
}

export default codeConfig

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
    codeConfigItem: {}
  },

  getters: {
    isShow: state => state.isShowDialog,
    allCodeConfigs: state => state.all,
    codeConfigItem: state => state.codeConfigItem
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
    }
  },

  actions: {
    getAllCodeConfigs () {}
  }
}

export default codeConfig

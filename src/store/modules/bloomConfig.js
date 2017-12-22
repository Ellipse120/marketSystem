import {
  getAllMDBBloombergConfigs,
  addBloombergConfig,
  updateBloombergConfig,
  deleteBloombergConfig
} from '../../api/bloomberg-config'

const bloomConfig = {
  state: {
    isShowDialog: false,
    all: [
      {
        CodeConfigId: '3',
        PriceType: '结算价',
        BloombergCode: 'CU3 Comdty',
        RequestType: '历史日内行情_含时间段',
        BloombergDataType: 'open',
        RequestStartTime: new Date().toLocaleString(),
        RequestEndTime: new Date().toLocaleString(),
        CreationTime: new Date().toLocaleString(),
        LastUpdateTime: new Date().toLocaleString()
      },
      {
        CodeConfigId: '2',
        PriceType: '时点价',
        BloombergCode: 'SHGFMAUT Index',
        RequestType: '历史日内行情_含时间段',
        BloombergDataType: 'open',
        RequestStartTime: new Date().toLocaleString(),
        RequestEndTime: new Date().toLocaleString(),
        CreationTime: new Date().toLocaleString(),
        LastUpdateTime: new Date().toLocaleString()
      },
      {
        CodeConfigId: '2',
        PriceType: '时点价',
        BloombergCode: 'SHGFMAUT Index',
        RequestType: '历史日内行情_含时间段',
        BloombergDataType: 'close',
        RequestStartTime: new Date().toLocaleString(),
        RequestEndTime: new Date().toLocaleString(),
        CreationTime: new Date().toLocaleString(),
        LastUpdateTime: new Date().toLocaleString()
      },
      {
        CodeConfigId: '1',
        PriceType: '结算价',
        BloombergCode: 'HG{0} Comdty',
        RequestType: '历史日内行情_含时间段',
        BloombergDataType: 'close',
        RequestStartTime: new Date().toLocaleString(),
        RequestEndTime: new Date().toLocaleString(),
        CreationTime: new Date().toLocaleString(),
        LastUpdateTime: new Date().toLocaleString()
      }
    ],
    bloomConfig2: {},
    MDBBloombergConfigList: [],
    bloombergConfigItem: {}
  },

  getters: {
    allBloomConfigs: state => state.all,
    bloomConfig2: state => state.bloomConfig2,
    allMDBBloombergConfigList: state => state.MDBBloombergConfigList,
    bloombergConfigItem: state => state.bloombergConfigItem
  },

  mutations: {
    resetBloomConfigRow: (state) => {
      state.bloombergConfigItem = {
        CodeConfigId: '',
        PriceType: '',
        BloombergCode: '',
        RequestType: '',
        BloombergDataType: '',
        Warehouse: '',
        RequestStartTime: '',
        RequestEndTime: '',
        CreationTime: '',
        LastUpdateTime: '',
        ExpirationDate: ''
      }
    },
    allMDBBloombergConfigList: (state, data) => {
      state.MDBBloombergConfigList = data
    },
    CHANGE_DIALOG: (state, val) => {
      state.isShowDialog = val.val
    },
    GET_BY_ID: (state, val) => {
      state.bloombergConfigItem = state.MDBBloombergConfigList.List.find(p => p.Id === val)
    }
  },

  actions: {
    allMDBBloombergConfigList ({ commit }, query) {
      return new Promise((resolve, reject) => {
        getAllMDBBloombergConfigs(query)
          .then(response => {
            commit('allMDBBloombergConfigList', response.Data)
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    CHANGE_DIALOG_ASYNC: ({ commit }, val) => {
      commit('CHANGE_DIALOG', val)
    },

    addBloombergConfig ({ commit }, data) {
      return new Promise((resolve, reject) => {
        addBloombergConfig(data)
          .then(response => {
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    updateBloombergConfig ({ commit }, data) {
      return new Promise((resolve, reject) => {
        updateBloombergConfig(data)
          .then(response => {
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    deleteBloombergConfig ({ commit }, data) {
      return new Promise((resolve, reject) => {
        deleteBloombergConfig(data)
          .then(response => {
            resolve()
          })
          .catch(err => reject(err))
      })
    }
  }
}

export default bloomConfig

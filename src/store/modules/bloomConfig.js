import {
  getAllMDBBloombergConfigs,
  addBloombergConfig,
  updateBloombergConfig,
  deleteBloombergConfig
} from '../../api/bloomberg-config'

const bloomConfig = {
  state: {
    isShowDialog: false,
    MDBBloombergConfigList: [],
    bloombergConfigItem: {}
  },

  getters: {
    allMDBBloombergConfigList: state => state.MDBBloombergConfigList,
    bloombergConfigItem: state => state.bloombergConfigItem
  },

  mutations: {
    resetBloomConfigRow: (state) => {
      state.bloombergConfigItem = {
        MDBCodeId: '',
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
    },
    CONFIG_BLOOMBERG: (state, val) => {
      state.bloombergConfigItem.MDBCodeId = val
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

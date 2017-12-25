import { getAllMDBData, addMDBData, deleteMDBData, updateMDBData } from '../../api/market-data'

const marketData = {
  state: {
    mDBDataList: [],
    mDBDataItem: {}
  },

  getters: {
    allMDBDataList: state => state.mDBDataList,
    mDBDataItem: state => state.mDBDataItem
  },

  mutations: {
    resetMDBDataItem: (state) => {
      state.mDBDataItem = {
        'MDBCodeId': '',
        'TradeDate': '',
        'PriceType': '',
        'PriceValue': '',
        'Source': '',
        'MarketType': ''
      }
    },
    allMDBDataList: (state, data) => {
      state.mDBDataList = data
    },
    GET_MDBDATA_BY_ID: (state, val) => {
      state.mDBDataItem = state.mDBDataList.List.find(p => p.Id === val)
    }
  },

  actions: {
    allMDBDataList ({ commit }, query) {
      return new Promise((resolve, reject) => {
        getAllMDBData(query)
          .then(response => {
            commit('allMDBDataList', response.Data)
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    addMDBData ({ commit }, data) {
      return new Promise((resolve, reject) => {
        addMDBData(data)
          .then(response => {
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    updateMDBData ({ commit }, data) {
      return new Promise((resolve, reject) => {
        updateMDBData(data)
          .then(response => {
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    deleteMDBData ({ commit }, data) {
      return new Promise((resolve, reject) => {
        deleteMDBData(data)
          .then(response => {
            resolve()
          })
          .catch(err => reject(err))
      })
    }
  }
}

export default marketData

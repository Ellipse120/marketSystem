import {
  getAllMDBData,
  addMDBData,
  deleteMDBData,
  updateMDBData,
  doPreviewMDBData,
  doImportMDBData
} from '../../api/market-data'
import { getToken, setRefreshState } from '@/utils/auth'
import { Message, Notification } from 'element-ui'

const wsURI = 'ws://192.168.125.63:12344?token=' + getToken()

const marketData = {
  state: {
    mDBDataList: [],
    mDBDataItem: {},
    ws: {}
  },

  getters: {
    allMDBDataList: state => state.mDBDataList,
    mDBDataItem: state => state.mDBDataItem,
    ws: state => state.ws
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
    },
    REFRESH_BLOOMBERG: (state, val) => {
      state.ws = val
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
    },

    doPreviewMDBData ({ commit }, data) {
      return new Promise((resolve, reject) => {
        doPreviewMDBData(data)
          .then(response => {
            resolve(response)
          })
          .catch(err => reject(err))
      })
    },

    doImportMDBData ({ commit }, data) {
      return new Promise((resolve, reject) => {
        doImportMDBData(data)
          .then(response => {
            resolve(response)
          })
          .catch(err => reject(err))
      })
    },

    REFRESH_BLOOMBERG: ({ commit, state, dispatch }, val) => {
      commit('REFRESH_BLOOMBERG', new WebSocket(wsURI))
      state.ws.addEventListener('open', function (event) {
        state.ws.send(`user connected.`)
        Message.success('连接成功，彭博刷新成功后通知您')
      })

      state.ws.addEventListener('message', function (event) {
        setRefreshState('false')
        Notification.success({
          title: '彭博行情刷新成功',
          dangerouslyUseHTMLString: true,
          duration: 6000,
          message: `<div>${JSON.parse(event.data).Message}, <a style="cursor: pointer;color: #409EFF">点我查看</a></div>`,
          position: 'bottom-right',
          onClick: function () {
            if (!val.router.currentRoute.path.includes('marketData')) {
              val.router.push('/marketData/index')
            } else {
              dispatch('allMDBDataList', {
                CurrentPage: 1,
                PageSize: 10,
                mDBCode: '',
                TradeDate: '',
                priceType: '',
                PriceValue: '',
                source: '',
                marketType: ''
              })
            }
            if (state.ws.readyState === WebSocket.OPEN) {
              state.ws.close()
            }
          }
        })
      })

      state.ws.addEventListener('close', function (event) {
        if (event.code !== 1000) {
          console.log(event.code + ' ：error code')
          commit('REFRESH_BLOOMBERG', new WebSocket(wsURI))
          if (!navigator.onLine) {
            Message.warning('网络出问题了。。。')
          }
        }
      })

      state.ws.addEventListener('error', function (event) {
        Message.error(event.data)
      })
    }
  }
}

export default marketData

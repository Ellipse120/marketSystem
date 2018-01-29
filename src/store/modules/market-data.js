import {
  getAllMDBData,
  addMDBData,
  deleteMDBData,
  updateMDBData,
  doPreviewMDBData,
  doImportMDBData
} from '../../api/market-data'
import { getToken } from '@/utils/auth'
import { Message, Notification } from 'element-ui'

const wsURI = 'ws://http://10.5.0.33:23386?token=' + getToken()

const marketData = {
  state: {
    mDBDataList: [],
    mDBDataItem: {},
    ws: getToken() ? new WebSocket(wsURI) : {}
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

    REFRESH_BLOOMBERG: ({ commit, state, dispatch, rootState }, val) => {
      // commit('REFRESH_BLOOMBERG', new WebSocket(wsURI))
      if (state.ws.readyState) {
        state.ws.addEventListener('open', function (event) {
          state.ws.send(`user connected.`)
          // Message.success('连接成功，可以刷新彭博行情')
        })

        state.ws.addEventListener('message', function (event) {
          console.log(event.data)
          Notification.success({
            title: '彭博行情刷新成功',
            dangerouslyUseHTMLString: true,
            duration: 0,
            message: `<div>${JSON.parse(event.data).Message}, <a style="cursor: pointer;color: #409EFF"><p>点我查看</p></a></div>`,
            position: 'bottom-right',
            onClick: function () {
              const a = rootState.app.appRouter
              if (!a.currentRoute.path.includes('marketData')) {
                a.push('/marketData/index')
                this.close()
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
                }).then(() => {
                  this.close()
                })
              }
              // if (state.ws.readyState === WebSocket.OPEN) {
              //   state.ws.close()
              // }
            }
          })
        })

        state.ws.addEventListener('close', function (event) {
          if (event.code !== 1000 && event.code !== 1006) {
            // console.log(event.code + ' ：error code')
            commit('REFRESH_BLOOMBERG', new WebSocket(wsURI))
            dispatch('REFRESH_BLOOMBERG', { 'router': rootState.app.appRouter })
            if (!navigator.onLine) {
              Message.warning('网络出问题了。。。')
            }
          }
          if (!event.wasClean) {
            Message.error('socket 连接出错了。。。')
          }
        })

        state.ws.addEventListener('error', function (event) {
          // Message.error('后台出错。。。')
          console.log(event)
        })
      }
    }
  }
}

export default marketData

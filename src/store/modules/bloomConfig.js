import {
  getAllMDBBloombergConfigs,
  addBloombergConfig,
  updateBloombergConfig,
  deleteBloombergConfig,
  doPreviewMDBBloomberg,
  doImportMDBBloomberg
} from '../../api/bloomberg-config'

import { getToken, setRefreshState } from '@/utils/auth'
import { Message, MessageBox, Notification } from 'element-ui'

const wsURI = 'ws://192.168.125.63:12344?token=' + getToken()

const bloomConfig = {
  state: {
    isShowDialog: false,
    MDBBloombergConfigList: [],
    bloombergConfigItem: {},
    ws: {}
  },

  getters: {
    allMDBBloombergConfigList: state => state.MDBBloombergConfigList,
    bloombergConfigItem: state => state.bloombergConfigItem,
    ws: state => state.ws
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
    },
    REFRESH_BLOOMBERG: (state, val) => {
      state.ws = val
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
    },

    doPreviewMDBBloomberg ({ commit }, data) {
      return new Promise((resolve, reject) => {
        doPreviewMDBBloomberg(data)
          .then(response => {
            resolve(response)
          })
          .catch(err => reject(err))
      })
    },

    doImportMDBBloomberg ({ commit }, data) {
      return new Promise((resolve, reject) => {
        doImportMDBBloomberg(data)
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
        MessageBox.confirm(`${JSON.parse(event.data).Message}`, '彭博行情刷新成功提醒', {
          confirmButtonText: '查看',
          cancelButtonText: '稍后',
          center: true
        }).then(() => {
          val.router.push('/marketData/index')
          if (!val.router.currentRoute.path.includes('marketData')) {
            Message.success('跳转成功!')
          } else {
            dispatch('allMDBBloombergConfigList', {}).then(() => {
              if (state.ws.readyState === WebSocket.OPEN) {
                state.ws.close()
              }
            })
          }
        }).catch(() => {
          Message.success('取消查看')
        })
        Notification.success(`<div style="color: red;">${JSON.parse(event.data).Message}</div>`)
      })

      state.ws.addEventListener('close', function (event) {
        if (event.code !== 1000) {
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

export default bloomConfig

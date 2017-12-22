import { getAllMDBBloombergConfigs, addBloombergConfig, updateBloombergConfig } from '../../api/bloomberg-config'

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
    bloomConfig2: {}
  },

  getters: {
    allBloomConfigs: state => state.all,
    bloomConfig2: state => state.bloomConfig2
  },

  mutations: {
    resetBloomConfigRow: (state) => {
      state.bloomConfig2 = {
        CodeConfigId: '',
        PriceType: '',
        BloombergCode: '',
        RequestType: '',
        BloombergDataType: '',
        RequestStartTime: '',
        RequestEndTime: '',
        CreationTime: '',
        LastUpdateTime: ''
      }
    },
    CHANGE_DIALOG: (state, val) => {
      state.isShowDialog = val.val
    },
    GET_BY_ID: (state, val) => {
      state.bloomConfig2 = state.all.find(p => p.CodeConfigId === val)
    }
  },

  actions: {
    CHANGE_DIALOG_ASYNC: ({ commit }, val) => {
      commit('CHANGE_DIALOG', val)
    },
    getAllBloomConfigs () {
    }
  }
}

export default bloomConfig

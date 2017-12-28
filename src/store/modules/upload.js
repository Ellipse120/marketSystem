const upload = {
  state: {
    stepActive: 0,
    finishStatus: 'wait',
    isPreviewCheck: false
  },

  getters: {
    stepActive: state => state.stepActive,
    finishStatus: state => state.finishStatus,
    isPreviewCheck: state => state.isPreviewCheck
  },

  mutations: {
    resetUpload: (state) => {
      state.stepActive = 0
      state.finishStatus = 'wait'
      state.isPreviewCheck = false
    },
    changeStepActive: (state, data) => {
      state.stepActive = data
    },
    changeFinishStatus: (state, data) => {
      state.finishStatus = data
    },
    changeIsPreviewCheck: (state, data) => {
      state.isPreviewCheck = data
    }
  },

  actions: {}
}

export default upload

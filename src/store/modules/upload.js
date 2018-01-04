const upload = {
  state: {
    stepActive: 0,
    finishStatus: 'wait',
    isPreviewCheck: false,
    templateFileId: 0
  },

  getters: {
    stepActive: state => state.stepActive,
    finishStatus: state => state.finishStatus,
    isPreviewCheck: state => state.isPreviewCheck,
    templateFileId: state => state.templateFileId
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
    },
    changeTemplateFileId: (state, data) => {
      state.templateFileId = data
    }
  },

  actions: {}
}

export default upload

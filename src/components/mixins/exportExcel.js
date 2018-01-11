/**
 * 定义 mixins 片段
 * */
export const exportExcel = {
  data () {
  },
  methods: {
    doExportExcelData (data) {
      const link = document.createElement('a')
      link.href = `http://192.168.125.63:12345/api/File/DownLoad/${data}`
      link.click()
    }
  }
}

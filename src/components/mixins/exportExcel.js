/**
 * 定义 mixins 片段
 * */
export const exportExcel = {
  data () {
  },
  methods: {
    doExportExcelData (data) {
      const link = document.createElement('a')
      link.href = `http://10.5.0.33:23386/api/File/DownLoad/${data}`
      link.click()
    }
  }
}

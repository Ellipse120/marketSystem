/**
 * 定义 mixins 片段
 * */
export const exportExcel = {
  data () {
  },
  methods: {
    doExportExcelData (data) {
      const link = document.createElement('a')
      link.href = `${process.env.BASE_API}/File/DownLoad/${data}`
      link.click()
    }
  }
}

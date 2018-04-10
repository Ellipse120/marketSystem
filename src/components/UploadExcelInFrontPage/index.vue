<template>
  <div style="display: inline-block;">
    <input id="excel-upload-input" ref="excelUploadInput" type="file" accept=".xlsx, .xls" style="display: none;" @change="handleFileChange">
    <el-button type="ghost" icon="el-icon-upload" @click="handleUpload">导入Excel</el-button>
  </div>
</template>

<script>
  import XLSX from 'xlsx'

  export default {
    name: '',
    data () {
      return {
        loading: false,
        excelData: {
          headers: null,
          results: null
        }
      }
    },
    methods: {
      handleUpload () {
        this.$refs.excelUploadInput.click()
      },

      generateData ({ headers, results }) {
        this.excelData.headers = headers
        this.excelData.results = results
        this.$emit('on-selected-file', this.excelData)
      },

      handleFileChange (e) {
        const files = e.target.files
        const itemFile = files[0] // only use files[0]
        if (!itemFile) return
        this.readDataFromExcel(itemFile)
        this.$refs['excelUploadInput'].value = null // fixed can't select the same excel
      },

      readDataFromExcel (itemFile) {
        const reader = new FileReader()
        reader.onload = ev => {
          const data = ev.target.result
          const fixedData = this.fixData(data)
          const workBook = XLSX.read(btoa(fixedData), { type: 'base64' })
          const firstSheetName = workBook.SheetNames[0]
          const workSheet = workBook.Sheets[firstSheetName]
          const headers = this.getHeaderRow(workSheet)
          const results = XLSX.utils.sheet_to_json(workSheet)
          this.generateData({ headers, results })
        }
        reader.readAsArrayBuffer(itemFile)
      },

      fixData (data) {
        let o = ''
        const w = 10240
        for (let l = 0; l < data.byteLength / w; ++l) {
          o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        }
        return o
      },

      getHeaderRow (sheet) {
        const headers = []
        const range = XLSX.utils.decode_range(sheet['!ref'])
        const R = range.s.r /* start in the first row */
        for (let C = range.s.c; C <= range.e.c; ++C) { /* iterator every column in the range */
          const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
          let header = 'UNKNOWN' + C // <-- replace with your desired default
          if (cell && cell.t) {
            header = XLSX.utils.format_cell(cell)
            headers.push(header)
          }
        }

        return headers
      }
    }
  }
</script>

<style scoped>

</style>

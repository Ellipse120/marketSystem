<template>
  <div>
    <el-steps :active="stepActive" :finish-status="finishStatus" align-center>
      <el-step title="上传Excel"></el-step>
      <el-step title="校验结果"></el-step>
      <el-step title="完成导入"></el-step>
    </el-steps>
    <div style="margin: 20px 0;">
      <transition name="el-zoom-in-center">
        <el-upload v-if="stepActive === 0"
                   class="upload-demo"
                   drag
                   :action="uploadURI"
                   :headers="headers"
                   :on-success="success"
                   :on-error="fail"
                   :on-progress="progress">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传Excel文件</div>
        </el-upload>
        <div v-if="stepActive === 1">
          <div v-if="!isAllowImport">
            <el-row :gutter="10">
              <el-col :span="10">
                <el-select
                  v-model="xlsSheet"
                  :disabled="isPreviewCheck">
                  <el-option
                    v-for="item in xlsSheets"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5">
                <el-button
                  type="primary"
                  :loading="isPreviewCheck"
                  @click="handlePreview">
                  校验
                </el-button>
              </el-col>
              <el-col :span="4">
                <el-button
                  type="primary"
                  :disabled="isPreviewCheck"
                  @click="handleViewDetail">预览详情
                </el-button>
              </el-col>
            </el-row>
          </div>
          <div v-if="stepActive === 1">
            <el-table
              :data="errorTableData"
              v-loading="isPreviewCheck"
              element-loading-text="拼命加载中。。。"
              max-height="400"
              border>
              <el-table-column
                prop="row"
                label="Excel行号"
                align="center">
              </el-table-column>
              <el-table-column
                prop="message"
                label="错误信息"
                align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div v-if="stepActive === 2" style="text-align: center;">
          <el-button @click="handleImportExcel">导入</el-button>
        </div>
        <div v-if="stepActive === 3 && isImportSuccess">
          <p style="text-align: center;">
            done!
          </p>
        </div>
      </transition>
    </div>

    <!-- detail dialog -->
    <el-dialog
      title="查看详情"
      :visible="isDetailDialogVisible"
      width="600"
      :append-to-body="true"
      :modal-append-to-body="false"
      :before-close="handleClose"
      top="10vh">
      <el-table
        :data="detailData"
        border
        max-height="600">
        <!--<el-table-column v-for="item of detailTableHeaders.slice(0,1)"-->
        <!--fixed="left"-->
        <!--:label="item"-->
        <!--:key="item"-->
        <!--:prop="item">-->
        <!--</el-table-column>-->
        <!--<el-table-column v-for="item of detailTableHeaders.slice(1)"-->
        <!--:label="item"-->
        <!--:key="item"-->
        <!--:prop="item">-->
        <!--</el-table-column>-->
        <el-table-column v-for="item of detailTableHeaders"
                         :label="item"
                         :key="item"
                         :prop="item">
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getToken } from '../../utils/auth'

  export default {
    name: 'uploadExcel',
    props: {
      previewData: {
        default: {},
        required: false
      },
      isImportSuccess: {
        type: Boolean,
        required: false
      }
    },
    created () {
      this.$store.commit('resetUpload')
      this.errorTableData = []
    },
    mounted () {
      // this.previewData.ResultDatas = {}
    },
    data () {
      return {
        headers: {
          'token': getToken()
        },
        uploadURI: 'http://192.168.125.63:12345/api/File/Upload',
        uploadRecordId: '',
        xlsSheets: [],
        xlsSheet: '',
        isDetailDialogVisible: false
      }
    },
    computed: {
      ...mapGetters([
        'stepActive',
        'finishStatus',
        'isPreviewCheck'
      ]),
      isAllowImport: function () {
        if (this.previewData !== null) {
          return this.previewData.ImportAllowed
        }
      },
      detailData: {
        get: function () {
          if (this.previewData !== null) {
            return this.previewData.ResultDatas
          }
        }
      },
      errorTableData: {
        get: function () {
          if (this.previewData !== null) {
            const temp = []
            const errMessages = this.previewData.ErrorRowMessages
            if (errMessages !== undefined) {
              Object.keys(errMessages).map(k => temp.push({ row: k, message: errMessages[k] }))
            }
            return temp
          }
        },
        set: function (v) {
          return v
        }
      },
      detailTableHeaders: function () {
        if (this.previewData.ResultDatas !== undefined || null) {
          return Object.keys(this.previewData.ResultDatas[0])
        } else {
          return []
        }
      }
    },
    watch: {
      isImportSuccess: function (pre, old) {
      }
    },
    methods: {
      success: function (response, file, fileList) {
        this.uploadRecordId = response.Data.UploadRecordId
        this.xlsSheets = response.Data.Sheets
        this.xlsSheet = this.xlsSheets[0]
        this.$store.commit('changeStepActive', 1)
        this.$store.commit('changeFinishStatus', 'success')
        this.$message({
          showClose: true,
          message: '上传成功！',
          type: 'success'
        })
      },

      fail: function (e) {
        this.$store.commit('changeStepActive', 0)
        this.$store.commit('changeFinishStatus', 'error')
        this.$message({
          showClose: true,
          message: '上传失败了。。。请稍后重试',
          type: 'error'
        })
      },

      progress: function (e, file, fileList) {
        console.log(e.percent)
      },

      handlePreview: function () {
        this.$store.commit('changeIsPreviewCheck', true)
        this.$emit('do-preview', { id: this.uploadRecordId, sheetName: this.xlsSheet })
      },

      handleImportExcel: function () {
        this.$emit('do-import', { id: this.uploadRecordId, sheetName: this.xlsSheet })
      },

      handleViewDetail: function () {
        this.isDetailDialogVisible = true
      },

      handleClose: function () {
        this.isDetailDialogVisible = false
      }
    }
  }
</script>

<style scoped>

</style>

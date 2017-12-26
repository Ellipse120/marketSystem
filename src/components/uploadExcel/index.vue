<template>
  <div>
    <el-steps :active="stepActive" :finish-status="finishStatus" align-center>
      <el-step title="上传Excel"></el-step>
      <el-step title="校验结果"></el-step>
      <el-step title="完成导入"></el-step>
    </el-steps>
    <div style="margin-top: 20px;">
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
          ' uploadRecordId ':{{uploadRecordId}} {{this.xlsSheets}}
          <div>
            <el-row :gutter="10">
              <el-col :span="10">
                <el-select v-model="previewTarget">
                  <el-option
                    v-for="item in xlsSheets"
                    :key="item" :label="item" :value="item"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" @click="handlePreview">预览</el-button>
              </el-col>
            </el-row>
          </div>
          <div>
            show error messages
            <!-- main -->
          </div>
        </div>
        <div v-if="stepActive === 2">2</div>
      </transition>
    </div>
  </div>
</template>

<script>
  import { getToken } from '../../utils/auth'

  export default {
    name: 'uploadExcel',
    props: {
      uploadURI: {
        required: true
      }
    },
    created () {
    },
    data () {
      return {
        headers: {
          'token': getToken()
        },
        previewTarget: '',
        stepActive: 0,
        finishStatus: 'wait',
        uploadRecordId: '',
        xlsSheets: [1, 2, 3]
      }
    },
    methods: {
      success: function (response, file, fileList) {
        console.log(response.Data.UploadRecordId)
        this.uploadRecordId = response.Data.UploadRecordId
        this.xlsSheets = response.Data.Sheets
        this.stepActive = 1
        this.finishStatus = 'success'
        this.$message({
          showClose: true,
          message: '上传成功！',
          type: 'success'
        })
      },

      fail: function (e) {
        this.stepActive = 0
        this.finishStatus = 'error'
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
        this.$emit('do-preview', { id: this.previewTarget })
      }
    }
  }
</script>

<style scoped>

</style>

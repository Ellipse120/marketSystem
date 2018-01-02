<template>
  <div class="app-container">
    <!-- filter -->
    <div class="filter-container">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-input placeholder="市场编码" v-model="listQuery.MDBCodeId" class="filter-item">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-select placeholder="行情类型" v-model="listQuery.PriceType" class="filter-item" :clearable="true">
            <el-option v-for="item in priceTypes" :key="item.Key" :label="item.Description" :value="item.Key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="15">
          <el-button type="primary" icon="el-icon-search" plain class="filter-item">搜索</el-button>
          <el-button type="primary" icon="el-icon-edit" class="filter-item" @click="handleCreate">添加</el-button>
          <el-button type="info" icon="el-icon-download" class="filter-item" @click="handleImportCodeConfig">导入
          </el-button>
        </el-col>
      </el-row>
    </div>

    <!-- table -->
    <div>
      <el-table
        :data="tableData.List"
        v-loading.body="listLoading"
        element-loading-text="拼命加载中。。。"
        border
        style="width: 100%;">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="Code"
          label="唯一编码"
          align="center">
        </el-table-column>
        <el-table-column
          prop="DisplayName"
          align="center"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="MarketTypeNote"
          align="center"
          label="市场类型">
        </el-table-column>
        <el-table-column
          prop="ObjectDescription"
          align="center"
          :label="marketTypeObj.label">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="80">
          <template slot-scope="scope">
            <el-dropdown size="medium">
              <el-button type="text">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button type="text" @click="handleUpdate(scope.row)">编辑</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="handleBloomConfig(scope.row)">配置彭博</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- pagination-->
    <div class="pagination-container">
      <el-pagination
        background
        :current-page.sync="listQuery.CurrentPage"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.Pagination.TotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <!-- dialog-->
    <div>
      <el-dialog
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
        @close="closeBloomDialog"
        width="550px"
        top="10vh">
        <el-form :rules="rules"
                 ref="dataForm"
                 :model="codeConfigItem"
                 label-position="left"
                 label-width="80px"
                 style='width: 400px; margin-left:50px;'>
          <el-form-item label="唯一编码">
            <el-input v-model="codeConfigItem.Code" :disabled="dialogStatus === 'update'"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="codeConfigItem.DisplayName"></el-input>
          </el-form-item>
          <el-form-item label="市场类型">
            <el-select class="filter-item" v-model="codeConfigItem.MarketType" placeholder="请选择" :clearable="true"
                       style="width: 100%;" disabled>
              <el-option v-for="item in marketTypes" :key="item.Key" :label="item.Description" :value="item.Key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="marketTypeObj.label">
            <el-select class="filter-item" v-if="this.type === 'MDBFutureCode'"
                       v-model="codeConfigItem.ObjectId"
                       :disabled="dialogStatus === 'update'"
                       placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in futureContracts.datas"
                         :key="item.Id"
                         :label="item.DisplayName"
                         :value="item.Id">
              </el-option>
            </el-select>
            <el-select class="filter-item" v-else-if="this.type === 'MDBForexCode'"
                       v-model="codeConfigItem.ObjectId"
                       :disabled="dialogStatus === 'update'"
                       placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in forexes.datas"
                         :key="item.Id"
                         :label="item.DisplayName"
                         :value="item.Id">
              </el-option>
            </el-select>
            <el-select class="filter-item" v-else-if="this.type === 'MDBIborCode'"
                       :disabled="dialogStatus === 'ObjectId'"
                       v-model="codeConfigItem.InterestRateId"
                       placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in interestRates.datas"
                         :key="item.Id"
                         :label="item.DisplayName"
                         :value="item.Id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button v-if="dialogStatus === 'create'" type="primary" @click="createData">确 定</el-button>
          <el-button type="primary" v-else @click="updateData">确 定</el-button>
        </div>
      </el-dialog>

      <!-- import dialog -->
      <div>
        <el-dialog v-if="dialogImportVisible"
                   title="导入"
                   :visible.sync="dialogImportVisible"
                   :close-on-click-modal="false"
                   :before-close="handleBeforeClose">
          <upload-excel
            :previewData="previewData"
            :isImportSuccess="isImportSuccess"
            @do-preview="doPreview"
            @do-import="doImportCode">
          </upload-excel>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleBeforeClose">取 消</el-button>
            <el-button type="primary" @click="handleSure">确 定</el-button>
          </span>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import uploadExcel from '@/components/uploadExcel/index'

  export default {
    name: 'code-tab-pane',
    components: { uploadExcel },
    props: {
      type: {
        type: String,
        default: 'MDBFutureCode'
      }
    },
    created () {
      this.$store.dispatch('allFutureContracts').then(() => {
      })
      this.$store.dispatch('allForexes').then(() => {
      })
      this.$store.dispatch('allInterestRates').then(() => {
      })
      this.getList()
      this.changeDialog(false)
    },
    data () {
      return {
        listLoading: true,
        listQuery: {
          CurrentPage: 1,
          PageSize: 10,
          PriceType: null,
          marketType: 1
        },
        statusOptions: [1, 2, 3],
        tableData: {
          List: [],
          Pagination: {
            CurrentPage: 1,
            PageCount: 1,
            PageSize: 10,
            TotalCount: 0
          }
        },
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        rules: {},
        marketType: {
          label: '',
          code: ''
        },
        dialogImportVisible: false,
        previewData: {},
        isImportSuccess: false
      }
    },
    methods: {
      getList: function () {
        this.listLoading = true
        switch (this.type) {
          case 'MDBFutureCode':
            this.listQuery.marketType = 1
            this.$store.dispatch('allMDBCodeConfigs', this.listQuery).then(() => {
              this.tableData = this.allMDBCodeConfigs
              this.listLoading = false
            })
            break
          case 'MDBForexCode':
            this.listQuery.marketType = 2
            this.$store.dispatch('allMDBCodeConfigs', this.listQuery).then(() => {
              this.tableData = this.allMDBCodeConfigs
              this.listLoading = false
            })
            break
          case 'MDBIborCode':
            this.listQuery.marketType = 3
            this.$store.dispatch('allMDBCodeConfigs', this.listQuery).then(() => {
              this.tableData = this.allMDBCodeConfigs
              this.listLoading = false
            })
            break
        }
      },

      handleCreate: function () {
        this.changeDialog(true)
        this.$store.commit('resetCodeConfigItem')
        this.dialogStatus = 'create'
        switch (this.type) {
          case 'MDBFutureCode':
            this.codeConfigItem.MarketType = 1
            break
          case 'MDBForexCode':
            this.codeConfigItem.MarketType = 2
            break
          case 'MDBIborCode':
            this.codeConfigItem.MarketType = 3
            break
        }
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },

      handleUpdate: function (row) {
        this.changeDialog(true)
        this.$store.commit('GET_ITEM_BY_ID', row.Id)
        this.dialogStatus = 'update'
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },

      handleDelete: function (row) {
        this.$confirm(`此操作将永久删除编码【${row.Code}】`, '提示', {
          type: 'warning',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          this.$store.dispatch('deleteFutureCode', [row.Id]).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除操作'
          })
        })
      },

      cancel: function () {
        this.changeDialog(false)
      },

      handleBloomConfig: function (row) {
        this.$router.push('bloomBerg')
        this.changeDialog(true)
        this.$store.commit('resetBloomConfigRow')
        this.$store.commit('CONFIG_BLOOMBERG', row.Id)
      },

      createData: function () {
        const data = {
          'Code': this.codeConfigItem.Code,
          'DisplayName': this.codeConfigItem.DisplayName,
          'MarketType': this.codeConfigItem.MarketType
        }
        let futureConfig = {}
        let forexConfig = {}
        let IborConfig = {}
        switch (this.type) {
          case 'MDBFutureCode':
            futureConfig = Object.assign(data, {
              'FutureContractId': this.codeConfigItem.ObjectId
            })
            this.$store.dispatch('addFutureCode', [futureConfig])
              .then(() => {
                this.changeDialog(false)
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              })
            break
          case 'MDBForexCode':
            forexConfig = Object.assign(data, {
              'ForexId': this.codeConfigItem.ObjectId
            })
            this.$store.dispatch('addForexCode', [forexConfig])
              .then(() => {
                this.changeDialog(false)
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              })
            break
          case 'MDBIborCode':
            IborConfig = Object.assign(data, {
              'InterestRateId': this.codeConfigItem.ObjectId
            })
            this.$store.dispatch('addInterestRateCode', [IborConfig])
              .then(() => {
                this.changeDialog(false)
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              })
            break
        }
      },

      updateData: function () {
        const data = {
          'Id': this.codeConfigItem.Id,
          'Code': this.codeConfigItem.Code,
          'DisplayName': this.codeConfigItem.DisplayName,
          'MarketType': this.codeConfigItem.MarketType
        }
        this.$store.dispatch('updateFutureCode', [data])
          .then(() => {
            this.changeDialog(false)
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
      },

      closeBloomDialog: function () {
        this.changeDialog(false)
      },

      changeDialog: function (v) {
        this.$store.commit('CHANGE_DIALOG', { val: v })
        this.dialogFormVisible = this.$store.getters.isShowDialog
      },

      handleSizeChange: function (val) {
        this.listQuery.PageSize = val
        this.getList()
      },

      handleCurrentChange: function (val) {
        this.listQuery.CurrentPage = val
        this.getList()
      },

      handleImportCodeConfig: function () {
        this.dialogImportVisible = true
      },

      handleSure: function () {
        this.previewData = {}
        this.dialogImportVisible = false
        if (this.isImportSuccess) {
          this.getList()
        }
      },

      handleBeforeClose: function () {
        this.$store.commit('resetUpload')
        this.previewData = {}
        this.dialogImportVisible = false
        // this.$confirm('此操作将取消导入操作, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning',
        //   center: true
        // }).then(() => {
        //   this.dialogImportVisible = false
        //   // this.$message({
        //   //   type: 'success',
        //   //   message: '删除成功!'
        //   // })
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消导入'
        //   })
        // })
      },

      doPreview: function (data) {
        switch (this.type) {
          case 'MDBFutureCode':
            this.$store.dispatch('doPreviewMDBFutureCode', data)
              .then(res => {
                this.previewData = res.Data.PreviewData
                this.$store.commit('changeIsPreviewCheck', false)
                if (res.Data.PreviewData.ImportAllowed) {
                  this.$store.commit('changeStepActive', 2)
                  this.$store.commit('changeFinishStatus', 'success')
                }
              })
            break
          case 'MDBForexCode':
            this.$store.dispatch('doPreviewMDBForexCode', data)
              .then(res => {
                this.previewData = res.Data.PreviewData
                this.$store.commit('changeIsPreviewCheck', false)
                if (res.Data.PreviewData.ImportAllowed) {
                  this.$store.commit('changeStepActive', 2)
                  this.$store.commit('changeFinishStatus', 'success')
                }
              })
            break
          case 'MDBIborCode':
            this.$store.dispatch('doPreviewMDBInterestRateCode', data)
              .then(res => {
                this.previewData = res.Data.PreviewData
                this.$store.commit('changeIsPreviewCheck', false)
                if (res.Data.PreviewData.ImportAllowed) {
                  this.$store.commit('changeStepActive', 2)
                  this.$store.commit('changeFinishStatus', 'success')
                }
              })
            break
        }
      },

      doImportCode: function (data) {
        switch (this.type) {
          case 'MDBFutureCode':
            this.$store.dispatch('doImportMDBFutureCode', data)
              .then(res => {
                this.isImportSuccess = res.Status
                if (res.Status) {
                  this.$store.commit('changeStepActive', 3)
                  this.$store.commit('changeFinishStatus', 'success')
                }
              })
            break
          case 'MDBForexCode':
            this.$store.dispatch('doImportMDBForexCode', data)
              .then(res => {
                this.isImportSuccess = res.Status
                if (res.Status) {
                  this.$store.commit('changeStepActive', 3)
                  this.$store.commit('changeFinishStatus', 'success')
                }
              })
            break
          case 'MDBIborCode':
            this.$store.dispatch('doImportMDBInterestRateCode', data)
              .then(res => {
                this.isImportSuccess = res.Status
                if (res.Status) {
                  this.$store.commit('changeStepActive', 3)
                  this.$store.commit('changeFinishStatus', 'success')
                }
              })
            break
        }
      }
    },
    computed: {
      ...mapGetters([
        'isShowDialog',
        'codeConfigItem',
        'marketTypes',
        'priceTypes',
        'futureContracts',
        'forexes',
        'interestRates',
        'allMDBCodeConfigs'
      ]),
      dialogFormVisible: {
        get: function () {
          return this.$store.state.bloomConfig.isShowDialog
        },
        set: function () {
          return ''
        }
      },
      marketTypeObj: function () {
        switch (this.type) {
          case 'MDBFutureCode':
            this.marketType = {
              label: '期货合约',
              code: 'FutureContractId'
            }
            return this.marketType
          case 'MDBForexCode':
            this.marketType = {
              label: '外汇名称',
              code: 'InterestRateId'
            }
            return this.marketType
          case 'MDBIborCode':
            this.marketType = {
              label: '利率名称',
              code: 'ForexId'
            }
            return this.marketType
        }
      }
    }
  }
</script>

<style scoped>

</style>

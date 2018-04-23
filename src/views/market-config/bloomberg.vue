<template>
  <div class="app-container">
    <!-- filter -->
    <div class="filter-container">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-input :clearable="true" placeholder="行情编码" v-model="listQuery.mDBCode" class="filter-item">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-select placeholder="行情类型" v-model="listQuery.priceType" class="filter-item" filterable :clearable="true">
            <el-option v-for="item in priceTypes" :key="item.Key" :label="item.Description" :value="item.Key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-input :clearable="true" placeholder="彭博代码" v-model="listQuery.bloombergCode" class="filter-item">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-select placeholder="请求类型" v-model="listQuery.requestType" class="filter-item" filterable :clearable="true">
            <el-option v-for="item in bloombergRequestTypes" :key="item.Key" :label="item.Description"
                       :value="item.Key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" icon="el-icon-search" plain class="filter-item" @click="handleSearch">搜索</el-button>
          <el-button type="primary" icon="el-icon-edit" class="filter-item" @click="handleCreate">添加</el-button>
          <el-button type="info" icon="el-icon-upload2" class="filter-item" @click="handleImportBloomConfig">导入
          </el-button>
          <el-button type="info" icon="el-icon-download" class="filter-item" @click="handleExportBloomConfig">导出
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
        border fit
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="MDBCodeCode"
          label="行情编码"
          align="center">
        </el-table-column>
        <el-table-column
          prop="MDBCodeDisplayName"
          label="行情编码名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="PriceTypeNote"
          label="行情类型"
          align="center">
        </el-table-column>
        <el-table-column
          prop="BloombergCode"
          label="彭博代码"
          align="center">
        </el-table-column>
        <el-table-column
          prop="RequestTypeNote"
          label="请求类型"
          align="center">
        </el-table-column>
        <el-table-column
          prop="BloombergDataType"
          label="市场活动类型"
          align="center">
        </el-table-column>
        <el-table-column
          prop="WarehouseNote"
          label="合成转仓预设"
          align="center">
        </el-table-column>
        <el-table-column
          prop="RequestStartTime"
          label="请求开始时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="RequestEndTime"
          label="请求结束时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="CreationTime"
          :formatter="format_yyyy_mm_dd_hh_mm_ss"
          label="创建时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="LastUpdateTime"
          :formatter="format_yyyy_mm_dd_hh_mm_ss"
          label="最后更新时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="ExpirationDate"
          label="失效日期"
          :formatter="formatTradeDate"
          align="center">
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
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <template slot="append">
          <el-row>
            <el-col :span="2">
              <transition name="bounce">
                <el-button type="danger"
                           style="margin: 10px;"
                           v-show="hasPermission && isShowBatchDeleteBtn"
                           @click="handleBatchDelete">批量删除
                </el-button>
              </transition>
            </el-col>
            <el-col :span="22">
              <transition name="fade">
                <p v-show="hasPermission && isShowBatchDeleteBtn">
                  共选中了
                  <el-tag type="danger">{{multipleSelection.length}}</el-tag>
                  条
                </p>
              </transition>
            </el-col>
          </el-row>
        </template>
      </el-table>
    </div>

    <!-- pagination -->
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

    <!-- dialog -->
    <div>
      <el-dialog :title="textMap[dialogStatus]"
                 :visible.sync="dialogFormVisible"
                 :close-on-click-modal="false"
                 top="10vh"
                 width="550px"
                 @close="closeBloomDialog">
        <el-form :rules="rules"
                 ref="dataForm"
                 :model="bloombergConfigItem"
                 label-position="left"
                 label-width="100px"
                 style='width: 400px; margin-left:50px;'>
          <el-form-item label="行情编码">
            <el-select class="filter-item"
                       v-model="bloombergConfigItem.MDBCodeId"
                       filterable
                       :disabled="dialogStatus !== 'create'"
                       placeholder="请选择编码"
                       style="width: 100%;">
              <el-option v-for="item in allMDBCodeConfigs.List" :key="item.Id" :label="item.DisplayName"
                         :value="item.Id">
                <span style="float: left">{{ item.DisplayName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">Id: {{ item.Id }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行情类型">
            <el-select class="filter-item" v-model="bloombergConfigItem.PriceType" placeholder="请选择行情类型"
                       filterable style="width: 100%;">
              <el-option v-for="item in priceTypes" :key="item.Key" :label="item.Description" :value="item.Key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="彭博代码">
            <el-input v-model="bloombergConfigItem.BloombergCode" placeholder="请输入彭博代码"></el-input>
          </el-form-item>
          <el-form-item label="请求类型">
            <el-select class="filter-item" v-model="bloombergConfigItem.RequestType" placeholder="请选择请求类型"
                       filterable style="width: 100%;" @change="bloombergRequestType">
              <el-option v-for="item in bloombergRequestTypes" :key="item.Key" :label="item.Description"
                         :value="item.Key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市场活动类型">
            <el-input v-model="bloombergConfigItem.BloombergDataType" placeholder="请输入彭博市场活动类型"></el-input>
          </el-form-item>
          <el-form-item label="合成转仓预设">
            <el-select class="filter-item"
                       v-model="bloombergConfigItem.Warehouse"
                       :clearable="true" filterable
                       placeholder="请选择市场活动类型"
                       style="width: 100%;">
              <el-option v-for="item in warehouses" :key="item.Key" :label="item.Description" :value="item.Key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求起止区间">
            <div style="display: flex;">
              <el-time-select
                placeholder="起始时间"
                :editable="false"
                v-model="bloombergConfigItem.RequestStartTime"
                :disabled="!isAllowRequestStartEnd"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00'
                }">
              </el-time-select>
              <el-time-select
                placeholder="结束时间"
                :editable="false"
                v-model="bloombergConfigItem.RequestEndTime"
                :disabled="!isAllowRequestStartEnd"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: bloombergConfigItem.RequestStartTime
                }">
              </el-time-select>
            </div>
          </el-form-item>
          <el-form-item label="创建时间" v-if="dialogStatus === 'update'">
            <el-date-picker :readonly="dialogStatus === 'update'" v-model="bloombergConfigItem.CreationTime"
                            type="datetime" :disabled="true" placeholder="选择日期时间"
                            style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="最后更新时间" v-if="dialogStatus === 'update'">
            <el-date-picker :readonly="dialogStatus === 'update'" v-model="bloombergConfigItem.LastUpdateTime"
                            type="datetime" :disabled="true" placeholder="选择日期时间"
                            style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="失效时间">
            <el-date-picker :disabled="dialogStatus === 'update'" v-model="bloombergConfigItem.ExpirationDate"
                            type="datetime" :clearable="true"
                            disabledDate="return true" placeholder="选择日期时间"
                            style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button v-if="dialogStatus !== 'update'" type="primary" @click="createData">确 定</el-button>
          <el-button type="primary" v-else @click="updateData">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- import dialog -->
    <div>
      <el-dialog
        v-if="dialogImportVisible"
        title="导入"
        width="550px"
        :visible.sync="dialogImportVisible"
        :close-on-click-modal="false"
        :before-close="handleBeforeClose">
        <upload-excel
          ref="upload"
          :previewData="previewData"
          :isImportSuccess="isImportSuccess"
          @do-preview="doPreview"
          @do-import="doImportCode">
        </upload-excel>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleBeforeClose">取 消
            </el-button>
            <el-button
              type="primary"
              :disabled="!isAllowImport"
              @click="handleSure">导 入
            </el-button>
          </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import uploadExcel from '@/components/uploadExcel/index'
  import { doExportMDBBloombergTemplateExcel, doExportMDBBloombergExcel } from '../../api/bloomberg-config'
  import { formatDateYMD, formatDateYMDHMS } from '@/utils/index'
  import { exportExcel } from '../../components/mixins/exportExcel'

  export default {
    name: 'bloomberg',
    components: { uploadExcel },
    mixins: [exportExcel],
    data () {
      return {
        listLoading: true,
        listQuery: {
          CurrentPage: 1,
          PageSize: 10,
          mDBCode: '',
          priceType: null,
          bloombergCode: '',
          requestType: '',
          BloombergDataType: '',
          Warehouse: '',
          RequestStartTime: '',
          RequestEndTime: '',
          CreationTime: '',
          LastUpdateTime: '',
          ExpirationDate: ''
        },
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
        isAllowRequestStartEnd: false,
        dialogImportVisible: false,
        previewData: {},
        isAllowImport: false,
        isImportSuccess: false,
        multipleSelection: []
      }
    },
    created () {
      this.$store.dispatch('allMDBCodeConfigs', { marketType: null }).then(() => {
      })
      this.getList()
    },
    mounted () {
      this.$store.commit('changeTemplateFileId', 0)
    },
    computed: {
      ...mapGetters([
        'isShowDialog',
        'priceTypes',
        'warehouses',
        'bloombergRequestTypes',
        'allMDBCodeConfigs',
        'allMDBBloombergConfigList',
        'bloombergConfigItem',
        'roles'
      ]),
      dialogFormVisible: {
        get: function () {
          return this.$store.state.bloomConfig.isShowDialog
        },
        set: function () {
          return ''
        }
      },
      hasPermission () {
        if (this.roles[0] !== undefined) {
          return this.roles[0].Code.indexOf('Admin') >= 0
        }
      },
      isShowBatchDeleteBtn () {
        return this.multipleSelection.length > 0
      }
    },
    methods: {
      getList: function () {
        this.listLoading = true
        this.$store.dispatch('allMDBBloombergConfigList', this.listQuery)
          .then(() => {
            this.tableData = this.allMDBBloombergConfigList
            this.listLoading = false
          })
          .catch(error => {
            console.log(error)
            this.listLoading = false
          })
      },

      handleSearch: function () {
        this.getList()
      },

      handleCreate: function () {
        this.changeDialog(true)
        this.$store.commit('resetBloomConfigRow')
        this.dialogStatus = 'create'
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },

      handleUpdate: function (row) {
        this.changeDialog(true)
        this.$store.commit('GET_BY_ID', row.Id)
        this.dialogStatus = 'update'
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },

      handleDelete: function (row) {
        this.$confirm(`确认删除 名称：【${row.MDBCodeDisplayName}】, 行情类型：【${row.PriceTypeNote}】, 彭博代码【${row.BloombergCode}】`, '提示', {
          type: 'warning',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          this.$store.dispatch('deleteBloombergConfig', [row.Id]).then(() => {
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

      handleBatchDelete: function () {
        this.$confirm(`确认批量删除 行情编码: 【${this.multipleSelection}】`, '提示', {
          type: 'warning',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          this.$store.dispatch('deleteBloombergConfig', this.multipleSelection).then(() => {
            this.$message({
              type: 'success',
              message: '批量删除成功'
            })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消批量删除操作'
          })
        })
      },

      cancel: function () {
        this.changeDialog(false)
      },

      createData: function () {
        // TODO 时间选择器 手动输入有问题，目前设为不可编辑，待替换。
        this.$store.dispatch('addBloombergConfig', [this.bloombergConfigItem])
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
      },

      updateData: function () {
        this.$store.dispatch('updateBloombergConfig', [this.bloombergConfigItem])
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
        this.isAllowRequestStartEnd = false
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

      handleImportBloomConfig () {
        this.dialogImportVisible = true
        doExportMDBBloombergTemplateExcel()
          .then(response => {
            this.$store.commit('changeTemplateFileId', response.Data)
          })
          .catch(err => console.log(err))
      },

      handleExportBloomConfig () {
        doExportMDBBloombergExcel(this.listQuery)
          .then(response => {
            this.doExportExcelData(response.Data)
          })
      },

      handleSure: function () {
        this.previewData = {}
        this.$refs['upload'].handleImportExcel()
      },

      handleBeforeClose: function () {
        this.$store.commit('resetUpload')
        this.previewData = {}
        this.dialogImportVisible = false
      },

      doPreview: function (data) {
        this.$store.dispatch('doPreviewMDBBloomberg', data)
          .then(res => {
            this.previewData = res.Data
            this.$store.commit('changeIsPreviewCheck', false)
            if (res.Data.ImportAllowed) {
              this.isAllowImport = true
              this.$store.commit('changeStepActive', 2)
              this.$store.commit('changeFinishStatus', 'success')
            }
          })
          .catch(err => {
            this.$store.commit('changeIsPreviewCheck', false)
            console.log(err)
          })
      },

      doImportCode: function (data) {
        this.$store.dispatch('doImportMDBBloomberg', data)
          .then(res => {
            this.isImportSuccess = res.Status
            if (res.Status) {
              this.dialogImportVisible = false
              this.$store.commit('changeStepActive', 3)
              this.$store.commit('changeFinishStatus', 'success')
              if (this.isImportSuccess) {
                this.getList()
              }
            }
          })
      },

      bloombergRequestType: function (e) {
        this.isAllowRequestStartEnd = e === 2
        if (e !== 2) {
          this.bloombergConfigItem.RequestStartTime = ''
          this.bloombergConfigItem.RequestEndTime = ''
        }
      },

      formatTradeDate: function (row, column, cellValue) {
        return formatDateYMD(cellValue)
      },

      format_yyyy_mm_dd_hh_mm_ss (row, column, cellValue) {
        return formatDateYMDHMS(cellValue)
      },

      handleSelectionChange: function (val) {
        this.multipleSelection = val.map(a => a.Id)
      }
    }
  }
</script>

<style scoped>

</style>

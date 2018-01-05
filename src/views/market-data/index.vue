<template>
  <div class="app-container">
    <!-- filter ↓ -->
    <div class="filter-container">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-input :clearable="true" placeholder="市场编码" v-model="listQuery.mDBCode" class="filter-item">
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="listQuery.TradeDate"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            default-value="2018-01-01">
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-select :clearable="true" placeholder="行情类型" v-model="listQuery.priceType" class="filter-item">
            <el-option v-for="item in priceTypes" :key="item.Key" :label="item.Description" :value="item.Key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select :clearable="true" placeholder="行情来源" v-model="listQuery.source" class="filter-item">
            <el-option v-for="item in quotationSources" :key="item.Key" :label="item.Description" :value="item.Key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select :clearable="true" placeholder="市场类型" v-model="listQuery.marketType" class="filter-item">
            <el-option v-for="item in marketTypes" :key="item.Key" :label="item.Description" :value="item.Key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="10" style="display: inline-flex;">
          <el-button type="primary" icon="el-icon-search" plain class="filter-item" @click="handleSearch">搜索</el-button>
          <el-button type="primary" icon="el-icon-edit" class="filter-item" @click="handleCreate">添加</el-button>
          <el-button type="info" icon="el-icon-download" class="filter-item" @click="handleImportMDBData">导入
          </el-button>
          <el-button type="success" icon="el-icon-refresh" title="刷新彭博行情" round class="filter-item"
                     @click="handleRefreshBloomberg">彭博行情
          </el-button>
        </el-col>
      </el-row>
    </div>
    <!-- table ↓ -->
    <div>
      <el-table
        :data="tableData.List"
        v-loading.body="listLoading"
        element-loading-text="拼命加载中。。。"
        border fit
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="MDBCodeCode"
          label="市场编码"
          align="center">
        </el-table-column>
        <el-table-column
          prop="TradeDate"
          label="交易日期"
          align="center">
        </el-table-column>
        <el-table-column
          prop="PriceTypeNote"
          align="center"
          label="行情类型">
        </el-table-column>
        <el-table-column
          prop="PriceValue"
          align="center"
          label="行情值">
        </el-table-column>
        <el-table-column
          prop="SourceNote"
          align="center"
          label="行情来源">
        </el-table-column>
        <el-table-column
          prop="MarketTypeNote"
          align="center"
          label="市场类型">
        </el-table-column>
        <el-table-column
          prop="LastUpdateTime"
          align="center"
          label="更新时间">
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
      </el-table>

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

      <!-- add/update dialog -->
      <div>
        <el-dialog :title="textMap[dialogStatus]"
                   :visible.sync="dialogFormVisible"
                   width="550px">
          <el-form :rules="rules"
                   ref="dataForm"
                   :model="mDBDataItem"
                   label-position="left"
                   label-width="80px"
                   style='width: 400px; margin-left:50px;'>
            <el-form-item label="市场编码">
              <el-select class="filter-item" v-model="mDBDataItem.MDBCodeId" placeholder="请选择编码配置"
                         style="width: 100%;">
                <el-option v-for="item in allMDBCodeConfigs.List" :key="item.Id" :label="item.Code"
                           :value="item.Id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="交易日期" prop="TradeDate">
              <el-date-picker :readonly="dialogStatus ==='update'" v-model="mDBDataItem.TradeDate" type="datetime"
                              disabledDate="return true" placeholder="选择日期时间"
                              style="width: 100%;">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="行情类型">
              <el-select class="filter-item" v-model="mDBDataItem.PriceType" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in priceTypes" :key="item.Key" :label="item.Description" :value="item.Key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="行情值">
              <el-input v-model="mDBDataItem.PriceValue"></el-input>
            </el-form-item>
            <el-form-item label="行情来源">
              <el-select class="filter-item" v-model="mDBDataItem.Source" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in quotationSources" :key="item.Key" :label="item.Description" :value="item.Key">
                </el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item label="市场类型">-->
            <!--<el-select class="filter-item" v-model="mDBDataItem.MarketType" placeholder="请选择" style="width: 100%;">-->
            <!--<el-option v-for="item in marketTypes" :key="item.Key" :label="item.Description" :value="item.Key">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button v-if="dialogStatus === 'create'" type="primary" @click="createData">确 定</el-button>
            <el-button type="primary" v-else @click="updateData">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <!-- import dialog -->
      <div>
        <el-dialog v-if="dialogImportVisible"
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
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import uploadExcel from '@/components/uploadExcel/index'
  import { setRefreshState } from '@/utils/auth'

  export default {
    name: 'marketDataManagement',
    components: { uploadExcel },
    data () {
      return {
        listLoading: false,
        listQuery: {
          CurrentPage: 1,
          PageSize: 20,
          mDBCode: '',
          TradeDate: '',
          priceType: '',
          PriceValue: '',
          source: '',
          marketType: ''
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
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogImportVisible: false,
        rules: {},
        previewData: {},
        isAllowImport: false,
        isImportSuccess: false
      }
    },
    created () {
      this.$store.dispatch('allMDBCodeConfigs', { marketType: null }).then(() => {
      })
      this.getList()
    },
    computed: {
      ...mapGetters([
        'marketTypes',
        'priceTypes',
        'quotationSources',
        'allMDBDataList',
        'mDBDataItem',
        'allMDBCodeConfigs',
        'ws'
      ])
    },
    methods: {
      getList () {
        this.listLoading = true
        this.$store.dispatch('allMDBDataList', this.listQuery)
          .then(() => {
            this.tableData = this.allMDBDataList
            this.listLoading = false
          })
      },

      handleSearch: function () {
        this.getList()
      },

      handleCreate: function () {
        this.$store.commit('resetMDBDataItem')
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },

      handleUpdate: function (row) {
        this.$store.commit('GET_MDBDATA_BY_ID', row.Id)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },

      handleDelete: function (row) {
        this.$confirm(`此操作将永久删除市场编码Id【${row.MDBCodeId}】`, '提示', {
          type: 'warning',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          this.$store.dispatch('deleteMDBData', [row.Id]).then(() => {
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

      createData: function () {
        this.$store.dispatch('addMDBData', [this.mDBDataItem])
          .then(() => {
            this.dialogFormVisible = false
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
        this.$store.dispatch('updateMDBData', [this.mDBDataItem])
          .then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
      },

      handleSizeChange: function (val) {
        this.listQuery.PageSize = val
        this.getList()
      },

      handleCurrentChange: function (val) {
        this.listQuery.CurrentPage = val
        this.getList()
      },

      handleImportMDBData: function () {
        this.dialogImportVisible = true
        // TODO 获取模板文件id
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
        this.$store.dispatch('doPreviewMDBData', data)
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
        this.$store.dispatch('doImportMDBData', data)
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

      handleRefreshBloomberg: function () {
        switch (this.ws.readyState) {
          case WebSocket.CONNECTING:
            this.$message({
              type: 'info',
              message: '正在连接'
            })
            break
          case WebSocket.OPEN:
            return false
          case WebSocket.CLOSING:
            this.$message({
              type: 'info',
              message: '正在关闭'
            })
            break
          case WebSocket.CLOSED:
            this.$message({
              type: 'info',
              message: '连接关闭'
            })
            break
          default:
            break
        }
        setRefreshState('true')
        this.$store.dispatch('REFRESH_BLOOMBERG', { 'router': this.$router })
      }
    }
  }
</script>

<style scoped>

</style>

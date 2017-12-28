<template>
  <div class="app-container">
    <!-- filter ↓ -->
    <div class="filter-container">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-input placeholder="市场编码" v-model="listQuery.MDBCodeId" class="filter-item">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-select placeholder="行情类型" v-model="listQuery.PriceType" class="filter-item">
            <el-option v-for="item in priceTypes" :key="item.Key" :label="item.Description" :value="item.Key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select placeholder="行情来源" v-model="listQuery.Source" class="filter-item">
            <el-option v-for="item in quotationSources" :key="item.Key" :label="item.Description" :value="item.Key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select placeholder="市场类型" v-model="listQuery.MarketType" class="filter-item">
            <el-option v-for="item in marketTypes" :key="item.Key" :label="item.Description" :value="item.Key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12" style="display: inline-flex;">
          <el-button type="primary" icon="el-icon-search" plain class="filter-item">搜索</el-button>
          <el-button type="primary" icon="el-icon-edit" class="filter-item" @click="handleCreate">添加</el-button>
          <el-button type="info" icon="el-icon-download" class="filter-item" @click="handleImportMDBData()">导入
          </el-button>
          <el-button type="success" icon="el-icon-refresh" title="刷新彭博行情" round class="filter-item">彭博行情</el-button>
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
                   width="30%">
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
            <el-form-item label="市场类型">
              <el-select class="filter-item" v-model="mDBDataItem.MarketType" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in marketTypes" :key="item.Key" :label="item.Description" :value="item.Key">
                </el-option>
              </el-select>
            </el-form-item>
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
                   :visible.sync="dialogImportVisible"
                   width="30%"
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
    name: 'marketDataManagement',
    components: { uploadExcel },
    data () {
      return {
        listLoading: false,
        listQuery: {
          CurrentPage: 1,
          PageSize: 20,
          MDBCodeId: '',
          TradeDate: '',
          PriceType: '',
          PriceValue: '',
          Source: '',
          MarketType: ''
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
        'allMDBCodeConfigs'
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
      },

      handleSure: function () {
        this.dialogImportVisible = false
        if (this.isImportSuccess) {
          this.getList()
        }
      },

      handleBeforeClose: function () {
        this.$store.commit('resetUpload')
        this.previewData = {}
        this.dialogImportVisible = false
      },

      doPreview: function (data) {
        this.$store.dispatch('doPreviewMDBData', data)
          .then(res => {
            this.previewData = res.Data.PreviewData
            this.$store.commit('changeIsPreviewCheck', false)
            if (res.Data.PreviewData.ImportAllowed) {
              this.$store.commit('changeStepActive', 2)
              this.$store.commit('changeFinishStatus', 'success')
            }
          })
      },

      doImportCode: function (data) {
        this.$store.dispatch('doImportMDBData', data)
          .then(res => {
            this.isImportSuccess = res.Status
            if (res.Status) {
              this.$store.commit('changeStepActive', 3)
              this.$store.commit('changeFinishStatus', 'success')
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>

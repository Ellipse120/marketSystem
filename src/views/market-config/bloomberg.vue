<template>
  <div class="app-container">
    <!-- filter -->
    <div class="filter-container">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-input placeholder="彭博代码" v-model="listQuery.MDBCodeId" class="filter-item">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-select placeholder="行情类型" v-model="listQuery.PriceType" class="filter-item" :clearable="true">
            <el-option v-for="item in priceTypes" :key="item.Key" :label="item.Description" :value="item.Key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select placeholder="请求类型" v-model="listQuery.RequestType" class="filter-item" :clearable="true">
            <el-option v-for="item in bloombergRequestTypes" :key="item.Key" :label="item.Description"
                       :value="item.Key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select placeholder="市场类型" v-model="listQuery.BloombergDataType" class="filter-item" :clearable="true">
            <el-option v-for="item in marketTypes" :key="item.Key" :label="item.Description" :value="item.Key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" icon="el-icon-search" plain class="filter-item">搜索</el-button>
          <el-button type="primary" icon="el-icon-edit" class="filter-item" @click="handleCreate">添加</el-button>
          <el-button type="info" icon="el-icon-download" class="filter-item" @click="handleImportBloomConfig">导入
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
          prop="MDBCodeId"
          label="编码配置代码"
          align="center">
        </el-table-column>
        <el-table-column
          prop="MDBCodeDisplayName"
          label="编码配置名称"
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
          label="创建时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="LastUpdateTime"
          label="最后更新时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="ExpirationDate"
          label="失效时间"
          align="center">
        </el-table-column>
        <el-table-column
          label=""
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
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" top="10vh" width="600px"
                 @close="closeBloomDialog">
        <el-form :rules="rules" ref="dataForm" :model="bloombergConfigItem" label-position="left" label-width="100px"
                 size="mini" style='width: 500px; margin-left:35px;'>
          <el-form-item label="编码配置">
            <el-select class="filter-item" v-model="bloombergConfigItem.MDBCodeId" placeholder="请选择编码配置"
                       style="width: 100%;">
              <el-option v-for="item in allMDBCodeConfigs.List" :key="item.Id" :label="item.DisplayName"
                         :value="item.Id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行情类型">
            <el-select class="filter-item" v-model="bloombergConfigItem.PriceType" placeholder="请选择行情类型"
                       style="width: 100%;">
              <el-option v-for="item in priceTypes" :key="item.Key" :label="item.Description" :value="item.Key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="彭博代码">
            <el-input v-model="bloombergConfigItem.BloombergCode" placeholder="请输入彭博代码"></el-input>
          </el-form-item>
          <el-form-item label="请求类型">
            <el-select class="filter-item" v-model="bloombergConfigItem.RequestType" placeholder="请选择请求类型"
                       style="width: 100%;">
              <el-option v-for="item in bloombergRequestTypes" :key="item.Key" :label="item.Description"
                         :value="item.Key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市场活动类型">
            <el-select class="filter-item" v-model="bloombergConfigItem.BloombergDataType" placeholder="请选择市场活动类型"
                       style="width: 100%;">
              <el-option v-for="item in marketTypes" :key="item.Key" :label="item.Description" :value="item.Key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合成转仓预设">
            <el-select class="filter-item" v-model="bloombergConfigItem.Warehouse" placeholder="请选择市场活动类型"
                       style="width: 100%;">
              <el-option v-for="item in warehouses" :key="item.Key" :label="item.Description" :value="item.Key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求时间区间">
            <el-date-picker
              v-model="value4"
              type="datetimerange"
              :picker-options="pickerOptions2"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="center">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="创建时间" v-if="dialogStatus === 'update'">
            <el-date-picker :readonly="dialogStatus === 'update'" v-model="bloombergConfigItem.CreationTime"
                            type="datetime" :disabled="true" placeholder="选择日期时间"
                            style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="最后更新时间" v-if="dialogStatus === 'update'">
            <el-date-picker :readonly="dialogStatus === 'update'" v-model="bloombergConfigItem.LastUpdateTime"
                            type="datetime"  :disabled="true" placeholder="选择日期时间"
                            style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="失效时间">
            <el-date-picker :readonly="dialogStatus === 'update'" v-model="bloombergConfigItem.ExpirationDate"
                            type="datetime"
                            disabledDate="return true" placeholder="选择日期时间"
                            style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button v-if="dialogStatus === 'create'" type="primary" @click="createData">确 定</el-button>
          <el-button type="primary" v-else @click="updateData">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'bloomberg',
    data () {
      return {
        listLoading: true,
        listQuery: {
          CurrentPage: 1,
          PageSize: 10,
          BloombergCode: '',
          PriceType: null,
          RequestType: '',
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
        dialogPvVisible: false,
        rules: {},
        value4: '',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    created () {
      this.$store.dispatch('allMDBCodeConfigs', { marketType: null }).then(() => {
      })
      this.getList()
    },
    computed: {
      ...mapGetters([
        'isShowDialog',
        'marketTypes',
        'priceTypes',
        'warehouses',
        'bloombergRequestTypes',
        'allMDBCodeConfigs',
        'allMDBBloombergConfigList',
        'bloombergConfigItem'
      ]),
      dialogFormVisible: {
        get: function () {
          return this.$store.state.bloomConfig.isShowDialog
        },
        set: function () {
          return ''
        }
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
      },

      handleCreate: function () {
        this.changeDialog(true)
        this.value4 = ''
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
        this.$confirm(`此操作将永久删除彭博代码【${row.BloombergCode}】`, '提示', {
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

      cancel: function () {
        this.changeDialog(false)
      },

      createData: function () {
        this.bloombergConfigItem.RequestStartTime = this.value4[0]
        this.bloombergConfigItem.RequestEndTime = this.value4[1]
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
        this.bloombergConfigItem.RequestStartTime = this.value4[0]
        this.bloombergConfigItem.RequestEndTime = this.value4[1]
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
        this.dialogFormVisible = this.$store.getters.isShowDialog
      },

      handleImportBloomConfig () {
        // TODO 导入
        console.log('import bloomBerg config')
      },

      handleSizeChange: function (val) {
        this.listQuery.PageSize = val
        this.getList()
      },

      handleCurrentChange: function (val) {
        this.listQuery.CurrentPage = val
        this.getList()
      }
    }
  }
</script>

<style scoped>

</style>

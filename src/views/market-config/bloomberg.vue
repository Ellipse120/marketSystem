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
            <el-option v-for="item in bloombergRequestTypes" :key="item.Key" :label="item.Description" :value="item.Key">
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
          <el-button type="info" icon="el-icon-download" class="filter-item" @click="handleImportBloomConfig">导入</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- table -->
    <div>
      <el-table
        :data="allBloomConfigs"
        border
        style="width: 100%;">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="CodeConfigId"
          label="编码配置代码"
          align="center">
        </el-table-column>
        <el-table-column
          prop="PriceType"
          label="行情类型"
          align="center">
        </el-table-column>
        <el-table-column
          prop="BloombergCode"
          label="彭博代码"
          align="center">
        </el-table-column>
        <el-table-column
          prop="RequestType"
          label="请求类型"
          align="center">
        </el-table-column>
        <el-table-column
          prop="BloombergDataType"
          label="市场活动类型"
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
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- dialog -->
    <div>
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" top="10vh" width="600px"
                 @close="closeBloomDialog">
        <el-form :rules="rules" ref="dataForm" :model="bloomConfig2" label-position="left" label-width="100px"
                 size="mini" style='width: 500px; margin-left:35px;'>
          <el-form-item label="编码配置">
            <el-select class="filter-item" v-model="bloomConfig2.CodeConfigId" placeholder="请选择编码配置"
                       style="width: 100%;">
              <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行情类型">
            <el-select class="filter-item" v-model="bloomConfig2.PriceType" placeholder="请选择行情类型" style="width: 100%;">
              <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="彭博代码">
            <el-input v-model="bloomConfig2.BloombergCode" placeholder="请输入彭博代码"></el-input>
          </el-form-item>
          <el-form-item label="请求类型">
            <el-select class="filter-item" v-model="bloomConfig2.RequestType" placeholder="请选择请求类型"
                       style="width: 100%;">
              <el-option v-for="item in bloombergRequestTypes" :key="item.Key" :label="item.Description" :value="item.Key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市场类型">
            <el-select class="filter-item" v-model="bloomConfig2.BloombergDataType" placeholder="请选择市场活动类型"
                       style="width: 100%;">
              <el-option v-for="item in marketTypes" :key="item.Key" :label="item.Description" :value="item.Key">
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
          <el-form-item label="创建时间">
            <el-date-picker :readonly="dialogStatus ==='update'" v-model="bloomConfig2.CreationTime" type="datetime"
                            disabledDate="return true" placeholder="选择日期时间"
                            style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="最后更新时间">
            <el-date-picker :readonly="dialogStatus ==='update'" v-model="bloomConfig2.LastUpdateTime" type="datetime"
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
        total: 4,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          BloombergCode: '',
          PriceType: '',
          RequestType: '',
          BloombergDataType: '',
          RequestStartTime: '',
          RequestEndTime: '',
          CreationTime: '',
          LastUpdateTime: ''
        },
        statusOptions: [1, 2, 3],
        varietyOptions: [
          {
            value: 'gold',
            label: '金'
          },
          {
            value: 'silver',
            label: '银'
          },
          {
            value: 'copper',
            label: '铜'
          }
        ],
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
    },
    computed: {
      ...mapGetters([
        'isShowDialog',
        'allBloomConfigs',
        'bloomConfig2',
        'marketTypes',
        'priceTypes',
        'bloombergRequestTypes'
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
      handleCreate: function () {
        this.$store.commit('resetBloomConfigRow')
        this.changeDialog(true)
        this.dialogStatus = 'create'
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleUpdate: function (row) {
        this.changeDialog(true)
        this.$store.commit('GET_BY_ID', row.CodeConfigId)
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
          this.$message({
            type: 'success',
            message: '删除成功'
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
        console.log('create')
      },
      updateData: function () {
        console.log('update')
      },
      closeBloomDialog: function () {
        this.changeDialog(false)
      },
      changeDialog: function (v) {
        this.$store.commit('CHANGE_DIALOG', { val: v })
        this.dialogFormVisible = this.$store.getters.isShowDialog
      },
      handleImportBloomConfig() {
        console.log('import bloomBerg config')
      }
    }
  }
</script>

<style scoped>

</style>

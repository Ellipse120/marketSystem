<template>
  <div class="app-container">
    <!-- filter -->
    <div class="filter-container">
      <el-input placeholder="请输入彭博代码" style="width: 200px;" v-model="listQuery.MDBCodeId" class="filter-item">
      </el-input>
      <el-select placeholder="行情类型" v-model="listQuery.PriceType" class="filter-item">
        <el-option v-for="item in varietyOptions" :key="item.$index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select placeholder="请求类型" v-model="listQuery.RequestType" class="filter-item">
        <el-option v-for="item in varietyOptions" :key="item.$index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select placeholder="市场活动类型" v-model="listQuery.BloombergDataType" class="filter-item">
        <el-option v-for="item in varietyOptions" :key="item.$index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" plain class="filter-item">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" class="filter-item" @click="handleCreate">添加</el-button>
    </div>

    <!-- table -->
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="BloombergCode"
          label="彭博代码"
          align="center">
        </el-table-column>
        <el-table-column
          prop="PriceType"
          label="行情类型"
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
          label="操作"
          align="center"
          fixed="right"
          width="200">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit-outline" size="mini" @click="handleUpdate(scope.row)">编辑
            </el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="100px"
                 style='width: 400px; margin-left:50px;'>
          <el-form-item label="彭博代码">
            <el-input v-model="temp.BloombergCode"></el-input>
          </el-form-item>
          <el-form-item label="行情类型">
            <el-select class="filter-item" v-model="temp.PriceType" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求类型">
            <el-input v-model="temp.RequestType"></el-input>
          </el-form-item>
          <el-form-item label="市场活动类型">
            <el-select class="filter-item" v-model="temp.BloombergDataType" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求时间区间">
            <el-date-picker
              v-model="value4"
              type="datetimerange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker :readonly="dialogStatus ==='update'" v-model="temp.CreationTime" type="datetime"
                            disabledDate="return true" placeholder="选择日期时间"
                            style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="最后更新时间">
            <el-date-picker :readonly="dialogStatus ==='update'" v-model="temp.LastUpdateTime" type="datetime"
                            disabledDate="return true" placeholder="选择日期时间"
                            style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button v-if="dialogStatus === 'create'" type="primary" @click="createData">确 定</el-button>
          <el-button type="primary" v-else @click="updateData">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
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
        tableData: [
          {
            BloombergCode: 'CU3 Comdty',
            PriceType: '结算价',
            RequestType: '历史日内行情_含时间段',
            BloombergDataType: 'open',
            RequestStartTime: new Date().toLocaleString(),
            RequestEndTime: new Date().toLocaleString(),
            CreationTime: new Date().toLocaleString(),
            LastUpdateTime: new Date().toLocaleString()
          },
          {
            BloombergCode: 'SHGFMAUT Index',
            PriceType: '时点价',
            RequestType: '历史日内行情_含时间段',
            BloombergDataType: 'open',
            RequestStartTime: new Date().toLocaleString(),
            RequestEndTime: new Date().toLocaleString(),
            CreationTime: new Date().toLocaleString(),
            LastUpdateTime: new Date().toLocaleString()
          },
          {
            BloombergCode: 'SHGFMAUT Index',
            PriceType: '时点价',
            RequestType: '历史日内行情_含时间段',
            BloombergDataType: 'close',
            RequestStartTime: new Date().toLocaleString(),
            RequestEndTime: new Date().toLocaleString(),
            CreationTime: new Date().toLocaleString(),
            LastUpdateTime: new Date().toLocaleString()
          },
          {
            BloombergCode: 'HG{0} Comdty',
            PriceType: '结算价',
            RequestType: '历史日内行情_含时间段',
            BloombergDataType: 'close',
            RequestStartTime: new Date().toLocaleString(),
            RequestEndTime: new Date().toLocaleString(),
            CreationTime: new Date().toLocaleString(),
            LastUpdateTime: new Date().toLocaleString()
          }
        ],
        temp: {
          BloombergCode: '',
          PriceType: '',
          RequestType: '',
          BloombergDataType: '',
          RequestStartTime: '',
          RequestEndTime: '',
          CreationTime: '',
          LastUpdateTime: ''
        },
        dialogFormVisible: false,
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
    methods: {
      resetTemp: function () {
        this.temp = {
          BloombergCode: '',
          PriceType: '',
          RequestType: '',
          BloombergDataType: '',
          RequestStartTime: '',
          RequestEndTime: '',
          CreationTime: '',
          LastUpdateTime: ''
        }
      },
      handleCreate: function () {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleUpdate: function (row) {
        this.temp = Object.assign({}, row)
        this.temp.CreationTime = new Date() + ''
        this.temp.LastUpdateTime = new Date() + ''
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
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
      createData: function () {
        console.log('create')
      },
      updateData: function () {
        console.log('update')
      }
    }
  }
</script>

<style scoped>

</style>

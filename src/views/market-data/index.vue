<template>
  <div class="app-container">
    <!-- filter ↓ -->
    <div class="filter-container">
      <el-input placeholder="请输入市场编码" style="width: 200px;" v-model="listQuery.MDBCodeId" class="filter-item">
      </el-input>
      <el-select placeholder="行情类型" v-model="listQuery.PriceType" class="filter-item">
        <el-option v-for="item in varietyOptions" :key="item.$index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select placeholder="行情来源" v-model="listQuery.Source" class="filter-item">
        <el-option v-for="item in varietyOptions" :key="item.$index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select placeholder="市场类型" v-model="listQuery.MarketType" class="filter-item">
        <el-option v-for="item in varietyOptions" :key="item.$index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" plain class="filter-item">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" class="filter-item" @click="handleCreate">添加</el-button>
      <el-button type="info" icon="el-icon-download" class="filter-item">导入</el-button>
      <el-button type="success" icon="el-icon-refresh" round class="filter-item">获取彭博行情</el-button>
    </div>
    <!-- table ↓ -->
    <div>
      <el-table
        :data="tableData"
        border fit
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="MDBCodeId"
          label="市场编码Id"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="PriceType"
          align="center"
          label="行情类型">
        </el-table-column>
        <el-table-column
          prop="PriceValue"
          align="center"
          label="行情值">
        </el-table-column>
        <el-table-column
          prop="Source"
          align="center"
          label="行情来源">
        </el-table-column>
        <el-table-column
          prop="MarketType"
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
          align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

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
          <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="80px"
                   style='width: 400px; margin-left:50px;'>
            <el-form-item label="市场编码Id">
              <el-input v-model="temp.MDBCodeId"></el-input>
            </el-form-item>
            <el-form-item label="行情类型">
              <el-select class="filter-item" v-model="temp.PriceType" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="行情值">
              <el-input v-model="temp.PriceValue"></el-input>
            </el-form-item>
            <el-form-item label="行情来源">
              <el-select class="filter-item" v-model="temp.Source" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="市场类型">
              <el-select class="filter-item" v-model="temp.MarketType" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间" prop="timestamp">
              <el-date-picker :readonly="dialogStatus ==='update'" v-model="temp.timestamp" type="datetime" disabledDate="return true" placeholder="选择日期时间"
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
  </div>
</template>

<script>
  export default {
    name: 'marketDataManagement',
    created () {
    },
    data () {
      return {
        total: 4,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          MDBCodeId: '',
          PriceType: '',
          PriceValue: '',
          Source: '',
          MarketType: '',
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
            MDBCodeId: '123',
            PriceType: '上期所',
            PriceValue: '49000',
            Source: '彭博',
            MarketType: '时点价',
            LastUpdateTime: new Date().toLocaleString()
          }, {
            MDBCodeId: '122',
            PriceType: '上期所',
            PriceValue: '50170',
            Source: '手工录入',
            MarketType: '结算价',
            LastUpdateTime: new Date().toLocaleString()
          }, {
            MDBCodeId: '111',
            PriceType: 'COMEX',
            PriceValue: '52050',
            Source: '彭博',
            MarketType: '时点价',
            LastUpdateTime: new Date().toLocaleString()
          }, {
            MDBCodeId: '142',
            PriceType: '上期所',
            PriceValue: '51180',
            Source: '彭博',
            MarketType: '时点价',
            LastUpdateTime: new Date().toLocaleString()
          }
        ],
        temp: {
          MDBCodeId: '',
          PriceType: '',
          PriceValue: '',
          Source: '',
          MarketType: '',
          LastUpdateTime: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogPvVisible: false,
        rules: {}
      }
    },
    methods: {
      resetTemp: function () {
        this.temp = {
          MDBCodeId: '',
          PriceType: '',
          PriceValue: '',
          Source: '',
          MarketType: '',
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
        this.temp.timestamp = new Date()
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

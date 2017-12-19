<template>
  <div class="app-container">
    <!-- filter -->
    <div class="filter-container">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input placeholder="市场编码" v-model="listQuery.MDBCodeId" class="filter-item">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select placeholder="行情类型" v-model="listQuery.PriceType" class="filter-item">
            <el-option v-for="item in varietyOptions" :key="item.$index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select placeholder="行情来源" v-model="listQuery.Source" class="filter-item">
            <el-option v-for="item in varietyOptions" :key="item.$index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select placeholder="市场类型" v-model="listQuery.MarketType" class="filter-item">
            <el-option v-for="item in varietyOptions" :key="item.$index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-search" plain class="filter-item">搜索</el-button>
          <el-button type="primary" icon="el-icon-edit" class="filter-item" @click="handleCreate">添加</el-button>
        </el-col>
      </el-row>
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
          prop="Id"
          align="center"
          label="Id">
        </el-table-column>
        <el-table-column
          prop="MarketType"
          align="center"
          label="市场">
        </el-table-column>
        <el-table-column
          prop="ObjectId"
          align="center"
          label="交易对象">
        </el-table-column>
        <el-table-column
          :prop="marketTypeObj.code"
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
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- dialog-->
    <div>
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="80px"
                 style='width: 400px; margin-left:50px;'>
          <el-form-item label="唯一编码">
            <el-input v-model="temp.Code"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-select class="filter-item" v-model="temp.DisplayName" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Id">
            <el-input v-model="temp.Id"></el-input>
          </el-form-item>
          <el-form-item label="市场">
            <el-select class="filter-item" v-model="temp.MarketType" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易对象">
            <el-select class="filter-item" v-model="temp.ObjectId" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="marketTypeObj.label">
            <el-select class="filter-item" v-if="this.type === 'MDBFutureCode'" v-model="temp.FutureContractId"
                       placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
            <el-select class="filter-item" v-else-if="this.type === 'MDBForexCode'" v-model="temp.InterestRateId"
                       placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
            <el-select class="filter-item" v-else-if="this.type === 'MDBIborCode'" v-model="temp.ForexId"
                       placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
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
  </div>
</template>

<script>
  export default {
    name: 'code-tab-pane',
    props: {
      type: {
        type: String,
        default: 'MDBFutureCode'
      }
    },
    created () {
    },
    data () {
      return {
        total: 2,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          MDBCodeId: ''
        },
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
        statusOptions: [1, 2, 3],
        tableData: [
          {
            Code: '1',
            DisplayName: '1',
            Id: '1',
            MarketType: '1',
            ObjectId: '1',
            FutureContractId: '1'
          },
          {
            Code: '1',
            DisplayName: '1',
            Id: '1',
            MarketType: '1',
            ObjectId: '1',
            FutureContractId: '1'
          }
        ],
        temp: {
          Code: '',
          DisplayName: '',
          Id: '',
          MarketType: '',
          ObjectId: '',
          FutureContractId: '',
          InterestRateId: '',
          ForexId: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogPvVisible: false,
        rules: {},
        marketType: {
          label: '',
          code: ''
        }
      }
    },
    methods: {
      resetTemp: function () {
        this.temp = {
          Code: '',
          DisplayName: '',
          Id: '',
          MarketType: '',
          ObjectId: '',
          FutureContractId: '',
          InterestRateId: '',
          ForexId: ''
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
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.temp.ForexId = '2222'
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
      handleBloomConfig: function (row) {
        // TODO 跳转到彭博配置页面打开弹窗
        this.$router.push('bloomBerg')
      },
      createData: function () {
        console.log('create')
      },
      updateData: function () {
        console.log('update')
      }
    },
    computed: {
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
              label: '外汇编码',
              code: 'InterestRateId'
            }
            return this.marketType
          case 'MDBIborCode':
            this.marketType = {
              label: '利率编码',
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

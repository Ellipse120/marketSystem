<template>
  <div class="app-container">
    <!-- filter ↓ -->
    <div class="filter-container">
      <el-input placeholder="请输入内容" style="width: 200px;" class="filter-item"></el-input>
      <el-select placeholder="品种" v-model="listQuery.variety" class="filter-item">
        <el-option v-for="item in varietyOptions" :key="item.$index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select placeholder="交易所" v-model="listQuery.exchange" class="filter-item">
        <el-option v-for="item in varietyOptions" :key="item.$index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select placeholder="来源" v-model="listQuery.feedSource" class="filter-item">
        <el-option v-for="item in varietyOptions" :key="item.$index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select placeholder="类型" v-model="listQuery.feedType" class="filter-item">
        <el-option v-for="item in varietyOptions" :key="item.$index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" plain class="filter-item">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" class="filter-item">添加</el-button>
      <el-button type="info" icon="el-icon-download" class="filter-item">导出</el-button>
      <el-button type="success" icon="el-icon-refresh" round class="filter-item">获取彭博行情</el-button>
    </div>
    <!-- table ↓ -->
    <div>
      <el-table
        :data="tableData"
        border fit highlight-current-row
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="date"
          label="交易日期"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="exchange"
          align="center"
          label="交易所">
        </el-table-column>
        <el-table-column
          prop="commodity"
          align="center"
          label="品种">
        </el-table-column>
        <el-table-column
          prop="contract"
          align="center"
          label="合约">
        </el-table-column>
        <el-table-column
          prop="feedSource"
          align="center"
          label="来源">
        </el-table-column>
        <el-table-column
          prop="feedType"
          align="center"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="lastUpdateDate"
          align="center"
          label="更新时间">
        </el-table-column>
        <el-table-column
          prop="updater"
          align="center"
          label="更新者">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
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
          variety: '',
          commodity: '',
          exchange: '',
          feedSource: '',
          feedType: ''
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
        tableData: [{
          date: '2016-05-03',
          exchange: '上期所',
          commodity: '铜',
          contract: 'Cu1710',
          feedSource: '彭博',
          feedType: '时点价',
          lastUpdateDate: new Date().toLocaleString(),
          updater: 'Admin'
        }, {
          date: '2016-05-02',
          exchange: '上期所',
          commodity: '金',
          contract: 'dominant',
          feedSource: '手工录入',
          feedType: '结算价',
          lastUpdateDate: new Date().toLocaleString(),
          updater: 'Admin'
        }, {
          date: '2016-05-04',
          exchange: 'COMEX',
          commodity: '铜',
          contract: 'cu1809',
          feedSource: '彭博',
          feedType: '时点价',
          lastUpdateDate: new Date().toLocaleString(),
          updater: 'Admin'
        }, {
          date: '2016-05-01',
          exchange: '上期所',
          commodity: '铜',
          contract: 'cu1809',
          feedSource: '彭博',
          feedType: '时点价',
          lastUpdateDate: new Date().toLocaleString(),
          updater: 'Admin'
        }]
      }
    },
    methods: {}
  }
</script>

<style scoped>

</style>

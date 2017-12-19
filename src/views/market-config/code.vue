<template>
  <div class="app-container">
    <el-tabs v-model="activeLabel" type="border-card">
      <el-tab-pane
        v-for="item in tabMapOptions"
        :key="item.key"
        :label="item.label"
        :name="item.key">
        <span slot="label"><svg-icon :icon-class="item.key"/>{{item.label}}</span>
        <transition name="el-zoom-in-center">
          <keep-alive>
            <code-tab-pane
              v-if="activeLabel===item.key"
              :type="item.key">
            </code-tab-pane>
          </keep-alive>
        </transition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import codeTabPane from './components/codeTabPane'
  import SvgIcon from '../../components/SvgIcon/index'

  export default {
    name: 'code',
    components: {
      SvgIcon,
      codeTabPane
    },
    data () {
      return {
        tabMapOptions: [
          { label: '期货配置', key: 'MDBFutureCode' },
          { label: '外汇配置', key: 'MDBForexCode' },
          { label: '利率配置', key: 'MDBIborCode' }
        ],
        activeLabel: 'MDBFutureCode'
      }
    },
    methods: {}
  }
</script>

<style scoped>

</style>

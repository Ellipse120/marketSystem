<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created () {
      this.$store.dispatch('getMarketTypes')
      this.$store.dispatch('getPriceTypes')
      this.$store.dispatch('getAllBloombergRequestTypes')
      this.$store.dispatch('getAllQuotationSources')
    }
  }
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';
  // normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
</style>

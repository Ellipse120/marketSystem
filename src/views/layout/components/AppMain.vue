<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
    <!--<img class="gmk-logo" src="../../../assets/xgc.png" alt="" title="Welcome">-->
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    created () {
      this.$store.dispatch('getMarketTypes')
      this.$store.dispatch('getPriceTypes')
      this.$store.dispatch('getAllBloombergRequestTypes')
      this.$store.dispatch('getAllQuotationSources')
      this.$store.dispatch('getWarehouses')
      this.$store.dispatch('getContractTypes')
      this.$store.dispatch('getInterestDurations')
      this.$store.dispatch('getMDBCodes')
    },
    computed: {
      // key() {
      //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      // }
    }
  }
</script>

<style lang="scss" scoped>
  /*.gmk-logo {*/
    /*position: absolute;*/
    /*top: 95vh;*/
    /*right: 20px;*/

  /*&:hover {*/
     /*transform: rotateZ(360deg);*/
     /*transition: all 0.4s ease-in;*/
   /*}*/
  /*}*/
</style>

<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
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
    },
    computed: {
      // key() {
      //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      // }
    }
  }
</script>

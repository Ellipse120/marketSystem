<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>

      <!--<div>-->
        <!--<svg viewBox="0 0 100 100">-->
          <!--&lt;!&ndash; Symbol&ndash;&gt;-->
          <!--<symbol id="s-text">-->
            <!--<text text-anchor="middle" x="50%" y="50%" dy=".35em">G  M  T</text>-->
          <!--</symbol>-->
          <!--&lt;!&ndash; Duplicate symbols&ndash;&gt;-->
          <!--<use class="text" xlink:href="#s-text"></use>-->
          <!--<use class="text" xlink:href="#s-text"></use>-->
          <!--<use class="text" xlink:href="#s-text"></use>-->
          <!--<use class="text" xlink:href="#s-text"></use>-->
          <!--<use class="text" xlink:href="#s-text"></use>-->
        <!--</svg>-->
      <!--</div>-->

    </div>
  </div>
</template>

<script>
  import { Navbar, Sidebar, AppMain } from '@/views/layout/components'
  import { getRefreshState } from '../../utils/auth'

  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    computed: {
      sidebar () {
        return this.$store.state.app.sidebar
      }
    },
    mounted () {
      if (getRefreshState() === 'true') {
        this.$store.dispatch('REFRESH_BLOOMBERG', { 'router': this.$router })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/mixin";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

  /* Main styles for G M T */
  .text {
    fill: none;
    stroke-width: 3;
    stroke-linejoin: round;
    stroke-dasharray: 70 330;
    stroke-dashoffset: 0;
    -webkit-animation: stroke 6s infinite linear;
    animation: stroke 6s infinite linear;
  }

  .text:nth-child(5n + 1) {
    stroke: #F2385A;
    -webkit-animation-delay: -1.2s;
    animation-delay: -1.2s;
  }

  .text:nth-child(5n + 2) {
    stroke: #F5A503;
    -webkit-animation-delay: -2.4s;
    animation-delay: -2.4s;
  }

  .text:nth-child(5n + 3) {
    stroke: #E9F1DF;
    -webkit-animation-delay: -3.6s;
    animation-delay: -3.6s;
  }

  .text:nth-child(5n + 4) {
    stroke: #56D9CD;
    -webkit-animation-delay: -4.8s;
    animation-delay: -4.8s;
  }

  .text:nth-child(5n + 5) {
    stroke: #3AA1BF;
    -webkit-animation-delay: -6s;
    animation-delay: -6s;
  }

  @-webkit-keyframes stroke {
    100% {
      stroke-dashoffset: -400;
    }
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: -400;
    }
  }

  svg {
    position: absolute;
    width: 200px;
    height: 100px;
  }

</style>

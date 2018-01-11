<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">name:{{name}}</div>-->
    <!--<div class="dashboard-text">role:<span v-for='role in roles' :key='role.$index'>{{role}}</span></div>-->
    <el-row>
      <el-col :span="6" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 1 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;font-size: 24px;line-height: 46px;">
            <svg-icon icon-class="user"/><span> 用户名 : {{name}}</span>
            <div class="bottom clearfix">
              <svg-icon icon-class="role"/><span v-for='role in roles' :key='role.$index'> 用户角色 : {{role.DisplayName}}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

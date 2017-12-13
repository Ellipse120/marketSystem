import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: {
        title: '首页',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/marketDataManagement',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'marketDataManagement',
        component: _import('market-data-management/index'),
        meta: {
          title: '行情数据',
          icon: 'table'
        }
      }
    ]
  },

  {
    path: '/marketConfig',
    component: Layout,
    meta: { title: '行情配置', icon: 'example' },
    children: [
      {
        path: 'bloomBerg',
        name: 'marketConfig',
        component: _import('market-config/index'),
        meta: {
          title: '彭博配置',
          icon: 'bloombergconfig'
        }
      },
      {
        path: 'code',
        name: 'marketConfig',
        component: _import('market-config/index'),
        meta: {
          title: '编码配置',
          icon: 'config'
        }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: _import('table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: _import('tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: _import('form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


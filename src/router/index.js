import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    name: '首页',
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
    path: '/marketData',
    component: Layout,
    redirect: '/marketData/index',
    children: [
      {
        path: 'index',
        name: 'marketData',
        component: _import('market-data/index'),
        meta: {
          title: '行情数据',
          icon: 'table'
        }
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

  {
    path: '/blog',
    component: Layout,
    meta: { title: '写博客', icon: 'form' },
    children: [
      {
        path: 'index',
        name: 'blog',
        component: _import('butterCMS/index'),
        meta: { title: 'blog', icon: 'form' }
      },
      {
        path: ':slug',
        name: 'blogPost',
        component: _import('butterCMS/blog-post'),
        meta: { title: 'post-blog', icon: 'form' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/marketConfig',
    component: Layout,
    name: 'marketConfig',
    redirect: 'noredirect',
    meta: { title: '行情配置', icon: 'example', roles: ['Admin'] },
    children: [
      {
        path: 'bloomBerg',
        name: 'bloomBergConfig',
        component: _import('market-config/bloomberg'),
        meta: {
          title: '彭博配置',
          icon: 'bloombergconfig'
        }
      },
      {
        path: 'code',
        name: 'codeConfig',
        component: _import('market-config/code'),
        meta: {
          title: '编码配置',
          icon: 'config'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example', roles: ['Admin'] },
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
        meta: { title: 'Form', icon: 'form', roles: ['Admin'] }
      }
    ]
  }
]

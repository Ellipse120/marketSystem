import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.Data.Roles
          store.dispatch('GenerateRoutes', { roles })
            .then(() => {
              router.addRoutes(store.getters.addRouters)
              next({ ...to, replace: true })
            })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败,请重新登录')
            next({ path: '/login' })
          })
        })
        next()
      } else {
        const roles = store.getters.roles
        store.dispatch('GenerateRoutes', { roles })
          .then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true })
          })
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['token'] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 TODO OPTIMIZE : 以后有需要了再添加错误代码处理
     */
    // const res = response.data
    //
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.data,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject('error')
    // } else {
    if (!response.data.Status) {
      Message({
        message: response.data.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return response.data
    // }
  },
  error => {
    debugger
    console.log('err+ 超时处理' + error)// for debug TODO 超时处理
    if (error.response) {
      Message({
        message: `${error.response.data.Message},请重新登录`,
        type: 'error',
        duration: 2 * 1000
      })
    } else {
      Message({
        message: `${error.message}, 稍后重试...`,
        type: 'error',
        duration: 2 * 1000
      })
    }
    return Promise.reject(error)
  }
)

service.interceptors.response.use(undefined, function axiosRetryInterceptor (err) {
  const config = err.config

  if (!config || !config.retry) return Promise.reject(err)

  config._retryCount = config._retryCount || 0

  if (config._retryCount >= config.retry) {
    Message({
      message: `${err.message}, 重试次数过多，请检查网络是否正常`,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(err)
  }

  config._retryCount += 1

  const backOff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve()
    }, 5000)
  })

  return backOff.then(function () {
    return service(config)
  })
})

export default service

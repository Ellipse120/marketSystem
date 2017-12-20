import request from '@/utils/request'

export function login (username, password) {
  return request({
    url: `Verification/Login?userName=${username}&password=${password}`,
    method: 'post',
    data: {
    }
  })
}

export function getInfo (token) {
  return request({
    url: '/Account/GetCurrentUserInfo',
    method: 'get',
    params: {}
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

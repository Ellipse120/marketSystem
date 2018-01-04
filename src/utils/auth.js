import Cookies from 'js-cookie'

const TokenKey = 'token'
const refreshBloombergState = 'refreshBloombergState'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getRefreshState () {
  return Cookies.get(refreshBloombergState)
}

export function setRefreshState (data) {
  return Cookies.set(refreshBloombergState, data)
}

export function removeRefreshState () {
  return Cookies.remove(refreshBloombergState)
}

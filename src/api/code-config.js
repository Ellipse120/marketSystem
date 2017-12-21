import request from '@/utils/request'

const baseUrl = '/MDBCode/'

/**
 * 获取期货配置列表
 * */
export function getAllMDBCodeConfigs (query) {
  return request({
    url: `${baseUrl}QueryList`,
    method: 'get',
    params: {
      marketType: query.marketType,
      'Pagination.CurrentPage': query.CurrentPage,
      'Pagination.PageSize': query.PageSize
    }
  })
}

/**
 * 获取期货合约
 * */
export function getAllFutureContracts () {
  return request({
    url: '/BasicFuture/QueryFutureContracts',
    method: 'get'
  })
}

/**
 * 增加期货配置
 * */
export function addFutureCode (data) {
  return request({
    url: `${baseUrl}AddMDBFutureCodes`,
    method: 'post',
    data
  })
}

/**
 * 删除期货配置
 * */
export function deleteFutureCode (data) {
  return request({
    url: `${baseUrl}DeleteList`,
    method: 'delete',
    data
  })
}

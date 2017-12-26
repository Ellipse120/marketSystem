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
 * 获取外汇
 * */
export function getAllForexes () {
  return request({
    url: '/BasicForex/QueryForexs',
    method: 'get'
  })
}
/**
 * 获取利率
 * */
export function getAllInterestRates () {
  return request({
    url: '/BasicInterestRate/QueryInterestRates',
    method: 'get'
  })
}

/**
 * 新增期货市场行情编码
 * */
export function addFutureCode (data) {
  return request({
    url: `${baseUrl}AddMDBFutureCodes`,
    method: 'post',
    data
  })
}

/**
 * 修改期货配置
 * */
export function updateFutureCode (data) {
  return request({
    url: `${baseUrl}UpdateList`,
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

/**
 * 增加外汇市场行情编码
 * */
export function addForexCode (data) {
  return request({
    url: `${baseUrl}AddMDBForexCodes`,
    method: 'post',
    data
  })
}

/**
 * 增加利率市场行情编码
 * */
export function addInterestRateCode (data) {
  return request({
    url: `${baseUrl}AddMDBInterestRateCodes`,
    method: 'post',
    data
  })
}

/**
 * 期货编码预览接口
 * */
export function doPreviewMDBFutureCode (data) {
  return request({
    url: `${baseUrl}PreviewMDBFutureCode/${data.id}`,
    method: 'get',
    params: data
  })
}

/**
 * 期货编码导入接口
 * */
export function doImportMDBFutureCode (data) {
  return request({
    url: `${baseUrl}ImportMDBFutureCode/${data.id}`,
    method: 'get',
    params: data
  })
}

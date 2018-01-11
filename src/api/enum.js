import request from '@/utils/request'

const baseUrl = '/BasicStaticData/'

/**
 * 查询合约类型键值对
 * */
export function getContractTypes () {
  return request({
    url: `${baseUrl}QueryContractTypes`,
    method: 'get'
  })
}

/**
 * 查询行情类型键值对
 * */
export function getPriceTypes () {
  return request({
    url: `${baseUrl}QueryPriceTypes`,
    method: 'get',
    params: {}
  })
}

/**
 * 查询彭博请求类型键值对
 * */
export function getBloombergRequestTypes () {
  return request({
    url: `${baseUrl}QueryBloombergRequestTypes`,
    method: 'get'
  })
}

/**
 * 查询转仓预设键值对
 * */
export function getWarehouses () {
  return request({
    url: `${baseUrl}QueryWarehouses`,
    method: 'get'
  })
}

/**
 * 查询市场类型键值对
 * */
export function getMarketTypes () {
  return request({
    url: `${baseUrl}QueryMarketTypes`,
    method: 'get'
  })
}

/**
 * 查询行情来源键值对
 * */
export function getQuotationSources () {
  return request({
    url: `${baseUrl}QueryQuotationSources`,
    method: 'get'
  })
}

/**
 * 查询利率周期键值对
 * */
export function getInterestDurations () {
  return request({
    url: `${baseUrl}QueryDurations`,
    method: 'get'
  })
}

/**
 * 查询行情编码键值对
 * */
export function getMDBCodes () {
  return request({
    url: `${baseUrl}QueryMDBCodes`,
    method: 'get'
  })
}

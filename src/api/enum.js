import request from '@/utils/request'

/**
 * 查询合约类型键值对ret
 * */
export function getContractTypes () {
  return request({
    url: '/BasicStaticData/QueryContractTypes',
    method: 'get'
  })
}

/**
 * 查询行情类型键值对
 * */
export function getPriceTypes () {
  return request({
    url: '/BasicStaticData/QueryPriceTypes',
    method: 'get',
    params: {}
  })
}

/**
 * 查询彭博请求类型键值对
 * */
export function getBloombergRequestTypes () {
  return request({
    url: '/BasicStaticData/QueryBloombergRequestTypes',
    method: 'get'
  })
}

/**
 * 查询转仓预设键值对
 * */
export function getWarehouses () {
  return request({
    url: '/BasicStaticData/QueryWarehouses',
    method: 'get'
  })
}

/**
 * 查询市场类型键值对
 * */
export function getMarketTypes () {
  return request({
    url: '/BasicStaticData/QueryMarketTypes',
    method: 'get'
  })
}

/**
 * 查询行情来源键值对
 * */
export function getQuotationSources () {
  return request({
    url: '/BasicStaticData/QueryQuotationSources',
    method: 'get'
  })
}

/**
 * 查询利率周期键值对
 * */
export function getDurations () {
  return request({
    url: '/BasicStaticData/QueryDurations',
    method: 'get'
  })
}

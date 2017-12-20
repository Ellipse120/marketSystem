import request from '@/utils/request'

/**
 * 获取期货合约列表 TODO 不对
 * */
export function getAllFutureContracts () {
  return request({
    url: '/BasicFuture/QueryFutureContracts',
    method: 'get'
  })
}

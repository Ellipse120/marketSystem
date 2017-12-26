import request from '@/utils/request'

const baseUrl = '/MDBData/'

/**
 * 获取市场行情列表
 * */
export function getAllMDBData (query) {
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
 * 新增市场行情
 * */
export function addMDBData (data) {
  return request({
    url: `${baseUrl}AddList`,
    method: 'post',
    data
  })
}

/**
 * 修改市场行情
 * */
export function updateMDBData (data) {
  return request({
    url: `${baseUrl}UpdateList`,
    method: 'post',
    data
  })
}

/**
 * 删除市场行情
 * */
export function deleteMDBData (data) {
  return request({
    url: `${baseUrl}DeleteList`,
    method: 'delete',
    data
  })
}


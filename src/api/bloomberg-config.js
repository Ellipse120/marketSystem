import request from '@/utils/request'

const baseUrl = '/MDBBloomberg/'

/**
 * 获取彭博配置列表
 * */
export function getAllMDBBloombergConfigs (query) {
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
 * 新增彭博配置
 * */
export function addBloombergConfig (data) {
  return request({
    url: `${baseUrl}AddList`,
    method: 'post',
    data
  })
}

/**
 * 修改彭博配置
 * */
export function updateBloombergConfig (data) {
  return request({
    url: `${baseUrl}UpdateList`,
    method: 'post',
    data
  })
}

/**
 * 删除彭博配置
 * */
export function deleteBloombergConfig (data) {
  return request({
    url: `${baseUrl}DeleteList`,
    method: 'delete',
    data
  })
}

/**
 * 彭博预览接口
 * */
export function doPreviewMDBBloomberg (data) {
  return request({
    url: `${baseUrl}PreviewMDBBloomberg/${data.id}`,
    method: 'get',
    params: {
      sheetName: data.sheetName
    }
  })
}

/**
 * 彭博导入接口
 * */
export function doImportMDBBloomberg (data) {
  return request({
    url: `${baseUrl}ImportMDBBloomberg/${data.id}`,
    method: 'post',
    params: data
  })
}

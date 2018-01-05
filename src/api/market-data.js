import request from '@/utils/request'

const baseUrl = '/MDBData/'

/**
 * 获取市场行情列表
 * */
export function getAllMDBData (query) {
  if (query.TradeDate === null) {
    query.TradeDate = []
  }
  return request({
    url: `${baseUrl}QueryList`,
    method: 'get',
    params: {
      'query.mDBCode': query.mDBCode, // TODO 目前似乎查询结果为模糊查询。待确认
      'query.startTradeDate': query.TradeDate[0],
      'query.endTradeDate': query.TradeDate[1],
      'query.priceType': query.priceType,
      'query.source': query.source,
      'query.marketType': query.marketType,
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

/**
 * 市场行情预览接口
 * */
export function doPreviewMDBData (data) {
  return request({
    url: `${baseUrl}PreviewMDBData/${data.id}`,
    method: 'get',
    params: {
      sheetName: data.sheetName
    }
  })
}

/**
 * 市场行情导入接口
 * */
export function doImportMDBData (data) {
  return request({
    url: `${baseUrl}ImportMDBData/${data.id}`,
    method: 'post',
    params: data
  })
}

/**
 * 行情数据导入模板Id 接口
 * */
export function doExportMDBDataTemplateExcel () {
  return request({
    url: `${baseUrl}ExportMDBDataTemplateExcel`,
    method: 'get',
    params: {}
  })
}

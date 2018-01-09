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
      'query.code': query.code,
      'query.displayName': query.displayName,
      'query.marketType': query.marketType,
      'query.pagination.currentPage': query.CurrentPage,
      'query.pagination.pageSize': query.PageSize
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
    params: {
      sheetName: data.sheetName
    }
  })
}

/**
 * 期货编码导入接口
 * */
export function doImportMDBFutureCode (data) {
  return request({
    url: `${baseUrl}ImportMDBFutureCode/${data.id}`,
    method: 'post',
    params: data
  })
}

/**
 * 外汇编码预览接口
 * */
export function doPreviewMDBForexCode (data) {
  return request({
    url: `${baseUrl}PreviewMDBForexCode/${data.id}`,
    method: 'get',
    params: {
      sheetName: data.sheetName
    }
  })
}

/**
 * 外汇编码导入接口
 * */
export function doImportMDBForexCode (data) {
  return request({
    url: `${baseUrl}ImportMDBForexCode/${data.id}`,
    method: 'post',
    params: data
  })
}

/**
 * 利率编码预览接口
 * */
export function doPreviewMDBInterestRateCode (data) {
  return request({
    url: `${baseUrl}PreviewMDBInterestRateCode/${data.id}`,
    method: 'get',
    params: {
      sheetName: data.sheetName
    }
  })
}

/**
 * 利率编码导入接口
 * */
export function doImportMDBInterestRateCode (data) {
  return request({
    url: `${baseUrl}ImportMDBInterestRateCode/${data.id}`,
    method: 'post',
    params: data
  })
}

/**
 * 期货导入模板Id 接口
 * */
export function doExportMDBFutureCodeTemplateExcel () {
  return request({
    url: `${baseUrl}ExportMDBFutureCodeTemplateExcel`,
    method: 'get',
    params: {}
  })
}

/**
 * 外汇导入模板Id 接口
 * */
export function doExportMDBForexCodeTemplateExcel () {
  return request({
    url: `${baseUrl}ExportMDBForexCodeTemplateExcel`,
    method: 'get',
    params: {}
  })
}

/**
 * 利率导入模板Id 接口
 * */
export function doExportMDBInterestRateCodeTemplateExcel () {
  return request({
    url: `${baseUrl}ExportMDBInterestRateCodeTemplateExcel`,
    method: 'get',
    params: {}
  })
}

/**
 * 期货、外汇、利率 导出接口
 * */
export function doExportMDBCodeDataExcel (query) {
  return request({
    url: `${baseUrl}ExportMDBCodeDataExcel`,
    method: 'get',
    params: {
      'query.code': query.code,
      'query.displayName': query.displayName,
      'query.marketType': query.marketType,
      'query.pagination.currentPage': query.CurrentPage,
      'query.pagination.pageSize': query.PageSize
    }
  })
}

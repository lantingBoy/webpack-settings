import api from './API'

export function getInfo(params) {
  return api.get({
    url: 'debris/user/getInfo',
    params: params
  })
}
//getWareHouseInfo
export function getWareHouseInfo(params) {
  return api.get({
    url: 'debris/user/getWareHouseInfo',
    params: params
  })
}
//getDebrisPrizeList
export function getDebrisPrizeList(params) {
  return api.get({
    url: 'debris/user/getDebrisPrizeList',
    params: params
  })
}
//draw
export function draw(params) {
  return api.post({
    url: 'debris/user/draw',
    params: params
  })
}
//getPrizeRecordList  
export function getPrizeRecordList(params) {
  return api.get({
    url: 'debris/user/getPrizeRecordList',
    params: params
  })
}
//watchAdEnergy
export function watchAdEnergy(params) {
  return api.post({
    url: 'debris/user/watchAdEnergy',
    params: params
  })
}
//watchAd
export function watchAd(params) {
  return api.post({
    url: 'debris/user/watchAd',
    params: params
  })
}
//chargeEnergy  
export function chargeEnergy(params) {
  return api.post({
    url: 'debris/user/chargeEnergy',
    params: params
  })
}
/* 获取公告列表 */
export function getNoticeList(params) {
  return api.post({

  })
}
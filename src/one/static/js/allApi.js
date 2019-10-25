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
/* 获取公告列表 */
export function getNoticeList(params) {
  return api.post({

  })
}
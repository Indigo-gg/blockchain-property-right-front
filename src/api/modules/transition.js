/**
 * 藏品交易模块的api
 */
import { artworkTransitonApi } from '@/api/interfaces'
import { post } from '@/api/method'


export function GetAvailableOwnShares (data) {
  return post(artworkTransitonApi.GetAvailableOwnShares, data)
}


export function AddSale (data) {
  return post(artworkTransitonApi.AddSale, data)
}


export function UpdateSale (data) {
  return post(artworkTransitonApi.UpdateSale, data)
}

export function GetManageList (data) {
  return post(artworkTransitonApi.GetManageList, data)
}

/**
 * @returns {AxiosPromise}
 * @description 查看订单的总览
 */

export function OrderOverlook () {
  return post(artworkTransitonApi.OrderOverlook, '')
}


/**
 * @returns {AxiosPromise}
 * @description 获取用户订单列表
 */
export function GetOrderList (data) {
  return post(artworkTransitonApi.OrderList, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 取消用户订单
 */
export function CancelOrder (data) {
  return post(artworkTransitonApi.CancelOrder, data)
}


export function DelOrderRecord (data) {
  return post(artworkTransitonApi.DelOrder, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 获取用户订单的详情
 */
export function GetOrderDetail (data) {
  return post(artworkTransitonApi.GetOrderDetail, data)
}


/**
 * @param data
 * @returns {AxiosPromise}
 * @description 支付订单
 */
export function PayOrder (data) {
  return post(artworkTransitonApi.PayOrder, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 新增一份订单
 */
export function AddOrder (data) {
  return post(artworkTransitonApi.AddOrder, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 查看藏品使用权的发售状态
 */
export function GetUsufructStatus (data) {
  return post(artworkTransitonApi.UsufructStatus, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 查看藏品的所有权的发售状态
 */
export function GetOwnershipStatus (data) {
  return post(artworkTransitonApi.OwnershipStatus, data)
}


export function ArtworkTrace (data) {
  return post(artworkTransitonApi.AtrworkTrace, data)
}


export function AtrworkRightOverlook() {
  return post(artworkTransitonApi.ArtworkRightOverLook, '')
}

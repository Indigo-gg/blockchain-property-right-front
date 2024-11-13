import { post } from '@/api/method'
import { rightProtectApi } from '@/api/interfaces'

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 新增一起维权事件
 */
export function AddProtect (data) {
  return post(rightProtectApi.AddProtect, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 删除一起维权事件
 */
export function DelProtect (data) {
  return post(rightProtectApi.DelProtect, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 获取全部维权事件概况
 */
export function GetProtectList () {
  return post(rightProtectApi.ProtectList, null)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 获取此次维权事件详情
 */
export function GetProtectDetail (data) {
  return post(rightProtectApi.ProtectDetail, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 新增一次证据
 */
export function AddEvidence (data) {
  return post(rightProtectApi.AddEvidence, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 删除一次证据
 */
export function DelEvidence (data) {
  return post(rightProtectApi.DelEvidence, data)
}


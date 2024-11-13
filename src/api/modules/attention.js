import { post } from '@/api/method'
import { attentionApi } from '@/api/interfaces'

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 点击关注
 */
export function AddAttention (data) {
  return post(attentionApi.AddAttention, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 取消关注
 */
export function DelAttention (data) {
  return post(attentionApi.DelAttention, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 查看粉丝
 */
export function GetFansList (data) {
  return post(attentionApi.FansList, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 获取用户关注的对象
 */
export function GetFollowList (data) {
  return post(attentionApi.FollowList, data)
}



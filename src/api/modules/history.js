import { post } from '@/api/method'
import { historyApi } from '@/api/interfaces'

/**
 * @returns {AxiosPromise}
 * @description 获取历史记录
 */
export function GetHistoryList () {
  return post(historyApi.HistoryList, null)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 新增历史记录
 */
export function AddHistory (data) {
  return post(historyApi.AddHistory, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 删除历史记录
 */
export function DelHistory (data) {
  return post(historyApi.DelHistory, data)
}


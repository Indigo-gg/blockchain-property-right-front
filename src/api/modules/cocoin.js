import { post } from '@/api/method'
import { CocoinApi } from '@/api/interfaces'

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 充值CoCoins
 */
export function ChargeCocoins (data) {
  return post(CocoinApi.ChargeCocoins, data)
}

/**
 * @returns {AxiosPromise}
 * @description 查看CoCoin的余额
 */
export function CheckBalance () {
  return post(CocoinApi.CheckBalance, '')
}


/**
 * @param data
 * @returns {AxiosPromise}
 * @description 获取CoCoin账单
 */

export function GetCocoinBills (data) {
  return post(CocoinApi.CocoinBills, data)
}


/**
 * @param data
 * @returns {AxiosPromise}
 * @description 删除CoCoin的充值记录
 */

export function DelCocoinBill (data) {
  return post(CocoinApi.DelCocoinBill, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description
 */
export function CocoinWithDraw (data) {
  return post(CocoinApi.WithDraw, data)
}

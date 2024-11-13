import { post } from '@/api/method'
import { userApi } from '@/api/interfaces'

/***
 * @param data{}
 * @returns {AxiosPromise}
 * @description 通过手机验证码完成静默登陆操作
 */
export function LoginByCaptcha (data) {
  return post(userApi.LoginByCaptcha, data)
}

/**
 * @param data{}
 * @returns {AxiosPromise}
 * @description 通过密码完成登陆操作
 */
export function LoginByPwd (data) {
  return post(userApi.LoginByPwd, data)
}

/**
 * @returns {AxiosPromise}
 * @description 退出登录
 */
export function Logout () {
  return post(userApi.Logout, null)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 发送短信获取手机验证码
 */
export function SendMs (data) {
  return post(userApi.SendMs, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 使用原密码更换密码
 */
export function ChangePwd (data) {
  return post(userApi.ChangePwd, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 使用短信验证码更换密码
 */
export function ChangePwdCode (data) {
  return post(userApi.ChangePwdCode, data)
}

/**
 * @returns {AxiosPromise}
 * @description 获取用户信息
 */
export function GetUserInfo () {
  return post(userApi.GetInfo, null)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 编辑用户信息
 */

export function EditUserInfo (data) {
  return post(userApi.EditInfo, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 用户实名认证
 */
export function IdentifyRealName (data) {
  return post(userApi.IdentifyRealName, data)
}


/**
 * @param data
 * @returns {AxiosPromise}
 * @description 用户上链操作（在此之前需要实名认证通过）
 */
export function UserToBlockChain () {
  return post(userApi.UpToBlockChain, '')
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 搜索用户（根据账号或者用户名来搜索）
 */
export function SearchUser (data) {
  return post(userApi.SearchUser, data)
}


export function UserNameLeagal (data) {
  return post(userApi.UserRepeat, data)
}


export function UserLegal (data) {
  return post(userApi.UserLegal, data)
}

export function GetUserExternalInfo (data) {
  return post(userApi.UserExternal, data)
}

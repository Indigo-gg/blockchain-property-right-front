import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import Modal from 'ant-design-vue/es/modal'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import Qs from 'qs'
import { defaultLocation } from '@/config/router.config'
import router from '@/router/index'
// 创建 axios 实例
const TIMEOUT = 60000
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_HOST,
  timeout: TIMEOUT, // 请求超时时间6s
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  },
  transformRequest: [
    function (data) {
      // 在请求之前对data传参进行格式转换
      return Qs.stringify(data)
    }
  ]
})

// 异常拦截处理器
export const errorHandler = (error) => {
  console.log(error) // for debug
  // notification.error({
  //   message: 'ERROR',
  //   description: '无法连接服务'
  // })

  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers[ACCESS_TOKEN] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  const res = response.data
  if (res.code !== 0) {
    // notification.error({
    //   message: 'ERROR',
    //   description: res.msg || '发生未知错误'
    // })
    console.log('当前登录失效', res.code)
    if (res.code === 50003 || res.code === 50004 || res.code === 50005 || res.code === 50006) {
      // to re-logi
      // token失效，关闭IM
      Modal.confirm({
        'title': '系统提示',
        'content': '您当前登录已失效，请重新登录或退出',
        'ok-text': '重新登录',
        'cancel-text': '取消',
        'onOk': () => {
          store.dispatch('ResetToken').then(
            async () => {
              await router.push({ name: defaultLocation.name, params: { Login: 'auto' } })
            })
        }
      })
    }
    return Promise.reject(new Error(res.msg || 'Error'))
  } else {
    return res
  }
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios,
  TIMEOUT
}

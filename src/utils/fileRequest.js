import request, { errorHandler } from '@/utils/request'

import cloneDeep from 'lodash.clonedeep'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// 修改axios的配置，使其接受类型为blob
export const fileRequest = cloneDeep(request)

fileRequest.interceptors.request.use(config => {
  if (config.responseType) {
    config.responseType = 'blob'
  }
  const token = storage.get(ACCESS_TOKEN)
  if (token) {
    config.headers[ACCESS_TOKEN] = token
  }
  return config
}, errorHandler)

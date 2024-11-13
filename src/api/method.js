import request from '@/utils/request'

/**
 * 发送post请求
 * @param url
 * @param data
 * @returns {AxiosPromise}
 */
export function post (url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function path (params) {
  return request({
    url: '/' + params,
    method: 'post',
    data: ''
  })
}


/**
 * get方法获取文件内容
 * @param url
 * @returns {AxiosPromise}
 */
export function getFile (url) {
  return request({
    url: url,
    method: 'get',
    responseType: 'arraybuffer'
  })
}

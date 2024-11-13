import { fileRequest } from '@/utils/fileRequest'
import { fileApi } from '@/api/interfaces'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import storage from 'store'
import request from '@/utils/request'
import { post } from '@/api/method'

/**
 * @type {string}
 * @description 文件上传服务的地址
 */
export const UploadFileAddress = process.env.VUE_APP_API_HOST + fileApi.FileUpload

export function addVisibleMark (fileId) {
  return post(fileApi.AddVisibleWatermark, { fileId })
}


const fileUploadConfig = {
  headers: {
    'X-Requested-With': null,
    'Content-Type': 'multipart/form-data'
  },
  transformRequest: [
    function (data) {
      return data
    }
  ]

}

export function UploadFile (data) {
  return new Promise((resolve, reject) => {
    request.post(fileApi.FileUpload, data, fileUploadConfig)
      .then(res => {
        resolve(res)
      })
  })
}

export function VideoUpload (data) {
  return post(fileApi.VideoUpload, data)
}



/**
 * @param fileId
 * @returns {string}
 * @description 将图片文件Id与服务器地址拼接，渲染图片
 */
export function RenderPicture (fileId) {
  return process.env.VUE_APP_API_HOST + fileApi.GetPicture + `/${fileId}`
}


export function RenderVideo (fileId) {
  return process.env.VUE_APP_API_HOST + fileApi.GetVideo + `/${fileId}`
}


/**
 * @param params
 * @returns {AxiosPromise}
 * @description 下载文件接口
 */
export function DownLoadFile (params) {
  const config = {
    responseType: 'blob'
  }
  config.headers[ACCESS_TOKEN] = storage.get(ACCESS_TOKEN)
  return fileRequest.post(fileApi.FileDownload, params, config)
}

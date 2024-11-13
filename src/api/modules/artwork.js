import { post } from '@/api/method'
import { artworkApi } from '@/api/interfaces'


/**
 * @param data
 * @returns {AxiosPromise}
 * 上传新的藏品
 */
export function AddArtwork (data) {
  return post(artworkApi.ArtworkAdd, data)
}

export function ShowArtList (data) {
  return post(artworkApi.ShowArtList, data)
}


/**
 * @param data
 * @returns {AxiosPromise}
 *@description 编辑藏品信息
 */
export function EditArtwork (data) {
  return post(artworkApi.ArtworkEdit, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 删除藏品
 */
export function DelArtwork (data) {
  return post(artworkApi.ArtworkDel, data)
}

/**
 * @returns {AxiosPromise}
 * @description 获取藏品列表
 */
export function GetArtworkList(data) {
  return post(artworkApi.ArtworkList, data)
}

/**
 * @returns {AxiosPromise}
 * @description 智能检测
 */
export function ArtExamineByAI(data) {
  return post(artworkApi.ArtExamineByAI, data)
}


/**
 * @returns {AxiosPromise}
 * @description 获取公示列表
 */
export function PubList (data) {
  return post(artworkApi.PubList, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 藏品详情
 */
export function GetArtworkDetail (data) {
  return post(artworkApi.ArtworkDetail, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 根据artworkId获取藏品的简要信息
 */
export function GetArtworkBrief (data) {
  return post(artworkApi.ArtworkBrief, data)
}


/**
 * @param data
 * @returns {AxiosPromise}
 * @description 更改藏品状态
 */
export function ArtworkCgStatus (data) {
  return post(artworkApi.ArtworkCgStatus, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 给藏品添加隐水印
 */
export function AddInvisibleWatermark (data) {
  return post(artworkApi.AddInvisibleWatermark, data)
}

/**
 * @param  页的大小和页的页号
 * @returns {AxiosPromise}
 * @description 投稿中心查找我的作品
 */
export function MyUploadedArtworkList (data) {
  return post(artworkApi.MyUploadedArtworkList, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 获取藏品的创作者信息
 */
export function GetArtworkAuthors (data) {
  return post(artworkApi.ArtworkAuthors, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 获取藏品的hash
 */
export function GetArtworkHash (data) {
  return post(artworkApi.ArtworkHash, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 获取智能推荐藏品
 */
export function GetRecommends (data) {
  return post(artworkApi.IntelRecommend, data)
}

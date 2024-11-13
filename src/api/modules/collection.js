import { post } from '@/api/method'
import { collectionApi } from '@/api/interfaces'

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 点击收藏
 */
export function AddFavorite (data) {
  return post(collectionApi.AddFavorite, data)
}

/**
 * @param data
 * @returns {AxiosPromise}
 * @description 取消收藏
 */
export function DelFavorite (data) {
  return post(collectionApi.DelFavorite, data)
}

/***
 *
 * @param data
 * @returns {AxiosPromise}
 * @constructor
 */
export function DelFavoriteMore (data) {
  return post(collectionApi.DelFavoriteMore,data)
}

export function AddCollectFolder (data) {
  return post(collectionApi.AddCollectFolder, data)
}

export function DelCollectFolder (data) {
  return post(collectionApi.DelCollectFolder, data)
}

export function GetCollectionsInFolder (data) {
  return post(collectionApi.GetCollectionsInFolder, data)
}
export function ListCollectFolders () {
  return post(collectionApi.ListCollectFolders, {})
}


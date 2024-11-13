
import {post} from "@/api/method";

/**
 *getMyRoom
 */
export function getMyRoom (data){
  return post ('/showRoom/getMy',data)
}

/**
 *editMyRoom
 */
export function editMyRoom (data){
  return post ('/showRoom/edit',data)
}

/**
 *getRoomList
 */
export function getRoomList (data){
  return post ('/showRoom/list',data)
}

/**
 *addRoomWork
 */
export function addRoomWork (data){
  return post ('/showWork/add',data)
}

/**
 *getRoomWork
 */
export function getRoomWork (data){
  return post ('/showWork/list',data)
}

export function getSelectRoomWork (data){
  return post('/showRoom/workList',data)
}

/**
 *delRoomWork
 */
export function delRoomWork (data){
  return post ('/showWork/delete',data)
}

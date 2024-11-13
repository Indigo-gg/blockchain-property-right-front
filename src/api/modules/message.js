import {post} from '@/api/method'
import {messageApi} from "@/api/interfaces";

export function MessageList(data) {
  return post(messageApi.MessageList, data)
}

export function MessageSetRead(data) {
  return post(messageApi.MessageSetRead, data)
}
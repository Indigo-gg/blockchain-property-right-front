import { post } from '@/api/method'
import { rightReportApi } from '@/api/interfaces'


export function AddRightReport (data) {
  return post(rightReportApi.AddReport, data)
}

export function DelRightReport (data) {
  return post(rightReportApi.DelReport, data)
}

export function ListRightReport (data) {
  return post(rightReportApi.ReportList, data)
}

export function GetReportDetail (data) {
  return post(rightReportApi.ReportDetail, data)
}

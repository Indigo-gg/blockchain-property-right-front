import {post} from "@/api/method";
import {certificateApi} from "@/api/interfaces";

export function CertificateList(data) {
  return post(certificateApi.CertificateList, data)
}

export function CertificateDetail(data) {
  return post(certificateApi.CertificateDetail, data)
}

export function UserCertificate(data) {
  return post(certificateApi.UserCertificate, data)
}

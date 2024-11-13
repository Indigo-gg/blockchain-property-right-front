import {collectionApi} from '@/api/interfaces'
const ar = [collectionApi]
console.log('ar', ar)
export function generateApiFun (ar) {
  let sttr = ''
  for (let i = 0; i < ar.length; i++) {
    const pr = Object.keys(ar[i])
    pr.forEach(p => {
      const str = `
      /**
       *${p}
       */
     export function ${p} (data){
      return post ('${ar[i][p]}',data)
    }\n`
      sttr += str
    })
  }
  console.log('api代码生成', sttr)
}

export function generateMockFun (ar) {
  // eslint-disable-next-line no-unused-vars
  let str1 = ''
  for (let i = 0; i < ar.length; i++) {
    const pr = Object.keys(ar[i])
    pr.forEach(p => {
      const str = `
      /**
       *${p}
       */
        Mock.mock(/${ar[i][p]}/, {
        'code':0,
        'msg':"success",
        'data|20': []
       })\n`
      str1 += str
    })
    console.log('mock代码生成', str1)
  }
}

generateApiFun(ar)
generateMockFun(ar)

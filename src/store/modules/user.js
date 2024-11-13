import storage from 'store'
import {
  GetUserInfo,
  LoginByPwd,
  LoginByCaptcha,
  Logout,
  EditUserInfo,
  IdentifyRealName,
  UserToBlockChain
} from '@/api/modules/user'
import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types'
import md5 from 'md5'
const user = {
  state: {
    token: '',
    // 注册账号（手机号码）
    userProfile: {
      // 注册账号（手机号码）
      id: '',
      mobile: '',
      // 昵称
      name: '',
      // 头像文件Id
      avatar: '',
      // 生日
      birth: '',
      // 性别
      gender: '',
      // 邮箱
      email: '',
      // 用户区块链地址
      publicAdd: '',
      // 用户简介
      brief: ''
    },
    // 是否上链
    hasUpLink: false,
    // 是否登录
    hasLogin: false,
    // 是否获取用户信息
    hasUserInfo: false,
    // 是否已经实名认证
    hasIdentified: false
  },
  mutations: {
    SET_HASIDENTIFY: (state, hasIdentified) => {
     state.hasIdentified = hasIdentified
    },
    SET_HASUPLINK: (state, hasUplink) => {
      state.hasUpLink = hasUplink
    },
    SET_HASLOGIN: (state, hasLogin) => {
      state.hasLogin = hasLogin
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INFO: (state, info) => {
      state.userProfile = info
      storage.set(USER_INFO, info)
    },
    RESET_INFO: (state) => {
      state.token = ''
      state.userProfile = {}
      state.hasUserInfo = false
      state.hasLogin = false
      state.hasIdentified = false
      state.hasUpLink = false
      storage.remove(ACCESS_TOKEN)
    },
    SET_HASINFO: (state) => {
      state.hasUserInfo = state
    }
  },
  actions: {
    // 登录
    LoginPwd ({ commit }, logInfo) {
      const { mobile, password, keepLogin } = logInfo
      return new Promise((resolve, reject) => {
        const pass = md5(password)
        LoginByPwd({
          mobile: mobile,
          password: pass,
          keepLogin: keepLogin
        }).then(async response => {
          const { data } = response
          // console.log('data', data)
          let time = 2 * 60 * 60 * 1000
          if (keepLogin) {
            time = 7 * 24 * 60 * 60 * 1000
          }
          storage.set(ACCESS_TOKEN, data['accessToken'], time)
          commit('SET_TOKEN', data['accessToken'])
          commit('SET_HASLOGIN', true)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    LoginCaptcha ({ commit }, logInfo) {
      const { mobile, code, keepLogin } = logInfo
      return new Promise((resolve, reject) => {
        LoginByCaptcha({
          mobile: mobile,
          code: code,
          keepLogin: keepLogin
        }).then(async response => {
          const { data } = response
          // console.log('data', data)
          let time = 2 * 60 * 60 * 1000
          if (keepLogin) {
            time = 7 * 24 * 60 * 60 * 1000
          }
          storage.set(ACCESS_TOKEN, data['accessToken'], time)
          commit('SET_TOKEN', data['accessToken'])
          commit('SET_HASLOGIN', true)
          resolve(true)
        }).catch((error) => {
          console.log('登陆失败！！！')
          reject(error)
        })
      })
    },
    // 用户实名认证
    async IdentifyRealName ({ commit }, data) {
      return new Promise(resolve => {
        IdentifyRealName(data).then(res => {
          console.log('实名认证结果', res)
          if (res.ok) {
            commit('SET_HASIDENTIFY', true)
            resolve(true)
          }
        })
      })
    },
    // 用户上链
    async UserUpToBlockChain ({ commit }) {
      if (this.$store.getters.hasIdentified) {
        const res = await UserToBlockChain()
        console.log('用户上链结果', res)
        commit('SET_HASUPLINK', res.ok)
      }
    },
    // 获取用户信息
    async GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        GetUserInfo().then(response => {
          // console.log('用户信息', response.data)
          const { name, mobile, avatar, birth, gender, email, publicAdd, brief, id, idcard } = response.data
          const info = { name, mobile, avatar, birth, gender, email, publicAdd, brief, id, idcard }
          // 调整一下字段的名称
          info.avatar = response.data.photoFileId
          console.log('拿到了用户的个人信息', info)
          commit('SET_INFO', info)
          commit('SET_HASINFO', true)
          commit('SET_HASLOGIN', true)
          commit('SET_HASUPLINK', !!info.publicAdd)
          commit('SET_HASIDENTIFY', !!info.idcard)
          console.log('我设置了一下')
          resolve(true)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 更新用户信息
    async EditInfo ({ commit }, newInfo) {
      return new Promise((resolve, reject) => {
        EditUserInfo(newInfo).then(response => {
          console.log('更改用户信息返回结果', response)
          if (response.msg === 'success') {
            this.$store.dispatch('GetInfo')
            resolve('正在获取更新后的信息...')
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 登出
    Logout ({ commit }) {
      return new Promise((resolve) => {
        Logout().then(() => {
          commit('RESET_INFO')
          resolve()
        }).catch(() => {
          commit('RESET_INFO')
          resolve()
        })
      })
    },
    // 信息失效
    ResetToken ({ commit }) {
      return new Promise(resolve => {
        commit('RESET_INFO')
        resolve()
      })
    }
  }
}
export default user

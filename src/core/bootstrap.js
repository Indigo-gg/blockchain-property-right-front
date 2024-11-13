import store from '@/store'
import storage from 'store'
import {
  ACCESS_TOKEN,
  APP_LANGUAGE,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_SIDEBAR, TOGGLE_HIDE_HEADER,
  TOGGLE_LAYOUT, TOGGLE_NAV_THEME, TOGGLE_WEAK,
  TOGGLE_COLOR, TOGGLE_MULTI_TAB
} from '@/store/mutation-types'
// import { printANSI } from '@/utils/screenLog'
import defaultSettings from '@/config/defaultSettings'
import { UserLegal } from '@/api/modules/user'

export default function Initializer () {
  // printANSI() // 请自行移除该行.  please remove this line
  // 风格初始化
  store.commit(TOGGLE_LAYOUT, storage.get(TOGGLE_LAYOUT, defaultSettings.layout))
  store.commit(TOGGLE_FIXED_HEADER, storage.get(TOGGLE_FIXED_HEADER, defaultSettings.fixedHeader))
  store.commit(TOGGLE_FIXED_SIDEBAR, storage.get(TOGGLE_FIXED_SIDEBAR, defaultSettings.fixSiderbar))
  store.commit(TOGGLE_CONTENT_WIDTH, storage.get(TOGGLE_CONTENT_WIDTH, defaultSettings.contentWidth))
  store.commit(TOGGLE_HIDE_HEADER, storage.get(TOGGLE_HIDE_HEADER, defaultSettings.autoHideHeader))
  store.commit(TOGGLE_NAV_THEME, storage.get(TOGGLE_NAV_THEME, defaultSettings.navTheme))
  store.commit(TOGGLE_WEAK, storage.get(TOGGLE_WEAK, defaultSettings.colorWeak))
  store.commit(TOGGLE_COLOR, storage.get(TOGGLE_COLOR, defaultSettings.primaryColor))
  store.commit(TOGGLE_MULTI_TAB, storage.get(TOGGLE_MULTI_TAB, defaultSettings.multiTab))

  // 用户数据初始化
  store.commit('SET_TOKEN', storage.get(ACCESS_TOKEN))

  console.log('网站初始化拿到的一个历史token:', store.getters.token)
  if (store.getters.token) {
    // 当前有token
    store.dispatch('GetInfo')
    // UserLegal({ accessToken: store.getters.token }).then(res => {
    //   // 当前可以连接上服务
    //   if (res.ok) {
    //     res.data.legal ? store.dispatch('GetInfo') : store.dispatch('Logout')
    //   } else {
    //     // TODO
    //     // 当前连接不上服务，提示用户网络错误或者是服务器错误
    //   }
    // })
  }



  store.dispatch('setLang', storage.get(APP_LANGUAGE, 'en-US'))
  // last step
}

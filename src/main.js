// test环境才可以使用mockJs
// process.env.NODE_ENV==='test'&&require('./utils/mock/mock')
// import {myMock} from "@/utils/mock/mock";
// //
// if (process.env.NODE_ENV === 'mock') {
//   myMock()
//   console.log('mock启动')
// }
// 星空大屏
// import VueStarrySky from "vue-starry-sky"
// import "vue-starry-sky/lib/vue-starry-sky.css"
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import fullscreen from 'vue-fullscreen'
// import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
// import './permission' // permission control
import './utils/filter' // global filter
import './global.less' // global style
import particles from 'vue2-particles'
import VueAnimXyz from '@animxyz/vue'
import '@animxyz/core'
import '@/icons/index'
import moment from 'moment'
import VueClipboard from 'vue-clipboard2'
import '@/assets/font/font.css'

// import $ from 'jquery'
// import echarts from '@/views/components/Echarts/use'

// Vue.prototype.$ = $
// 挂载到vue实例中
// Vue.prototype.$echarts = echarts


Vue.config.productionTip = false
Vue.use(particles)
VueClipboard.config.autoSetContainer = true // autoSetContainer需要设置为true
Vue.use(VueClipboard)
Vue.use(VueAnimXyz)
Vue.use(fullscreen)
// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
// Vue.component('svg-icon',svgIcon)
// Vue.use(Antd)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme
moment.locale('zh-CN')
Vue.prototype.$moment = moment

// Vue.use(VueStarrySky);
// 事件总线
const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $EventBus: {
    get: function () {
      return EventBus
    }
  }
})

new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')

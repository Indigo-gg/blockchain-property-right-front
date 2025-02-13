import router, { resetRouter } from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['Login'] // no redirect whitelist
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/analysis'

// TODO 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))
  /* has token */
  if (storage.get(ACCESS_TOKEN)) {
    console.log('to.path', to.path)
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      // next()
      NProgress.done()
    } else {
      console.log('store.getters.hasGetInfo', store.getters.hasGetInfo)
      // check login user.roles is null
      if (!store.getters.hasGetInfo) {
        // request login userInfo
        store.dispatch('GetInfo').then(res => {
          // 重置路由信息
          resetRouter()
          // generate dynamic router
          console.log('GetInfo successful !')
          store.dispatch('GenerateRoutes').then(() => {
            // 根据roles权限生成可访问的路由表
            // 动态添加可访问路由表
            console.log('store.getters.addRouters', store.getters.addRouters)
            router.addRoutes(store.getters.addRouters)
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              // set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          })
        }).catch(() => {
          // notification.error({
          //   message: '错误',
          //   description: '请求用户信息失败，请重试'
          // })
          // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
          store.dispatch('Logout').then(() => {
            next({path: loginRoutePath, query: {redirect: to.fullPath}})
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

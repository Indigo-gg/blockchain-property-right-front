const getters = {
  fans: state => state.user.fans,
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  userInfo: state => state.user.userProfile,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  hasLogin: state => state.user.hasLogin,
  hasUserInfo: state => state.user.hasUserInfo,
  hasIdentified: state => state.user.hasIdentified,
  hasUpLink: state => state.user.hasUpLink,
  topHeight: state => state.page.topNavHeight,
  viewHeight: state => state.page.viewHeight
}

export default getters

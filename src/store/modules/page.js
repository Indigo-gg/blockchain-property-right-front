// 页面尺寸数据
const page = {
  state: {
    topNavHeight: '',
    viewHeight: ''
  },
  mutations: {
    SET_TOPHEIGHT: (state, topHeight) => {
      state.topNavHeight = topHeight
    },
    SET_VIEWHEIGHT: (state, vh) => {
      state.viewHeight = vh
    }
  }
}
export default page

<template>
  <div id="main-container" class="global-vars">
    <top-navigator
      ref="navigator"
      :navRoutes="navigates"
      :redirect="redirect"
      :user-state="{
        hasLogin: this.$store.getters.hasLogin,
        hasUserInfo: this.$store.getters.hasUserInfo,
        userInfo: this.$store.getters.userInfo,
      }"
      @navHeightGot="adjustHeight"
      @hide="onNavHide"
      @expose="onNavExpose"
    ></top-navigator>
    <router-view :style="mainStyle" class="main-container-view"/>
    <Particles
      id="market"
      style="height: 100%;width: 100vw"
      :particlesInit="particlesInit"
      :options="pariclesConfig"
    />
  </div>
</template>
<script>
import topNavigator from '@/views/components/TopNavigator'
import { loadFull } from 'tsparticles'

export default {
  name: 'Index',
  components: {
    topNavigator
  },
  data () {
    return {
      pariclesConfig: {},
      userId: 1,
      navHeight: 0,
      mainStyle: 'padding-top:0px',
      // 默认跳转页
      redirect: {
        name: 'Guide'
      },
      // 网站导航
      navigates: [
        {
          title: '首页',
          name: 'Home'
        },
        {
          title: '商城',
          name: 'ArtworkShop'
        },
        {
          title: '公示',
          name: 'ArtworkPublicity'
        },
        {
          title: '展馆',
          name: 'Exhibition'
        },
        // {
        //   title: '测试空间',
        //   name: 'UserSpace'
        // },
        {
          title: '个人中心',
          name: 'PersonalCenter',
          params: {
            userId: 4
          }
        }
      ],
      // 导航栏需要默认隐藏的界面列表
      navHideList: ['ExhibitionDetail', 'ExhibitionHall'],
      FoolishNavs: ['UserHome', 'ArtworkPublicity', 'UserArtwork', 'ArtworkTrace', 'UserArtworkSubmit', 'RightProtectList',
        'RightProtectDetail', 'ReportList', 'RightReportDetail', 'UserOrders', 'UserCurrency', 'UserCollections',
        'UserRecord', 'UserCertificate', 'UserExhibition', 'UserExhibitionSettings', 'UserFollows', 'UserFans']
    }
  },
  methods: {
    initParticles () {
      this.pariclesConfig = require('@/config/particles/guide.json')
    },
    async particlesInit (engine) {
      await loadFull(engine)
    },
    adjustHeight (height) {
      this.navHeight = height
      this.mainStyle = `padding-top:${height}px`
    },
    onNavHide () {
      console.log('隐藏啦')
      this.mainStyle = `padding-top:0px`
    },
    onNavExpose () {
      this.mainStyle = `padding-top:${this.navHeight}px`
    },
    async getViewHeight () {
      // const he = document.documentElement.clientHeight
      const vh = window.innerHeight
      await this.$store.commit('SET_VIEWHEIGHT', vh)
      this.$EventBus.$emit('viewHeightChange', vh)
    },
    handleFoolishNavs (route) {
      console.log('我来到了', route)
      if (this.FoolishNavs.indexOf(route.name) !== -1) {
        this.mainStyle = `padding-top:0px`
        this.$refs['navigator'].removeAffix()
      } else {
        this.mainStyle = `padding-top:${this.navHeight}`
      }
    }
  },
  mounted () {
    this.initParticles()
    this.userId = this.$store.getters.hasUserInfo ? this.$store.getters.userInfo.id : 1
    window.addEventListener('resize', this.getViewHeight)
    this.handleFoolishNavs(this.$route)
  },
  watch: {
    // 监听路由的变化从而改变某些页面的导航栏状态
    $route (to, from) {
      if (this.navHideList.indexOf(to.name) !== -1) {
        this.$refs.navigator.hideNav()
      } else {
        this.$refs.navigator.exposeNav()
      }
      this.handleFoolishNavs(to)
    },
    hasLogin (val) {
      console.log('haslogin', val)
    },
    hasUserInfo (val) {
      console.log('HASUSERINFO', val)
    },
    userInfo (val) {
      console.log('USerInfo', val)
    }
  }
}
</script>

<style>
.main-container-view {
  transition: all 0.4s ease;
  position: relative;
  /*z-index: 1;*/
}

.global-vars {
  --theme-bg-color: rgba(221, 225, 232, 0.85);
  --inactive-color: rgba(183, 190, 206, 0.99);
  --them-nav-item: #ffffff;
  --hover-menu-bg: rgba(12, 15, 25, 0.4);
}

#main-container {
  /*background-image: linear-gradient(to right bottom, #88c0fe, #83bdfd, #7dbafd, #78b6fc, #72b3fb, #77b4fb, #7cb5fb, #80b6fb, #8ebcfc, #9bc1fd, #a7c7fe, #b3cdff);*/
  background-image: linear-gradient(to right top, #0d1b25, #081c2c, #041d33, #051d3a, #0c1c40, #0f1a41, #131842, #181543, #161241, #130f3f, #110c3d, #10073b);
  position: relative;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>

<template>
  <div class="top-navigator" ref="nav" :style="navStyle" id="top-navigator" >
    <div class="container">
      <div class="logo" @click="navigateTo(redirect)">
        <!--        <img src='../../assets/images/elements/logo.png'   style='height: 50px' alt=''>-->
        <img src='http://blockchain.maplesky.cn/StaticResource/PersonalCenter/logo.png' style='height: 50px' alt=''>

      </div>
      <div id="mainListDiv" class="main_list">
        <a-row class="navlinks" type="flex" :gutter="32" justify="end">
          <a-col :span="5" v-for="item in navigates" :key="item.name" @click="navigateTo(item)" class="navlink-item">
            {{ item.title }}
          </a-col>
          <a-col :span="5" v-if="userState.hasLogin" class="navlink-item" @click="navigateTo(personal)">
            <div class="ant-dropdown-link" @click="e => e.preventDefault()">
              <AdaptiveImg
                :loaded="userState.hasUserInfo"
                img-class="avatar"
                :src="RenderAvatar(userState.userInfo.avatar)"
                :empty-src="avatarEmptySrc"
              ></AdaptiveImg>
              <span>
                  个人中心
                </span>
<!--              <a-icon type="down"/>-->
            </div>
<!--            <a-dropdown>-->
<!--              <a-menu slot="overlay" class="top-navigator-drop-menu">-->
<!--                <a-menu-item @click="navigateTo(personal)">-->
<!--                  <svg-icon icon="person"></svg-icon>-->
<!--                  个人中心-->
<!--                </a-menu-item>-->
<!--                <a-menu-item @click="userLogout">-->
<!--                  <svg-icon icon="logout"></svg-icon>-->
<!--                  退出登录-->
<!--                </a-menu-item>-->
<!--              </a-menu>-->
<!--            </a-dropdown>-->
          </a-col>
          <a-col
            :span="5"
            class="navlink-item"
            v-else
            @click="()=>{this.userState.hasLogin?'':this.$EventBus.$emit('openLogin',true)}"
          >
            登录/注册
          </a-col>
        </a-row>
      </div>
      <span class="navTrigger">
        <i></i>
        <i></i>
        <i></i>
      </span>
    </div>
  </div>
</template>

<script>
import { RenderPicture } from '@/api/modules/file'
import AdaptiveImg from '@/views/components/AdaptiveImg'

export default {
  name: 'TopNavigator',
  components: {
    AdaptiveImg
  },
  props: {
    userState: {
      type: Object,
      required: true
    },
    navRoutes: {
      type: Array,
      required: true
    },
    redirect: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      navStyle: `top:0`,
      navHeight: 0,
      navigates: [],
      personal: {},
      avatarEmptySrc: require('@/assets/images/empty/star-fall.svg')
    }
  },
  methods: {
    RenderAvatar (fileId) {
      return RenderPicture(fileId)
    },
    async UpdateUserInfo () {
      // 此接口调用前数据已更新不需重复拉取
      // await this.$store.dispatch('GetInfo')
      this.userState.userInfo = await this.$store.getters.userInfo
    },
    async userLogout () {
      await this.$store.dispatch('Logout')
      this.navigateTo({ name: 'Guide' })
    },
    navigateTo (nav) {
      if (nav.params) {
        this.$router.push({ name: nav.name, params: nav.params })
      } else {
        this.$router.push({ name: nav.name })
      }
    },
    // 隐藏导航栏
    hideNav () {
      this.navStyle = `top:-${this.navHeight}px`
      console.log(this.navStyle)
      this.$emit('hide', '')
      this.$EventBus.$emit('TopNavHide', '')
    },
    // 暴露导航栏
    exposeNav () {
      this.navStyle = `top:0`
      this.$emit('expose', '')
    },
    // 获取导航栏的高度
    getNavHeight () {
      // this.navHeight = this.$refs['nav'].clientHeight
      this.navHeight = document.getElementById('top-navigator').clientHeight
      console.log('当前高度', this.navHeight)
      this.$emit('navHeightGot', this.navHeight)
      this.$store.commit('SET_TOPHEIGHT', this.navHeight)
    },
    // 监听页面滚动的处理事件
    pageScroll (e) {
      if (document.documentElement.scrollTop > 50) {
        this.AddAffix()
      } else {
        this.removeAffix()
      }
    },
    // 手动更改样式
    AddAffix () {
      document.querySelector('#top-navigator').classList.add('affix')
      // this.$refs['nav'].classList.add('affix') //老是找不到ref
    },
    removeAffix () {
      document.querySelector('#top-navigator').classList.remove('affix')
      // this.$refs['nav'].classList.remove('affix') ////老是找不到ref
    }
  },
  mounted () {
    this.personal = this.navRoutes.pop()
    this.navigates = this.navRoutes
    this.getNavHeight()
    window.addEventListener('scroll', this.pageScroll)
    // window.addEventListener('resize', this.getNavHeight)
    this.$EventBus.$on('userInfoUpdate', this.UpdateUserInfo)
  },
  watch: {}
}
</script>

<style scoped lang='less'>
.top-navigator {
  width: 100%;
  height: auto;
  position: fixed;
  line-height: 50px;
  text-align: center;
  z-index: 999;
}

.top-navigator div.logo {
  float: left;
  width: auto;
  height: auto;
  padding-left: 3rem;
}

.top-navigator div.logo {
  text-decoration: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
}

.top-navigator div.main_list {
  width: 60%;
  height: 50px;
  float: right;
}

.top-navigator div.main_list .navlinks {
  width: 100%;
  height: 50px;
  margin: 0;
  padding: 0;
}

.top-navigator div.main_list .navlinks .navlink-item {
  font-size: 1.3em;
  width: auto;
  height: 50px;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;

  /*padding-right: 3rem;*/

  .avatar {
    width: 1.3em;
    height: 1.3em;
    border-radius: 50%;
    margin-right: 5px;
  }

  .ant-dropdown-link {
    display: flex;
    align-items: center;
  }

}

.top-navigator div.main_list .navlinks .navlink-item {
  text-decoration: none;
  color: #bbc6e3;
  line-height: 50px;
}

.top-navigator div.main_list .navlinks .navlink-item:hover {
  color: #a49bd0;
}

.affix div.main_list .navlinks .navlink-item {
  color: #d9d7d7;
}


/* Home section */


.navTrigger {
  display: none;
}

.top-navigator {
  padding-top: 10px;
  padding-bottom: 10px;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
}


/* Media qurey section */

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .container {
    margin: 0;
  }
}

@media screen and (max-width: 768px) {
  .navTrigger {
    display: block;
  }

  .top-navigator div.logo {
    margin-left: 15px;
  }

  .top-navigator div.main_list {
    width: 100%;
    height: 0;
    overflow: hidden;
  }

  .top-navigator div.show_list {
    height: auto;
    display: none;
  }

  .top-navigator div.main_list .navlinks {
    flex-direction: column;
    width: 100%;
    height: 100vh;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #1a1717;
    /*same background color of navbar*/
    background-position: center top;
  }

  .top-navigator div.main_list .navlinks .navlink-item {
    width: 100%;
    text-align: right;
    cursor: pointer;
  }

  .top-navigator div.media_button {
    display: block;
  }
}


.navTrigger {
  cursor: pointer;
  width: 30px;
  height: 25px;
  margin: auto;
  position: absolute;
  right: 30px;
  top: 0;
  bottom: 0;
}

.navTrigger i {
  background-color: #fff;
  border-radius: 2px;
  content: '';
  display: block;
  width: 100%;
  height: 4px;
}

.navTrigger i:nth-child(1) {
  -webkit-animation: outT 0.8s backwards;
  animation: outT 0.8s backwards;
  -webkit-animation-direction: reverse;
  animation-direction: reverse;
}

.navTrigger i:nth-child(2) {
  margin: 5px 0;
  -webkit-animation: outM 0.8s backwards;
  animation: outM 0.8s backwards;
  -webkit-animation-direction: reverse;
  animation-direction: reverse;
}

.navTrigger i:nth-child(3) {
  -webkit-animation: outBtm 0.8s backwards;
  animation: outBtm 0.8s backwards;
  -webkit-animation-direction: reverse;
  animation-direction: reverse;
}

.navTrigger.active i:nth-child(1) {
  -webkit-animation: inT 0.8s forwards;
  animation: inT 0.8s forwards;
}

.navTrigger.active i:nth-child(2) {
  -webkit-animation: inM 0.8s forwards;
  animation: inM 0.8s forwards;
}

.navTrigger.active i:nth-child(3) {
  -webkit-animation: inBtm 0.8s forwards;
  animation: inBtm 0.8s forwards;
}

@-webkit-keyframes inM {
  50% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(45deg);
  }
}

@keyframes inM {
  50% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(45deg);
  }
}

@-webkit-keyframes outM {
  50% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(45deg);
  }
}

@keyframes outM {
  50% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(45deg);
  }
}

@-webkit-keyframes inT {
  0% {
    -webkit-transform: translateY(0px) rotate(0deg);
  }

  50% {
    -webkit-transform: translateY(9px) rotate(0deg);
  }

  100% {
    -webkit-transform: translateY(9px) rotate(135deg);
  }
}

@keyframes inT {
  0% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(9px) rotate(0deg);
  }

  100% {
    transform: translateY(9px) rotate(135deg);
  }
}

@-webkit-keyframes outT {
  0% {
    -webkit-transform: translateY(0px) rotate(0deg);
  }

  50% {
    -webkit-transform: translateY(9px) rotate(0deg);
  }

  100% {
    -webkit-transform: translateY(9px) rotate(135deg);
  }
}

@keyframes outT {
  0% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(9px) rotate(0deg);
  }

  100% {
    transform: translateY(9px) rotate(135deg);
  }
}

@-webkit-keyframes inBtm {
  0% {
    -webkit-transform: translateY(0px) rotate(0deg);
  }

  50% {
    -webkit-transform: translateY(-9px) rotate(0deg);
  }

  100% {
    -webkit-transform: translateY(-9px) rotate(135deg);
  }
}

@keyframes inBtm {
  0% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-9px) rotate(0deg);
  }

  100% {
    transform: translateY(-9px) rotate(135deg);
  }
}

@-webkit-keyframes outBtm {
  0% {
    -webkit-transform: translateY(0px) rotate(0deg);
  }

  50% {
    -webkit-transform: translateY(-9px) rotate(0deg);
  }

  100% {
    -webkit-transform: translateY(-9px) rotate(135deg);
  }
}

@keyframes outBtm {
  0% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-9px) rotate(0deg);
  }

  100% {
    transform: translateY(-9px) rotate(135deg);
  }
}

.affix {
  transition: all 0.4s;
  padding: 0;
  background-image: linear-gradient(to right top, #dfc1dc77, #dfc1dc77, #c0c1ec77, #c0c1ec77, #c0c1ec77, #b6c7f277, #acccf577, #a3d2f777, #a1ddf977, #a5e7f977, #adf0f777, #b9f8f477);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(9.5px);
  -webkit-backdrop-filter: blur(9.5px);
}
</style>

<template>
  <div class="main" :style="UserCenterStyle">
    <div class="content">
      <div class="menu-col" :style="menuStyle">
        <SideNavigator
          ref="side-nav"
          title="个人中心"
          :menu="menus"
          redirect="UserHome"
          @toggle="SideNavToggle">
        </SideNavigator>
      </div>
      <div class="view-col" :style="contentStyle">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import SideNavigator from '@/views/components/SideNavigator'
import store from '@/store'

export default {
  name: 'UserIndex',
  components: {
    SideNavigator
  },
  data () {
    return {
      viewHeight: store.getters.viewHeight,
      contentStyle: 'min-height:100vh',
      menuStyle: ``,
      UserCenterStyle: '',
      menus: [
        {
          key: '1',
          title: '个人主页',
          sub: [
            { title: '我的主页', route: 'UserHome', icon: 'home' }
          ]
        },
        {
          key: '2',
          title: '艺术藏品',
          sub: [
            { title: '投稿中心', route: 'UserArtworkSubmit', icon: 'compose' },
            { title: '藏品管理', route: 'UserArtwork', icon: 'artwork' }
          ]
        },
        {
          key: '3',
          title: '版权证书',
          sub: [
            { title: '我的证书', route: 'UserCertificate', icon: 'certificate' }
          ]
        },
        {
          key: '4',
          title: '权益维护',
          sub: [
            { title: '维权事件', route: 'RightProtectList', icon: 'safegard' },
            { title: '举报事件', route: 'ReportList', icon: 'report' }
          ]
        }, {
          key: '5',
          title: '我的资产',
          sub: [
            {title: '交易记录', route: 'UserOrders', icon: 'transaction'},
            {title: '财富储值', route: 'UserCurrency', icon: 'wallet'}
          ]
        },
        {
          key: '6',
          title: '展厅',
          sub: [
            {title: '我的展厅', route: 'UserExhibition', icon: 'exhibate'}]
        },
        {
          key: '7',
          title: '关注与粉丝',
          sub: [
            {title: '我的关注', route: 'UserFollows', icon: 'follow'},
            {title: '我的粉丝', route: 'UserFans', icon: 'fans'}
          ]
        },
        {
          key: '8',
          title: '收藏',
          sub: [
            {title: '我的收藏', route: 'UserCollections', icon: 'collect'},
            {title: '历史记录', route: 'UserRecord', icon: 'record'}
          ]
        },
        // {
        //   key: '9',
        //   title: '消息中心',
        //   sub: [
        //     {title: '我的消息', route: 'UserMessages', icon: 'msgs'},
        //     {title: '投递信息', route: 'UserMessageSend', icon: 'pencil'}
        //   ]
        // }
      ],
      pariclesConfig: []
    }
  },
  methods: {
    SideNavToggle (scroll) {
      let sideNavWidth = ''
      if (scroll) {
        sideNavWidth = '5em'
      } else {
        sideNavWidth = '200px'
      }
      this.contentStyle = `margin-left:${sideNavWidth}`
      this.menuStyle = `width:${sideNavWidth}`
    },
    AdjustHeight () {
      const viewH = window.innerHeight
      const topHeight = this.$store.getters.topHeight
      const h = viewH - topHeight
      // this.contentStyle = `height:${h}px`
      this.UserCenterStyle = `height:${h}px;overflow:hidden;margin-top:${topHeight}px;padding-top:0px`
      // document.getElementById('user-center-wrapper').style.height = h
    }
    // sideNavLoaded (width) {
    //   console.log(width)
    //   this.sideNavWidth = width
    //   window.addEventListener('mousemove', ev => {
    //     if (this.$refs['side-nav'].$data.scrolled && ev.clientX < width) {
    //       console.log('隐藏隐藏')
    //       this.$refs['side-nav'].unscroll()
    //     } else if (!this.$refs['side-nav'].$data.scrolled && ev.clientX > width) {
    //       console.log('出现出现')
    //       this.$refs['side-nav'].enscroll()
    //     } else {
    //       console.log(this.$refs['side-nav'].$data.scrolled)
    //       console.log(ev.clientX)
    //     }
    //   })
    // }
  },
  mounted () {
    // 进入了个人中心页面
    const h = this.$store.getters.viewHeight
    this.AdjustHeight(h)
    this.SideNavToggle(false)
    this.$EventBus.$on('viewHeightChange', this.AdjustHeight)
  },
  beforeDestory () {
    // 离开了个人中心页面
  }
}
</script>

<style scoped lang='less'>

.main {
  background-size: contain;
  overflow: hidden;
  width: 100vw;
}

/* 整个滚动条 */
::-webkit-scrollbar {
  /* 对应纵向滚动条的宽度 */
  width: 10px;
  /* 对应横向滚动条的宽度 */
  height: 10px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  background-color: #49b1f5;
  border-radius: 32px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background-color: #dbeffd;
  border-radius: 32px;
}

#user-home-particles canvas {
  height: 100% !important;
  width: 100% !important;
  position: absolute !important;
}

.content {
  height: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  position: relative;
  z-index: 9;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.5s ease;

  .menu-col, .view-col {
    overflow-x: hidden;
    height: 100vh;
    overflow-y: scroll;
    transition: all 0.4s ease;
  }

  .menu-col {
    overflow: hidden;
    float: left;
  }
}


</style>

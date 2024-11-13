<template>
  <div class="main">
    <div class="content">
      <div class="menu-col" :style="menuStyle">
        <SideNavigator
          ref="side-nav"
          title="权益中心"
          :menu="menus"
          redirect="UserHome"
          @toggle="SideNavToggle"></SideNavigator>
      </div>
      <div class="view-col" :style="contentStyle">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import SideNavigator from '@/views/components/SideNavigator'

export default {
  name: 'Index',
  components: {
    SideNavigator
  },
  data () {
    return {
      contentStyle: ``,
      menuStyle: ``,
      menus: [
        {
          key: '1',
          title: '我的版权',
          sub: [{
            title: '我的版权', route: 'UserRights', icon: 'certificate '
          }]
        },
        {
          key: '2',
          title: '权益维护',
          sub: [
            { title: '我的维权', route: 'RightProtectList', icon: 'list' },
            { title: '发起维权', route: 'RightProtect', icon: 'safegard', params: { artworkId: '0' } }
          ]
        },
        {
          key: '3',
          title: '违规举报',
          sub: [
            { title: '我的举报', route: 'ReportList', icon: 'list' },
            { title: '发起举报', route: 'RightReport', icon: 'report', params: { artworkId: '0' } }
          ]
        }
      ]
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
    }
  },
  mounted () {
    this.SideNavToggle(false)
  }
}
</script>

<style scoped lang='less'>
.main {
  min-height: 100vh;
  //background-color: var(--theme-bg-color);
}

#user-home-particles {
  height: 100vh !important;
}

#user-home-particles canvas {
  height: 100% !important;
  width: 100% !important;
  position: absolute !important;
}

.content {
  height: 95%;
  width: 100%;
  //background: rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  position: relative;
  z-index: 9;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.5s ease;
  overflow: hidden;

  .menu-col, .view-col {
    overflow-x: hidden;
    height: 100vh;
    overflow-y: scroll;
    transition: all 0.4s ease;
  }

  .menu-col {
    float: left;
  }
}


</style>

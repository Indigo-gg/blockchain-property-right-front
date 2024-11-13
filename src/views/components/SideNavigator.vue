<template>
  <div class="menu" ref="side-navigator">
    <div class="header">
      <xyz-transition>
        <div v-if="!scrolled" xyz="fade left" class="title" :class="scrolled?'scrolled':''">{{ title }}</div>
      </xyz-transition>
      <div class="toggle-btn" @click="toggleScroll">
        <svg-icon icon="tri-btn"></svg-icon>
      </div>
      <a-tooltip
        @click="toggleScroll"
        style="cursor: pointer"
        :title="scrolled? '展开菜单' :'收缩菜单'"
        placement="right">
        <div class="toggle-tip"></div>
      </a-tooltip>
    </div>
    <a-divider></a-divider>
    <div v-for="item in menu" class="nav-group" :key="item.key" :class="scrolled?'scrolled':''">
      <xyz-transition>
        <div class="group-title" :class="scrolled?'scrolled':''"><span v-if="!scrolled" xyz="fade left">{{ item.title }}</span></div>
      </xyz-transition>
      <div
        :ref="setTimeRef"
        :key="nav.route"
        class="nav-item xyz-nested"
        :class=" {scrolled:scrolled,selected:nav.route==curRoute}"
        v-for="nav in item.sub"
        @mouseover="navHover(nav.title)"
        @mouseleave="navLeave"
        @click="navigateTo(nav.route,nav.params)">
        <span class="nav-item-icon" :class="scrolled?'scrolled':''"><svg-icon :icon="nav.icon" color="#92a6d5;"></svg-icon></span>
        <a-tooltip
          v-if="scrolled"
          :visiable="nav.title===curHoverNav"
          @visibleChange="test"
          :title="nav.title"
          placement="right">
          <div
            style="height: 3em;width: 3em;background-color: transparent;position: absolute;z-index: 99;top:50%;left: 50%;transform: translate(-50%,-50%)"></div>
        </a-tooltip>
        <xyz-transition>
          <div xyz="fade right" v-if="!scrolled" class="nav-item-title" :class="scrolled?'scrolled':''">{{ nav.title }}
          </div>
        </xyz-transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SideNavigator',
  props: {
    title: {
      type: String
    },
    redirect: {
      type: String,
      required: true
    },
    menu: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      curRoute: '',
      scrolled: false,
      curHoverNav: '',
      curSelected: this.redirect,
      lastSelected: '',
      refList: []
    }
  },
  methods: {
    setTimeRef (el) {
      console.log(el)
    },
    navigateTo (route, params) {
      // console.log(pathName, this.$refs)
      // this.lastSelected = this.curSelected
      // this.$refs[`${this.lastSelected}`].classList.remove('selected')
      // this.curSelected = pathName
      // this.$refs[`${this.curSelected}`].classList.add('selected')
      console.log(route, params, '?????????')
      if (params) {
        this.$router.push({ name: route, params: params })
      } else {
        this.$router.push({ name: route })
      }
    },
    toggleScroll () {
      this.scrolled = !this.scrolled
      this.$emit('toggle', this.scrolled)
    },
    navHover (e) {
      if (this.scrolled) {
        this.curHoverNav = e
      }
    },
    navLeave () {
      if (this.scrolled) {
        this.curHoverNav = ''
      }
    },
    test (e) {
      console.log(e)
    }
  },
  mounted () {
    // 初次跳转至个人中心时选中路径为当前路径
    this.curRoute = this.$route.name
  },
  watch: {
    // 个人中心内跳转的选择项
    $route (to, from) {
      console.log('', to.name)
      this.curRoute = to.name
    }
  }
}
</script>

<style scoped lang='less'>
.menu {
  width: 100%;
  height: 100%;
  padding: 1em 0;
  overflow-x: hidden;
  overflow-y: scroll;
  border-right: 1px solid #999999;
  transition: all 0.5s ease;
  position: relative;
  .header {
    color: #FFFFFF;
    padding: 0 15px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .title {
      height: 2em;
      line-height: 2em;
      overflow: hidden;
    }

    .toggle-tip {
      height: 3em;
      width: 3em;
      background-color: transparent;
      position: absolute;
      z-index: 99;
      top: 50%;
      right: 15px;
      transform: translateY(-50%)
    }

    .toggle-tip:hover ~ .toggle-btn {
      //background-color: var(--hover-menu-bg);
    }

    .toggle-btn {
      cursor: pointer;
      font-size: 2em;
      padding: 5px;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.scrolled {
        margin: 0 auto;
      }

      &:hover {
        background-color: var(--hover-menu-bg);
      }
    }
  }
}

.nav-group {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  margin: 10px;
  transition: all 0.4s ease-in-out;

  &.scrolled {
    margin: 0 10px;
  }

  .group-title {
    color: #dde7f5;
    font-weight: bold;
    margin-bottom: 14px;
    height: 1.2em;
    font-size: 1.2em;
    font-weight: 500;
    transition: all 0.4s ease-in-out;

    &.scrolled {
      height: 0;
      margin-bottom: 0;
    }
  }

  .nav-item {
    color: #92a6d5;
    font-weight: bold;
    position: relative;
    width: 100%;
    letter-spacing: 3px;
    font-size: 1.1em;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.4s ease;
    margin: 10px auto;
    overflow: hidden;
    padding: 0.5em;

    &.selected {
      background-color: rgba(252, 252, 252, 0.15);
      color: #146fc5;
    }

    &:hover {
      background-color: rgba(252, 252, 252, 0.15);
      color: #3f7bc9;
    }

    &.scrolled {
      width: 3em;
      margin: 15px auto;
      display: flex;
      padding: 0.5em 0;
    }

    .nav-item-title {
      display: inline-block;
      transition: all 0.4s ease;
      margin-left: 7px;

      &.scrolled {
        width: 0;
      }
    }

    .nav-item-icon {
      transition: all 0.4s ease;
      display: inline-block;

      &.scrolled {
        width: 1em;
        transform: translateX(1em);
      }
    }
  }
}
</style>

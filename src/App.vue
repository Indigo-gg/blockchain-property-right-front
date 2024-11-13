<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'

export default {
  data () {
    return {
      // navigates-item:title:导航标题、name：路由名称(对应
    }
  },
  computed: {
    locale () {
      // 只是为了切换语言时，更新标题
      const { title } = this.$route.meta
      title && (setDocumentTitle(`${i18nRender(title)} - ${domTitle}`))
      return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    }
  },
mounted () {
  // 检测浏览器路由改变页面不刷新问题,hash模式的工作原理是hashchange事件
  window.addEventListener('hashchange', () => {
    const currentPath = window.location.hash.slice(1)
    if (this.$route.path !== currentPath) {
      this.$router.push(currentPath)
    }
  }, false)
}
}
</script>

<style>
#app{
}
</style>

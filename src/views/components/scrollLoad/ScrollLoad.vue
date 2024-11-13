<template>
  <div
    ref="scrollView"
    id="scroll-view"
    @scroll="handleScroll($event)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ScrollLoad',
  methods: {
    handleScroll (e) {
      const scrollHeight = this.$refs.scrollView.scrollHeight
      const clientHeight = this.$refs.scrollView.clientHeight
      const scrollTop = this.$refs.scrollView.scrollTop
      if (scrollHeight - (scrollTop + clientHeight) <= 1) {
        this.$emit('handleScroll')
      }
    }
  }
}
</script>

<style scoped>
#scroll-view{
  height: 100%;
  /*width: 100%;*/
  overflow: scroll;
  /*overflow-y: scroll*/

}
</style>

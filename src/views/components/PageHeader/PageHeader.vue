<template>
  <a-page-header style='width: 100%'>
    <div class="title" slot="title">{{ title }}</div>
    <div class="sub-title" slot="subTitle">{{ subTitle }}</div>
    <div class="extra" slot="extra">
      <slot name="extra"></slot>
    </div>
    <div v-if="backIcon" class="back-icon" slot="backIcon" @click="$router.go(-1)">上一页</div>
    <slot name="content"></slot>
    <div class="footer" slot="footer">
      <slot name="footer"></slot>
    </div>
  </a-page-header>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    subTitle: {
      type: String,
      default: ''
    },
    backIcon: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>

.title {
  color: #eeeeee;
  font-size: 1.2em;
}

.back-icon:hover {
  cursor: pointer;
}
</style>

<template>
  <div class="card-box">
    <img :src="imgPath" alt="图片" class="icon" :style="imgStyle()"/>
    <div class="title">
      {{ title }}
    </div>
    <slot class="content" name="contents"></slot>
    <svg
      v-if="tapable"
      @mouseover="iconActive"
      @mouseout="iconInactive"
      @click="tapCard"
      t="1670593933878"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2295"
      data-spm-anchor-id="a313x.7781069.0.i0"
      :width="icon.width"
      :height="icon.height">
      <path
        d="M512 896c-211.776 0-384-172.224-384-384s172.224-384 384-384 384 172.224 384 384-172.224 384-384 384zM512 192C335.552 192 192 335.552 192 512s143.552 320 320 320 320-143.552 320-320-143.552-320-320-320z"
        p-id="2296"
        data-spm-anchor-id="a313x.7781069.0.i1"
        class="selected"
        :fill="icon.fill"></path>
      <path
        d="M640 544H384a32 32 0 0 1 0-64h256a32 32 0 0 1 0 64z"
        p-id="2297"
        data-spm-anchor-id="a313x.7781069.0.i3"
        class="selected"
        :fill="this.icon.fill"></path>
      <path
        d="M512 672a32 32 0 0 1-22.464-54.784l105.216-103.68-105.536-107.072a32 32 0 1 1 45.568-44.928l128 129.792a32 32 0 0 1-0.32 45.312l-128 126.208A32.128 32.128 0 0 1 512 672z"
        p-id="2298"
        data-spm-anchor-id="a313x.7781069.0.i2"
        class="selected"
        :fill="icon.fill"></path>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'MyCard',
  props: {
    // 卡片id
    ckey: Number,
    // 是否可点击
    tapable: {
      type: Boolean,
      default: true
    },
    // 图片属性
    img: {
      type: Object,
      default: () => ({})
    },
    title: String,
    content: String
  },
  data () {
    return {
      // 图片是否圆角
      imgPath: this.$props.img.path,
      radius: this.$props.img.radius,
      width: this.$props.img.width,
      height: this.$props.img.height,
      icon: {
        fill: '#cdcdcd',
        height: '30px',
        width: '30px'
      }
    }
  },
  methods: {
    imgStyle () {
      return {
        width: this.width,
        height: this.height,
        borderRadius: this.radius ? '50%' : 'none'
      }
    },
    iconActive () {
      this.icon.fill = '#6bb8f7'
    },
    iconInactive () {
      this.icon.fill = '#cdcdcd'
    },
    // 子组件向父组件传值，传递卡片的ckey
    tapCard () {
      this.$emit('catchTap', this.ckey)
    }
  }
}
</script>

<style scoped>
.card-box {
  border-radius: 5px;
  position: relative;
  padding: 10px;
  transition: all ease-in-out 400ms;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.card-box:hover {
  transform: translateY(-5px);
  box-shadow: 1px 0.9px 5.7px rgba(0, 0, 0, 0.051),
  3.4px 2.9px 8.9px rgba(0, 0, 0, 0.062),
  15px 13px 27px rgba(0, 0, 0, 0.15);
}

.title {
  font-size: 32px;
  color: rgba(28, 28, 28, 0.98);
}


</style>

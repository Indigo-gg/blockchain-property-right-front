<template>
  <!--自适应图片-->
  <div ref="adaptive-img-box" :style="ImgStyle" class="adaptive-img-box">
    <template v-if="imgLoading">
      <a-spin class="img-spin">
      </a-spin>
    </template>
    <template v-else>
      <img
        v-if="imgLoaded"
        :src="src"
        :alt="alt"
        ref="adaptive-img"
        class="adaptive-img"
        @load="imgLoad"
        @error="()=>{this.imgLoaded=false}"
      >
      <img v-else :src="emptySrc" alt="图片加载失败" style="width: 100%;height: 100%">
    </template>
  </div>
</template>

<script>
import { TIMEOUT } from '@/utils/request'

export default {
  name: 'AdaptiveImg',
  props: {
    // 图片源
    loaded: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      required: true
    },
    // 缺省图片
    emptySrc: {
      type: String,
      default: require('@/assets/images/empty/img-empty.svg')
    },
    alt: {
      type: String,
      default: '图片'
    },
    // 图片高度
    height: {
      type: String,
      default: '100%'
    },
    // 图片宽度
    width: {
      type: String,
      default: '100%'
    },
    imgClass: {
      type: String
    }
  },
  data () {
    return {
      ImgStyle: '',
      imgLoaded: true,
      imgLoading: true
    }
  },
  mounted () {
    this.imgLoading = !this.loaded
    const _this = this
    setTimeout(() => {
      if (_this.imgLoading) {
        _this.imgLoading = false
        _this.imgLoaded = false
      }
    }, TIMEOUT)
    if (this.imgClass) {
      this.ImgStyle = ''
      this.$refs['adaptive-img-box'].classList.add(this.imgClass)
    } else if (this.height && this.width) {
      this.ImgStyle = `height:${this.height};width:${this.width}`
    }
  },
  methods: {
    imgLoad (e) {
      // console.log('imgload',e)
    }
  },
  watch: {
    loaded (val) {
      this.imgLoading = !val
    }
  }
}
</script>

<style scoped lang='less'>
.adaptive-img-box {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  .adaptive-img {
    //max-height: 100%;
    //max-width: 100%;
    //width: 100%;
    //height: auto;
    object-fit: cover;
    height: 100%;
    width: 100%;
    display: block;
    border-radius: 5px;
  }
}
</style>

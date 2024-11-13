<template>
  <video-player
    :style="{width: width,height: height,borderRadius:'10px'}"
    class="video-player"
    :options="playerOptions"
    ref="videoPlayer"></video-player>
</template>

<script>
// import { RenderPicture } from '@/api/file'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
// import
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'NodeVideo',
  components: {
    videoPlayer
  },
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      type: String
    },
    height: {
      type: String
    }
  },
  data () {
    return {
      previewVisible: true,
      // options: {
      // 视频控制设置
      playerOptions: {
        playbackRates: [1.0, 2.0], // 可选的播放速度
        // autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 类型
            src: this.src // url地址
          }
        ],
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: true, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      }
      // },
    }
  },
  methods: {
    preview (item) {
      this.curImg = item.src
      this.previewVisible = true
    },
    handleCancel () {
      this.previewVisible = false
    },
    handleOk () {
      this.$emit('handleMark', this.curImg)
      this.previewVisible = false
    },
    reload (url) {
      this.playerOptions.sources[0].src = url
    }
  }
}
</script>

<style scoped>
/*.video{*/
/*  width: 100%;*/
/*  height: auto;*/
/*  display: block;*/
/*  margin: auto;*/
/*  border-radius: 10px;*/
/*  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);*/
/*}*/
/*.video-player{*/
/*  width;*/
/*}*/
</style>

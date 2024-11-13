<template>
  <div id="box" ref="box">
    <img v-for="img in imgList" :src="img.src" :alt="img.alt" :key="img.fileId">
    <p>{{ text }}</p>
  </div>
</template>
<script>
export default {
  name: '3DCarousel',
  props: {
    imgList: {
      type: Array,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      imgs: [],
      sX: 0,
      sY: 0,
      nX: 0,
      nY: 0,
      desX: 0,
      desY: 0,
      tX: 0,
      tY: 10,
      radius: 170,
      box: {}
    }
  },
  methods: {
    init (delayTime) {
      for (let i = 0; i < this.imgs.length; i++) {
        this.imgs[i].style.transform = `rotateY( ${i * (360 / this.imgs.length)}deg) translateZ(${this.radius}px)`
        this.imgs[i].style.transition = 'transform 1s'
        this.imgs[i].transitionDelay = `${(delayTime || (this.imgs.length - i)) / 4}s`
      }
    },
    applyTranform () {
      const x = -this.tY
      const y = this.tX
      this.box.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg)'
    }
  },
  mounted () {
    // 获取img列表
    this.imgs = this.$refs.box.getElementsByTagName('img')
    this.box = document.getElementById('box')
    this.init()
    const _this = this
    document.onmousedown = function (e) {
      clearInterval(_this.box.timer)
      e = e || window.event
      _this.sX = e.clientX
      _this.sY = e.clientY
      this.onmousemove = function (e) {
        e = e || window.event
        _this.nX = e.clientX
        _this.nY = e.clientY
        _this.desX = _this.nX - _this.sX
        _this.desY = _this.nY - _this.sY
        _this.tX = _this.tX + _this.desX * 0.1
        _this.tY = _this.tY + _this.desY * 0.1
        _this.applyTranform()
        _this.sX = _this.nX
        _this.sY = _this.nY
      }
      const that = this
      this.onmouseup = function (e) {
        that.onmousemove = null
        that.onmouseup = null
        const timer = setInterval(function () {
          _this.desX = _this.desX * 0.9
          _this.desY = _this.desY * 0.9
          _this.tX += _this.desX * 0.1
          _this.tY += _this.desY * 0.1
          _this.applyTranform()
          if (Math.abs(_this.desX) < 0.5 && Math.abs(_this.desY) < 0.5) {
            console.log(true)
            clearInterval(timer)
          }
        }, 5)
      }
      return false
    }
  }
}
</script>
<style scoped>
#box {
  position: relative;
  display: flex;
  width: 130px;
  height: 170px;
  margin: auto;
  transform-style: preserve-3d;
  transform: rotateX(-10deg);
}

#box > img {
  transform-style: preserve-3d;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  box-shadow: 0 0 10px #fff;
  /*-webkit-box-reflect: below 10px linear-gradient(#fff0, #fff4);*/
}

#box > p {
  margin: auto;
  transform: translateY(100px) rotateX(90deg);
  background-color: #0005;
  color: #fff;

}
</style>

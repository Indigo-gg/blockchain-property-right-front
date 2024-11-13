<template>
  <div class="space">
    <svg width="540" height="560" viewBox="0 0 540 560" xmlns="http://www.w3.org/2000/svg">
      <path d="M31 354 L 91 310 M115 311 L 170 350 M190 350 L 255 210 M277 203 L 393 285 M400 280 L 493 155"
            stroke="#884444" fill="none" stroke-width="5px"></path>
      <g stroke="#f46054" fill="#1c2733" stroke-width="5px">
        <circle cx="31" cy="354" r="13"></circle>
        <circle cx="103" cy="303" r="13"></circle>
        <circle cx="182" cy="360" r="13"></circle>
        <circle cx="265" cy="200" r="13"></circle>
        <circle cx="393" cy="285" r="13" fill="#f46054"></circle>
        <circle cx="493" cy="155" r="13"></circle>
      </g>
      <path class="line-dash" d="M18 363 L 103 300 L 183 365 L 265 195 L 393 290 L 505 140" stroke="#1c2733" fill="none"
            stroke-width="40px"></path>
      <g>
        <circle
          cx="250"
          cy="280"
          r="162"
          fill="none"
          stroke-width="1px"
          stroke="#fff"
          stroke-dasharray="2,2"></circle>
        <circle class="circle-rotate1" cx="88" cy="280" r="5" fill="rgba(255,255,255,0.6)"></circle>
        <circle class="circle-rotate2" cx="350" cy="153" r="3" fill="rgba(255,255,255,1)"></circle>
      </g>
      <g>
        <circle
          cx="360"
          cy="330"
          r="123"
          fill="none"
          stroke-width="1px"
          stroke="rgba(255,255,255,0.5)"
          stroke-dasharray="2,2"></circle>
        <circle class="circle-rotate3" cx="248" cy="280" r="3" fill="#fff"></circle>
        <circle class="circle-rotate4" cx="258" cy="400" r="3" fill="rgba(255,255,255,0.5)"></circle>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SurroundChain',
  props: {},
  data() {
    return {}
  },
  methods: {},
  mounted() {
    const _this = this
    _this.$('.line-dash').bind('oanimationend animationend webkitAnimationEnd', function () {
      _this.$('.line-dash').addClass('moved')
    })
  }
}
</script>

<style scoped lang='less'>

.space {
  height: 500px;
  width: 500px;
}

.circle-rotate {
  animation: ani-rotate 20s linear infinite;
  transform-origin: 50% 50%;
}

.circle-rotate1 {
  animation: ani-rotate 20s linear infinite;
  transform-origin: 250px 280px;
}

.circle-rotate2 {
  animation: ani-rotate 25s linear infinite;
  transform-origin: 250px 280px;
}

.circle-rotate3 {
  animation: ani-rotate 15s linear infinite;
  transform-origin: 360px 330px;
}

.circle-rotate4 {
  animation: ani-rotate 20s linear infinite;
  transform-origin: 360px 330px;
}

@keyframes ani-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.cricle-fade {
  animation: ani-fade 1s linear;
}

@keyframes ani-fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.line-dash {
  animation: ani-dash 3s linear;
}

.line-dash.moved {
  stroke-dasharray: 744px, 744px;
  stroke-dashoffset: -744px;
}

@keyframes ani-dash {
  0% {
    stroke-dasharray: 744px, 744px;
    stroke-dashoffset: 0px;
  }
  100% {
    stroke-dasharray: 744px, 744px;
    stroke-dashoffset: -744px;
  }
}
</style>

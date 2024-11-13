<template>
  <div class="slider">
    <div class="slide-track">
      <div class="slide" v-for="item in cardList">
        <HoverAnimateCard :info="item"></HoverAnimateCard>
      </div>
      <div class="slide" v-for="item in cardList">
        <HoverAnimateCard :info="item"></HoverAnimateCard>
      </div>
      <div class="slide" v-for="item in cardList">
        <HoverAnimateCard :info="item"></HoverAnimateCard>
      </div>
      <div class="slide" v-for="item in cardList">
        <HoverAnimateCard :info="item"></HoverAnimateCard>
      </div>
      <div class="slide" v-for="item in cardList">
        <HoverAnimateCard :info="item"></HoverAnimateCard>
      </div>
    </div>
  </div>
</template>

<script>
import HoverAnimateCard from '@/views/components/HoverAnimateCard/index'
export default {
  name: 'InfiniteSmoothSlider',
  components: {
    HoverAnimateCard
  },
  props: {
    // cardList: {
    //   type: Array,
    //   required: true
    // }
  },
  data () {
    return {
      cardList: []
    }
  },
  methods: {
    setCardList (cardList) {
      console.log('我设置了滚动卡列表', cardList)
      this.cardList = cardList
    }
  },
  mounted () {
    console.log('拿到的推荐列表卡片', this.cardList)
  }
}
</script>

<style scoped lang='less'>
@-webkit-keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-200px * 5));
  }
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-200px * 5));
  }
}
.slider {
  //background: white;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.125);
  height: 240px;
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 1200px;

  &::before,&::after{
    background: linear-gradient(to right, rgba(24, 144, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%);
    content: "";
    height: 240px;
    position: absolute;
    width: 100px;
    z-index: 2;
  }
  &::before{
    left: 0;
    top: 0;
  }
  &::after{
    right: 0;
    top: 0;
    transform: rotateZ(180deg);
  }
  .slide-track {
    -webkit-animation: scroll 40s linear infinite;
    animation: scroll 40s linear infinite;
    display: flex;
    width: calc(200px * 6);
    &:hover{
      animation-play-state:paused;
    }
  }
  .slide {
    height: 240px;
    width: 200px;
    padding: 0 10px;
  }
}



</style>

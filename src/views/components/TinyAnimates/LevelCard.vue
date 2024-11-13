<template>
  <div class="LevelSteps">
    <div v-for="item in Levels" class="leve-step">
      <img class="medal" :src="item.img" alt="">
      <div class="title my-flex-center">{{ item.title }}</div>
      <div class="text my-flex-center">活跃值{{ item.score }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LevelCard',
  props: {},
  data () {
    return {
      Levels: [
        {
          title: '初来乍到',
          img: 'http://blockchain.maplesky.cn/StaticResource/Guide/level-1.png',
          score: 100
        },
        {
          title: '活跃艺术家',
          img: 'http://blockchain.maplesky.cn/StaticResource/Guide/level-2.png',
          score: 200
        },
        {
          title: '品质艺术家',
          img: 'http://blockchain.maplesky.cn/StaticResource/Guide/level-3.png',
          score: 500
        },
        {
          title: '至尊艺术家',
          img: 'http://blockchain.maplesky.cn/StaticResource/Guide/level-4.png',
          score: 1000
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang='less'>
.LevelSteps{
  display: flex;
  .leve-step{
    position: relative;
    padding: 20px 10px;
    .medal{
      width: 120px;
      height: 120px;
    }
    .title{
      font-size: 14px;
      margin-bottom: 20px;
      font-weight: bold;
    }
    .text{
      font-size: 10px;
    }
  }
  .leve-step:nth-child(1){
    top: 100px;
    &::before{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 10%;
      right: 10%;
      content: "";
      background-image: linear-gradient(to bottom, #00000000, #3df8e315,#2ff0f230, #3df8e315, #00000000);
    }
    &::after{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 10%;
      right: 10%;
      content: "";
      //background-color: rgba(89, 152, 143, 0.34);
    }

    .title{
      color: #2ff0f2;
    }
    .text{
      color: #2ff0f255;
    }
  }
  .leve-step:nth-child(2){
    top: 80px;
    .title{
      color: #5f9eff;
    }
    .text{
      color: #5f9eff55;
    }
    &::before{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 10%;
      right: 10%;
      content: "";
      background-image: linear-gradient(to bottom, #00000000, #5f9eff15,#5f9eff30, #5f9eff15, #00000000);
    }
    &::after{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 10%;
      right: 10%;
      content: "";
      //background-color: rgba(165, 173, 211, 0.24);
    }
  }
  .leve-step:nth-child(3){
    top: 60px;
    .title{
      color: #735fff;
    }
    .text{
      color: #735fff55;
    }
    &::before{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 10%;
      right: 10%;
      content: "";
      background-image: linear-gradient(to bottom, #00000000, #735fff15,#735fff30, #735fff15, #00000000);
    }
    &::after{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 10%;
      right: 10%;
      content: "";
      //background-color: rgba(218, 186, 248, 0.26);
    }
  }
  .leve-step:nth-child(4){
    top: 40px;
    .title{
      color: #F19696;
    }
    .text{
      color: #F1969655;
    }
    &::before{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 10%;
      right: 10%;
      content: "";
      background-image: linear-gradient(to bottom, #00000000, #F1969615,#F1969630, #F1969615, #00000000);
    }
    &::after{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 10%;
      right: 10%;
      content: "";
      //background-color: rgba(241, 150, 150, 0.19);
    }
  }
}
</style>

<template>
  <div class="container" ref="hover-card-bg" :style="style">
    <div class="overlay">
      <div class="items">
      </div>
      <div class="items head">
        <p>{{ info.name }}</p>
        <hr>
      </div>
      <div class="items brief">
        <!--        <p class="old">$699</p>-->
        <!--        <p class="new">$345</p>-->
        <p class="text-overflow-3">
          {{ info.artworkInfo }}
        </p>
      </div>
      <div class="items cart">
        <i class="fa fa-shopping-cart"></i>
        <span @click="goToDetail(info.id)">查看详情</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'

export default {
  name: 'HoverAnimatedCard',
  props: {
    info: {
      type: Object
    }
  },
  data () {
    return {
      style: `background:url('${this.info.markedfileId}');background-size:cover`
    }
  },
  methods: {
    goToDetail (artworkId) {
      this.$router.push({
        name: 'ArtworkDetail',
        params: { artworkId: `${Base64.encode(artworkId)}` }
      })
    }
  },
  watch: {
    info: {
      handler (val) {
        console.log('值发生变化', val)
       this.style = `background:url('${this.info.markedfileId}');background-size:cover`
      },
      deep: true
    }
  }
}
</script>

<style scoped lang='less'>

.container {
  width: 180px;
  height: 240px;
  //position: absolute;
  //top: 0;
  //right: 0;
  //left: 0;
  //bottom: 0;
  margin: auto;
  background-size: cover;
  cursor: pointer;
  -webkit-box-shadow: 0 0 5px #000;
  box-shadow: 0 0 5px #000;
  .overlay {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 2fr 1fr;
    background: rgba(77, 77, 77, 0.9);
    color: #FEF5DF;
    opacity: 0;
    transition: all 0.5s;
    font-family: "Playfair Display", serif;

    .items {
      padding-left: 20px;
      letter-spacing: 3px;
    }
    .head {
      font-size: 30px;
      line-height: 40px;
      transform: translateY(40px);
      transition: all 0.7s;
    }
    .head hr {
      display: block;
      width: 0;
      border: none;
      border-bottom: solid 2px #FEF5DF;
      position: absolute;
      bottom: 0;
      left: 20px;
      transition: all 0.5s;
    }

    .brief {
      font-size: 14px;
      line-height: 14px;
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.7s;
    }
    .cart {
      font-size: 12px;
      opacity: 0;
      letter-spacing: 1px;
      font-family: "Lato", sans-serif;
      transform: translateY(40px);
      transition: all 0.7s;
    }
    .cart i {
      font-size: 16px;
    }
    .cart span {
      font-size: 16px;
      margin-left: 10px;
    }

  }

  &:hover .overlay{
    opacity: 1;
    .head {
      transform: translateY(0px);
    }
    hr {
      width: 75px;
      transition-delay: 0.4s;
    }
    .brief {
      transform: translateY(0px);
      transition-delay: 0.3s;
      opacity: 1;
    }
    .cart {
      transform: translateY(0px);
      transition-delay: 0.6s;
      opacity: 1;
    }
  }

}


</style>

<template>
  <a-row class="halls">
<!--    <div class="hall">-->
      <div class="swiper" id="theSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide"v-for="(hall,index) in hallOptions" :key="index">
            <div class="hall my-flex-center">
              <div class="hall-name">
                {{ hall.name }}
              </div>
              <img :src="hall.cover" class="bgImg">
            </div>
          </div>
        </div>
        <!-- 如果需要滚动条 -->
        <!--            <div class="swiper-scrollbar"></div>-->
        <div class="swiper-pagination"></div>

<!--      </div>-->
    </div>
  </a-row>
</template>

<script>
import {hallOptions} from '@/views/exhibition-hall/config/config'
import Swiper from "swiper";
import 'swiper/css/swiper.css'
export default {
  name: "pickRoom",
  data(){
    return{
      /**示例
       *  name:'star',
       *     type:0,
       *     cover:require('@/assets/images/hall/house_0.png'),
       *     artworkArea:0.6,
       *     textures:[
       *       textures.star,
       *       textures.star,
       *       textures.star2,
       *       textures.star,
       *       textures.star,
       *       textures.star,
       *     ],
       *     floor:textures.diban,
       *     light:Object.assign(light,{ambientLight:{
       *         color:commonColor,
       *         intensity:0.6
       *       },}),
       *     pointLight:light.pointLight,
       *     border:border,
       *     clearColor:'#000',
       *     boxNumber:100,
       *     mouse:textures.moon
       *   },
       */
      hallOptions
    }
  },
  methods:{
    initSwiper(){
      const that = this
      this.swiper = new Swiper('#theSwiper',{
        // loop: true,
        centeredSlides: true,
        slidesPerView: 3,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true
        },
        on:{
          slideChange: function(){
            that.$emit('currentRoom',this.activeIndex)
          },
        }
      })
    },
  },
  mounted() {
    this.initSwiper()
  }

}
</script>

<style scoped>
.hall img:hover {
  cursor: pointer;
}
.halls{
  display: flex;
  /*flex-direction: column;*/
  width: 100%;
  /*overflow-x: scroll;*/
}
.hall{
  padding: 30px;
  width: 400px;
}
.hall img {
  width: 200px;
}

.hall-name {
  color: #66aff1;
  font-size: 14px;
}

.swiper {
  width: 100%;
  height: 100%;
}
.swiper-slide-active,.swiper-slide-duplicate-active{
  transform: scale(1.2);
}
.swiper-slide{
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  transition: 300ms;
  /*transform: scale(0.8);*/
}

</style>
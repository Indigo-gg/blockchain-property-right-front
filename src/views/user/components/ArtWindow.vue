<template>
  <!--  <div class="window" :style="{width: width}">-->
  <a-row class="card-box-bgColor" :style="{position:'relative',minHeight: height}">
    <Loading :loading="isLoading" icon="loading1">
    </Loading>
    <div v-if="!isLoading" class="banner">
      <div class="artworks" v-if="artworks.length>0">
        <div class="swiper" id="theSwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in artworks" :key="index">
              <div class="card-box my-flex-center">
                <show-card class="card" height="150px" width="200px" :artwork="item">
                </show-card>
              </div>
            </div>
          </div>
          <!-- 如果需要滚动条 -->
          <!--            <div class="swiper-scrollbar"></div>-->
          <div class="swiper-pagination"></div>

        </div>
      </div>
      <div class="empty" v-else>
        <svg-icon width="200" height="200" style="border-radius: 3px" icon="no-data"></svg-icon>
      </div>
    </div>
  </a-row>
<!--  </div>-->
</template>

<script>
// import '@/utils/mock/getMotheds'
import {Carousel} from 'ant-design-vue'
import Loading from '@/views/components/Loading/Loading'
import showCard from '@/views/home/components/windowCard/showCard'
import {ShowArtList} from '@/api/modules/artwork'
import {pageConfig} from '@/views/config/config'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
// import store from '@/store'
import storage from 'store'
import {USER_INFO} from "@/store/mutation-types";

export default {
  name: 'ArtWindows',
  components: {
    showCard,
    Loading,
    ACarousel: Carousel
  },
  props: {
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      workGrid: {
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3
      },
      artworks: [],
      colors: {
        add: '#0cb0ee'
      },
      isLoading: true,
      requestParams: {
        userId: storage.get(USER_INFO).id
      }
    }
  },
  methods: {
    initSwiper () {
      const that = this
      this.swiper = new Swiper('#theSwiper', {
        loop: true,
        centeredSlides: true,
        slidesPerView: 3,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        }
      })
    },
    getArtworkList () {
      console.log('windowsArt', this.requestParams)
      ShowArtList(this.requestParams).then(res => {
        console.log('windows', res.data)
        this.artworks = res.data
        // if(tempList.length<=0)
        //   return
        // let len
        // if(tempList%pageConfig.artWindowSize){
        //   len=tempList.length/pageConfig.artWindowSize+1
        // }
        // else
        //   len=tempList.length/pageConfig.artWindowSize
        // for(let i=0;i<len;i++){
        //   this.artworks.push(tempList.splice(0,pageConfig.artWindowSize))
        // }
        // console.log('artList',this.artworks)

        setTimeout(() => {
          this.isLoading = false
          this.$nextTick(() => {
            this.initSwiper()
          })
        }, pageConfig.pubFreshTime)
      })
    },
    renderCover (fileId) {
      return RenderPicture(fileId)
    }
  },
  mounted () {
    this.getArtworkList()
  }
}
</script>

<style scoped>

.window {
  width: 100%;
  /*min-height: 400px;*/
}

/*.group {*/
/*  margin-top: 80px;*/
/*  !*height: 500px;*!*/
/*}*/

.card {
  z-index: 1;
  /*border: ;*/
  margin: 0 40px;
  margin-top: 80px;
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
  transition: all 1s ease;
  /*background: #FFFFFF;*/

}

.card-box {
  height: 100%;
  width: 100%;
}

.artworks{
  display: flex;
  width: auto;
  justify-content: space-between;
  align-items: center;
  /*overflow-x:scroll*/

}

/*.card:hover{*/
/*  transform: scale(120%);*/
/*}*/
/*.card-box:hover > .card {*/
/*  position: relative;*/
/*  bottom: 3px;*/
/*}*/

.card-box::after {
  transition: all 0.5s ease-in-out;
}

.card-box:hover::after {
  transform: scale(101%);
  box-shadow: 6px 6px 60px 4px rgba(76, 201, 240, 0.6);
  background-color: rgba(66, 124, 232, 0.2);
}

.card-box:link::after {
  background-color: rgba(243, 87, 174, 0.99);

}

.card-box:after {
  position: relative;
  /*top: 15vw;*/
  bottom: 70px;
  content: '';
  z-index: 0;
  width: 240px;
  height: 120px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
}
.empty {
  width: 100%;
  text-align: center;
}

.artworks {
  position: relative;
  width: 100%;
  height: 100%;
  /*padding-top: 40px;*/
  /*background:linear-gradient();*/
  /*background:url("/images/guide/lines-hero.svg");*/
  /*background: url("/images/index/star.jpeg") no-repeat;*/
  background-size: 100% 100%;
  overflow: hidden;
  /*background-image: linear-gradient(0deg, rgb(87, 91, 116) , rgba(126, 12, 148, 0.06),rgba(28, 37, 65)), url("/src/assets/images/banner/star.jpeg");*/
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display:inline-flex;
}
.swiper{
  width: 100%;
  height: 100%;
  /*z-index: 2;*/
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

::-webkit-scrollbar {
  height: 6px; /* 横向滚动条高度 */
}

/*::-webkit-scrollbar-thumb {*/
/*  border-radius: 10px; !* 滚动条样式 *!*/
/*  -webkit-box-shadow: inset 0 0 3px red;  !* 内阴影 *!*/
/*  background-color: blue; !* 滚动条颜色 *!*/
/*}*/

/*::-webkit-scrollbar-thumb:hover {*/
/*  background-color: black; !* 滚动条悬浮颜色 *!*/
/*}*/

/*::-webkit-scrollbar-track-piece {*/
/*  background: palegreen; !* 滚动条背景颜色 *!*/
/*}*/
</style>

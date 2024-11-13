<template>
  <div class='exhibition-hall'>
    <div class="top">
      <div class="img">
        <!--          <div class="top-img"></div>-->
        <img
          class="blink"
          width="200px"
          height="200px"
          style="left: 100px;top: 3vh"
          src="http://blockchain.maplesky.cn/StaticResource/Public/ball.png">
        <!--        <img width="100px" height="100px" style="right: 10px;top: 5px" :src="require('@/assets/public/water_2.png')">-->
        <!--        <img width="100px" height="100px" style="opacity: 1.0;background-color: rgba(0,0,0,0.1); right: 10px;top: 5px"-->
        <!--             src="http://blockchain.maplesky.cn/StaticResource/Public/water_2.png">-->

      </div>
      <head-line style="position:relative;top: 23vh" :title="title" :title-eng="titleEng" color="#3be5bd"></head-line>
    </div>
    <div>
      <a-row class="halls">
        <a-col
          class="hall  my-flex-center"
          :span="8"
          v-for="(hall,index) in halls"
          :key="hall.name"
          :style="{top:listConfig[index].x*0.1+'vw',left:listConfig[index].y*0.1+'vw'}"
          @click="toHallDetail(hall)"
        >
          <div class="hall-name">
            {{ hall.name }}
          </div>
          <img :src="hall.cover" class="bgImg">
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { getHallById, hallOptions, listConfig } from '@/views/exhibition-hall/config/config'
import { getRoomList } from '@/api/modules/showroom'
import { pageConfig } from '@/views/config/config'
import headLine from '@/views/components/headLine/HeadLine'
import HeadLine from '@/views/components/headLine/HeadLine'

export default {
  name: 'Main',
  components: { HeadLine },
  comments: {
    headLine
  },
  data () {
    return {
      title: '3D展馆大厅',
      titleEng: '3D Exhibition Hall',
      halls: [],
      listConfig,
      params: {
        pageSize: 5,
        pageNumber: 1
      }
    }
  },
  methods: {
    getHalls () {
      getRoomList(this.params).then((res) => {
        if (res.data && res.data.length === 0) {
          this.params.pageNumber = 1
          getRoomList(this.params)
        }
        this.halls = res.data
        this.halls.map(item => {
          const hall = getHallById(item.pattern)
          Object.assign(item, {cover: hall.cover})
        })
        console.log('hall', this.halls)
      })
    },
    toHallDetail (hall) {
      this.$router.push({
        name: 'ExhibitionHall',
        params: { hallNo: hall.id, pattern: hall.pattern }
      })
    },
    refresh () {
      pageConfig.updateArtParams(this.params)
      this.getHalls()
    }
  },
  mounted () {
    this.getHalls()
  }
}
</script>

<style scoped>
.exhibition-hall {
  /*padding-top: 70px;*/
  /*z-index: 0;*/
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom, #141e30, #243b55);
}

.top {
  position: relative;
  width: 100%;
  height: 40vh;
  z-index: 11;
}

.img {
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: 0;
  height: 100%;
  width: 100%;
  /*background: url("http://blockchain.maplesky.cn/StaticResource/Show/hallbg.png") no-repeat;*/
  background: linear-gradient(rgba(176, 216, 231, 0.3), rgba(27, 42, 63, 1)), url("http://blockchain.maplesky.cn/StaticResource/Show/showBanner.jpg") no-repeat;

  opacity: 0.6;
  background-size: 100% 100%;
}

.img img {
  position: relative;
  opacity: 0.9;
}


.halls {
  /*width: 0vw;*/
  margin-top: 4vh;
  height: 100%;
}

.hall {
  position: relative;
  /*width: 24vw;*/
  /*height: 10vw;*/
  /*width: 24vw;*/
  /*transform: rotate(-15deg);*/

}

.hall:hover {
  cursor: pointer;
}

.bgImg {
  position: relative;
  width: 16vw;
  z-index: 11;

}

.hall:after {
  position: relative;
  /*top: 15vw;*/
  bottom: 10vw;
  content: '';
  z-index: 1;
  width: 24vw;
  height: 10vw;
  border-radius: 50%;
  background-color: rgba(28, 27, 27, 0.2);
}

.hall-promoter {
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  /*padding: 10px;*/
  font-size: 1.5em;
  color: #2ff5c9;
  font-weight: 600;
}

.hall img:hover {
  cursor: pointer;
}

.hall-name {
  text-align: center;
  font-size: 1.5em;
  color: #46cfff;
  font-weight: 700;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions {
  text-align: right;
}

.hall-info {
  text-align: center;
  color: #fff;
  opacity: 0%;
  position: absolute;
  top: 0;
  left: 0;
  height: 50%;
  z-index: 11;
  width: 80%;
  margin: 10% 0 0 10%;
  border-radius: 10px;
  transition: all .2s linear;
  background-color: rgba(0, 0, 0);
  overflow: hidden;
  text-overflow: ellipsis;
}

.hall-info .info {
  position: relative;
  top: 1.5em;
  text-indent: 2em;
  padding: 10px;
  opacity: 100%;
  text-align: left;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.5em;

}

.hall .hall-info:hover {
  display: block;
  opacity: 70%;
  height: 80%;
  /*padding: 10%;*/
}

.blink {
  animation: blink 4s infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
/*.hall:hover{*/
/*  !*display: block;*!*/
/*  opacity: 40%;*/
/*}*/
</style>


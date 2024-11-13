<template>
  <div class="body">
    <div class="sky">
      <div id="main-stars">
        <mysky class="my-star" height="500"></mysky>
        <div id="mark">
          <xyz-transition appear xyz="fade small stagger ease-out-back">

            <!--            <div style="font-size: 48px;color:#96d3c8">-->
            <div style="font-size: 48px;color:#FFFFFF">

              {{ headText }}
            </div>
          </xyz-transition>

          <xyz-transition appear xyz="fade delay-4">

            <div style="font-size: 32px;color: #cbc8f1">
              {{ headTip }}
            </div>
          </xyz-transition>

        </div>
      </div>
    </div>
    <div class="main-body">
      <div class="sorts">
        <div class="part">
          <head-line
            :title-eng="indexOption.latest.titleEng"
            :title="indexOption.latest.title"
            :color="indexOption.latest.color"
          >
          </head-line>
          <div class="more-tip" @click="navigateTo({route:'ArtworkShop'})">{{ moreTip }}</div>
          <div class="part-content">
            <loading :loading="loading1" icon="loading1"></loading>
            <div v-if="!loading1">
              <div class="artwork-list" v-if="useWorks.length>0">
                <a-list :grid="workGrid" :data-source="useWorks">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <div class="my-card my-flex-center">
                      <index-art-card
                        style="transform: scale(0.95)"
                        :info="item">
                      </index-art-card>
                      <!--              <sale-card :info="item"></sale-card>-->
                    </div>
                  </a-list-item>
                </a-list>
              </div>
              <div class="empty" v-else>
                <svg-icon width="200" height="200" style="border-radius: 3px" icon="no-data"></svg-icon>
              </div>
            </div>
          </div>

        </div>
        <div class="part">
          <head-line
            :title-eng="indexOption.hot.titleEng"
            :title="indexOption.hot.title"
            :color="indexOption.hot.color"
          >
          </head-line>
          <div class="more-tip" @click="navigateTo({route:'ArtworkShop'})">{{ moreTip }}</div>

          <div class="part-content">
            <loading :loading="loading2" icon="loading1"></loading>
            <div v-if="!loading2">
              <div class="artwork-list" v-if="ownWorks.length>0">
                <a-list :grid="workGrid" :data-source="ownWorks">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <div class="my-card my-flex-center">
                      <index-art-card
                        style="transform: scale(0.95)"
                        :info="item">
                      </index-art-card>
                    </div>
                  </a-list-item>
                </a-list>
              </div>
              <div class="empty" v-else>
                <svg-icon width="200" height="200" style="border-radius: 3px" icon="no-data"></svg-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="publicize">
        <div class="title" :style="{color:indexOption.publicize.color}">
          <head-line
            :title-eng="indexOption.publicize.titleEng"
            :title="indexOption.publicize.title"
            :color="indexOption.publicize.color"
          >
          </head-line>
        </div>
        <div class="publicizeArea">
          <Loading class="loading" :size="70" :loading="isPubLoading" icon="loading1"></Loading>
          <div class="pub-content" v-if="!isPubLoading">
            <div class="to-pub">
              <span class="to-pub-btn" @click="navigateTo({route:'ArtworkPublicity'})">
                {{ pubTip }}
              </span>
            </div>
            <div class="fresh" @click="setPubFresh">
              <svg-icon icon="refresh" size="24" color="#CCCCCC"></svg-icon>
            </div>
            <a-list :grid="pubGrid" :data-source="pubWorks" v-if="pubWorks&&pubWorks.length>0">
              <a-list-item class="my-flex-center" slot="renderItem" slot-scope="item" :rowKey="item.id">
                <!--              <XyzTransition xyz="fade up-1 duration-50 flip-up">-->
                <div class="square" v-if="showPub">
                  <publicize-card

                    :bg-color="pubCardColor"
                    :artwork="item"></publicize-card>
                </div>
                <!--              </XyzTransition>-->
              </a-list-item>
            </a-list>
            <div class="empty" v-else>
              <svg-icon width="200" height="200" style="border-radius: 3px" icon="no-data"></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <head-line
      :title-eng="indexOption.saleChart.titleEng"
      :title="indexOption.saleChart.title"
      :color="indexOption.saleChart.color"
    >
    </head-line>
    <div>
      <a-row class="flex-row-space-around sale-box">
        <a-col :span="14">
          <div class="sale-chart" style="padding-top: 20px; width:100%;height: 65vh">
            <index-sale-chart height="60vh" ref="sale-line"></index-sale-chart>
          </div>
        </a-col>
        <a-col :span="7">
          <div class="sale-chart" style="padding-top: 20px;width: 100%;height: 65vh">
            <bar ref="sale-bar"></bar>
          </div>
        </a-col>
      </a-row>

    </div>
    <!--    </scroll-load>-->
  </div>
</template>

<script>
import headLine from '@/views/components/headLine/HeadLine'
import search from '@/views/home/components/search/mySearch1'
import { indexConfig as config, pageConfig } from '../config/config'
import indexArtCard from '@/views/components/indexArtCard/indexArtCard'
import publicizeCard from '@/views/home/components/publicizeCard/PublicizeCard'
import Loading from '@/views/components/Loading/Loading'
import { GetArtworkList, PubList } from '@/api/modules/artwork'
import ScrollLoad from '@/views/components/scrollLoad/ScrollLoad'
import WorkSearch from '@/views/home/components/search/workSearch'
import mysky from '@/views/components/mysky/mysky'
import saleCard from '@/views/market/components/SaleCard'
import indexSaleChart from '@/views/components/index-sale-chart'
import bar from '@/views/components/index-sale-chart/bar'
import store from '@/store'
// import '@/css/sky.css'
export default {
  name: 'Main',
  components: {
    WorkSearch,
    mysky,
    indexSaleChart,
    indexArtCard,
    saleCard,
    search,
    publicizeCard,
    ScrollLoad,
    Loading,
    headLine,
bar
  },
  data () {
    const index = 0
    const workGrid = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 4
    }
    const pubGrid = {
      span: 6,
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 4
    }
    return {
      // #0affff
      // pubCardColor: '#',
      pubCardColor: '#182f4f',

      // textColeo
      headText: '欢迎来到权星艺链',
      headTip: '这里有很多有趣的作品等待你发现!',
      indexOption: config.sorts,
      pubLen: 8,
      showPub: true,
      // 修改为两权发售的作品
      useParams: {
        artworkType: '',
        keyword: '',
        formDate: '',
        toDate: '',
        release_status: 8,
        sortedWay: 1,
        li_status: '',
        pageNumber: 1,
        pageSize: 8
      },
      ownParams: {
        artworkType: '',
        keyword: '',
        formDate: '',
        toDate: '',
        release_status: 6,
        sortedWay: 1,
        li_status: '',
        pageNumber: 1,
        pageSize: 8
      },
      pubParams: {
        pageNumber: 1,
        pageSize: 8
      },
      // 初始total防止请求失败
      pubTotal: 100000,
      useWorks: [],
      ownWorks: [],
      pubWorks: [],
      isPubLoading: true,
      recommendList: [],
      isGetRec: false,
      currentPubIndex: 0,
      // currentPubWorks: [],
      workGrid,
      pubGrid,
      loading1: true,
      loading2: true,
      moreTip: '查看更多>>',
      pubTip: config.sorts.publicize.pubTip,
      artworkSearch: { title: '前往搜索页', route: 'ArtworkSearch' },
      artworkDetail: { title: '前往作品的详情页', route: 'ArtworkDetail', params: { artworkId: '203ho15xd6s67ad' } },
      artworkPublicity: { title: '前往公示页', route: 'ArtworkPublicity' }
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push({
        name: route.route,
        params: route.params ? route.params : null
      })
    },
    /**
     * 设置公示区自动刷新
     */
    initRefresh () {
      setInterval(() => {
        this.setPubFresh()
      }, this.indexOption.publicize.refreshTime)
    },
    getPubWorks () {
      this.isPubLoading = true
      PubList(this.pubParams).then(res => {
        this.pubWorks = res.data
        this.pubTotal = res.total
        // this.setPubFresh()
        // this.initRefresh()
        setTimeout(() => {
          this.isPubLoading = false
        }, pageConfig.pubFreshTime)
        pageConfig.updateArtParams(this.pubParams, this.pubTotal)
        // console.log('this.pubWorks',this.pubWorks)
      })
    },
    // checkParams(params,total){
    //
    // },
    getArtworks () {
      GetArtworkList(this.useParams).then(res => {
        if (res.data.length > 0) {
          this.useWorks = res.data
        }
        this.loading1 = false
        // pageConfig.updateArtParams(this.artworkParams)
      })
      GetArtworkList(this.ownParams).then(res => {
        if (res.data.length > 0) {
          this.ownWorks = res.data
        }
        // this.ownWorks=this.ownWorks.concat(res.data)
        this.loading2 = false

        // pageConfig.updateArtParams(this.artworkParams)
      })
    },
    setPubFresh () {
      // this.showPub = false
      this.getPubWorks()
      // this.currentPubWorks = this.pubWorks.slice(this.currentPubIndex % this.pubWorks.length,
      //   this.currentPubIndex % this.pubWorks.length + this.pubLen)
      // // this.showPub=true
      // setTimeout(() => {
      //   this.showPub = true
      // }, 100)
      // // console.log('currentPubWorks',this.currentPubWorks)
      // return this.currentPubIndex += this.pubLen
    },
    search (e) {
      console.log('nav-router', e)
      this.$router.push({ name: `ArtworkSearch`, params: e })
      // this.navigateTo({route:'ArtworkSearch',params: e})
    },
    init () {
      const starsCount = 80 // 星星数量
      const distance = 40// 间距
      const parentStarts = document.getElementById('stars')
      for (let i = 0; i < starsCount; i++) {
        const childStart = document.createElement('div')
        childStart.setAttribute('class', 'main-sky-stars')
        parentStarts.appendChild(childStart)
      }
      for (let i = 0; i < starsCount; i++) {
        const item = parentStarts.children[i]
        const speed = 0.2 + (Math.random() * 1)
        const thisDistance = distance + (Math.random() * 100)
        item.style.transformOrigin = '0 0 ' + thisDistance + 'px'
        item.style.transform = 'translate3d(0,0,' + thisDistance + 'px) rotateY(' + (Math.random() * 360) + 'deg) rotateX(' + (Math.random() * -50) + 'deg) scale(' + speed + ',' + speed + ')'
      }
    }
  },
  mounted () {
    this.getPubWorks()
    this.getArtworks()
    this.$nextTick(() => {
      this.$refs['sale-line'].render()
      this.$refs['sale-bar'].render()
    })
  }
}
</script>
<style scoped>
.body {
  background: linear-gradient(to bottom, #141e30, #243b55);
  /*padding: 10px 0;*/
  /*margin-top: 400px;*/
  height: auto;
  padding-bottom: 40px;
}

.main-body {
  position: relative;
  border-radius: 40px 40px 0 0;
  background: linear-gradient(to bottom, #141e30, #243b55);
  bottom: 40px;

}

.sale-chart {
  /*position: relative;*/
  /*z-index:111;*/
  padding: 10px;
  margin: 40px 0;
  border-radius: 10px;
  background: rgba(197, 213, 218, 0.1);
}

.sorts {
  /*background-color: #0f222f;*/
  /*padding-top: 20px;*/
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.sale-box {
  position: relative;
  z-index: 111;
}

.part {
  z-index: 1;
  width: 90%;
  width: 1400px;
  position: relative;
  margin: 10px;
  margin: 40px 0;
  border-radius: 10px;
  background: rgba(197, 213, 218, 0.1);
  /*background: rgb(75, 74, 74, 0.3);*/
  /*box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);*/
  /*backdrop-filter: blur(1.5px);*/
  /*-webkit-backdrop-filter: blur(1.5px);*/
  /*!*border-radius: 10px;*!*/
  /*opacity: 0.6;*/
  /*border: 1px solid rgba(255, 255, 255, 0.18);*/
  /*margin: 40px 60px;*/
}

.square {
  margin: 10px 0;
}

.part-content {
  position: relative;
  min-height: 350px;
  /*width: 100%;*/
}

.title {
  display: flex;
  /*flex-direction: ;*/
  justify-content: space-between;
  padding: 10px;
  margin-left: 10px;
  font-size: 32px;
  font-weight: 700;
}

.more-tip {
  font-size: 12px;
  color: #b0d8e7;
  position: absolute;
  right: 5vw;
  top: 1.5vw;
}

.more-tip:hover {
  color: #7dc9e5;
  cursor: pointer;
}

.artwork-list {
  width: 100%;
}

.to-pub {
  text-align: right;
  width: 100%;
  font-size: 16px;
  color: #ffffff;
  height: 40px;
  padding-right: 20px;
  line-height: 40px;
  position: relative;
  /*right: 5vw;*/
  /*top:0*/
}

.to-pub-btn:hover {
  cursor: pointer;
  color: rgb(102, 241, 210);

}

.my-card {
  margin: 20px 0;
}

.publicize {
  transition: all 1s ease;
}

.publicizeArea {
  z-index: 11;

  margin: 10px 60px;
  min-height: 400px;
  /*border: #9966CC 5px dotted;*/
  background: rgba(197, 213, 218, 0.1);
  border-radius: 15px;
  position: relative;
  padding-bottom: 20px;
}

.fresh {
  /*width: 100%;*/
  width: 10px;
  height: 10px;
  position: absolute;
  left: 10px;
  top: 10px;
}

.fresh:hover {
  cursor: pointer;
  /*color: rgba(0, 166, 230, 0.76);*/

}

.search {
  width: 100%;
  text-align: right;
}

.empty {
  width: 100%;
  text-align: center;
}


/*##################sky#########*/


.sky {
  position: relative;
  background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92, #75517d, #1b2947);
  /*background: radial-gradient(220% 105% at top center,  #bdbda0, #75517d 40%, #e96f92 65%,#1b2947 10%);*/
  /*background-attachment: fixed;*/
  height: 500px;
  width: 100%;
}

#main-stars {
  position: relative;

}

.my-star {
  /*filter: blur(1px);*/
}

#mark {
  cursor: grab;
  z-index: 111;
  position: absolute;
  top: 0;
  text-align: center;
  line-height: 400px;
  width: 100%;
  height: 480px;
  font-size: 42px;
  /*color: #c7eae4;*/
  font-weight: bold;
}

#mark div {
  height: 3em;
}
</style>

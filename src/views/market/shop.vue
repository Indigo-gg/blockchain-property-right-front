<template>
  <div class="artwork-market">
    <div class="banner">
      <a-carousel
        autoplay
        dot-position="right"
        :autoplaySpeed="5000"
      >
        <div class="carousel-item welcome">
          <a-row type="flex" :gutter="32" class="row">
            <a-col :span="16" class="col">
              <div class="title-area">
                <div class="title">
                  数字作品商城
                </div>
                <div class="sub-title">
                  Blockchain based.The collection is sold in the form of usage rights and ownership. After purchasing,
                  you will receive your own certificate.
                </div>
              </div>
            </a-col>
            <a-col :span="8" class="col">
              <img src="http://blockchain.maplesky.cn/StaticResource/Shop/NFT.png" alt="" class="NFT">
            </a-col>
          </a-row>
        </div>
        <!--        <div class="carousel-item" v-for="(item,index) in TopTree" :key="index">-->
        <!--        </div>-->
        <div class="carousel-item">
          <img src="http://blockchain.maplesky.cn/StaticResource/Shop/market-1.png" alt="">
          <div class="info">
            <div class="title">未来城市系列</div>
            <a-tag color="blue"></a-tag>
            <div class="brief"></div>
            <div class="button" @click="goToDetail">
              <a-space>
                <span>立即前往</span>
                <svg-icon icon="arrow-right"></svg-icon>
              </a-space>
            </div>
            <div class="time">将于:2023-05-21 12:00:00 发布</div>
          </div>
        </div>
        <div class="carousel-item">
          <img src="http://blockchain.maplesky.cn/StaticResource/Shop/market-2.png" alt="">
          <div class="info">
            <div class="title">星际战争系列</div>
            <a-tag color="default"></a-tag>
            <div class="brief"></div>
            <div class="button" @click="goToDetail">
              <a-space><span>星际战争系列</span>
                <svg-icon icon="arrow-right"></svg-icon>
              </a-space>

            </div>
            <div class="time">将于:2023-04-16 12:00:00 发布</div>
          </div>
        </div>
        <div class="carousel-item">
          <img src="http://blockchain.maplesky.cn/StaticResource/Shop/market-3.png" alt="">
          <div class="info">
            <div class="title">赛博朋克系列</div>
            <a-tag color="default"></a-tag>
            <div class="brief"></div>
            <div class="button" @click="goToDetail">
              <a-space><span>立即前往 </span>
                <svg-icon icon="arrow-right"></svg-icon>
              </a-space>
            </div>
            <div class="time">将于:2023-04-12 12:00:00 发布</div>
          </div>
        </div>

      </a-carousel>
    </div>
    <!--搜索框以及筛选框-->

    <a-row :gutter="16" type="flex" justify="center" class="filter-area">
      <a-col :span="3">
        <a-select ref="select" @change="releaseStatusChange" style="width: 100%" defaultValue="8" theme="dark">
          <a-select-option value="6">使用权在售</a-select-option>
          <a-select-option value="7">所有权在售</a-select-option>
          <a-select-option value="8">两权均在售</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="3">
        <a-select @change="sortWayChange" style="width: 100%" defaultValue="2">
          <a-select-option value="2">综合排序</a-select-option>
          <a-select-option value="1">时间排序</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="10">
        <div class="input-holder">
          <a-tag
            v-if="searchParams.artworkType"
            color="#333333"
            class="tag"
            :closable="true"
            @close="ArtworkTagChange('')">
            <svg-icon class="icon" :icon="`tag-${searchParams.artworkType}`"></svg-icon>
            <span class="text">{{ tagList[searchParams.artworkType - 1].text }}</span>
          </a-tag>
          <input
            type="text"
            class="search-input"
            placeholder="输入藏品名或作者名进行查询"
            @input="handleKeyWordInput($event)"
            @keyup.enter="keyWordChange"/>
          <button class="search-icon" @click="keyWordChange">
            <svg-icon icon="search" color="#0e1a40"></svg-icon>
          </button>
        </div>
      </a-col>
      <a-col :span="2">
      </a-col>
    </a-row>

    <!--标签框-->
    <a-row type="flex" justify="space-between" :gutter="32" class="tags-filter-wrapper">
      <a-col :span="2"></a-col>
      <a-col :span="20">
        <div class="tags-filter swiper" id="tagSwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="tag in tagList" :key="tag.value">
              <div class="tag-item" @click="ArtworkTagChange(tag.value)">
                <a-tag color="#444444" class="tag">
                  <svg-icon :icon="`tag-${tag.value}`" class="icon"></svg-icon>
                  <span class="text">{{ tag.text }}</span>
                </a-tag>
              </div>
            </div>
          </div>
        </div>
        <div class="tag-swiper-pagination"></div>
      </a-col>
      <a-col :span="2">
      </a-col>
    </a-row>


    <!--默认展示结果区域-->
    <div class="artwork-market-goods flex-col-start">
      <template v-if="ResType===0&&!searchParams.artworkType">
        <div class="search-title">
          精品/Master Works
        </div>
        <div>
        </div>
        <a-row class="res-container" type="flex" justify="start" :gutter="16">
          <a-col v-for="item in artworks" :key="item.artworkId" :span="6">
            <sale-card :info="item"></sale-card>
          </a-col>
        </a-row>
      </template>
      <!--携带了标签了结果展示区域-->
      <template v-else>
        <!--没有触发搜索词-->
        <div class="search-title" v-if="searchParams.artworkType">欢迎来到
          <span class="keyword">{{ tagList[searchParams.artworkType - 1].text }}</span>专区!
        </div>
        <template v-if="ResType===0">
          <div class="tag-search-res">
            <a-row class="res-container" type="flex" justify="start" :gutter="16">
              <a-col v-for="item in artworks" :key="item.artworkId" :span="6">
                <sale-card :info="item"></sale-card>
              </a-col>
            </a-row>
          </div>
        </template>
        <!--触发了搜索词-->
        <template v-else>
          <div class="artwrok-name-res" v-if="byNameRes.length!==0">
            <div class="search-title">下面是藏品名与:<span class="keyword">{{ searchParams.keyword }}</span>有关的结果：
            </div>
            <a-row class="res-container" type="flex" justify="start" :gutter="16">
              <template>
                <a-col v-for="item in byNameRes" :key="item.artworkId" :span="6">
                  <sale-card :info="item"></sale-card>
                </a-col>
              </template>
            </a-row>
          </div>
          <div class="author-search-res" v-if="byAuthorRes.length!==0">
            <div class="search-title">与作者为<span class="keyword">{{ searchParams.keyword }}</span>有关的结果：</div>
            <a-row class="res-container" type="flex" justify="start" :gutter="16">
              <template>
                <a-col v-for="item in byAuthorRes" :key="item.artworkId" :span="6">
                  <sale-card :info="item" @goDetail="()=>{this.$message.info('?????????????????????????')}"></sale-card>
                </a-col>
              </template>
            </a-row>
          </div>
          <div class="author-search-res" v-if="byNameRes.length===0&&byAuthorRes.length===0">
            <div class="search-title">未搜索到与<span class="keyword">{{ searchParams.keyword }}</span>有关的结果</div>
            <div class="empty">
              <svg-icon width="200" height="200" style="border-radius: 3px" icon="no-data"></svg-icon>
            </div>
          </div>
        </template>
      </template>
      <!--携带关键词进行搜索-->
      <div class="searchkeys">
      </div>
    </div>

  </div>
</template>

<script>
import { GetArtworkList, GetArtworkBrief } from '@/api/modules/artwork'
import { pageConfig } from '@/views/config/config'
import { Carousel } from 'ant-design-vue'
import SaleCard from '@/views/market/components/SaleCard'
import navBack from '@/views/components/navBack'
import Loading from '@/views/components/Loading/Loading'
import workSearch from '@/views/home/components/search/workSearch'
import svgIcon from '@/components/svgIcon/svgIcon'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import { Base64 } from 'js-base64'


export default {
  name: 'Search',
  props: {},
  components: {
    Carousel,
    Loading,
    navBack,
    workSearch,
    svgIcon,
    SaleCard
  },
  data () {
    return {
      pariclesConfig: {},
      tagsSwipper: {},
      // banner图上三个热门艺术品
      TopTree: [],
      // resType为0表示没有输入关键词进行筛选,结果区域使用searchParams以及自带分页器
      ResType: 0,
      workGrid: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3
      },
      curKeywordInput: '',
      artworks: [],
      loading: false,
      // 总分支筛选
      searchParams: {
        artworkType: '',
        keyword: '',
        formDate: '',
        toDate: '',
        // 默认拿两权售卖品
        release_status: 8,
        // 默认综合排序【名称】
        sortedWay: 2,
        // 不指定搜索词
        li_status: '',
        pageNumber: 1,
        pageSize: 10
      },
      // 通过用户名分支选择条件【用于覆盖总分支某些字段】
      byAuthor: {
        li_status: 2,
        pageSize: 6,
        pageNumber: 1
      },
      byAuthorRes: [],
      byAuthorLoading: false,
      // 通过作品名分支选择条件【用于覆盖总分支某些字段】
      byArtName: {
        li_status: 1,
        pageSize: 6,
        pageNumber: 1
      },
      byNameRes: [],
      byArtworkLoading: false,
      tagList: []
    }
  },
  methods: {
    // TODO 紧急测试
    renderMessage (data) {
      if (data.length === 0) {
        this.$message.warning('未查询到相关藏品信息！')
      } else {
        // this.$message.success('查询成功')
      }
    },


    ArtworkTagChange (val) {
      console.log('标签被点击')
      this.searchParams.artworkType = val === '' ? '' : parseInt(val)
      this.keyWordChange()
    },
    // 选择使用权所有权的测试数据
    async releaseStatusChange (val) {
      // 这里需要触发搜索更新
      console.log('发型状态筛选更新')
      this.searchParams.release_status = parseInt(val)
      const tempAll = { ...this.searchParams, release_status: 8 }
      const res1 = await GetArtworkList(tempAll)
      const res2 = await GetArtworkList(this.searchParams)
      console.log('请求返回的数据', res1, res2)
      this.artworks = [...res1.data, ...res2.data]
      // TODO 紧急测试
      this.renderMessage(this.artworks)
      // this.keyWordChange()
    },
    sortWayChange (sort) {
      // 排序方式更新也要触发搜索
      this.searchParams.sortedWay = sort
      console.log('排序方式发生变化', sort)
      this.keyWordChange()
    },
    // TODO 此函数需要进行防抖处理
    handleKeyWordInput (type) {
      // console.log('输入关键词发生变化', type.currentTarget.value)
      this.curKeywordInput = type.currentTarget.value
      if (type.currentTarget.value === '') {
        this.ResType = 0
        this.keyWordChange()
      }
    },
    keyWordChange () {
      console.log('我按下了回车')
      // 这里的val可能是作者也可能是藏品名,因此我需要发两次请求来获取分别对应
      this.searchParams.keyword = this.curKeywordInput
      if (this.curKeywordInput) {
        // 结果逻辑为1，搜索得到的结果分为两个区域来展示
        console.log('我更改了页面的显示逻辑', this.ResType)
        this.ResType = 1
        this.searchByArtworkName()
        this.searchByAuthor()
      } else { // 不带关键词搜索
        // 单区域搜索
        this.ResType = 0
        this.searchParams = { ...this.searchParams, li_status: '', keyword: '' }
        GetArtworkList(this.searchParams).then(res => {
          console.log('不带关键词的搜索结果', res)
          this.artworks = res.data
          // TODO 紧急测试
          this.renderMessage(this.artworks)
        })
      }
    },
    async searchByAuthor () {
      this.byAuthorLoading = true
      const temp = { ...this.searchParams, ...this.byAuthor }
      const res = await GetArtworkList(temp)
      this.byAuthorRes = res.data
      // TODO 紧急测试
      this.renderMessage(res.data)
      console.log('res--byauthor-name', res)
    },
    async searchByArtworkName () {
      const temp = { ...this.searchParams, ...this.byArtName }
      const res = await GetArtworkList(temp)
      this.byNameRes = res.data
      // TODO 紧急测试
      this.renderMessage(res.data)
      console.log('res--Art-name', res)
    },
    async getArtworkBrief (artworkId) {
      const res = await GetArtworkBrief({ artworkId })
      console.log(res)
    },
    goToDetail (id) {
      this.$message.info('功能调试中~敬请期待')
      console.log(id)
    },
    goToArtworkDetail (id) {
      console.log('？？？？？？？？？')
    },
    initTagSwiper () {
      this.swiper = new Swiper('#tagSwiper', {
        loop: true,
        centeredSlides: true,
        slidesPerView: 7,
        pagination: {
          el: '.tag-swiper-pagination',
          dynamicBullets: true
        }
      })
    }
  },
  mounted () {
    this.tagList = pageConfig.artworkTags
    this.$nextTick(() => {
      this.initTagSwiper()
    })
    this.keyWordChange()
  },
  watch: {
    searchParams: {
      handler (val) {
        console.log('搜索条件发生了变化', val)
        // console.log('select',this.$refs.select)

        this.ResType = val.keyword ? 1 : 0
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped lang='less'>
.artwork-market {
  //background-image: linear-gradient(to right bottom, #0c053d, #120434, #15032b, #150223, #13021c, #16041d, #18051f, #1a0720, #210a2a, #2a0934, #35063d, #400046);
  //background-image: linear-gradient(to right top, #0f1e1c, #022225, #002532, #00273f, #00274a, #09264d, #152550, #1f2352, #1a2352, #132453, #0b2453, #002453);
  transition: all .4s;
  width: 100vw;
  min-height: 120vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 5;
  //商城首页欢迎大屏
  .welcome {
    background: rgba(0, 0, 0, 0.82) no-repeat;
    background-image: url('http://blockchain.maplesky.cn/StaticResource/Guide/link.png');
    background-size: auto 100%;
    background-position: 100% 10%;
    position: relative;
    z-index: 5;

    .row {
      height: 100%;

      .col {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;

        .title-area {
          margin-left: 100px;
          color: #FFFFFF;

          .title {
            font-size: 50px;
            letter-spacing: 5px;
          }

          .sub-title {
            margin-left: 1em;
            position: relative;
            width: 50vw;
            margin-top: 28px;
            font-size: 24px;
            letter-spacing: 2px;

            &::before {
              content: '';
              display: block;
              left: -1em;
              top: 10%;
              height: 80%;
              width: 3px;
              border-radius: 3px;
              background-image: linear-gradient(to bottom, #cf65e8, #c56dea, #bb74eb, #b27aeb, #a980ea, #a280eb, #9b81eb, #9381ec, #897ef0, #7d7bf3, #7078f7, #5f76fb);
              position: absolute;
            }
          }
        }

        .server {
          margin-left: 100px;
          font-size: 14px;
          color: #FFFFFF;
        }

        .NFT {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-110px, -140px);
          height: 280px;
          width: 220px;
        }
      }
    }
  }

  //搜索筛选区
  .filter-area {
    //搜索框
    width: 1200px;
    margin: 20px auto;
    display: flex;
    align-items: center;
    .input-holder {
      position: relative;
      height: 3em;
      width: 100%;
      background: rgba(255, 255, 255, 0);
      border-radius: 3em;
      border: 1px solid #7c7db9;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 1em;
      transition: all .5s cubic-bezier(0.000, 0.105, 0.035, 1.570);

      .tag {
        position: relative;
        z-index: 10;
        height: 2.2em;
        border-radius: 1.1em;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .icon {
          font-size: 2.2em;
        }

        .text {
          font-size: 1.3em;
          font-weight: bold;
          letter-spacing: 3px;
          margin: 0 0.3em;
          color: #DDDDDD;
        }
      }

      .search-input {
        height: 3em;
        width: 300px;
        background: transparent;
        box-sizing: border-box;
        border: none;
        outline: none;
        font-family: "Open Sans", Arial, Verdana;
        font-size: 16px;
        font-weight: 400;
        color: #e0e5ec;
        transition: all .3s cubic-bezier(0.000, 0.105, 0.035, 1.570);
        transition-delay: 0.3s;
      }

      .search-icon {
        position: absolute;
        right: 0.4em;
        height: 0.4em;
        width: 2.2em;
        height: 2.2em;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
      }
    }

  }

  //标签筛选框
  .tags-filter-wrapper {
    width: 1200px;
    margin: 20px auto;
    display: flex;
    align-items: center;
    .tags-filter {

      height: 4em;
      overflow: hidden;
      border-radius: 3em;
      &:hover{
        background-color: rgba(80, 80, 80, 0.49);
      }
      .tag-item {

        padding: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        .tag {
          cursor:pointer;
          height: 2.2em;
          border-radius: 1.1em;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .icon {
            font-size: 2.2em;
          }

          .text {
            font-size: 1.3em;
            font-weight: bold;
            letter-spacing: 3px;
            margin: 0 0.3em;
            color: #DDDDDD;
          }
        }
      }
    }
    .swiper-slide{
      width: auto;
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
  }

  //热门轮播大图
  .carousel-item {
    height: 55vh;
    width: 100%;

    position: relative;

    img {
      top: 0;
      left: 0;
      width: 100%;
      position: absolute;
      object-fit: contain;
    }

    .info {
      margin-left: 3vw;
      width: 40vw;
      height: 40vh;
      position: absolute;
      bottom: 10px;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .title {
        font-size: 40px;
        letter-spacing: 5px;
        color: #FFFFFF;
      }

      .tag {
        font-size: 16px;
      }

      .button {
        width: 150px;
        color: #FFFFFF;
        height: 3em;
        padding: 10px 20px;
        background-color: rgba(24, 144, 255, 0.98);
        border-radius: 2em;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .time {
        font-size: 12px;
        font-weight: bold;
        color: #FFFFFF;
      }

    }

  }

  //商品展示区
  .artwork-market-goods {
    width: 90vw;
    justify-content: center;
    align-items: center;
    margin-bottom: 10vh;

    .search-title {
      font-size: 1.8em;
      letter-spacing: 1px;

      .keyword {
        font-size: 1.2em;
        letter-spacing: 3px;
        margin: 0 10px;
      }
    }

    .empty {
      width: 100%;
      text-align: center;
    }


    .res-container {
      width: 1300px;
      margin: 0 auto;
      min-height: 40vh;
    }
  }

}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display:none;
}
</style>

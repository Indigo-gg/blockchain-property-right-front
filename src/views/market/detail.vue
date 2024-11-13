<template>
  <div class="artwork-detail-page">
    <!--    <page-header title="艺术品详情" :sub-title="detail.name">-->
    <!--      <div slot="content" @click="()=>{this.$router.go(-1)}">返回上一页</div>-->
    <!--    </page-header>-->

    <div class="header">

      <div class="back" data-content="返回上一页" @click="()=>{this.$router.go(-1)}">
        返回上一页
      </div>
      <div class="line"></div>
      <div class="page-title">
        艺术品详情
      </div>
      <!--      <img src='https://gd-hbimg.huaban.com/4303b3316617fb13fe4e2aa5bad05cd8d5deefc38375a-2ZLDrl_fw1200webp' alt=''>-->
    </div>

    <div class="divider">
      <head-line title="艺术品概览" title-eng="Overview"></head-line>
    </div>
    <a-row class="row artwork-info" type="flex" align="middle" style="height: 100%">
      <a-col class="col cover" style="margin: 0" :xs="24" :lg="14">
        <adaptive-img
          :src="detail.markedfileId"
          :loaded="detailLoaded"
          img-class="artwork-cover"></adaptive-img>
      </a-col>
      <a-col class="col brief" :xs="24" :lg="10">
        <div class="title">
          <div class="name">《 {{ detail.name }} 》</div>
        </div>
        <div class="extra">
          <div>
            <a-tag ghost class="artwork-status" :color="artworkStatus.color">{{ artworkStatus.text }}</a-tag>
          </div>
          <div class="created-time">发布于：{{ detail.createdTtime }}</div>
        </div>

        <div class="btns">
          <div class="hot">
            <svg-icon icon="fire" color="rgb(252,168,128)"></svg-icon>
            <span>热度：</span>
            <span>{{ detail.hot }}</span>
          </div>
          <div class="favorite">
            <span @click="goToCollection" v-if="detail.isFavorites"><svg-icon
              icon="hearts-fill"
              color="#f85d0c"></svg-icon></span>
            <span @click="()=>{this.collectCardOpen=true}" v-else>  <svg-icon
              icon="hearts-fill"
              color="#cdcdcd"></svg-icon></span>
            <span>{{ detail.isFavorites ? '已收藏' : '收藏' }}</span>
          </div>
          <div class="turnover">
            <svg-icon icon="turnover" color="rgb(64,181,223)"></svg-icon>
            <span>成交量：</span>
            <span>{{ detail.turnover }}</span>
          </div>
        </div>
        <!--如果这不是我的作品，那么开放一个作品的购买-->
        <div class="buy">
          <!--购买提示信息-->
          <a-alert type="info" :show-icon="true" v-if="detailType!==1">
            <span slot="message">藏品购买须知</span>
            <p slot="description">
              <span v-if="detailType===3">使用权购买须知:使用权发售前需要所有共创者提前协商并统一定价，按份数出售</span>
              <span>所有权购买须知:若作品为共创作品，作品所有权的持有者将根据持有的所有权比例获得艺术品权属售卖的收益分红。</span>
            </p>
          </a-alert>
          <div class="buy-btns">
            <div class="usufruct" @click="openUsufructBuy" v-if="detailType===3">
              <span>使用权</span>
              <span class="price">{{ detail.price }}</span>
              <span>CCN</span>
            </div>
            <!--共创者作品显示出收集进度collectProcess-->
            <div v-if="detailType===2">
              <Ripple estyle="width:200px;height:200px" :edata="0.4" ref="collect-ripple"></Ripple>
            </div>
            <div class="ownership" @click="openOwnershipBuy" v-if="detailType!==1">
              <span>购买所有权</span>
            </div>
          </div>
        </div>
      </a-col>
      <div class="isMineTag">
        <span v-if="detailType==2">  我的共创作品</span>
        <span v-else-if="detailType==1">我的个人创作</span>
      </div>
    </a-row>


    <div class="divider">
      <head-line title="创作者信息" title-eng="Creators"></head-line>
    </div>
    <a-row class="row creator-info">
      <a-col class="col pie" :xs="24" :lg="12">
        <bar-chart estyle="width:100%;height:100%" ref="contr-bar"></bar-chart>
      </a-col>
      <a-col class="col author-info" :xs="24" :lg="12">
        <co-circular ref="circular-pie" :coData="cooperates" box-style="width:100%;height:100%"></co-circular>
      </a-col>
    </a-row>
    <div class="divider">
      <head-line title="艺术品故事" title-eng="Encounter"></head-line>
    </div>
    <a-row class="row artwork-story">
      <div class="container">
        <p class="content">
          {{ detail.info }}
        </p>
      </div>

    </a-row>

    <div class="divider">
      <head-line title="艺术版权凭证" title-eng="Copyrights"></head-line>
    </div>
    <a-row class="row copy-right flex-row-space-between">
      <a-col :xs="24" :lg="16">
        <a-row class="artwork-document" :gutter="rowGutter">
          <a-col
            v-for="(file,index) in doucuments"
            :key="index"
            :xs="12"
            :sm="8"
            :lg="6"
            :xl="5"
            :xxl="4"
            class="document-file">
            <div class="container">
              <adaptive-img :src="file.markedfileId" :loaded="detailLoaded" img-class="files"></adaptive-img>
            </div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xs="24" :lg="8" class="col right-protect">
        <div class="warning-box" v-if="detailType===3">
          <a-alert type="warning" show-icon class="full-width">
            <div slot="message" class="message">
              发现本藏品存在违规行为?
            </div>
            <div slot="description" class="description">
              <a-button @click="report" type="danger">举报该作品</a-button>
            </div>
          </a-alert>
        </div>
        <div class="warning-box" v-else>
          <a-alert type="warning" show-icon class="full-width">
            <div slot="message" class="message">
              有人侵犯我这件作品的合法权益？
            </div>
            <div slot="description" class="description">
              <a-button @click="protect" type="primary">我要维权</a-button>
            </div>
          </a-alert>
        </div>
      </a-col>
    </a-row>
    <!--猜你喜欢~-->
    <div class="divider">
      <head-line title="猜你喜欢" title-eng="Recommends"></head-line>
    </div>
    <infinite-smooth-slider
      ref="recommend-slider"
      :card-list="recommendList"
      style="position: relative;z-index: 2"
      class="glass-morphism infinite-slider"
    >
    </infinite-smooth-slider>
    <!--收藏卡片弹窗-->
    <XyzTransition>
      <div class="collect-modal-overlay" v-if="collectCardOpen" xyz="fade short-100% delay-3 ease-out-back">
        <collect-edit-form
          :artwork-id="detail.id"
          @success="collectSuccess"
          @fail="()=>{this.collectCardOpen=false}"
        >
        </collect-edit-form>
      </div>
    </XyzTransition>
    <!--使用权购买弹窗-->
    <div class="usufruct-buy-modal">
      <a-modal
        :visible="usufructBuyVisible"
        @cancel="()=>{this.usufructBuyVisible=false}"
        :footer="null"
      >
        <usufruct-buy
          :artwork-info="{markedFileId:detail.markedfileId,info:detail.info,name:detail.name,artworkId:detail.id}"
          :transaction-amount="parseInt(detail.price)"
          @success="AddOrderSuccess"
          @fail="AddOrderFailed"
        ></usufruct-buy>
      </a-modal>
    </div>
    <!--所有权购买弹窗-->
    <div class="ownership-buy-modal">
      <a-modal
        :visible="ownershipBuyVisible"
        @cancel="()=>{this.ownershipBuyVisible=false}"
        :footer="null"
      >
        <ownership-buy
          :artwork-info="{markedFileId:detail.markedfileId,name:detail.name,artworkId:detail.id}"
          @success="AddOrderSuccess"
          @fail="AddOrderFailed"
        ></ownership-buy>
      </a-modal>
    </div>
    <!--支付订单弹窗-->
    <div class="pay-order-modal">
      <a-modal
        :visible="orderVisible"
        @cancel="()=>{this.orderVisible=false}"
        :footer="null"
      >
        <pay-order :order-info="orderInfo" @success="paySuccess"></pay-order>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
import { RenderPicture } from '@/api/modules/file'
import { GetArtworkDetail, GetRecommends } from '@/api/modules/artwork'
import { pageConfig } from '@/views/config/config'
import PageHeader from '@/views/components/PageHeader/PageHeader'
import navBack from '@/views/components/navBack'
import CoCircular from '@/views/components/AntVCharts/CoCircular'
import AdaptiveImg from '@/views/components/AdaptiveImg'
import OwnershipBuy from '@/views/market/components/OwnershipBuy'
import UsufructBuy from '@/views/market/components/UsufructBuy'
import PayOrder from '@/views/market/components/PayOrder'
import CollectEditForm from '@/views/components/CollectEditForm'
import HeadLine from '@/views/components/headLine/HeadLine'
import Ripple from '@/views/components/AntVCharts/Ripple'
import BarChart from '@/views/components/AntVCharts/BarChart'
import InfiniteSmoothSlider from '@/views/components/InfiniteSmoothSlider/index'
import HoverAnimateCard from '@/views/components/HoverAnimateCard'

export default {
  name: 'Detail',
  components: {
    PayOrder,
    PageHeader,
    navBack,
    CoCircular,
    AdaptiveImg,
    CollectEditForm,
    OwnershipBuy,
    UsufructBuy,
    HeadLine,
    Ripple,
    BarChart,
    InfiniteSmoothSlider,
    HoverAnimateCard
  },
  data () {
    return {
      myUserId: 0,
      collectProcess: 0,
      detailType: 3,
      artworkStatus: {},
      doucuments: [],
      rowGutter: { xs: 8, sm: 16, md: 24, lg: 32 },
      collectCardOpen: false,
      // 是否展示作品的购买情况
      isMine: false,
      detailLoaded: false,
      // 使用权购买页是否可见
      usufructBuyVisible: false,
      // 所有权购买页是否可见
      ownershipBuyVisible: false,
      // 订单页是否可见
      orderVisible: false,
      detail: {},
      // 共创者
      cooperates: [],
      orderInfo: [],
      recommendList: []
    }
  },
  methods: {
    async getDetail (artId) {
      const res = await GetArtworkDetail({ artId })
      this.detail = res.data[0]
      this.InitAfterGetDetail()
    },
    // 动态生成页面中要展示的内容，分为3种情况:
    // type:1---个人单独创作：不提供购买入口【提示其为什么不能购买】、展示证书
    // type:2---参与共创：不提供使用权购买入口、提供所有权购买入口、展示证书
    // type:3---纯游客：提供两种权力的购买入口、不展示证书
    async InitAfterGetDetail () {
      this.isMine = this.$route.params.myCreate
      // 判断页面详情模式
      console.log('我的用户id', this.myUserId)
      // 共创者信息初始化
      this.cooperates = this.detail.author
      for (let i = 0; i < this.cooperates.length; i++) {
        console.log(parseInt(this.cooperates[i].userId))
        if (parseInt(this.cooperates[i].userId) === parseInt(this.myUserId)) {
          this.cooperates.length === 1 ? this.detailType = 1 : this.detailType = 2
          this.collectProcess = parseFloat(this.cooperates[i].contribution) / 100
          setTimeout(() => {
            // this.$refs['collect-ripple'].reloadData()
          }, 200)
          break
        }
      }
      // 证明文件初始化
      this.doucuments = this.detail.documentIds
      // 为创作者们增添趣味动画
      // 状态标签渲染
      this.artworkStatus = pageConfig.getTag(this.detail.releaseStatus)
      // 图表渲染
      this.$refs['circular-pie'].loadChart(this.detail.author)
      this.$refs['contr-bar'].renderData(this.detail.author)

      this.detailLoaded = true
      console.log('初始化过后页面选择的渲染逻辑是', this.detailType)
      // 获取智能推荐列表
      await this.GetRecommends()
    },
    RenderImg (fileId) {
      console.log('准备渲染出来图片', fileId)
      return RenderPicture(fileId)
    },
    canIBuy () {
      const _this = this
      return new Promise((resolve, reject) => {
        const hasIndetified = _this.$store.getters.hasIdentified
        hasIndetified ? resolve(true) : reject(new Error('User-Un-Indentified'))
      })
    },

    openUsufructBuy () {
      this.canIBuy().then(() => {
        this.usufructBuyVisible = true
      }).catch(() => {
        const key = `${Date.now()}`
        this.$notification.open({
          message: '未开通账户',
          description: <span>您并未开通账户,因此无法产生购买行为。请前往【个人中心>我的主页】完成实名认证激活账户]</span>,
          icon: <a-icon type='frown' style='color: #108ee9' />,
          duration: 4,
          btn: h => {
            return h(
              'a-button',
              {
                props: { type: 'primary', size: 'small' },
                on: {
                  click: () => {
                    this.$router.push({ name: 'UserHome' })
                  }
                }
              },
              '立即前往'
            )
          },
          key
        })
      })
    },
    openOwnershipBuy () {
      this.canIBuy().then(() => {
        this.ownershipBuyVisible = true
      }).catch(() => {
        const key = `${Date.now()}`
        this.$notification.open({
          message: '未开通账户',
          description: <span>您并未开通账户,因此无法产生购买行为。请前往【个人中心>我的主页】完成实名认证激活账户]</span>,
          icon: <a-icon type='frown' style='color: #108ee9' />,
          duration: 4,
          btn: h => {
            return h(
              'a-button',
              {
                props: { type: 'primary', size: 'small' },
                on: {
                  click: () => {
                    this.$router.push({ name: 'UserHome' })
                  }
                }
              },
              '立即前往'
            )
          },
          key
        })
      })
    },
    // 点击举报按钮跳转举报页面
    collectSuccess () {
      this.detail.isFavorites = true
      this.collectCardOpen = false
    },
    // 添加订单成功
    AddOrderSuccess (info) {
      this.$message.info('已生成订单~请在30分钟内完成支付')
      console.log('添加订单成功', info)
      // 关闭规格选择页面
      this.usufructBuyVisible = false
      this.ownershipBuyVisible = false
      this.orderInfo = info
      this.orderVisible = true
    },
    // 添加订单失败
    AddOrderFailed (res) {
      this.$message.error(res)
      this.usufructBuyVisible = false
      this.ownershipBuyVisible = false
    },
    // 支付成功的处理函数
    paySuccess (info) {
      console.log('pay success', info)
      const key = `${Date.now()}`
      this.$notification.open({
        message: '恭喜您，交易成功~',
        description: <span>您可移步[个人中心>藏品管理查看您购买的藏品]</span>,
        icon: <a-icon type='smile' style='color: #108ee9' />,
        duration: 4,
        btn: h => {
          return h(
            'a-button',
            {
              props: { type: 'primary', size: 'small' },
              on: { click: () => this.$notification.close(key) }
            },
            '我已了解'
          )
        },
        key
      })
      setTimeout(() => {
        this.orderVisible = false
      }, 300)
    },
    // 支付失败的处理函数
    payFailed (info) {
      console.log('pay failed', info)
    },
    report () {
      this.$router.push({
        path: `/user/${this.$store.getters.userInfo.id}/report/list`,
        query: { artworkId: this.detail.id, openSubmit: true }
      })
    },
    protect () {
      this.$router.push({
        path: `/user/${this.myUserId}/protect/list`,
        query: { artworkId: this.detail.id, openSubmit: true }
      })
    },
    goToCollection () {
      // this.$router.push({name:''})
    },
    async getUserId () {
      return new Promise(resolve => {
        const id = this.$store.getters.userInfo.id
        if (id) {
          resolve(id)
        }
      })
    },
    async GetRecommends () {
      const data = {
        artworkId: this.detail.id,
        tag: this.detail.type
      }
      // console.log('查看我请求的参数对不对', data)
      const res = await GetRecommends(data)
      console.log('智能推荐结果', res)
      this.$refs['recommend-slider'].setCardList(res.data)
      // this.recommendList = res.data
    }

  },

  async mounted () {
    // 判断是否是我的藏品
    this.myUserId = await this.getUserId()
    console.log('mounted', this.myUserId)
    const artworkId = parseInt(Base64.decode(this.$route.params.artworkId))
    this.getDetail(artworkId)

    //
  }
}
</script>

<style scoped lang='less'>
.artwork-detail-page {
  //background-color: #f6f5f5;
  color: #1a1717;
  position: relative;
  padding: 0 0 30px;

  .header {
    position: relative;
    height: 30vh;
    width: 100vw;
    padding:80px 3vw 30px;
    z-index: 2;
    //background-color: rgba(28, 28, 28, 0.98);
    color: #eeeeee;
    font-weight: bold;
    &::after{
      z-index: -1;
      opacity: 0.35;
      content: '';
      background: url('https://gd-hbimg.huaban.com/4303b3316617fb13fe4e2aa5bad05cd8d5deefc38375a-2ZLDrl_fw1200webp') no-repeat;
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      box-shadow:0 0 10px 10px #9fb1c5
    }

    .back {
      font-size: 20px;
      margin-bottom: 15px;
      position: relative;
      display: inline-block;
      color: #d2deff;
      font-weight: 800;
      overflow: hidden;
      cursor: pointer;
      &::before {
        position: absolute;
        content: attr(data-content);
        top: 0;
        left: 0;
        width: 0;
        // height: 0;
        color: #6b8ee5;
        white-space: nowrap;
        overflow: hidden;
        transition: width 275ms ease;
        // transition: height 275ms ease;
      }
      &:hover::before {
        width: 100%;
        // height: 100%;
      }
    }
    .line {
    width: 150px;
      height: 2px;
      background-color: #fff;
    }

    .page-title {
      margin-top: 6px;
      font-size: 36px;
    }

  }

  .divider {
    width: 96vw;
    margin: 10px auto;
  }


  .row {
    //display: flex;
    //align-items: center;
    width: 90vw;
    margin: 0 auto;
    overflow: hidden;
    padding: 0;
    transition: all 0.4s ease;
    position: relative;
    z-index: 2;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);

    .col {
      margin: 20px auto;
      padding: 2em;
      //display: block;
      display: flex;
      align-items: center;
      transition: all 0.4s ease;

      & > .title, & > .btns, & > .buy {
        width: 100%;
        height: auto;
      }

      &.brief, &.cover {
        flex-direction: column;
        height: 100%;
      }

      &.right-protect {
        flex-direction: column;
        justify-content: flex-start;
      }

      &.brief {
        justify-content: space-between;
      }
    }
  }

  .cover {
    //margin: 0px;
    height: 100%;

    .artwork-cover {
      height: 100%;
      width: 100%;
    }
  }

  //作品的标题
  .title {
    //display: flex;
    //align-items: center;
    text-align: center;
    width: 100%;

    .name {
      font-size: 2.5em;
      color: #e8e8e8;
      margin-right: 15px;
    }
  }

  .extra {
    width: 100%;
    height: 2.5em;
    display: flex;
    //flex-direction: r;
    justify-content: space-between;
    align-items: center;

    .artwork-status {
      font-family: "WenQuanYi Micro Hei";
      //font-weight: bold;
      //font-size: 1.1em;
      user-select: none;
      cursor: pointer;
    }

    .created-time {
      font-size: 0.9em;
      font-weight: 500;
      color: #818181;
    }
  }


  //按钮列表
  .btns {
    display: flex;
    justify-content: space-around;
    font-size: 1em;
    user-select: none;
    margin: 5px 0;

    & > div {
      font-size: 1.4em;
      color: #c6c7fc;
      font-weight: 500;
      user-select: none;
    }

    .favorite {
      cursor: pointer;
    }
  }

  //点击购买
  .buy-btns {
    min-height: 6em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 0 0 0;
    /* Demo Stuff End -> */
    /* <- Magic Stuff Start */

    .usufruct, .ownership {
      height: 6em;
      width: 45%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.5s;
      background-size: 200% auto;
      font-size: 20px;
      color: #fafaff;
      box-shadow: 0 0 20px #eee;
      border-radius: 10px;
      cursor: pointer;

      .price {
        margin-left: 2px;
        color: #7aa9ff;
        font-weight: bold;
      }

      &:hover {
        background-position: right center; /* change the direction of the change here */
      }
    }

    .usufruct {
      background-image: linear-gradient(to right, #b3cec9 0%, #9febfc 51%, #c1cec3 100%);
    }

    .ownership {
      background-image: linear-gradient(to right, rgba(140, 218, 229, 0.96) 0%, rgba(180, 228, 236, 0.7) 51%, #b1e8de 100%);
    }


  }

  .artwork-info {
    position: relative;

    .isMineTag {
      right: 0;
      top: 0;
      color: #c3a8ff;
      font-weight: bold;
      font-size: 20px;
      background-image: linear-gradient(to right, #b983ff55, #ab79ff55, #9b70ff55, #8867ff55, #735fff55);
      position: absolute;
      padding: 10px;
      border-radius:  0 10px 0 10px;
    }
  }


  .artwork-story {
    min-height: 30vh;
    padding-top: 20px;
    .container {
      height: 100%;
      .content {
        padding: 0 20px;
        font-size: 24px;
        letter-spacing: 1px;
        color: #ccc8c8;

        &::first-letter {
          margin-left: 2em;
        }
      }
    }
  }

  .copy-right {
    padding: 0 20px;
    .artwork-document {
      margin: 10px;

      .files {
        height: 160px;
        width: 120px;
      }
    }

    .right-protect {
      .warning-box {
        width: 100%;
        margin-bottom: 20px;
      }
    }
  }

  .collect-modal-overlay {
    position: fixed;
    z-index: 99;
    top: 30vh;
    left: 50vw;
    transform: translateX(-50%);
  }

  .infinite-slider {
    //width: 90vw;
  }


}
</style>

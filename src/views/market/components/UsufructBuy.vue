<template>
  <div class="UsufructBuyCard">
    <!--    <div class="title">藏品使用权购买</div>-->
    <div class="notice">
      <a-alert type="info">
        <div slot="message">购买须知</div>
        <div slot="description">
          <p>您购买藏品使用权后，您可以将此藏品用于个人收藏或商业用途，但您不具有转售藏品的权限。</p>
        </div>
      </a-alert>
    </div>
    <!--作品的简要信息-->
    <div class="artwork-info">
      <adaptive-img
        class="img"
        :src="artworkInfo.markedFileId"
        :loaded="artImgLoaded"
        img-class="img"></adaptive-img>
      <div class="brief">
        <div class="name">《 {{ artworkInfo.name }} 》</div>
        <div class="info text-overflow-5">{{ artworkInfo.info }}</div>
      </div>
    </div>
    <!--购买区域-->
    <div class="purchase">
      <div class="price">
        <span>价格：{{ saleStatus.curPrice }}</span>
        <svg-icon icon="coin"></svg-icon>
      </div>
      <a-button @click="purchaseConfirm">点击购买</a-button>
    </div>
  </div>
</template>

<script>

import { GetUsufructStatus, AddOrder } from '@/api/modules/transition'
import { RenderPicture } from '@/api/modules/file'
import AdaptiveImg from '@/views/components/AdaptiveImg'

import artwork from '@/store/modules/artwork'

export default {
  name: 'UsufructBuyCard',
  props: {
    artworkInfo: {
      type: Object,
      required: true
    },
    transactionAmount: {
      type: Number,
      required: true
    }
  },
  components: {
    AdaptiveImg
  },
  data () {
    return {
      artImgLoaded: false,
      saleStatus: {}
    }
  },
  methods: {
    renderImg (fileId) {
      console.log(fileId)
      return RenderPicture(fileId)
    },
    async purchaseConfirm () {
      console.log('订单金额', this.transactionAmount)
      console.log('我要生成一个订单')
      const hasUserInfo = await this.$store.getters.hasUserInfo
      if (!hasUserInfo) {
        await this.$store.dispatch('GetInfo')
      }
      const userInfo = await this.$store.getters.userInfo
      const data = {
        userId: userInfo.id,
        tradeType: 1,
        artworkId: this.artworkInfo.artworkId,
        transactionAmount: this.transactionAmount
      }
      console.log('我要用这些数据来生成一个使用权的订单', data)
      const res = await AddOrder(data)
      this.handlePurchaseRes(res)
    },
    async getSaleStatus () {
      const artworkId = this.artworkInfo.artworkId
      const res = await GetUsufructStatus({ artworkId })
      this.saleStatus = res.data
      // const { isSaled, curPrice, curAmount } = res.data
      console.log(res)
    },
    handlePurchaseRes (res) {
      if (res.data) {
        const orderInfo = {
          ...this.artworkInfo,
          orderId: res.data.orderId,
          createdTime: Date.now(),
          share: 1,
          unitPrice: this.transactionAmount,
          type: 1 // type为1表示要生成一个使用权的订单
        }
        this.$emit('success', orderInfo)
      } else {
        this.$emit('fail', res.msg)
      }
    }
  },
  mounted () {
    console.log('打开了购买使用权的界面', this.transactionAmount)



    if (this.artworkInfo.markedFileId) {
      this.artImgLoaded = true
    }
    this.getSaleStatus()
    console.log(this.artworkInfo)
  }
}
</script>

<style scoped lang='less'>
.UsufructBuyCard {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 24px;

  .title {
    font-size: 30px;
    color: #0e0e0e;
    margin: 10px auto;
  }

  .artwork-info {
    margin: 10px auto;
    width: 100%;
    height: 150px;
    padding: 10px;
    display: flex;
    align-items: center;
    transition: all .4s;
    border-radius: 5px;

    &:hover {
      background-color: rgba(204, 207, 208, 0.24);
    }

    .img {
      width: 200px;
      height: 130px;
      margin-right: 10px;
    }

    .brief {
      width: 100%;
      height: 100%;
      font-size: 1em;
      flex: auto;

      .name {
        width: 100%;
        font-size: 1.2em;
        text-align: center;
      }

      .info {
        font-size: 0.9em;
      }
    }

  }

  .purchase {
    width: 100%;
    margin: 10px auto ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .price{
      font-size:1.4em;
    }

  }

}

</style>

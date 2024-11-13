<template>
  <div class="pay-order-page">
    <div class="title">订单编号：{{ orderInfo.orderId }}</div>
    <div class="artwork-info">
      <adaptive-img :src="orderInfo.markedFileId" :loaded="artImgLoaded" img-class="img"></adaptive-img>
      <div class="brief">
        <div class="name">《 {{ orderInfo.name }} 》</div>
<!--        <div class="hash">资产hash</div>-->
      </div>
    </div>
    <div class="order-info">
      <div><span class="label">交易类型</span><span class="content">{{ payForm[orderInfo.type] }}</span></div>
      <div><span class="label">交易数量</span><span class="content">{{ orderInfo.share }}</span></div>
      <div><span class="label">交易单价</span><span class="content">{{ orderInfo.unitPrice }}</span></div>
      <div><span class="label">创建时间</span><span class="content">{{ orderInfo.createdTime }}</span></div>
    </div>
    <div class="pay">
      <span>
        <span>价格:{{ price }}</span>
        <svg-icon icon="coin"></svg-icon>
      </span>
      <a-button @click="payOrder" type="primary" :loading="isPaying">确认支付</a-button>
    </div>

  </div>
</template>

<script>
import { RenderPicture } from '@/api/modules/file'
import { PayOrder } from '@/api/modules/transition'
import AdaptiveImg from '@/views/components/AdaptiveImg'

export default {
  name: 'PayOrder',
  components: {
    AdaptiveImg
  },
  props: {
    orderInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPaying: false,
      artImgLoaded: false,
      payForm: ['未知', '使用权交易', '所有权交易']
    }
  },
  methods: {
    renderImg (fileId) {
      return RenderPicture(fileId)
    },
    async payOrder () {
      this.isPaying = true
      console.log('我即将支付一个订单！！', '支付价格', this.price, '支付订单号：', this.orderInfo.orderId)
      const data = { orderId: this.orderInfo.orderId }
      const res = await PayOrder(data)
      console.log('支付结果', res)
      console.log('支付结果', res)
      // 支付成功则修改订单详情的状态并且提示其查看证书,并更新订单的支付状态
      if (res.msg === '当前余额不足，请您先进行代币充值！') {
        this.isPaying = false
        this.$emit('fail', res)
        this.$message.error('支付失败:（当前余额不足，请您先进行代币充值！')
      } else if (res.msg === '购买成功，您可以在证书中心查看您的证书！') {
        this.isPaying = false
        this.$emit('success', '')
      } else {
        this.isPaying = false
        this.$emit('fail', res)
        this.$message.error('支付异常！请联系工作人员')
      }
    }
  },
  computed: {
    price () {
      return this.orderInfo.share * this.orderInfo.unitPrice
    }
  },
  mounted () {
    this.artImgLoaded = true
  }
}
</script>

<style scoped lang='less'>
.pay-order-page{
  padding: 24px;

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
      width: 150px;
      height: 130px;
      margin-right: 10px;
    }

    .brief {
      height: 100%;
      font-size: 1.6em;
      flex: auto;
    }

  }
}
</style>

<template>
  <div class="OrderDetailCard">
    <div>
      <div class="title">订单详情</div>
      <div class="orderId">单号：{{ detail.orderId }}</div>
    </div>
    <a-row class="row header" type="flex" justify="space-between">
      <a-col class="col" :span="9">
        <adaptive-img
          :src="detail.markedfileId"
          :loaded="detailLoaded"
          img-class="cover"
        ></adaptive-img>
      </a-col>
      <a-col class="col" :span="15">
        <span class="name">{{ detail.artworkName }}</span>
        <template v-if="detail.tradeType===1">
          <div class="hash">
            <span>使用权资产地址:</span>
            <hash-plate :hash="detail.artworkUtilizeHash"></hash-plate>
          </div>
        </template>
        <template v-else>
          <div class="hash">
            <span>所有权资产地址:</span>
            <hash-plate :hash="detail.artworkOwnHash"></hash-plate>
          </div>
        </template>



        <span class="time"> 创建于：{{ detail.createdTime }}</span>
        <div class="status">
          <a-tag :color="status.color">{{ status.text }}</a-tag>
        </div>
      </a-col>
    </a-row>
    <div class="countdown-pay" v-if="detail.orderStatus==1">
      <div>
        <span>剩余支付时间</span>
        <a-statistic-countdown
          :value="payDeadline"
          @finish="AutoCancel"
          format="HH:mm:ss"
          style="margin-right: 50px"
        />
      </div>
      <div>
        <a-button @click="payOrder" :loading="isPaying">支付</a-button>
      </div>
    </div>
    <a-row class="row" type="flex" justify="space-between">
      <a-col class="col label">交易类型</a-col>
      <a-col class="col value">{{ detail.tradeType == 1 ? '使用权交易' : '所有权交易' }}</a-col>
    </a-row>
    <!--使用权订单-->
    <a-row v-if="detail.tradeType==1" class="row" type="flex" justify="space-between">
      <a-col class="col label">交易数量</a-col>
      <a-col class="col value">{{ detail.tradeNum }}</a-col>
    </a-row>
    <!--所有权订单-->
    <template v-else>
      <a-row class="row" type="flex" justify="space-between">
        <a-col class="col label">交易份额</a-col>
        <a-col class="col value"> {{ detail.tradeShare }}</a-col>
      </a-row>
      <a-row class="row" type="flex" justify="space-between">
        <a-col class="col label">转出人</a-col>
        <a-col class="col value">{{ detail.ownUserName }}</a-col>
      </a-row>
    </template>
    <a-row class="row" type="flex" justify="space-between">
      <a-col class="col label">交易金额</a-col>
      <a-col class="col value">{{ detail.transactionAmount }}</a-col>
    </a-row>
    <a-row class="row" type="flex" justify="space-between" v-if="detail.flowHash">
      <a-col class="col label">流转hash</a-col>
      <a-col class="col value text-overflow-1">
        <hash-plate :hash="detail.flowHash"></hash-plate></a-col>
    </a-row>
    <!--如果这是我待支付的订单，那么我会有倒计时催促其支付-->
  </div>
</template>

<script>
import HashPlate from '@/views/components/HashPlate'
import { CancelOrder, GetOrderDetail } from '@/api/modules/transition'
import AdaptiveImg from '@/views/components/AdaptiveImg'
import { RenderPicture } from '@/api/modules/file'

export default {
  name: 'OrderDetailCard',
  components: {
    AdaptiveImg,
    HashPlate
  },
  props: {
    orderId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      status: {},
      detailLoaded: false,
      isPaying: false,
      orderChanged: false,
      payDeadline: '',
      detail: {}
    }
  },
  methods: {
    renderImg (fileId) {
      return RenderPicture(fileId)
    },
    payOrder () {
      this.isPaying = true
      this.$emit('pay', this.detail.orderId)
    },
    // 渲染订单的状态标签
    renderStatus (status) {
      const i = parseInt(status)
      const color = ['orange', 'green', 'rgba(170,170,170,0.84)']
      const text = ['待支付', '交易成功', '已取消']
      this.status = {
        color: color[i - 1],
        text: text[i - 1]
      }
    },
    // 超时自动取消订单
    AutoCancel () {
      // const res = CancelOrder({ orderId: this.detail.orderId })
      // console.log('因为超时所以订单被取消了', res)
      this.orderChanged = true
      this.detail.orderStatus = 3
      this.renderStatus(3)
    },
    // 根据id获取该订单的详细信息
    async getOrderDetail (orderId) {
      const res = await GetOrderDetail({ orderId })
      console.log('订单详情总览信息', res)
      this.detail = res.data
      this.initOrder()
      this.detailLoaded = true
    },
    // 拿到订单详情之后对订单信息进行初始化
    initOrder () {
      // 如果当前订单超时那么我们认为其
      if (parseInt(this.detail.orderStatus) === 1) {
        // 当前有未支付的订单，应该为其开启支付倒计时并且提供支付按钮
        const ddl = Date.parse(new Date(this.detail.createdTime)) + 30 * 60 * 1000
        console.log(ddl)
        Date.now() > ddl ? this.AutoCancel() : this.payDeadline = ddl
      }
      this.renderStatus(this.detail.orderStatus)
    }
  },
  mounted () {
    console.log('订单拿到', this.orderId)
    this.getOrderDetail(parseInt(this.orderId))
  },
  beforeDestroy () {
    // 在订单销毁之前传递是否更改了订单信息，依据此来判断是否需要重新拉取订单数据
    this.$emit('close', { changed: this.orderChanged })
  }
}
</script>

<style scoped lang='less'>
.OrderDetailCard {
  padding: 10px 20px 20px;
  //background-color: #e15858;
  background: rgba(189, 184, 184, 0.4);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  .title {
    font-weight: bold;
    font-size: 1.3em;
    color: #dedede;
    margin-bottom: 10px;
  }

  .orderId {
    font-size: 1.2em;
    font-weight: bold;
    margin-left: 8px;
    color: #1a2352;
  }

  .header {
    height: 200px;

    .cover {
      border-radius: 5px;
      background-color: #ddffff;
      height: 95%;
      width: 95%;
    }

    .name {
      font-size: 1.2em;
      font-weight: bold;
      letter-spacing: 2px;
      color: #7aa0ff;
      position: relative;
      margin-bottom: 5px;

      &::after {
        content: '';
        display: block;
        width: 100px;
        position: relative;
        height: 1px;
        background-color: #9acee8;
      }
    }

    .hash {
    }

    .time {
      color: #bfc9cb;
    }

    .status {
      height: 1.2em;
    }
  }

  .row {
    margin: 10px auto;
    transition: all .4s ease;
    border-radius: 3px;

    .col {
      padding: 8px;
      font-size: 1.2em;
      height: 100%;
      display: flex;
      flex-direction: column;

      &.label {
        font-weight: 500;
        color: #8d9f9e;
      }

      &.value {
        font-weight: 400;
        color: #b0a2de;
      }
    }

    &:hover {
      background-color: rgba(229, 231, 231, 0.2);
    }
  }
}

</style>

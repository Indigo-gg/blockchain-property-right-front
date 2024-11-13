<template>
  <div class=" personal-center-page">
    <div class="personal-center-page-container UserOrders">
      <page-header
        title="交易记录"
        :back-icon="false"
      >
        <div slot="content">
          <!--这里放上一概览和饼图内容-->
        </div>
        <template slot="footer">
          <a-tabs default-active-key="1" @change="statusFilterChange">
            <a-tab-pane key="1" tab="全部订单" />
            <a-tab-pane key="2" tab="交易成功" />
            <a-tab-pane key="3" tab="待支付" />
            <a-tab-pane key="4" tab="已取消" />
          </a-tabs>
        </template>
      </page-header>
      <div class="filter-area">
        <a-row style="margin: 0 3vw" type="flex" justify="space-between">
          <a-col :span="4">
            <a-select default-value="1" @change="timeFilterChange" style="width: 100%">
              <a-select-option value="2">最近一周</a-select-option>
              <a-select-option value="3">最近一月</a-select-option>
              <a-select-option value="4">最近一年</a-select-option>
              <a-select-option value="1">全部时间</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="4">
            <a-input-search
              placeholder="按名称搜索"
              @search="nameFilterChange"></a-input-search>
          </a-col>
        </a-row>
      </div>
      <div class="list-content-area">
        <XyzTransitionGroup appear xyz="fade down-1 right-2 stagger-0.5" class="protect-list">
          <div class="my-artwork-wrapper personal-center-list-wrapper " v-for="(item) in OrderList" :key="item.orderId">
            <!--这里是具体的条目-->
            <div class="my-artwork-item personal-center-list-item">
              <div class="header">
                <span>流水号:{{ item.orderId }}</span>
                <span>交易时间:{{ item.createdTime }}</span>
              </div>
              <a-row type="flex" :gutter="16" justify="space-between">
                <a-col :span="4" class="col">
                  <adaptive-img
                    :src="item.markedfileId"
                    :loaded="OrderListLoaded"
                    img-class="cover"></adaptive-img>
                </a-col>
                <a-col :span="4" class="col">
                  <div>
                    <div class="title">《{{ item.artworkName }}》</div>
                  </div>
                </a-col>
                <a-col :span="4" class="col">
                  <span class="cost">{{ item.transactionAmount }} <svg-icon icon="coin"></svg-icon> </span>
                </a-col>
                <a-col :span="3" class="col">
                  <a-tag :color="renderStatus(item.orderStatus).color">{{ renderStatus(item.orderStatus).text }}</a-tag>
                </a-col>
                <a-col :span="6" class="col">
                  <a-button type="primary" @click="openOrderDetail(item.orderId)">详情</a-button>
                </a-col>
              </a-row>
            </div>
          </div>
        </XyzTransitionGroup>
      </div>
      <echo-pagenation :total="totolCounts" @change="paginationChange"></echo-pagenation>
      <a-modal
        class="transparent"
        :visible="detailVisible"
        :footer="null"
        @cancel="()=>{this.detailVisible=false}"
      >
        <order-detail-card
          ref="order-detail"
          :order-id="selecedOrder"
          @change="OrderRefresh"
          @pay="payOrder"
        ></order-detail-card>
      </a-modal>
    </div>
  </div>
</template>

<script>

import OrderDetailCard from '@/views/user/components/OrderDetailCard'
import EchoPagenation from '@/views/components/EchoPagination'
import PageHeader from '@/views/components/PageHeader/PageHeader'
import AdaptiveImg from '@/views/components/AdaptiveImg'
import HashPlate from '@/views/components/HashPlate'
import {
  GetOrderList,
  OrderOverlook,
  CancelOrder,
  DelOrderRecord,
  PayOrder
} from '@/api/modules/transition'
import { RenderPicture } from '@/api/modules/file'


export default {
  name: 'MyOrders',
  components: {
    PageHeader, AdaptiveImg, EchoPagenation, OrderDetailCard, HashPlate
  },
  props: {},
  data () {
    return {
      OrderList: [],
      OrderListLoaded: false,
      selecedOrder: undefined,
      detailVisible: false,
      orderOverlook: {
        totalNum: 0,
        successNum: 0,
        prePayNum: 0,
        calNum: 0
      },
      searchKeys: {
        type: '',
        artworkName: '',
        status: '',
        formDate: '',
        toDate: '',
        pageSize: 10,
        pageNumber: 1
      },
      totolCounts: 0
    }
  },
  methods: {
    RenderImg (fileId) {
      return RenderPicture(fileId)
    },
    renderStatus (status) {
      const k = parseInt(status) - 1
      const text = ['待支付', '交易成功', '已取消']
      const color = ['blue', 'green', 'default']
      return { text: text[k], color: color[k] }
    },
    statusFilterChange (key) {
      console.log('当前激活的key', key)
      // 目前的分栏
    },
    async payOrder (orderId) {
      const res = await PayOrder({ orderId })
      console.log('支付结果', res)
      // 支付成功则修改订单详情的状态并且提示其查看证书,并更新订单的支付状态
      if (res.msg === '当前余额不足，请您先进行代币充值！') {
        this.$message.error('支付失败:（当前余额不足，请您先进行代币充值！')
        this.$refs['order-detail'].$data.isPaying = false
      } else if (res.msg === '购买成功，您可以在证书中心查看您的证书！') {
        this.handlePaySuccess()
        this.$refs['order-detail'].getOrderDetail(orderId)
        this.$refs['order-detail'].$data.isPaying = false
      } else {
        this.$refs['order-detail'].$data.isPaying = false
        this.$message.error('支付异常！请联系工作人员')
      }
    },
    handlePaySuccess () {
      const key = Date.now()
      this.$notification.open({
        message: '恭喜您，支付成功~',
        description: <span>您可移步【藏品管理】查看您购买的藏品，同时前往【我的证书查看购买凭证】</span>,
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
    },
    timeFilterChange (val) {
      const today = this.$moment().format('YYYY-MM-DD')
      switch (val) {
        case '1':
          this.searchKeys = { ...this.searchKeys, formDate: '', toDate: '' }
          break
        case '2':
          const lastWeek = this.$moment().subtract(7, 'days').format('YYYY-MM-DD')
          this.searchKeys = { ...this.searchKeys, formDate: lastWeek, toDate: today }
          break
        case '3':
          const lastMonth = this.$moment().subtract(30, 'days').format('YYYY-MM-DD')
          this.searchKeys = { ...this.searchKeys, formDate: lastMonth, toDate: today }
          break
        case '4':
          const lastYear = this.$moment().subtract(365, 'days').format('YYYY-MM-DD')
          this.searchKeys = { ...this.searchKeys, formDate: lastYear, toDate: today }
          break
      }
    },
    nameFilterChange (val) {
      this.searchKeys.artworkName = val
    },
    paginationChange (val) {
      console.log('当前分页情况！', val)
      this.searchKeys = { ...this.searchKeys, ...val }
      console.log('当前分页器', this.searchKeys)
    },
    // 对订单列表中的订单进行取消或者支付后刷新数据
    OrderRefresh () {
      console.log('我一会儿会刷新数据')
      this.getOrderOverlook()
      this.getMyOrders()
    },
    // 打开订单详情
    openOrderDetail (id) {
      console.log('我想查看订单的详情', id)
      this.selecedOrder = id
      this.detailVisible = true
    },
    // 获取我的订单列表
    async getMyOrders () {
      const res = await GetOrderList(this.searchKeys)
      console.log('拿到的订单列表', res)
      this.OrderList = res.data
      this.OrderListLoaded = true
    },
    // 查看订单的总览信息
    async getOrderOverlook () {
      const res = await OrderOverlook()
      console.log('我看到了订单的总览情况', res)
    },
    // 取消掉我的一个订单
    async cancelOrder (orderId) {
      const res = await CancelOrder({ orderId })
      console.log('我删除了一个订单', res)
    },
    // 删除我的订单记录
    async delOrderRecord (orderId) {
      const res = await DelOrderRecord({ orderId })
      console.log('我要删除一个订单记录', res)
    }
  },
  mounted () {
    this.OrderRefresh()
  }
}
</script>

<style scoped lang='less'>
.filter-area {
  padding: 24px;
  border-radius: 5px;
}


.my-artwork-wrapper {
  .my-artwork-item {
    .col {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .header {
      color: #d5d5d5;
      margin: 10px;
    }

    .cover {
      height: 80px;
      width: 80px;
      border-radius: 3px;
    }

    .title {
      font-size: 1.2em;
    }

    margin-bottom: 1em;
  }

}

</style>

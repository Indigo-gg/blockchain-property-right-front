<template>
  <div class="personal-center-page">
    <div class="personal-center-page-container my-cocoin">
      <page-header
        title="我的资产"
        :back-icon="false"
      >
        <div slot="content" class="header glass-morphism">
          <!--这里放上一些概览的内容-->
          <a-row class="row" type="flex" justify="space-between">
            <a-col class="col balance" :span="12" v-if="hasIdentified">
              <div class="count">{{ balance }} CCN</div>
              <a-space>
                <a-button @click="()=>{this.chargeVisiable=true}">充值</a-button>
                <a-button @click="openWithDraw">提现</a-button>
              </a-space>
            </a-col>
            <a-col v-else>
              <div class="unable">
                您的账户未激活，请前往【个人中心>我的主页】激活账户
              </div>
            </a-col>
            <a-col class="coin-stand col flex-col-space-around" :span="8">
              <svg-icon icon="coin" class="cocoin"></svg-icon>
              <!--              <img src="../../../assets/images/elements/stand.png" class="stand">-->
              <img src="http://blockchain.maplesky.cn/StaticResource/PersonalCenter/stand.png" class="stand">


            </a-col>
          </a-row>
        </div>
      </page-header>
      <div style="color: #eeeeee;font-size: 1.2em;font-weight: bold;margin-left: 2em">
        充值记录
      </div>
      <div class="list-content-area">
        <div class="list-tempty" v-if="chargeList.length==0">
          <!--          TODO 这里放上空状态的图片-->
        </div>
        <XyzTransitionGroup appear xyz="fade down-1 right-2 stagger-0.5">
          <!--这里是具体的条目-->
          <div class="personal-center-list-wrapper" v-for="(item,index) in chargeList" :key="index">
            <a-row type="flex" justify="space-between" class="personal-center-list-item">
              <a-col :span="6" class="col">
                <a-tooltip title="交易Hash">
                  <hash-plate :hash="item.transactionHash" color="sliver"></hash-plate>
                </a-tooltip>
                <!--              {{ item.transactionHash }}-->
              </a-col>
              <a-col :span="3" class="col">
                <span> {{ item.amount }}<svg-icon icon="coin"></svg-icon></span>
              </a-col>
              <a-col :span="3" class="col">
                <!--              {{ item.type }}-->
                <a-tag color="blue">充值</a-tag>
              </a-col>
              <a-col :span="3" class="col">{{ item.createdTime }}</a-col>
              <a-col :span="3" class="col">
                <!--              {{ item.way }}-->
                <a-tag color="green">微信</a-tag>
              </a-col>
            </a-row>
          </div>
        </XyzTransitionGroup>
      </div>
      <a-drawer
        title="CoCoin充值"
        :width="420"
        :visible="chargeVisiable"
        :body-style="{ paddingBottom: '80px' }"
        @close="()=>{this.chargeVisiable=false}"
      >
        <coin-charge @success="chargeCocoins"></coin-charge>
        <div class="btn">
          <a-space>
            <a-button @click="test">充值</a-button>
          </a-space>
        </div>
      </a-drawer>
      <!--用户提现步骤弹窗-->
      <a-modal
        :visible="withDrawVisible"
        @cancel="closeWithDraw"
        :footer="null"
      >
        <div class="withdraw-steps">
          <with-draw-steps @success="withdrawCocoins"></with-draw-steps>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import HashPlate from '@/views/components/HashPlate'
import CoinCharge from '@/views/user/components/CoinCharge'
import PageHeader from '@/views/components/PageHeader/PageHeader'
import UserIdentify from '@/views/user/components/UserIdentify'
import WithDrawSteps from '@/views/user/components/WithDrawSteps'
import { ChargeCocoins, CheckBalance, GetCocoinBills, DelCocoinBill, CocoinWithDraw } from '@/api/modules/cocoin'

export default {
  name: 'MyCocoin',
  components: { PageHeader, CoinCharge, HashPlate, UserIdentify, WithDrawSteps },
  props: {},
  data () {
    return {
      chargeList: [],
      balance: '查询中...',
      pageSize: 10,
      pageNumber: 1,
      withDrawVisible: false,
      chargeVisiable: false,
      totolCounts: 0,
      openIdentifyForm: false,
      hasIdentified: false
    }
  },
  methods: {
    async delChargeRecord (id) {
      const res = await DelCocoinBill({ id })
      console.log('删除重置记录的结果', res)
    },
    openWithDraw () {
      this.withDrawVisible = true
      console.log('我要打开提现窗口')
    },
    closeWithDraw () {
      this.withDrawVisible = false
    },
    // 获取充值记录
    async getChargeRecords () {
      this.chargeList = []
      const data = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }
      const res = await GetCocoinBills(data)
      this.chargeList = res.data
      console.log('查看充值记录的结果', res)
    },
    // 查看Coco币的余额
    async checkCoCoinBalance () {
      const res = await CheckBalance()
      this.balance = res.data[0]
      console.log('我的CoCoin余额是', res)
    },
    // 充值Coco 币
    async chargeCocoins (data) {
      const res = await ChargeCocoins(data)
      console.log('充值结果', res)
      if (res.ok) {
        this.$message.success('您已充值100CCN！【此按钮仅限内部测试使用，即将废弃】')
        await this.checkCoCoinBalance()
      }
    },
    // 提现coco币
    async withdrawCocoins (data) {
      const res = await CocoinWithDraw(data)
      if (res.ok) {
        this.$message.success('提现成功！请注意查看您的账户余额')
      }
      console.log('提现结果', res)
    },
    async test () {
      await this.chargeCocoins({ transactionAmount: 100, ledgerWay: 0 })
    }
  },
  async mounted () {
    console.log('你好！！！')
    const userInfo = await this.$store.getters.userInfo
    if (!userInfo.id) {
      await this.$store.dispatch('GetInfo')
    }
    this.hasIdentified = await this.$store.getters.hasIdentified
    console.log('是否已经经过实名认证', this.hasIdentified)
    await this.checkCoCoinBalance()
    await this.getChargeRecords()
    // this.openIdentifyForm = true
  }
}
</script>

<style scoped lang='less'>

.my-cocoin {
  position: relative;

  .header {
    padding: 2em;

    .unable{
      font-size: 1.2em;
      color: #eeeeee;
    }


    .balance {
      font-size: 3em;
      color: #eeeeee;
    }

    .row {
      height: 30vh;

      .col {
        height: 100%;
      }
    }
  }


  .coin-stand {
    position: relative;
    width: 300px;
    height: 300px;
    padding: 10px;

    .cocoin {
      bottom: 20%;
      position: absolute;
      font-size: 220px;
      transform: skew(30deg, -30deg) scaleY(0.8);
    }

    .stand {
      bottom: -10px;
      left: 0;
      position: absolute;
      height: 130px;
    }
  }

  .modal-overlay {
    z-index: 999;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

}


.my-charge-wrapper {
  color: #656565;
  width: 95%;
  margin: 0 auto;

  .my-charge-item {
    color: #1a1717;
    margin: 10px auto;

    .col {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

}

.btn {
  padding: 20px;
  width: 100%;
  text-align: center;
}

.withdraw-steps{
  padding: 20px;
}
</style>

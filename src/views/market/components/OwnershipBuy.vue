<template>
  <div class="OwnershipBuy">
    <a-alert type="info">
      <div slot="message" class="alert-message-info">所有权购买须知</div>
      <div slot="description" class="alert-message-description">
        <div>若作品为共创作品，作品所有权的持有者将根据持有的所有权比例获得艺术品权属售卖的收益分红。</div>
      </div>
    </a-alert>
    <!--作品的简要信息-->
    <a-row type="flex" justify="space-between" class="specifications" :gutter="32">
      <a-col :span="8" class="col">
        <adaptive-img :src="artworkInfo.markedFileId" :loaded="artImgLoaded" img-class="img"></adaptive-img>
      </a-col>
      <a-col :span="16" class="col">
        <div class="name">《 {{ artworkInfo.name }} 》</div>
        <a-select
          class="wrapper"
          placeholder="选择从谁手里买所有权份额"
          @change="SalerSelected"
          style="width: 100%"
        >
          <a-select-option
            v-for="(item,index) in availables"
            :value="index"
            :key="index"
            class="share-owner-selector"
          >
            <a-row type="flex" justify="space-around">
              <a-col :span="4">
                <a-avatar :src="renderImg(item.photoFileId)" size="small"></a-avatar>
              </a-col>
              <a-col :span="8">
                {{ item.name }}
              </a-col>
              <a-col>
                单价:
              </a-col>
              <a-col :span="4">
                {{ item.ownPriceMin }}
                <svg-icon icon="coin"></svg-icon>
              </a-col>
            </a-row>
          </a-select-option>
        </a-select >
        <div class="wrapper">
          <div>
            <a-form-model ref="shareInput" :model="formData" :rules="formRules">
              <a-row type='flex' :gutter='16' justify='space-between'>
                <a-col :span='12'>
                  <span>限购:</span>
                  <span>
                     <a-tooltip :title="isSelected?'':'请先选择卖家'">
                    <a-form-model-item prop="tradeShare">
                    <a-input
                      suffix="%"
                      v-model="shareSelected.share"
                      :disabled="true"
                    ></a-input>
                  </a-form-model-item>
                     </a-tooltip>
                  </span>
                </a-col>
                <a-col :span='12'>
                  <span>购入:</span>
                  <a-tooltip :title="isSelected?'':'请先选择卖家'">
                    <a-form-model-item prop="tradeShare">
                      <a-input-number
                        v-model="formData.tradeShare"
                        :disabled="!isSelected"
                        :min="0"
                        :max="parseInt(shareSelected.share)"
                      ></a-input-number>
                    </a-form-model-item>
                  </a-tooltip>
                </a-col>
              </a-row>
            </a-form-model>
          </div>
        </div>
      </a-col>
    </a-row>
    <!--规格选择-->
    <div class="footer">
      <div>
        <span>价格：{{ transactionAmount }}</span>
        <svg-icon icon="coin"></svg-icon>
      </div>
      <a-button @click="purchaseConfirm">确认购买</a-button>
    </div>
  </div>
</template>

<script>
import AdaptiveImg from '@/views/components/AdaptiveImg'
import { AddOrder, GetAvailableOwnShares } from '@/api/modules/transition'
import { RenderPicture } from '@/api/modules/file'

export default {
  name: 'OwnershipBuy',
  components: {
    AdaptiveImg
  },
  props: {
    artworkInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      artImgLoaded: false,
      isSelected: false,
      shareSelected: {
        userId: '',
        photoFileId: '',
        name: '',
        ownPriceMin: '',
        share: '待选择'
      },
      formData: {
        tradeShare: 0
      },
      formRules: {
        tradeShare: [{ required: true, validator: this.buyShareValidator, trigger: 'change' }]
      },
      transactionAmount: '待计算',
      availables: []
    }
  },
  methods: {
    renderImg (fileId) {
      return RenderPicture(fileId)
    },
    SalerSelected (e) {
      console.log('选择了卖家', e)
      this.isSelected = true
      this.shareSelected = this.availables[e]
      this.formData.tradeShare = 1
      this.$refs.shareInput.validateField('tradeShare')
    },
    async purchaseConfirm () {
      this.$refs['shareInput'].validate(async valid => {
        if (valid) {
          console.log(this.transactionAmount)
          const hasUserInfo = await this.$store.getters.hasUserInfo
          if (!hasUserInfo) {
            await this.$store.dispatch('GetInfo')
          }
          const userInfo = await this.$store.getters.userInfo
          const data = {
            userId: userInfo.id,
            tradeType: 2,
            artworkId: this.artworkInfo.artworkId,
            transactionAmount: this.transactionAmount,
            ownUserId: this.shareSelected.userId,
            tradeShare: this.formData.tradeShare * 10
          }
          console.log('我要用这些参数来尝试生成一个订单', data)
          const res = await AddOrder(data)
          this.handlePurchaseRes(res)
        }
      })
    },
    handlePurchaseRes (res) {
      if (res.ok && res.data) {
        const orderInfo = {
          orderId: res.data.orderId,
          ...this.artworkInfo,
          createdTime: Date.now(),
          share: this.formData.tradeShare,
          unitPrice: this.shareSelected.ownPriceMin,
          type: 2 // type为2表示要生成一个所有权购买的订单
        }
        this.$emit('success', orderInfo)
      } else {
        this.$emit('fail', res.msg)
      }
    },
    buyShareValidator (rule, value, callback) {
      if (!value) {
        callback(new Error('请输入购买份额'))
      } else {
        if (!Number.isInteger(value) || value < 1 || value > this.shareSelected.share / 10) {
          callback(new Error(`购买份额应为1~${this.shareSelected.share / 10}之间的整数`))
        } else {
          callback()
        }
      }
    }

  },
  async mounted () {
    console.log(this.artworkInfo)

    // 获取可供选择的所有权规格
    const res = await GetAvailableOwnShares({ artworkId: this.artworkInfo.artworkId })
    res.ok ? this.availables = res.data : this.$message.error('未查询到该作品所有权售卖情况')
    if (this.artworkInfo.markedFileId) {
      this.artImgLoaded = true
    }
  },
  watch: {
    'formData.tradeShare': {
      handler (val) {
        console.log(val)
        const count = parseInt(val)
        if (count < 0 || count > parseInt(this.shareSelected.share || typeof count !== 'number')) {
          this.transactionAmount = '份额异常'
        } else if (val === '' || !this.shareSelected) {
          this.transactionAmount = '待计算'
        } else {
          this.transactionAmount = parseInt(this.shareSelected.ownPriceMin) * count
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped lang='less'>
.OwnershipBuy {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 15px;

  .title {
    font-size: 30px;
    color: #0e0e0e;
  }

  .specifications {
    margin: 15px auto;
    height: 130px;
    .col{
      height: 100%;
    }

    .wrapper{
      width: 100%;
    }


    .img{
      height:100%;
      width:100%;
    }
    .name{
      font-size: 2em;
    }



  }

  .footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

}

</style>

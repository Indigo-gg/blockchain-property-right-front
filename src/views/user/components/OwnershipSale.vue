<!--TODO 表格布局调整以及添加表单校验-->
<template>
  <div class='OwnerShipSale'>
    <a-alert>
      <div slot='message'>所有权发售须知</div>
      <div slot='description'>
        <div>①本平台的藏品所有权划分参考股份制,一件藏品的所有权被分为10份</div>
        <div>②共创作品上传时填写的贡献点等量转换为该创作者所持有的该藏品的股份</div>
        <div>③您可以选择售卖您的所有权股份来获得相应的收益，可售卖份数不得超过当前您所持有的份数</div>
      </div>
    </a-alert>
    <div>
      <a-space>
        <span>您拥有该藏品{{ status.contribution / 10 }}成贡献点</span>
        <span>当前持有可发售所有权份数:{{ status.isSaled ? status.margin / 10 : status.contribution / 10 }}</span>
      </a-space>
    </div>
    <a-form-model ref='sale-form' :model='formData' :rules='formRules'>
      <a-space>
        <a-form-model-item prop='price' label='股份单价'>
          <a-input
            v-model='formData.price'
            placeholder='输入发售单价'
            :min='0'
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label='发售份数' prop='number'>
          <a-input
            v-model='formData.number'
            placeholder='输入发售数量'
            :min='0'
          ></a-input>
        </a-form-model-item>
      </a-space>
    </a-form-model>
    <a-button v-if='!status.isSaled' @click='ownershipSale' :loading='submitLoading'>确认发售</a-button>
    <a-button v-else @click='ownershipAddSale' :loading='submitLoading'>增发</a-button>
  </div>
</template>

<script>
import { AddSale, UpdateSale } from '@/api/modules/transition'

export default {
  name: 'OwnershipSale',
  props: {
    artworkId: {
      required: true
    },
    status: {
      type: Object || undefined,
      required: true
    }
  },
  data() {
    return {
      formData: {
        price: 0,
        number: 0
      },
      formRules: {},
      margin: 5,
      isSaled: false,
      submitLoading: false
    }
  },
  methods: {
    async ownershipSale() {
      this.submitLoading = true
      const data = {
        price: parseInt(this.formData.price),
        number: parseInt(this.formData.number) * 10,
        artworkId: this.artworkId,
        type: 1
      }
      const res = await AddSale(data)
      this.handleResponse(data, res)
    },
    async ownershipAddSale() {
      this.submitLoading = true
      const data = {
        price: parseInt(this.formData.price),
        number: parseInt(this.formData.number) * 10,
        artworkId: this.artworkId,
        type: 1
      }
      const res = await UpdateSale(data)
      this.handleResponse(data, res)
    },
    handleResponse(request, response) {
      if (response.ok) {
        console.log('所有权发售成功!')
        this.$notification.open({
          message: '所有权发售成功！',
          description: `您以份额单价${request.price} CoCoin 发售了${request.number / 10}份所有权股份，可前往商城查看详情`,
          icon: <a-icon type='smile' style='color: #108ee9' />
        })
        // 传递更改信息，提醒父元素更新页面状态
        this.$emit('change', response)
      } else {
        console.log('所有权发售失败', response)
        this.$message.error('发售失败，请检查网络或者联系网站开发者')
      }
      // 取消上传按钮的加载动画
      this.submitLoading = false
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang='less'>
.OwnerShipSale {
  margin-bottom: 24px;
}

</style>

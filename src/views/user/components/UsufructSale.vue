<!--TODO 表格布局调整以及添加表单校验-->
<template>
  <div class='UsufructSale'>
    <a-alert>
      <div slot='message'>使用权发售须知</div>
      <div slot='description'>
        <div>①在本平台中、同一件藏品的使用权价格是确定且统一的，多人创作作品的使用权发售价格也应遵循该点。</div>
        <div>②多人创作作品使用权发售采用规则：由主创者进行使用权定价后，共创者方可依据主创人所定价格来选择藏品使用权的发售数量。</div>
        <div>③使用权定价之后暂不支持更改，定价前请合理预估您欲发售的使用权价格。</div>
      </div>
    </a-alert>
    <div v-if='status.isSaled'>
      <a-space>
        <span>当前价格:{{ status.curPrice }} <svg-icon icon='coin'></svg-icon></span>
        <span>当前已有发行量:{{ status.curAmount }}</span>
      </a-space>
    </div>
    <!--    &lt;!&ndash;该藏品当前并没有发售且我不是主创者&ndash;&gt;-->
    <!--    <div v-if="!status.isSaled&&!status.isMainCreator">-->
    <!--      <a-alert message="主创者未定价,请联其定价发售" type="info" show-icon />-->
    <!--    </div>-->
    <a-form-model ref='sale-form' :model='formData' :rules='formRules' v-if='status.isMainCreator&&!status.isSaled'>
      <a-space>
        <a-form-model-item prop='tradeShare' label='单价'>
          <a-input
            v-model='formData.price'
            placeholder='输入发售单价'
            :min='0'
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label='发售量'>
          <a-input
            v-model='formData.number'
            placeholder='输入发售数量'
            :min='0'
          ></a-input>
        </a-form-model-item>
      </a-space>
    </a-form-model>
    <a-form-model ref='sale-form' :model='formData2' :rules='formRules' v-else>
      <a-form-model-item label='增发数量'>
        <a-input
          v-model='formData2.number'
          placeholder='输入增发数量'
          :min='0'
          :disabled='!status.isMainCreator&&!status.isSaled'
        ></a-input>
        <!--共创者在主创者发售使用权前的不可操作提示-->
        <a-tooltip
          v-if='!status.isSaled&&!status.isMainCreator'
          placement='rightTop'
          title='为保证同一藏品使用权价格统一、共创者在主创者定价前不可发售使用权哦~'>
          <a-icon type='question-circle' theme='filled' />
        </a-tooltip>
      </a-form-model-item>
    </a-form-model>
    <template v-if='!status.isSaled&&status.isMainCreator'>
      <a-popconfirm title='我已知晓使用权定价后暂不支持更改' cancelText='再想想' okText='确认定价' @confirm='UsufructSale'>
        <a-icon slot='icon' type='question-circle-o' style='color: red' />
        <a-button :loading='submitLoading'>确认发售</a-button>
      </a-popconfirm>
    </template>
    <a-button v-else @click='UsufructAddSale' :disabled='!status.isSaled' :loading='submitLoading'>增发</a-button>
  </div>
</template>

<script>
import { AddSale, UpdateSale } from '@/api/modules/transition'

export default {
  name: 'UsufructSale',
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
      formData2: {
        number: 0
      },
      submitLoading: false,
      formRules: {}
    }
  },
  methods: {
    async UsufructSale() {
      this.submitLoading = true
      const data = {
        price: parseInt(this.formData.price),
        number: parseInt(this.formData.number),
        artworkId: this.artworkId,
        type: 0
      }
      const res = await AddSale(data)
      this.submitLoading = false
      this.handelRespose(data, res)
    },
    async UsufructAddSale() {
      this.submitLoading = true
      const data = {
        price: this.status.curPrice,
        number: parseInt(this.formData2.number),
        artworkId: this.artworkId,
        type: 0
      }
      const res = await UpdateSale(data)
      this.submitLoading = false
      this.handelRespose(data, res)
    },
    handelRespose(request, response) {
      if (response.ok) {
        console.log('使用权发售成功!')
        this.$notification.open({
          message: '使用权发售成功！',
          description: `您以单价${request.price} CoCoin 发售了${request.number}份【仅使用权】藏品,可前往商城查看详情`,
          icon: <a-icon type='smile' style='color: #108ee9' />
        })
        // 传递更改信息，提醒父元素更新页面状态
        this.$emit('change', response)
      }
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang='less'>
.UsufructSale {
  margin-bottom: 24px;
}
</style>

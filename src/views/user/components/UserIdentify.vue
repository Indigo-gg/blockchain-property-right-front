<template>
  <div class="identify-form-page">
    <span class="close" @click="()=>{this.$emit('cancel','')}"><svg-icon icon="close-cross" color="#222222"></svg-icon></span>
    <div class="identify-title">实名认证</div>
    <div class="notice">
      <span class="title">为什么要实名认证？</span>
      <p class="content">
        根据国家互联网信息办2019年2月15日发布《区块链信息服务管理规定》第八条：对区块链信息服务使用者进行基于组织机构代码、身份证件号码或者移动电话号码等方式的真实身份信息认证。用户不进行真实身份信息认证的，区块链信息服务提供者不得为其提供相关服务。
        <a href="http://www.cac.gov.cn/2019-01/10/c_1123971164.htm">详情</a>
      </p>
      <p class="content">
        数字产品为您的虚拟资产，进行实名认证，才能保障个人资产不受侵犯，才能合规地成为实体世界财产的载体。我们可以更加精确地保护和确定您的知识产权，以及后续您的作品、您的版权信息、您的藏品交易信息。因此实名认证是必要的。</p>
      <p class="content">根据规定，我们在充值支付之前确认您已成年，本平台仅针对成年公民提供服务，您需要进行实名认证。本平台保证,您的身份信息仅会被用来区块链上链以及用户身份和数字资产认证。</p>
      <span @click="()=>{this.userConfirmed=true}" style="cursor: pointer"> <input
        type="radio"
        :checked="userConfirmed">我已阅读并知晓实名认证的必要性</span>
    </div>
    <a-form-model
      class="identify-form"
      ref="identifyForm"
      :model="formData"
      :rules="formRules"
    >
      <div id="IdCard">
        <a-form-model-item prop="idcard" class="idcard-input">
          <a-input id="id-card" v-model="formData.idcard"></a-input>
          <span class="label" :class="formData.idcard===''?'':'float'">二代身份证号</span>
        </a-form-model-item>
      </div>
      <div id="TrueName">
        <a-form-model-item prop="trueName" class="truename-input">
          <a-input id="name" v-model="formData.trueName"></a-input>
          <span class="label" :class="formData.trueName===''?'':'float'">您的真实姓名</span>
        </a-form-model-item>
      </div>
    </a-form-model>
    <div id="btn">
      <a-button type="primary" @click="UserIdentify" :disabled="!userConfirmed" size="big">身份认证</a-button>
    </div>
  </div>
</template>
<script>
import { validIdCard } from '@/utils/validate'

const validatorIdCard = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入您的身份证号'))
  } else {
    if (!validIdCard(value)) {
      callback(new Error('身份证号码格式不正确'))
    } else {
      callback()
    }
  }
}
export default {
  name: 'UserIdentify',
  props: {},
  data () {
    return {
      userConfirmed: false,
      formData: {
        idcard: '',
        trueName: ''
      },
      formRules: {
        idcard: [{ required: true, validator: validatorIdCard, type: 'String', trigger: 'change' }],
        trueName: [{ required: true, trigger: 'change' }]
      }
    }
  },
  methods: {
    UserIdentify () {
      this.$refs.identifyForm.validate(async valid => {
        if (valid) {
          const ok = await this.$store.dispatch('IdentifyRealName', this.formData)
          console.log('实名认证结果', ok)
          if (ok) {
            this.$message.info('实名认证成功')
            this.$emit('success', true)
          }
        }
      })
    }

  },
  watch: {
    'formData.idcard': {
      handler (val) {
        console.log(val)
      },
      immediate: true,
      deep: true
    },
    'formData.trueName': {
      handler (val) {
        console.log(val)
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped lang='less'>

.identify-form-page {
  position: relative;
  color: #5e5e5e;
  padding: 30px;
  width: 600px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
}

.close {
  font-size: 1.2em;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(28, 28, 28, 0.07);
  }
}

.notice {
  width: 90%;

  .title {
    font-size: 1.2em;
    font-weight: bold;
  }

  .content {
    color: #918181;

    &::first-letter {
      padding-left: 2em;
    }
  }
}

.identify-title {
  font-size: 2em;
}

.identify-form {
  width: 90%;

  .idcard-input,
  .truename-input {
    position: relative;
    height: 2.8em;
    margin-top: 2em;
    font-size: 1.2em;

    .ant-input {
      font-size: 1em;
      font-weight: bold;
      padding: 0.5em 1em;
      height: 2.8em;
      border-radius: 0.3em;
      border: 1px solid #7e8185;
      background-color: #fff;
      transition: all 0.3s ease;

      &:focus {
        border: 2px solid #749fec;
      }
    }
  }

  #id-card:focus ~ .label,
  #name:focus ~ .label {
    color: #1890ff;
    top: -0.7em;
    background-color: #fff;
  }

  .label {
    display: inline-block;
    position: absolute;
    overflow: hidden;
    font-size: 1em;
    line-height: 1.1em;
    letter-spacing: 2px;
    padding: 0 3px;
    top: 0.65em;
    left: 10px;
    transform: translateY(-50%);
    transition: all 0.5s;
    color: #999999;

    &.float {
      color: #1890ff;
      top: -0.7em;
      background-color: #fff;
    }
  }
}


</style>

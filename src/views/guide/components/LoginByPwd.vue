<template>
  <div class="wrapper">
    <a-form-model
      ref="ruleForm"
      :model="formData"
      :rules="formRules"
    >
      <a-form-model-item prop="username" ref="username" hasFeedback validateStatus>
        <a-input v-model="formData.username" placeholder="手机号码/初次登录默认使用该号码创建" />
      </a-form-model-item>
      <a-form-model-item prop="password" hasFeedback validateStatus>
        <a-input-password class="login-ant-password" v-model="formData.password" placeholder="密码" />
      </a-form-model-item>
      <a-form-model-item>
        <a-input type="checkbox" :checked="formData.keepLogin"></a-input>
        记住我
      </a-form-model-item>

      <a-form-model-item>
        <a-button
          @click="subLogin"
          class="login-submit-btn"
          type="primary"
          :loading="loginLoading"
          :disabled="loginLoading"
          html-type="submit"
          block>{{ loginLoading ? '正在登录...' : '登录' }}
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>

import { deepClone } from '@/utils'

export default {
  name: 'LoginByPwd',
  props: {},
  data () {
    return {
      formData: {
        username: '',
        password: '',
        keepLogin: false
      },
      formRules: {
        username: [{ required: true, message: '请输入您的账号', trigger: 'change' }],
        password: [{ required: true, message: '请输入您的密码', trigger: 'change' }]
      },
      loginLoading: false
    }
  },
  methods: {
    // 通过密码来登录
    subLogin () {
      const _this = this
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const data = deepClone(_this.formData)
          data.mobile = data.username
        }
      })
    }
  },
  mounted () {
    console.log(this.$refs.ruleForm.validate)
  }
}
</script>

<style scoped lang='less'>

</style>

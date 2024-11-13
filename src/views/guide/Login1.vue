<template>
  <div class="login-form-page">
    <span class="close-login" @click="()=>{this.$emit('cancel','')}"><svg-icon
      icon="close-cross"
      color="#222222"></svg-icon></span>
    <!--使用短信验证码的方式进行登录-->
    <div class="login-title">用户登录</div>
    <div class="login-form by-captcha" xyz="fade" v-if="loginType===byCaptcha">
      <login-by-captcha @success="loginSuccess"></login-by-captcha>
    </div>
    <!--使用密码的方式进行登录-->
    <div class="login-form by-password" xyz="fade" v-if="loginType===byPassword">
      <login-by-pwd @success="loginSuccess"></login-by-pwd>
    </div>
    <!--切换登录方式-->
    <a-row type="flex" justify="space-between">
      <a-col :flex="1" style="justify-content: left">
        <span @click="forgetPassword" style="cursor: pointer"> 忘记密码?</span>
      </a-col>
      <a-col :flex="2">
        <span @click="changeLoginType" style="display: flex;justify-content: right;cursor: pointer"> {{ typeNotice
        }}</span>
      </a-col>
    </a-row>
  </div>
</template>

<script>

import LoginByCaptcha from '@/views/guide/components/LoginByCaptcha'
import LoginByPwd from '@/views/guide/components/LoginByPwd'

const BY_CAPTCHA = 1
const BY_PASSWORD = 0

// 自定义form-model-item校验


export default {
  name: 'Index',
  components: { LoginByCaptcha, LoginByPwd },
  data () {
    return {
      byCaptcha: BY_CAPTCHA,
      byPassword: BY_PASSWORD,
      loginType: BY_CAPTCHA
    }
  },
  methods: {
    // 登录提交
    // async handleLogin (e) {
    //   // 阻止页面刷新
    //   e.preventDefault()
    //   const _this = this
    //   this.$refs.ruleForm.validate(async valid => {
    //     if (valid) {
    //       console.log('!!!!!!!!!!!!!')
    //       _this.loginLoading = true
    //       const formData = { keepLogin: 0, ...this.loginForm.form }
    //       let logSuccess = false
    //       if (this.loginType === BY_PASSWORD) {
    //         logSuccess = await this.$store.dispatch('LoginPwd', formData)
    //       } else {
    //         const { mobile, captcha, keepLogin } = formData
    //         logSuccess = await this.$store.dispatch('LoginCaptcha', {
    //           mobile: mobile,
    //           code: captcha,
    //           keepLogin: keepLogin
    //         })
    //       }
    //       console.log(this.loginLoading)
    //       setTimeout(() => {
    //         _this.loginLoading = false
    //       }, 300)
    //     }
    //   })
    // },
    // 忘记密码
    async loginSuccess (info) {
      console.log('???????????????????')
      console.log(info)
      await this.$store.dispatch('GetInfo')
      await this.$router.push({ name: 'Home' })
    },
    forgetPassword () {

    },
    // 切换登录状态
    changeLoginType () {
      this.loginType = this.loginType === BY_CAPTCHA ? BY_PASSWORD : BY_CAPTCHA
      // 保留电话号码以及校验状态
      const mobile = this.loginForm.form.username
      this.$refs.ruleForm.resetFields()
      this.loginForm.form.username = mobile
      this.$refs.ruleForm.validateField('username')
    }
  },
  computed: {
    typeNotice () {
      return this.loginType === BY_CAPTCHA ? '切换至密码登录' : '切换至短信验证码登录'
    }
  },
  mounted () {

  }
}
</script>

<style scoped lang='less'>
.login-form-page {
  position: relative;
  padding: 30px 20px 35px;

  .close-login {
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

  .login-title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    margin: 1em auto;
    font-size: 2em;
    color: #45f3ff;
    font-weight: 500;
    text-align: center;
    letter-spacing: 0.1em;
  }

}


.login-box {
  font-size: 1.2em;
  top: 25%;
  left: 8%;
  padding: 40px 30px 40px;
  width: 380px;
  margin: 0 auto;
  display: flex;
  z-index: 2;
  flex-direction: column;
}


</style>

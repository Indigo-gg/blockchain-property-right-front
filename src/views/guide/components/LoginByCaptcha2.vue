<template>
  <div class="wrapper login-form">
    <a-form-model
      ref="ruleForm"
      :model="formData"
      :rules="formRules"
    >
      <a-row span="18" class="mobile-input  row">
        <a-form-model-item prop="mobile" validateStatus>
          <!--          <div class="inputBox">-->
          <a-input v-model="formData.mobile" placeholder="手机号码"/>
          <!--            <span>账号</span>-->
          <!--            <i></i>-->
          <!--          </div>-->
        </a-form-model-item>
      </a-row>
      <a-row class="captcha-input row">
        <a-col :span="12" class="col">
          <a-form-model-item prop="captcha">
            <a-input
              class="login-ant-captcha"
              v-model="formData.captcha"
              placeholder="4位验证码"
              hasFeedback
              validateStatus/>
          </a-form-model-item>
        </a-col>
        <a-col :span="12" class="col getCaptcha">
          <a-form-model-item>
            <a-button
              ghost
              style="color: #eeafee"
              class="login-getCaptcha"
              @click="getCaptcha"
              :loading="captchaLoading"
              :disabled="!mobileValid||captchaLoading"
            > {{ captchaLoading ? `${captchaTimer}s` : '获取验证码' }}
            </a-button>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row class="login-btn row">
        <a-col :span="12">
          <a-form-model-item>
            <div style="font-size:1em;display: flex;justify-content: center;align-items: center">
              <a-input id="rem" name="rem" type="checkbox" :checked="formData.keepLogin"></a-input>
              <label for="rem" class="remMe">记住我</label>
            </div>

          </a-form-model-item>
        </a-col>
        <a-col :span="12" class="">
          <a-form-model-item>
            <a-button
              ghost
              @click="subLogin"
              style="color: cornflowerblue"
              :loading="loginLoading"
              :disabled="loginLoading"
              html-type="submit"
              block>{{ loginLoading ? '请稍后...' : '登录' }}
            </a-button>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import { validMobile } from '@/utils/validate'
import { SendMs } from '@/api/modules/user'

export default {
  name: 'LoginByCaptcha2',
  props: ['isAgree'],
  data () {
    return {
      mobileValid: false,
      agree: false,
      formData: {
        mobile: '',
        captcha: '',
        keepLogin: false
      },
      formRules: {
        mobile: [{ required: true, validator: this.vaidatorMobile, trigger: 'change' }],
        captcha: [{ required: true, validator: this.vaidatorCaptcha, trigger: 'change' }]
      },
      captchaLoading: false,
      captchaTimer: 60,
      // 登录加载
      loginLoading: false
    }
  },
  methods: {
    async subLogin (e) {
      const _this = this
      if (!this.agree) {
        this.$message.warning('请同意服务协议')
        return
      }
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const data = _this.formData
          data.keepLogin = data.keepLogin ? 1 : 0
          data.code = data.captcha
          _this.loginLoading = true
          try {
            await _this.$store.dispatch('LoginCaptcha', data)
            _this.$emit('success', '登陆成功')
            _this.loginLoading = false
          } catch (e) {
            setTimeout(() => {
              _this.$emit('fail', '登陆失败')
              _this.loginLoading = false
            }, 2000)
          }
        }
      })
    },

    async getCaptcha () {
      // Message('info', '我们向您的手机发送了一条短信验证码，请注意查收', 5)
      const _this = this
      this.captchaLoading = true
      _this.captchaTimer = 60
      const timer = setInterval(() => {
        _this.captchaTimer--
        if (_this.captchaTimer < 0) {
          clearInterval(timer)
          _this.captchaLoading = false
        }
      }, 1000)
      const { mobile } = this.formData
      const codeSend = await SendMs({ mobile })
      console.log('验证码发送结果', codeSend)
      if (codeSend.ok) {
        this.$message.success('已向您尾号' + mobile.slice(-4) + '的手机发送了一条验证码信息，请注意查收~')
      }
    },
    vaidatorMobile (rule, value, callback) {
      if (!value) {
        this.mobileValid = false
          .callback(new Error('请输入您的用户名(手机号)'))
      } else {
        if (!validMobile(value)) {
          this.mobileValid = false
          callback(new Error('手机号是不是输错啦'))
        } else {
          this.mobileValid = true
          callback()
        }
      }
    },
    vaidatorCaptcha (rule, value, callback) {
      console.log(value)
      if (!value) {
        callback(new Error('输入验证码'))
      } else {
        if (value.length !== 4) {
          callback(new Error('验证码应为4位'))
        } else {
          callback()
        }
      }
    }
  },
  watch: {
    isAgree (newVal) {
      console.log('isAgreen', newVal)
      this.agree = newVal
    }
  }
}
</script>

<style scoped lang='less'>
.row {
  width: 65%;
  margin: 0 auto;

  .col {
    display: flex;
    align-items: center;
  }
}

.captcha-input {
  .getCaptcha {
    display: flex;
    justify-content: right;
  }
}

.captcha-input, .mobile-input, .login-btn {

}

.inputBox input {
  position: relative;
  width: 100%;
  padding: 20px 10px 10px;
  background: transparent;
  outline: none;
  box-shadow: none;
  border: none;
  color: #23242a;
  font-size: 1em;
  letter-spacing: 0.05em;
  transition: 0.5s;
  z-index: 10;
}

.inputBox span {
  position: absolute;
  left: 0;
  padding: 20px 0px 10px;
  pointer-events: none;
  font-size: 1em;
  color: #8f8f8f;
  letter-spacing: 0.05em;
  transition: 0.5s;
}

.inputBox input:valid ~ span,
.inputBox input:focus ~ span {
  color: #45f3ff;
  transform: translateX(0px) translateY(-34px);
  font-size: 0.75em;
}

.inputBox i {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #45f3ff;
  border-radius: 4px;
  overflow: hidden;
  transition: 0.5s;
  pointer-events: none;
  z-index: 9;
}

.inputBox input:valid ~ i,
.inputBox input:focus ~ i {
  height: 44px;
}

.remMe {
  cursor: pointer;
  margin: 1px 5px;
  color: #8f8f8f;
  //text-decoration: beige;
}

.remMe:hover {
  color: #45f3ff;
}

</style>

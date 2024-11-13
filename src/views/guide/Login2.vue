<template>
  <div class="login-form-page">
    <span class="close-login" @click="()=>{this.$emit('cancel','')}"><svg-icon
      icon="close-cross"
      color="#eeeeee"></svg-icon></span>
    <!--使用短信验证码的方式进行登录-->
    <div class="login-title">用户登录</div>
    <div class="login-form by-captcha" xyz="fade">
      <login-by-captcha :is-agree="isCheckPto" @success="loginSuccess"></login-by-captcha>
    </div>
    <a-row>
      <a-col style="width: 100%;margin-top: 50px;font-size: 12px" type="flex" :span="24" align="center">
        <!--        <div class="links">-->
        <!--        <div class="pto">-->
        <!--          <a-form-model-item>-->
        <a-checkbox
          style="margin-right: 4px;width: 15px;height: 18px"
          @change="onChange"
          :checked="isCheckPto"></a-checkbox>
        <!--          </a-form-model-item>-->
        <label style="height: 18px;margin-top: 3px; line-height: 18px"><span v-if="isCheckPto">已</span><span
          v-else>请</span>同意<a
          @click="showPto">《服务协议》</a></label>
        <!--        </div>-->
        <!--        </div>-->
      </a-col>
    </a-row>
  </div>
</template>

<script>

import LoginByCaptcha from '@/views/guide/components/LoginByCaptcha2'

// 自定义form-model-item校验


export default {
  name: 'Index',
  components: { LoginByCaptcha },
  data () {
    return {
      isCheckPto: false,
      texts: {
        title: '在上传作品前，请保证您已阅读并充分理解我们的上传需知',
        tips: '创作者上传艺术品时预先协定好每个共创者的贡献度比例，每名创作者依据初始的贡献度比例获得对应份数的所有权。艺术品发售后，所有共创者将按所有权比例获得收益分红。\n' +
          '所有权发售前需要所有共创者提前协商并统一定价，按份额出售。购买了所有权份额的用户即日起开始按份额比例享有收益分红。\n' +
          '使用权发售前需要所有共创者提前协商并统一定价，按份数出售。\n' +
          '请注意，在出价不低于发售定价的前提下，其余创作者拥有优先购买权。\n',
        text1: '1.\t您需要在上传时预先协定并设置每一位创作者的贡献度比例。一件艺术品的所有权份额之和为且仅为100%。如果这件艺术品由您独创，则您拥有100%的贡献度；若这件艺术品由您和其他艺术家（需为本平台注册用户）共同创作，则您需要预先协定所有共创者的贡献度比例。艺术品发售后，所有持有艺术品所有权的共创者将按所有权比例获得收益分红。\n',
        text2: '2.\t若您决定发售您的作品，则在所有权及/或使用权发售前需要与所有共创者提前协商并统一定价。所有权成功出售后，被出售的所有权份额自发售者转移至买家手中，购买了所有权份额的用户即日起开始按份额比例享有收益分红，所有权出售者获得的收益分红比例相应减少。\n' +
          '\t您需要注意，当知识产权发售时，在出价不低于发售定价的前提下，您的共创者拥有优先购买权。\n',

        text3: '3.在发售知识产权前，您需要知悉所有权及/或使用权代表的意义。\n' +
          '\t所有权的持有者将享有如下对艺术品的处置权限：\n' +
          '①\t转售此藏品；\n' +
          '②\t将此藏品用作商业用途。\n' +
          '使用权的持有者将享有如下对艺术品的处置权限：\n' +
          '将此藏品用作商业用途。\n' +
          '使用权的买家不具有二次出售使用权的权限。\n',
        text4: '4.若您及/或共创者在艺术品创作时使用了他人的原创元素、创意或系列IP，需提前取得原创者的有效授权，并以图片形式（.png，.jpg等）于此处上传，作为您及/或共创者的有效授权证明。\n' +
          '若您未取得相关授权或未上传相关证明文件，一经悉知，我们将会退回您的作品，直到您重新上传去除借鉴元素或拥有完备授权证明的作品为止。\n'
      }
    }
  },
  methods: {
    onChange (e) {
      this.isCheckPto = e.target.checked
    },
    async loginSuccess (info) {
      console.log(info)
      await this.$store.dispatch('GetInfo')
      await this.$router.push({ name: 'Home' })
    },
    forgetPassword () {

    },
    showPto () {
      const that = this
      const h = this.$createElement
      this.$info({
        title: this.texts.title,
        okText: '我已了解并接受',
        width: 700,
        content: h('div', { style: 'text-indent:2em;padding:10px 0;height:50vh;overflow:scroll' }, [
          // h('h3', {}, this.texts.title),
          h('h4', { style: 'font-weight:600' }, this.texts.tips),
          h('p', {}, this.texts.text1),
          h('p', {}, this.texts.text2),
          h('p', {}, this.texts.text3),
          h('p', {}, this.texts.text4)
        ]),
        onOk () {
          that.isCheckPto = true
        }
      })
    }
    // 切换登录状态
  },
  computed: {},
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

.box {
  position: relative;
  width: 380px;
  height: 420px;
  background: #1c1c1c;
  border-radius: 8px;
  overflow: hidden;
}

.box::before {
  content: '';
  z-index: 1;
  position: absolute;
  top: -50%;
  left: -50%;
  width: 380px;
  height: 420px;
  transform-origin: bottom right;
  background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
  animation: animate 6s linear infinite;
}

.box::after {
  content: '';
  z-index: 1;
  position: absolute;
  top: -50%;
  left: -50%;
  width: 380px;
  height: 420px;
  transform-origin: bottom right;
  background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
  animation: animate 6s linear infinite;
  animation-delay: -3s;
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

form {
  position: absolute;
  inset: 2px;
  background: #28292d;
  padding: 50px 40px;
  border-radius: 8px;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

h2 {
  color: #45f3ff;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.1em;
}

.inputBox {
  position: relative;
  width: 300px;
  margin-top: 35px;
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

.pto {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 9px;

}

//.remMe {
//  cursor: pointer;
//  margin: 0 5px;
//  font-size: 1em;
//  color: #8f8f8f;
//  text-decoration: beige;
//}
//
//.remMe:hover {
//  color: #45f3ff;
//}

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

.links {
  display: flex;
  justify-content: space-between;
}

.links a {
  margin: 10px 0;
  font-size: 0.75em;
  color: #8f8f8f;
  text-decoration: beige;
}

.links a:hover,
.links a:nth-child(2) {
  color: #45f3ff;
}

input[type="submit"] {
  border: none;
  outline: none;
  padding: 11px 25px;
  background: #45f3ff;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  width: 100px;
  margin-top: 10px;
}

input[type="submit"]:active {
  opacity: 0.8;
}


</style>

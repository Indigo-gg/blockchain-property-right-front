<template>
  <div class="container">
    <div class="goback">
      <svg-icon icon="goback" size="40" @click="goback" class="goback">
      </svg-icon>
    </div>
    <h1>纪念账号申请</h1>
    <form onsubmit="return false;" onreset="return false;">
      <div class="icon" style="float: right;margin-bottom: 10px" @click="showTips">
        <svg-icon icon="question" size="25"></svg-icon>
      </div>
      <label for="username">用户账号</label>
      <input type="text" id="username" name="username" placeholder="请输入用户账号">
      <label for="password">密码</label>
      <input type="password" id="password" name="password" placeholder="请输入密码">

      <label for="reason">申请理由</label>
      <textarea id="reason" name="reason" placeholder="请输入申请理由"></textarea>
      <div class="flex-row-space-around">
        <input type="submit" @click="submit" value="提交">
        <input type="reset" @click="cancel" value="取消">
      </div>

    </form>
  </div>
</template>

<script>
import svgIcon from "@/components/svgIcon/svgIcon";

export default {
  name: "death",
  components: {
    svgIcon
  },

  data() {

    return {
      texts: {
        title: '纪念账号申请须知',
        tips: '人的一生会经历三次死亡，第一次是心跳停止的人时候，这是心理意义上的死亡，第二次是在葬礼的时候，这是社会性死亡，而第三次死亡则是最后一个人忘记你，这才是真正意义上的死亡。',
        text1: '本平台提供家属申请通道，可申请纪念账号功能可以将数字记忆保存，在申请成功的那一刻，账号会被冻结，该名用户的所有账号内容都将原封不动地保留在本网站以及区块链上，之后任何人都将无法进行登录。同时账号的交易，充值等功能也将逐一关闭。而在逝者的个人主页上，会出现一段来自本网站官方的悼念信息。',
        text2: '若已经逝世用户已经指定所创作的作品的封存或转增，当家属申请此通道时，流程将会自动启动。若没有进行指定家属可通过此通道，提供用户信息等内容，可以对用户藏品进行继承。具体版权时间请看本平台条例。'
      },
      form: {}
    }
  },
  methods: {
    showTips() {
      const h = this.$createElement
      this.$info({
        title: this.texts.title,
        okText: '我已知晓',
        width: 700,
        maskClosable: true,
        content: h('div', {style: 'text-indent:2em; height:30vh;overflow:scroll'}, [
          // h('h3', {style:'font-size:16px;color:#bababa'}, this.texts.title),
          h('h4', {style: 'font-weight:600'}, this.texts.tips),
          h('p', {style: 'font-size:14px'}, this.texts.text1),
          h('p', {style: 'font-size:14px'}, this.texts.text2)
        ]),
        onOk() {
          // that.isCheckPto = true
        }
      })
    },
    goback() {
      setTimeout(() => {
        this.$router.go(-1)
      }, 1000)
    },
    submit() {
      this.$message.success('提交成功，我们会尽快给您处理！')
      this.goback()
    },
    cancel() {
      this.$message.info('正在跳转回原页面')

      this.goback()
    }
  }
}
</script>

<style scoped>

.container {
  position: relative;
  z-index: 111;
  /*background: rgba(197, 213, 218, 0.1);*/
  background: linear-gradient(rgba(176, 216, 231, 0.3), rgba(0, 0, 0, 0.2)), url('http://blockchain.maplesky.cn/StaticResource/Death/death.png') no-repeat;
  /*opacity: 0.6;*/
  background-size: 100% auto;
  padding: 20px;
  border-radius: 10px;
  margin-top: 70px;
  max-width: 90vw;
  height: 80vh;
  max-height: 80vh;
  margin-left: auto;
  margin-right: auto;
}

.goback {
  position: absolute;
  left: 20px;
  top: 20px;
  cursor: pointer;
}

form {
  /*opacity: 1;*/
  background-color: rgba(34, 34, 34, 0.75);
  padding: 20px;
  border-radius: 10px;
  margin-top: 50px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

input[type=text], input[type=password] {
  background-color: rgba(51, 51, 51, 0.2);
  border: none;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  color: #fff;
  margin-bottom: 10px;
  width: 100%;
}

input[type=submit], input[type=reset] {
  background-color: rgba(76, 175, 80, 0.8);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
}

input[type=reset] {
  background-color: rgba(244, 67, 54, 0.8);
}

textarea {
  background-color: rgba(51, 51, 51, 0.2);
  border: none;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  color: #fff;
  margin-bottom: 10px;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 5px;
}

.icon {
  cursor: pointer;
}

h1 {
  text-align: center;
  margin-top: 40px;
  /*font-size: 36px;*/
  color: #6fbeb1;
  font-size: 50px;
  letter-spacing: 5px;
  font-weight: bold;

  /*text-shadow: 2px 2px #000;*/
  background: linear-gradient(to bottom, #15202B 20%, #3E6075 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  text-shadow: 1px 1px 20px rgba(255, 255, 255, 0.4);
}
</style>
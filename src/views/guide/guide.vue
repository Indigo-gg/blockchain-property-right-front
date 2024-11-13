<template>
  <div class="guide-container">
    <div class="section-1 section">
      <XyzTransition>
        <a-row v-if="sec_1_appear" class="row">
          <a-col class="col-1" :span="12">
            <ul class="title-words">
              <li class="words-line xyz-nested" xyz="fade left">
                <p>Digital collectibles</p>
              </li>
              <li class="words-line xyz-nested" xyz="fade right">
                <p class="han">数字作品</p>
              </li>
              <li class="words-line xyz-nested" xyz="fade left">
                <p>BlockChain&nbsp;&nbsp;&&nbsp;&nbsp;Metaverse</p>
              </li>
              <li class="words-line xyz-nested" xyz="fade right">
                <p class="han">区块链&元宇宙</p>
              </li>
              <li class="words-line xyz-nested" xyz="fade left">
                <p>Transaction and Property Protection</p>
              </li>
              <li class="words-line xyz-nested" xyz="fade right">
                <p class="han">作品交易与产权保护</p>
              </li>
            </ul>
          </a-col>
          <a-col :span="12" class="header-col" style="height: 100%">
            <!--            <img src="../../assets/images/elements/half-ball.webp" class="cover-ball">-->
            <img src="http://blockchain.maplesky.cn/StaticResource/Guide/half-ball.webp" class="cover-ball">


          </a-col>
        </a-row>
      </XyzTransition>
    </div>
    <div class="section-2 section">
      <XyzTransition>
        <a-row v-if="sec_2_appear" xyz="fade up  delay-0.8" class="row">
          <a-col :span="1" class="col-2">
            <div class="animate-column">
              <a-icon type="dollar" class="icon" />
              <div ref="bar-2"></div>
            </div>
          </a-col>
          <a-col :span="23" class="section-content">
            <div class="fond">
              <span class="s1">blockChain</span>
              <span class="s2">Based</span>
            </div>
            <div class="card">
              <div class="thumbnail">
                <!--                <img class="left" src="../../assets/images/elements/back.png"/>-->
                <img class="left" src="http://blockchain.maplesky.cn/StaticResource/Guide/back.png" />

              </div>
              <div class="right">
                <h1>欢迎使用权星艺链以及服务!</h1>
                <div class="separator"></div>
                <div class="brief">
                  权星艺链是一款使用区块链技术的元宇宙场景数字藏品权益保护与产权服务的互联网平台，为广大数字艺术藏品创作者与爱好者提供数字艺术藏品链上权属交易与版权确权保护的一站式服务，旨在打造全链路业务过程安全、可信、侵权可追溯的数字艺术品权益服务平台。
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </XyzTransition>
    </div>
    <!--第三版-->
    <div class="section-3 section">
      <XyzTransition>
        <a-row v-if="sec_3_appear" xyz="fade up  delay-0.8" class="row">
          <a-col :span="1" class="col-3">
            <div class="animate-column">
              <a-icon type="gold" class="icon" />
              <div ref="bar-3"></div>
            </div>
          </a-col>
          <a-col :span="23" class="section-content">
            <a-row type="flex" justify="space-between" :gutter="48">
              <a-col v-for="item in innovations" :span="8">
                <div class="innovation-card">
                  <div class="cover">
                    <img :src="item.cover" alt="封面图">
                  </div>
                  <div class="title my-flex-center">
                    {{ item.title }}
                  </div>
                  <div class="brief text-overflow-3">
                    {{ item.brief }}
                  </div>
                  <div class="button" @click="openInnovationDetail(item.detailLink)">
                    {{ item.detailContent }}
                  </div>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </XyzTransition>
    </div>
    <div class="section-4 section">
      <XyzTransition>
        <a-row v-if="sec_4_appear" xyz="fade up  delay-0.8" class="row">
          <a-col :span="1" class="col-4">
            <div class="animate-column">
              <a-icon type="insurance" class="icon" />
              <div ref="bar-4"></div>
            </div>
          </a-col>
          <a-col :span="23" class="section-content">
            <a-row type="flex">
              <a-col :span="14">
                <div class="safe-gard">
                  <div class="safe-gard-card flex-row-space-between" v-for="(item,index) in safeGard" :key="index">
                    <div class="left">
                      <img :src="item.cover" alt="">
                    </div>
                    <div class="right">
                      <div class="title">{{ item.title }}</div>
                      <div class="brief">{{ item.brief }}</div>
                    </div>
                  </div>
                </div>
              </a-col>
              <a-col class="safe-gard-chain" :span="10">
                <!--                <img src="../../assets/images/elements/chain.png" alt="">-->
                <img src="http://blockchain.maplesky.cn/StaticResource/Guide/chain.png" alt="">
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </XyzTransition>
    </div>
    <div class="section-5 section">
      <XyzTransition>
        <a-row v-if="sec_5_appear" xyz="fade up delay-0.8" class="row">
          <a-col :span="1" class="col-5">
            <div class="animate-column">
              <a-icon type="deployment-unit" class="icon" />
              <div ref="bar-5"></div>
            </div>
          </a-col>
          <a-col :span="23" class="section-content">
            <div class="cooperate  flex-row-space-between">
              <div class="detail">
                <div class="item">注册虚拟身份，体验全新独特的元宇宙世界</div>
                <div class="item">支持作者共创，和您的伙伴畅游元宇宙数字藏品世界</div>
                <div class="item">3D展馆布设，近距离感受数字藏品之美</div>
                <div class="item">交流圈搭建，打造您专属的元宇宙部落</div>
              </div>
              <div class="left">
                <!--                <img src="../../assets/GIF/ball.gif" alt="">-->
                <img src="http://blockchain.maplesky.cn/StaticResource/GIF/ball.gif" alt="">

              </div>
              <div class="right">
                <div class="cooperate-card " v-for="(item,index) in cooperates" :class="`cooperate-card-${index}`">
                  <div class="avatar">
                    <img :src="item.avatar" alt="">
                  </div>
                  <div class="info">
                    <div class="name">{{ item.name }}</div>
                    <div class="brief">{{ item.brief }}</div>
                  </div>
                </div>
              </div>

            </div>
          </a-col>
        </a-row>
      </XyzTransition>
    </div>
    <div class="section-6 section">
      <XyzTransition>
        <a-row v-if="sec_6_appear" xyz="fade up delay-0.8" class="row">
          <a-col :span="1" class="col-6">
            <div class="animate-column">
              <a-icon type="bar-chart" class="icon" />
              <div ref="bar-6"></div>
            </div>
          </a-col>
          <a-col :span="23" class="section-content">
            <div class="marketing glass-morphism flex-row-space-between">
              <a-row type="flex">
                <a-col :span="12">
                  <a-list :grid="{ gutter: 16, column: 2}" :data-source="marketing">
                    <a-list-item slot="renderItem" slot-scope="item, index">
                      <div style="width: 300px;height: 200px" class="flex-col-space-between">
                        <img :src="item.img" style="height: 100px;width: 100px;margin: 5px auto">
                        <div style="color: #c6cce7;font-size: 20px" class="title">{{ item.title }}</div>
                        <div style="color: rgba(238,238,238,0.8);font-size: 14px" class="temp-text-text">{{ item.text }}</div>
                      </div>
                    </a-list-item>
                  </a-list>
                </a-col>
                <a-col :span="12">
                  <LevelCard></LevelCard>
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
      </XyzTransition>
    </div>
    <div class="section-7">
      <XyzTransition>
        <div v-if="sec_7_appear" xyz="fade down" style="height: 100%" class="bottom">
          <AnimateButton @click="openLogin" class="login-button"></AnimateButton>
          <EarthGrand></EarthGrand>
          <div class="death" @click="showTips">纪念账号申请通道</div>
        </div>
      </XyzTransition>
    </div>
    <!--    <div class="section-6 ">-->
    <!--      <div class="bottom" :class="sec_6_appear?'appear':''">-->
    <!--        <AnimateButton @click="openLogin" class="login-button"></AnimateButton>-->
    <!--        <EarthGrand></EarthGrand>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--引导页的登录注册-->
    <XyzTransition>
      <div
        v-if="modalOpen"
        style="height: 450px;width: 400px"
        class="modal-overlay"
        xyz="fade short-100% delay-3 ease-out-back">
        <UserLogin class="login" @cancel="()=>{this.modalOpen=false}"></UserLogin>
      </div>
    </XyzTransition>


    <div>

    </div>


  </div>
</template>

<script>
import UserLogin from '@/views/guide/Login2'
import TDCarousel from '@/views/components/TDCarousel'
import AnimateButton from '@/views/components/AnimateButton'
import ListCard from '@/views/components/ListCard'
import EarthGrand from '@/views/guide/components/EarthGrand'
import LevelCard from '@/views/components/TinyAnimates/LevelCard'

export default {
  name: 'Guide',
  components: { UserLogin, TDCarousel, AnimateButton, ListCard, EarthGrand, LevelCard },
  data () {
    return {
      modalOpen: false,
      pariclesConfig: {},
      innovations: [
        {
          // cover: require('@/assets/images/elements/step-1.png'),
          cover: 'http://blockchain.maplesky.cn/StaticResource/Guide/step-1.png',
          title: '确权体系',
          brief: '基于区块链的元宇宙集创数字版权确权',
          detailContent: '详情',
          detailLink: ''
        }, {
          // cover: require('@/assets/images/elements/step-2.png'),
          cover: 'http://blockchain.maplesky.cn/StaticResource/Guide/step-2.png',

          title: '交易体系',
          brief: '基于区块链的元宇宙集创数字版权交易',
          detailContent: '详情',
          detailLink: ''
        }, {
          // cover: require('@/assets/images/elements/step-3.png'),
          cover: 'http://blockchain.maplesky.cn/StaticResource/Guide/step-3.png',

          title: '权益保障',
          brief: '基于区块链数字水印的数字版权保护',
          detailContent: '详情',
          detailLink: ''
        }
      ],
      safeGard: [
        {
          // cover: require('../../assets/images/elements/safeGard.png'),
          cover: 'http://blockchain.maplesky.cn/StaticResource/Guide/safeGard.png',
          title: '举报与维权',
          brief: '上传藏品后经由管理员审核无误后，将发布在平台公示版块,藏品将受到全平台用户的审核,尽力确保违规藏品上链确权，如被侵权，本平台将提供链式维权服务',
          detailContent: '查看详情',
          detailLink: ''
        },
        {
          // cover: require('../../assets/images/elements/waterMark.png'),
          cover: 'http://blockchain.maplesky.cn/StaticResource/Guide/waterMark.png',
          // http://blockchain.maplesky.cn/StaticResource/Guide/waterMark.png
          title: '数字水印添加与提取',
          brief: '每件上传的NFT数字藏品都会被添加与其唯一上链的资产Hash隐形水印，保留藏品原貌同时保障藏品的安全,支持水印提取与平台信息比对，确保每件藏品的合法权益',
          detailContent: '查看详情',
          detailLink: ''
        },
        {
          // cover: require('../../assets/images/elements/block-chain.png'),
          cover: 'http://blockchain.maplesky.cn/StaticResource/Guide/block-chain.png',
          title: '区块链+IPFS存储协议',
          brief: '每件通过公示且无版权纠纷的藏品将会被上传至区块链，赋予其独一无二的身份ID,保障其不可被篡改,采用IPFS文件存储，进一步保障文件安全',
          detailContent: '查看详情',
          detailLink: ''
        }, {
          // cover: require('../../assets/images/elements/trace-block.png'),
          cover: 'http://blockchain.maplesky.cn/StaticResource/Guide/trace-block.png',
          // http://blockchain.maplesky.cn/StaticResource/Guide/trace-block.png
          title: '藏品全程溯源',
          brief: '在数字藏品交易中，对每一件藏品进行溯源是保障其价值的重要手段，每一件数字藏品都会被赋予唯一的"身份 ID",支持全程溯源',
          detailContent: '查看详情',
          detailLink: ''
        }
      ],
      cooperates: [
        {
          // avatar: require('../../assets/images/user/echo.png'),
          avatar: 'http://blockchain.maplesky.cn/StaticResource/Guide/echo.png',
          name: 'Echo Tsao',
          brief: 'Always fight for happiness and value~'
        },
        {
          // avatar: require('../../assets/images/user/shiyun.jpg'),
          avatar: 'http://blockchain.maplesky.cn/StaticResource/Guide/shiyun.jpg',

          name: 'Swim-pool-plite',
          brief: '元宇宙部落的艺术文明由我们共同缔造'
        },
        {
          // avatar: require('../../assets/images/user/lyright.png'),
          avatar: 'http://blockchain.maplesky.cn/StaticResource/Guide/lyright.png',

          name: '薛定谔的宇宙',
          brief: ''
        },
        {
          // avatar: require('../../assets/images/user/Rillice.jpg'),
          avatar: 'http://blockchain.maplesky.cn/StaticResource/Guide/Rillice.jpg',
          name: 'LaurelAsh',
          brief: '仿生画笔会梦见赶稿吗'
        },
        {
          // avatar: require('../../assets/images/user/gh.jpg'),
          avatar: 'http://blockchain.maplesky.cn/StaticResource/Guide/gh.jpg',

          name: '黎明静悄悄',
          brief: ''
        }

      ],
      marketing: [
        {
          // img: require('../../assets/images/shequ.png'),
          img: 'http://blockchain.maplesky.cn/StaticResource/Guide/shequ.png',
          title: '资源共建',
          text: '站内藏品用户自主上传，你也可以成为万人景仰的艺术家，在这里你会发现许多精彩作品，与其余用户一起参与用户并创作美好吧。'
        },
        {
          title: '机构对接',
          img: 'http://blockchain.maplesky.cn/StaticResource/Guide/baohu.png',
          text: '去中心化处理保障您的资源不可被侵犯，平台引入公证机构、协同对接相关维权部门，为您的合法权益保驾护航。'
        },
        {
          // img: 'http://blockchain.maplesky.cn/StaticResource/Guide/caifu.png',
          img: require('../../assets/user/caifu.png'),
          title: '财富提现',
          text: ' 在这里，价值由您自主创造，自主交易，收益实时监控记录，财富不仅存于虚拟世界，货币提现增添您创作的成就感！'
        },
        {
          title: '成长福利',
          img: 'http://blockchain.maplesky.cn/StaticResource/Guide/chengzhang.png',
          text: '用户站内活动将会累计用户成长积分，解锁更高用户等级、享受更为优质的权益服务保障和平台体验,超多福利等你来拿~'
        }
      ],
      sec_1_appear: false,
      sec_2_appear: false,
      sec_3_appear: false,
      sec_4_appear: false,
      sec_5_appear: false,
      sec_6_appear: false,
      sec_7_appear: false,
      // 默认的视窗高度
      VIEWHEIGHT: 1000
    }
  },
  methods: {
    openLogin () {
      if (!this.$store.getters.hasUserInfo) {
        this.modalOpen = true
        this.$emit('openLogin', '')
      } else {
        this.$router.push({ name: 'Main' })
      }
    },
    openInnovationDetail (val) {
      console.log('我想看的内容', val)
    },
    closeLogin () {
      this.modalOpen = false
    },
    // 监听页面滚动控制主页的所有动画效果
    refAppear (ref, height) {
      if (this.$refs[ref]) {
        this.$refs[ref].style.height = `${height}px`
      }
    },
    refDisAppear (ref) {
      if (this.$refs[ref]) {
        this.$refs[ref].style.height = `0px`
      }
    },
    pageScroll (e) {
      // 主页有6个大板块、每个版块高度为70vh、scrollTop有关键节点
      // 40vh（3将露出）、110vh（4将露出）、180vh（5将露出）、250vh(6将露出)
      //
      const currentHight = this.VIEWHEIGHT
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      console.log(scrollTop, scrollHeight, currentHight)
      const barHeight = window.innerHeight * 0.7 - 50
      if (scrollTop + currentHight + 100 > scrollHeight) {
        // 1、2、3、4被卷入，5 6 7刚露出
        this.sec_7_appear = true
        this.sec_6_appear = true
        this.sec_5_appear = true
        this.sec_4_appear = false
        this.sec_3_appear = false
        this.refDisAppear('bar-3')
        this.refDisAppear('bar-4')
        this.refAppear('bar-5', barHeight)
        this.refAppear('bar-6', barHeight)
      } else if (scrollTop > Math.floor(currentHight * 2.7)) {

      } else if (scrollTop > Math.floor(currentHight * 2.4)) {
        // 1、2、3被卷入,4,5,6露出
        this.sec_7_appear = false
        this.sec_6_appear = true
        this.sec_5_appear = true
        this.sec_4_appear = true
        this.sec_3_appear = false
        this.refDisAppear('bar-3')
        this.refAppear('bar-5', barHeight)
        this.refAppear('bar-4', barHeight)
        this.refAppear('bar-6', barHeight)
      } else if (scrollTop > Math.floor(currentHight * 2.1)) {
        // 1、2、3被卷入，4,5露出
        this.sec_7_appear = false
        this.sec_6_appear = false
        this.sec_5_appear = true
        this.sec_4_appear = true
        this.sec_3_appear = false
        this.refDisAppear('bar-3')
        this.refDisAppear('bar-6')
        this.refAppear('bar-5', barHeight)
        this.refAppear('bar-4', barHeight)
      } else if (scrollTop > Math.floor(currentHight * 1.8)) {
        // 1、2被卷入、3、4  5版块刚露出
        this.sec_7_appear = false
        this.sec_6_appear = false
        this.sec_5_appear = true
        this.sec_4_appear = true
        this.sec_3_appear = true
        this.refAppear('bar-3', barHeight)
        this.refAppear('bar-5', barHeight)
        this.refAppear('bar-4', barHeight)
        this.refDisAppear('bar-6')
      } else if (scrollTop > Math.floor(currentHight * 1.4)) {
        // 1、2被卷入、3、4版块露出
        this.sec_7_appear = false
        this.sec_6_appear = false
        this.sec_5_appear = false
        this.sec_4_appear = true
        this.sec_3_appear = true
        this.refAppear('bar-3', barHeight)
        this.refAppear('bar-4', barHeight)
        this.refDisAppear('bar-5')
        this.refDisAppear('bar-6')
      } else if (scrollTop > Math.floor(currentHight * 1.1)) {
        // 1被卷入、2、3  4版块刚露出
        this.sec_6_appear = false
        this.sec_5_appear = false
        this.sec_4_appear = true
        this.sec_3_appear = true
        this.refAppear('bar-4', barHeight)
        this.refAppear('bar-3', barHeight)
        this.refDisAppear('bar-5')
        this.refDisAppear('bar-6')
      } else if (scrollTop > Math.floor(currentHight * 0.7)) {
        // 1被卷入、2、3露出
        this.sec_7_appear = false
        this.sec_6_appear = false
        this.sec_5_appear = false
        this.sec_4_appear = true
        this.sec_3_appear = true
        this.refDisAppear('bar-4')
        this.refAppear('bar-3', barHeight)
        this.refDisAppear('bar-5')
        this.refDisAppear('bar-6')
      } else if (scrollTop > Math.floor(currentHight * 0.4)) {
        // 1、2、均在3 个版 块刚刚露出
        this.sec_3_appear = true
        this.refAppear('bar-3', barHeight)
        this.refDisAppear('bar-4')
        this.sec_4_appear = false
        this.refDisAppear('bar-5')
        this.sec_5_appear = false
        this.refDisAppear('bar-6')
        this.sec_6_appear = false
      } else {
        // 1,2版块都在、3未露出
        this.refDisAppear('bar-3')
        this.sec_3_appear = false
        this.refDisAppear('bar-4')
        this.sec_4_appear = false
        this.refDisAppear('bar-5')
        this.sec_5_appear = false
        this.refDisAppear('bar-6')
        this.sec_6_appear = false
      }
    },
    windowResize (e) {
      this.VIEWHEIGHT = window.innerHeight
    },
    showTips () {
      this.$router.push({ name: 'DeathRemember' })
    }

  },
  mounted () {
    this.VIEWHEIGHT = window.innerHeight || 1000
    const _this = this
    this.pageScroll()
    setTimeout(() => {
      _this.sec_1_appear = true
    }, 100)
    setTimeout(() => {
      _this.sec_2_appear = true
    }, 300)
    setTimeout(() => {
      _this.$refs['bar-2'].style.height = `${this.VIEWHEIGHT * 0.7 - 50}px`
    }, 350)
    window.addEventListener('scroll', this.pageScroll)
    window.addEventListener('resize', this.windowResize)

    //  如果是因为登录态出问题而跳转至此页面则自动弹出我们的登录框
    if (this.$route.params.Login === 'auto') {
      this.openLogin()
    }
    // 订阅总线上的登陆事件
    this.$EventBus.$on('openLogin', this.openLogin)
  }

}
</script>

<style scoped lang='less'>

//赶时间写一个
.temp-text-text{
  padding: 10px;
  &::first-letter{
    margin-left: 2em;
  }
}

h1 {
  padding-top: 15px;
  letter-spacing: 7px;
  font-size: 1.3rem;
  color: #4B4B4B;
}

h2 {
  padding-top: 8px;
  margin-right: 6px;
  text-align: right;
  font-size: 0.8rem;
}

.guide-container {
  //background-image: linear-gradient(to bottom, #000000, #010000, #030001, #040003, #040004, #050006, #060008, #07000b, #09000d, #0c000f, #0e0011, #100012);
  color: #FFFFFF;
}

.animate-column {
  width: 30px;
  height: 100%;
}

.animate-column .icon {
  display: inline-block;
  margin: 10px auto;
  font-size: 30px;
}


/**
*以下为页面中左侧的动态条、同时他们也具有ref：bar-i
*/
.animate-column div {
  position: relative;
  top: 0;
  margin: 0 auto;
  width: 8%;
  height: 0;
  border-radius: 5px;
  /*height: calc(100% - 50px);*/
  transition: all cubic-bezier(.8, 0, 1, .81) 0.8s;
}

.col-2 .animate-column div {
  background-image: linear-gradient(to bottom, #b983ff, #ab79ff, #9b70ff, #8867ff, #735fff);
}

.col-3 .animate-column div {
  background-image: linear-gradient(to bottom, #735fff, #6472ff, #5b82ff, #5991ff, #5f9eff);
}

.col-4 .animate-column div {
  background-image: linear-gradient(to bottom, #5f9eff, #47b0ff, #3bc0ff, #46cfff, #5fdcff);
}

.col-5 .animate-column div {
  background-image: linear-gradient(to bottom, #5f9eff, #47b0ff, #3bc0ff, #46cfff, #5fdcff);
}

.col-6 .animate-column div {
  background-image: linear-gradient(to bottom, #5fdcffff, #41e6fcc0, #2ff0f280, #3df8e340, #5fffce00);
}

.section {
  position: relative;
  z-index: 6;
  height: 70vh;

  margin: 30px auto;
  padding: 0 4em;
}

.section-content {
  height: 100%;
  width: 90%;
  padding: 0 3vw 5vh;
  position: relative;
}

.section .row {
  height: 100%;
}

.section h1 {
  font-size: 25px;
  color: #FFFFFF;
}

.section .col-1,
.section .col-2,
.section .col-3,
.section .col-4,
.section .col-5 {
  height: 100%;
}

.section-1 .col-1 {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .words {
    margin: 0 auto;
    padding: 80px 0;
    font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
    font-size: 40px;
    font-weight: 900;
    letter-spacing: -2px;
    text-transform: uppercase;
    transform: translate3d(0, 0, 0);
    -webkit-font-smoothing: antialiased;
    -webkit-font-kerning: normal;
    -webkit-text-size-adjust: 100%;
  }

  /*
  ** Apply common styles to each line of text
  */

  .words-line {
    height: 50px;
    overflow: hidden;
    position: relative;
  }

  .words-line:nth-child(odd) {
    transform: skew(40deg, 0) scaleY(0.777);
  }

  .words-line:nth-child(even) {
    transform: skew(0deg, 0) scaleY(1.112);
  }

  .words-line:nth-child(1) {
    left: 22px;
  }

  .words-line:nth-child(2) {
    left: 44px;
  }

  .words-line:nth-child(3) {
    left: 66px;
  }

  .words-line:nth-child(4) {
    left: 88px;
  }

  .words-line:nth-child(5) {
    left: 110px;
  }

  .words-line:nth-child(6) {
    left: 132px;
  }

  .words-line:nth-child(7) {
    left: 154px;
  }

  /*
  ** Fine-grained text styles
  */

  p {
    height: 50px;
    font-size: 40px;
    line-height: 45px;
    color: #FFFFFF;
    padding: 0 10px;
    transition: all 0.4s ease-in-out;
    transform: translate3d(0, 0, 0);
    vertical-align: top;
    white-space: nowrap;
    letter-spacing: 1px;

    &.han {
      letter-spacing: 10px;
    }
  }
}

.section-1 .col-1 img {
  position: absolute;
  height: 70vh;
  top: 0;
  left: 0.3em;
}

.section-1 {
  .header-col {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 55vh;
      width: 55vh;
    }
  }
}


.nav h1,
.slider h1, h3 {
  font-family: "Josefin Sans", sans-serif;
  margin: 0;
  padding-bottom: 0.5rem;
  letter-spacing: 0.5rem;
  color: #ffffff;
  transition: all 0.3s ease;
  z-index: 3;
}


.section-1 h1 {
  font-size: 40px;
}

.section-1 h3 {
  font-size: 20px;
}


.section-1 span {
  font-size: 30px;
  position: relative;
}

.section-1 span::after {
  content: '';
  display: inline-block;
  position: absolute;
  width: 96%;
  height: 2px;
  bottom: 0;
  left: 2%;
  background-color: #FFFFFF;
}


.section-2 {
  .section-content {
    .card {
      width: 100%;

      .right {
        width: 40%;
        margin-left: 40vw;
        padding: 2em;

        .brief {
          font-size: 1.3em;
          letter-spacing: 1px;

          &::first-letter {
            margin-left: 2em;
          }
        }
      }
    }
  }
}


.section-7 {
  height: 55vh;
}


.bottom {
  height: 100%;
  width: 100vw;
  position: relative;
  overflow-x: hidden;
  z-index: 10;
  overflow: hidden;
}

.bottom .login-button {
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translateX(-50%);
  margin: 0 auto;
}

.modal-overlay {
  position: fixed;;
  left: calc(50% - 200px);
  /*transform: translateX(-50%) translateY(-50%);*/
  //height: 500px;
  //width: 400px;
  top: calc(50% - 250px);
  z-index: 11;
  //background: rgba(246, 249, 252, 0.45);
  background: rgba(40, 41, 45, 0.8);
  //box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}


/*第一部分内容*/
span.s1 {
  position: absolute;
  top: -100px;
  font-size: 7rem;
  font-weight: 750;
  text-transform: uppercase;
  color: #3C4447;
}

span.s2 {
  font-weight: 750;
  position: absolute;
  bottom: 0px;
  right: 0;
  font-size: 7rem;
  text-transform: uppercase;
  color: #3C4447;
}

/* The card */
.card {
  margin: 0 auto;
  height: 90%;
  width: 100%;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Image on the left side */
.thumbnail {
  float: left;
  position: relative;
  left: 30px;
  top: -20px;
  height: 360px;
  width: 530px;
  -webkit-box-shadow: 10px 10px 60px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 60px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 60px 0px rgba(0, 0, 0, 0.75);
  overflow: hidden;
}

/*object-fit: cover;*/
/*object-position: center;*/
img.left {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  opacity: 0.7;
}


/* Right side of the card */
//.right {
//  margin-left: 590px;
//  margin-right: 20px;
//}


.separator {
  margin-top: 10px;
  border: 1px solid #C3C3C3;
  margin-bottom: 20px;
}

p {
  text-align: justify;
  padding-top: 30px;
  font-size: 0.95rem;
  letter-spacing: 1px;
  line-height: 25px;
  color: #4B4B4B;
}

/*第二部分*/
.carousel {
  position: absolute;
  top: 30%;
  transform: translateX(-50%) translateY(-50%);
}

//引导第三部分
.section-3 {
  .section-content {
    padding-top: 2em;

    .col {
      height: 100%;
    }

    .innovation-card {
      padding-bottom: 1em;
      background: rgba(60, 55, 73, 0.25);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(2.5px);
      -webkit-backdrop-filter: blur(2.5px);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      overflow: hidden;
      width: 100%;
      height: 60vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 6vh 20px 20px;

      .cover {
        width: 100%;
        height: 24vh;

        img {
          height: 100%;
          width: 100%;
        }

      }

      .title {
        font-size: 1.5em;
        height: 1.2em;
        font-weight: bold;
        color: #cbc1e0;
        margin-bottom: 10px;
      }

      .brief {
        width: 80%;
        font-size: 1em;
        height: 3em;
        color: #999999;
      }

      .button {
        border-radius: 0.5em;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3em;
        width: 70%;
        background-color: rgba(255, 255, 255, 0.5);
        margin-bottom: 2vh;
        &:hover {
          background-color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }
}

//引导页第四部分
.section-4 {

  .safe-gard {
    transform: translateX(0px);
  }

  .safe-gard-card:nth-child(odd) {
    transform: translateX(-30px);
  }

  .safe-gard-card:nth-child(even) {
    transform: translateX(30px);
  }


  .safe-gard-card {
    height: 15vh;
    overflow: hidden;
    margin: 1em auto;
    background: rgba(138, 133, 154, 0.15);
    box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(2.5px);
    -webkit-backdrop-filter: blur(2.5px);
    border-radius: 10px;

    .left {
      padding: 1em;

      img {
        width: 80px;
        height: 80px;
      }
    }

    .right {
      height: 90%;
      width: 100%;

      .title {
        font-size: 1.2em;
        height: 1.2em;
        font-weight: bold;
        color: #cbc1e0;
        margin-bottom: 10px;
      }

      .brief {
        padding: 0 1em;
        font-size: 1em;
        //letter-spacing: 1px;
        //font-weight: bold;
        color: #ded8e0;
      }

      .button {
        height: 1.6em;
        font-size: 1.1em;
        background-color: #c41b1b;
      }
    }
  }

  .safe-gard-chain {
    height: 100%;

    img {
      transform: rotateY(180deg);
      height: 55vh;
    }
  }
}


//引导页第五部分


.cooperate {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  .detail {
    width: 40%;

    .item {
      margin-top: 1em;
      font-size: 1.5em;
    }
  }


  .left {
    height: 420px;

    img {
      height: 100%;
      width: 100%;
    }
  }

  .right {
    height: 500px;
    position: relative;
    width: 300px;

    .cooperate-card {
      position: absolute;
      display: flex;
      align-items: center;
      background: rgba(115, 108, 133, 0.3);
      border-radius: 5px;
      box-shadow: 0px 8px 32px 0px rgba(31, 38, 135, 0.37);
      width: 320px;
      height: 80px;
      color: #bdbccc;

      .avatar {
        position: relative;

        img {
          height: 65px;
          width: 65px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.5);
          transform: translateX(-30px);
        }

        &::after {
          content: '';
          display: block;
          position: absolute;
          height: 50px;
          top: calc(50% - 25px);
          left: 50px;
          width: 3px;
          border-radius: 1px;
          background-color: #C2A3FD62;
        }
      }

      .info {
        .name {
          font-weight: bold;
          font-size: 1.2em;
        }
      }

    }

    .cooperate-card-0 {
      top: 0px;
      left: -45px;
    }

    .cooperate-card-1 {
      top: 105px;
      left: 10px;
    }

    .cooperate-card-2 {
      top: 210px;
      left: 40px;
    }

    .cooperate-card-3 {
      top: 315px;
      left: 10px;
    }

    .cooperate-card-4 {
      top: 420px;
      left: -45px;
    }
  }


}


// 引导页第6部分
.marketing {
  width: 100%;
  height: 100%;
}


.death {
  cursor: pointer;
  position: absolute;
  right: 5vw;
  border-radius: 10px;
  padding: 4px;
  border: rgba(79, 101, 182, 0.65) 2px solid;
  color: #9595c2;
  font-size: 14px;
  font-weight: 700;
  bottom: 3vw;
}

.death:hover {
  border: rgba(112, 131, 199, 1) 2px solid;
  color: #9c9cf5;
  //background: rgba( 244, 239, 179, 0.55 );
  box-shadow: 0 8px 32px 0 rgba(120, 122, 155, 0.37);
  backdrop-filter: blur(10.5px);
  -webkit-backdrop-filter: blur(10.5px);
  //border: 1px solid rgba( 255, 255, 255, 0.18 );
}


</style>

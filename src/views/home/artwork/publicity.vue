<template>
  <div class="main">
    <scroll-load @handleScroll="handleScroll">
      <div class="top">
        <div class="img">
          <!--          <div class="top-img"></div>-->
          <div
            style="position: relative; left: 10px;top: 5vh;"
          >
            <img
              class="rotate"
              width="160px"
              height="160px"
              src="http://blockchain.maplesky.cn/StaticResource/Public/ball_white.png">
          </div>

          <!--          <img width="800px" height="100%" :src="require('@/assets/public/link.png')">-->
          <!--          <img width="100px" height="100px" style="right: 10px;top: 5px" :src="require('@/assets/public/water_2.png')">-->
          <img width="200px" height="200px" style="right: 10vw;top: 5px"
               src="http://blockchain.maplesky.cn/StaticResource/Public/water_2.png">


          <!--          <div class="top-img" style="background: url('../../../assets/public/link.png')"></div>-->
        </div>
        <div class="actions-box">
          <div class="rule" @click="info">
            {{ ruleText }}
          </div>
          <div class="rule">
            {{ changeText }}
          </div>
        </div>
        <head-line style="margin-top: 10vh" :title="title" :title-eng="titleEng" color="#3be5bd"></head-line>
      </div>
      <div class="body">
        <div class="list">
          <Loading class="loading" :size="70" :loading="isPubLoading" icon="loading1"></Loading>
          <div class="pub-works" v-if="!isPubLoading">
            <div class="pub-content" v-if="pubGroup.length>0">
              <div class="box" v-for="(pubWorks,index) in pubGroup" :key="index">
                <a-list :grid="pubGrid" :data-source="pubWorks">
                  <a-list-item class="my-flex-center" slot="renderItem" slot-scope="item" :rowKey="item.id">
                    <div class="square">
                      <publicize-card :bg-color="cardColor" :artwork="item"></publicize-card>
                    </div>
                  </a-list-item>
                </a-list>
              </div>
            </div>
            <div class="empty" v-else>
              <svg-icon width="200" height="200" style="border-radius: 3px" icon="no-data"></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </scroll-load>
    <!--    <a-modal class="pub-rule-content" @cancel="handleCancel" :visible="visible">-->
    <!--      <template slot="footer">-->
    <!--        <p>Some contents...</p>-->
    <!--        <p>Some contents...</p>-->
    <!--        <p>Some contents...</p>-->
    <!--        <a-button key="submit" type="primary" @click="handleOk">-->
    <!--          我已知悉-->
    <!--        </a-button>-->
    <!--      </template>-->
    <!--    </a-modal>-->
    <!--    <navBack></navBack>-->
  </div>
</template>

<script>
import headLine from '@/views/components/headLine/HeadLine'
import navBack from '@/views/components/navBack'
import Loading from '@/views/components/Loading/Loading'
import publicizeCard from '@/views/home/components/publicizeCard/PublicizeCard'
import { PubList } from '@/api/modules/artwork'
import ScrollLoad from '@/views/components/scrollLoad/ScrollLoad'
import { pageConfig, indexConfig } from '@/views/config/config'
import AdaptiveImg from '@/views/components/AdaptiveImg'
import { Modal } from 'ant-design-vue'

export default {
  name: 'Publicity',
  components: {
    AdaptiveImg,
    navBack,
    Loading,
    publicizeCard,
    ScrollLoad,
    headLine
  },
  data () {
    return {
      cardColor: '#2b3a46',
      visible: false,
      title: indexConfig.sorts.publicize.title,
      titleEng: indexConfig.sorts.publicize.titleEng,
      isPubLoading: true,
      isGetPub: false,
      pubGrid: {
        span: 6,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 4,
        xl: 4
      },
      texts: {
        title: '欢迎来到公示区！',
        tips: '公示区是什么？',
        text1: '1.如果您是创作者，公示是您发售作品前的必经环节。您的作品将在公示期内接受本平台所有用户的监督和检举。在此期间内，若用户对您的作品提交了侵权举报，一经查实，您的作品将被退回修改，直至不存在任何侵权行为为止。',
        text2: '2.如果您是本平台的注册用户，您可以在公示区查看所有即将上链发售的作品。若您发现公示区内的任何作品存在无授权证明使用他人创作成果等侵权行为，可在详情页内点击举报按钮、填写举报信息并提交证据文件，平台权益保护专员将会对您的举报进行核实和处理。您的积极行动是本平台越走越远的助力，我们会回馈信誉值作为有效举报的奖励。\n'
      },
      ruleText: '规则介绍',
      changeText: '换一批',
      pubParams: {
        pageNumber: 1,
        pageSize: 8
      },
      pubGroup: []
    }
  },
  methods: {
    handleScroll () {
      console.log('到底啦')
      this.getPubWorks()
      this.isGetPub = true
    },
    getPubWorks () {
      // if (this.isGetPub) { return }
      PubList(this.pubParams).then(res => {
        this.pubGroup.push(res.data)
        if ((this.pubParams.pageSize * this.pubParams.pageNumber) >= res.total) { this.isGetPub = true }
        pageConfig.updateArtParams(this.pubParams, res.total)
        // console.log('reclist',this.recommendList)
      })
    },
    info () {
      const h = this.$createElement
      this.$info({
        title: this.texts.title,
        okText: '我已知悉',
        width: 700,
        content: h('div', {}, [
          // h('h3', {}, this.texts.title),
          h('h4', { style: 'font-weight:600' }, this.texts.tips),
          h('p', {}, this.texts.text1),
          h('p', {}, this.texts.text2)
        ]),
        onOk () {
        }
      })
    },
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      // console.log(e);
      this.visible = false
    },
    handleCancel (e) {
      // console.log(e);
      this.visible = false
    }
  },
  mounted () {
    PubList(this.pubParams).then(res => {
      this.pubGroup.push(res.data)
      pageConfig.updateArtParams(this.pubParams, res.total)
      if ((this.pubParams.pageSize * this.pubParams.pageNumber) >= res.total) { this.isGetPub = true }
      setTimeout(() => {
        this.isPubLoading = false
      }, pageConfig.loadingTime)
    })
  }
}
</script>

<style scoped>
.main {
  background: linear-gradient(to bottom, #141e30, #243b55);
  /*padding-top: 70px*/
}

.body {
  margin-top: 50px;
  /*z-index: 111;*/
  /*background: linear-gradient(#121C37, #404766, #747687, #E9EFFF);*/
  min-height: 120vh;
  width: 100%;
}

.top {
  position: relative;
  width: 100%;
  padding-top: 70px;
  height: 40vh;
}

.img {
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: 0;
  height: 100%;
  width: 100%;
  /*background: url("http://blockchain.maplesky.cn/StaticResource/Public/bg.jpg") no-repeat;*/
  background: url('http://blockchain.maplesky.cn/StaticResource/Public/publicBanner.png') no-repeat;
  opacity: 0.6;
  background-size: 100% 100%;
}

.img img {
  margin-top: 20px;
  opacity: 0.9;
}

.actions-box {
  /*position: absolute;*/
  /*bottom: 10px;*/
  /*margin-top: 100px;*/
  /*position: relative;*/
  /*top: 70px;*/
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.rule {
  z-index: 11;

  /*margin: 10px;*/
  height: 28px;
  cursor: pointer;
  position: relative;
  top: 10px;
  margin: 0 20px;
  color: #a19aee;
  font-size: 18px;
  font-weight: 700;
  font-style: italic;
  border-bottom: #a7a2d9 3px solid;
}

/*.rule::after{*/
/*  */
/*}*/
.box {
  z-index: 12;

  /*width: 80%;*/
  border-radius: 10px;
  padding: 0;
  background-color: rgba(176, 216, 231, 0.2);
  margin: 20px;
}

.square {
  width: 100%;
  height: 100%;
  margin: 20px 0;
  /*background-color: ;*/
  border-radius: 10px;
  position: relative;
  z-index: 1
}

.empty {
  width: 100%;
  text-align: center;
}

.rotate {
  animation: rotate 6s infinite linear;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>

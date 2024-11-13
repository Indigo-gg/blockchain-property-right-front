<template>
  <div class="artwork-trace-page">
    <page-header
      :title="briefLoaded?`藏品溯源`:`《${artBrief.name}》溯源一览`"
      :back-icon="false"
    >
      <div slot="extra">
        <a-button @click="refreshData">刷新</a-button>
      </div>
    </page-header>
    <a-row class="trace-art" type="flex" :gutter="16">
      <a-col :span="10" class="art-cover">
        <adaptive-img
          :src="artBrief.markedfileId"
          :loaded="briefLoaded"
          img-class="cover"></adaptive-img>
      </a-col>
      <a-col :span="14" class="details">
        <div>
          <span class="label">发布时间</span>
          <span class="val"> {{ artBrief.createdTtime }}</span>
        </div>
        <div>
          <span class="label">藏品编号</span>
          <span class="val"> {{ artHash.artworkHash.slice(1,7).toUpperCase() }}#{{ artBrief.id }}</span>
        </div>
        <div>
          <span class="label">藏品名称</span>
          <span class="val"> {{ artBrief.name }}</span>
        </div>
        <div>
          <span class="label">藏品简介</span>
          <span class="val text-overflow-2"> {{ artBrief.info }}</span>
        </div>
        <div>
          <span class="label">作者信息</span>
          <span class="val"><avatar-group :authors="artAuthors"></avatar-group></span>
        </div>
        <div v-if="artHash.artworkHash">
          <span class="label">著作权资产Hash</span>
          <span class="val"> <hash-plate :hash="artHash.artworkHash" color="gold"></hash-plate></span>
        </div>
        <div v-if="artHash.ownerAdd">
          <span class="label">所有权资产Hash</span>
          <span class="val"> <hash-plate :hash="artHash.ownerAdd" color="purple"></hash-plate></span>
        </div>
        <div v-if="artHash.utilizeAdd">
          <span class="label">使用权资产Hash</span>
          <span class="val">
            <hash-plate :hash="artHash.utilizeAdd" color="sliver"></hash-plate>
          </span>
        </div>
      </a-col>
    </a-row>
    <div class="trace-nodes-wrapper">
      <a-timeline pending="处理中...">
        <xyz-transition-group appear xyz="fade down-1 right-2 stagger-1">
          <a-timeline-item :key="NodeHead.time" >
            <template #dot>
              <svg-icon icon="trace-uplink" :size="32" class="node-icon"></svg-icon>
            </template>

            <div class="trace-node head">
              <div class="header">
                <div class="time">{{ NodeHead.time }}</div>
                <a-tag class="status" color="cyan">作品上链</a-tag>
              </div>
              <div class="hash">
                <span class="label"> 操作人区块链地址：</span>
                <span class="val">{{ NodeHead.notaryOfficeAdd }}</span>
              </div>
              <div class="info">
                <span class="label">操作详情：</span>
                <span class="val">作品已成功上链!</span>
              </div>
            </div>
          </a-timeline-item>
          <a-timeline-item v-for="(item) in TraceNodes" :key="item.time">
            <template #dot>
              <svg-icon class="node-icon" v-if="item.status==2||item.status==3" icon="trace-sale" :size="32"></svg-icon>
              <svg-icon class="node-icon" v-else-if="item.status==8||item.status==9" icon="trace-buy" :size="32"></svg-icon>
              <svg-icon class="node-icon" v-else icon="trace-add" :size="32"></svg-icon>
            </template>
            <div class="trace-node">
              <div class="header">
                <div class="time">{{ item.time }}</div>
                <a-tag class="status" :color="renderTag(item.status).color">{{ renderTag(item.status).text }}</a-tag>
              </div>
              <!--type为1表示该结点为更改发售信息结点-->
              <template v-if="item.type===1">
                <div class="info" >
                  <div class="operator">
                    <span class="label"> 操作人：</span>
                    <span class="val">{{ item.info.name }}</span>
                  </div>
                  <div class="operator-hash">
                    <span class="label">操作人区块链地址：</span>
                    <span class="val">{{ item.notaryOfficeAdd }}<svg-icon icon="copy" @click="copyHash(item.notaryOfficeAdd)" style="cursor: pointer"></svg-icon> </span>
                  </div>
                  <div class="detail">
                    <span class="label">操作详情：</span>
                    <span class="val"> {{ item.info.info }}</span>
                  </div>
                </div>
              </template>
              <template v-else-if="item.type===2">
                <div class="info">
                  <div class="out-hash">
                    <span class="label">转出地址：</span>
                    <span class="val">{{ item.info.outHash }}<svg-icon icon="copy" @click="copyHash(item.outHash)" style="cursor: pointer"></svg-icon></span>
                  </div>
                  <div class="in-hash">
                    <span class="label">转入地址：</span>
                    <span class="val">{{ item.notaryOfficeAdd }} <svg-icon icon="copy" @click="copyHash(item.notaryOfficeAdd)" style="cursor: pointer"></svg-icon></span>
                  </div>
                  <div class="flowhash">
                    <span class="label">交易流转Hash：</span>
                    <span class="val">{{ item.info.flowHash }}<svg-icon icon="copy" @click="copyHash(item.info.flowHash)" style="cursor: pointer"></svg-icon></span>
                  </div>
                  <div class="detail">
                    <span class="label">交易详情：</span>
                    <span class="val">{{ item.info.info }}</span>
                  </div>
                </div>
              </template>
              <!--type为2表示该结点为交易结点-->
            </div>
          </a-timeline-item>
          <a-timeline-item key="ending">
            <!--            <img src="../../../assets/GIF/loading.gif" alt="" style="height: 32px;width: 32px" slot="dot">-->
            <img src="http://blockchain.maplesky.cn/StaticResource/GIF/loading.gif" alt=""
                 style="height: 32px;width: 32px" slot="dot">

            <div class="ending">
              Tracing......
            </div>
          </a-timeline-item>
        </xyz-transition-group>
      </a-timeline>
    </div>
    <div class="trace-background">
      <ul class="circles">
        <li v-for="i in 10" :key="i"></li>
      </ul>
    </div>
  </div>
</template>
<script>
import svgIcon from '@/components/svgIcon/svgIcon'
import HashPlate from '@/views/components/HashPlate'
import AdaptiveImg from '@/views/components/AdaptiveImg'
import { RenderPicture } from '@/api/modules/file'
import { ArtworkTrace } from '@/api/modules/transition'
import { Base64 } from 'js-base64'
import { Timeline } from 'ant-design-vue'
import PageHeader from '@/views/components/PageHeader/PageHeader'
import { traceNodeConfig } from '@/views/config/config'
import { GetArtworkBrief, GetArtworkAuthors, GetArtworkHash } from '@/api/modules/artwork'
import AvatarGroup from '@/views/components/avatarGroup/avatarGroup'

export default {
  name: 'ArtworkTrace',
  components: {
    HashPlate,
    PageHeader,
    [Timeline.Item.name]: Timeline.Item,
    AvatarGroup,
    AdaptiveImg,
    svgIcon
  },

  props: {},
  data () {
    return {
      RenderPicture,
      artworkId: '',
      RawTraceChain: {},
      artAuthors: [],
      artBrief: {},
      briefLoaded: false,
      artHash: [],
      // 头结点
      NodeHead: {},
      // 后续溯源结点链
      TraceNodes: [],
      artworkDetail: {},
      saleStatus: [2, 3, 4, 5, 6, 7],
      tradeStatus: [8, 9]
    }
  },
  methods: {
    renderTag (status) {
      return traceNodeConfig.renderTag(status)
    },
    async getArtworkDetail (artId) {
      console.log()
    },
    async getTrace (artworkId) {
      const res = await ArtworkTrace({ artworkId })
      // const res = {
      //   'code': 0,
      //   'data': ['[ [ "0xdf825e17b99a4653d32d1c1f8371d01656c7982b", 0, 1681136038021, "create" ], [ "0xdf825e17b99a4653d32d1c1f8371d01656c7982b", 2, 1681139057926, "{\\"name\\":\\"swimming-pool\\",\\"info\\":\\"swimming-pool发售极光的使用权,发售藏品使用权数量为10份\\"}" ], [ "0xdf825e17b99a4653d32d1c1f8371d01656c7982b", 4, 1681139072588, "{\\"name\\":\\"swimming-pool\\",\\"info\\":\\"swimming-pool修改极光的使用权发售增量为5目前总发售数量为15份目前库存量为20份\\"}" ], [ "0xdf825e17b99a4653d32d1c1f8371d01656c7982b", 3, 1681139087163, "{\\"name\\":\\"swimming-pool\\",\\"info\\":\\"swimming-pool发售极光的所有权,发售藏品使用权数量为20份\\"}" ], [ "0xdf825e17b99a4653d32d1c1f8371d01656c7982b", 5, 1681139101720, "{\\"name\\":\\"swimming-pool\\",\\"info\\":\\"swimming-pool修改极光的所有权发售增量为20,目前总发售数量为40份,目前库存量为40份\\"}" ], [ "0xdf825e17b99a4653d32d1c1f8371d01656c7982b", 5, 1681139172857, "{\\"name\\":\\"swimming-pool\\",\\"info\\":\\"swimming-pool修改极光的所有权发售增量为20,目前总发售数量为60份,目前库存量为60份\\"}" ], [ "0x6416b6538efb807d8c7338c588cb37b378823b94", 8, 1681139255573, "{\\"outHash\\":\\"0xdf825e17b99a4653d32d1c1f8371d01656c7982b\\",\\"flowHash\\":\\"0xe41ffbae32ea4cd37cb8bad8c07a613d9771fd71b8902ed9d74a4e384373b306\\",\\"info\\":\\"购买人Echo花费了10代币购买了共创者swimming-pool《极光》的艺术品使用权,swimming-pool按照著作权贡献度相应获取10的代币收益\\"}" ], [ "0x6416b6538efb807d8c7338c588cb37b378823b94", 9, 1681139352707, "{\\"outHash\\":\\"0xdf825e17b99a4653d32d1c1f8371d01656c7982b\\",\\"flowHash\\":\\"0x94b79652472cbf587dd33a967ace9f6ae08719c4d04ef82b3f04d14b58d78f94\\",\\"info\\":\\"购买人Echo花费了20代币购买了swimming-pool拥有《极光》艺术品的10%的所有权,swimming-pool相应获取20的代币收益\\"}" ], [ "0x6416b6538efb807d8c7338c588cb37b378823b94", 9, 1681144560302, "{\\"outHash\\":\\"0xdf825e17b99a4653d32d1c1f8371d01656c7982b\\",\\"flowHash\\":\\"0xdfdbd6778302c9188690f259b69ceb2f77a0ffd901c9c24c0cc984c8d1074f3f\\",\\"info\\":\\"购买人Echo花费了100代币购买了swimming-pool拥有《极光》艺术品的50%的所有权,swimming-pool相应获取100的代币收益\\"}" ] ]'],
      //   'attachment': null,
      //   'message': 'success'
      // }
      this.RawTraceChain = JSON.parse(res.data[0])
      this.processTraceData()
    },
    refreshData () {
      // 刷新溯源数据
      this.NodeHead = {}
      this.TraceNodes = []
      this.getTrace(this.artworkId)
    },
    processTraceData () {
      // 头结点
      const head = Array.from(this.RawTraceChain)[0]
      this.NodeHead = {
        notaryOfficeAdd: head[0],
        status: head[1],
        time: this.$moment(parseInt(head[2].toString())).format('YYYY-MM-DD HH:mm:ss')
      }

      for (let i = 1; i < this.RawTraceChain.length; i++) {
        const node = Array.from(this.RawTraceChain[i])
        console.log('溯源链第', i, '个结点', node)
        const temp = {
          type: this.tradeStatus.indexOf(parseInt(node[1])) === -1 ? 1 : 2,
          notaryOfficeAdd: node[0],
          status: node[1],
          time: this.$moment(parseInt(node[2].toString())).format('YYYY-MM-DD HH:mm:ss'),
          info: JSON.parse(node[3])
        }
        this.TraceNodes.push(temp)
        console.log('溯源链第', i, '个结点', temp)
      }
    },
    copyHash (hash) {
      this.$copyText(hash).then(
        () => {
          this.$message.success('复制成功!' + hash)
        },
        () => {
          this.$message.error('复制失败!')
        }
      )
    }
  },
  async mounted () {
    const key = Date.now()
    this.$message.loading({ content: '数据获取中', duration: 0, key: key })
    this.artworkId = parseInt(Base64.decode(this.$route.params.artworkId))
    // const res = await GetArtworkDetail({ artId: this.artworkId })
    // this.artworkDetail = res.data[0]
    const res1 = await GetArtworkBrief({ artworkId: this.artworkId })
    this.artBrief = res1.data
    console.log(this.artBrief)
    this.briefLoaded = true
    const res2 = await GetArtworkAuthors({ artworkId: this.artworkId })
    console.log(res2.data)
    this.artAuthors = res2.data
    this.getTrace(this.artworkId)

    const res3 = await GetArtworkHash({ artworkId: this.artworkId })
    console.log(res3.data)
    this.artHash = res3.data

    this.$message.success({ content: '数据加载成功', duration: 2, key: key })
  }
}
</script>

<style scoped lang='less'>
.artwork-trace-page {
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: 120vh;
  padding-bottom: 10vh;
  width: 100%;
}


.trace-art {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 400px;
  //max-height: 60vh;
  width: 90%;
  margin: 20px auto;
  padding: 10px;
  background: rgba(81, 81, 81, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 5px;
  .details{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &>div{
      margin: 5px;
      display: flex;
      span{
        display: inline-block;
        min-width: 8em;
        &.label{
          font-weight: bold;
          font-size: 1.1em;
          color: #dad2d2;
        }
        &.val{
          overflow: hidden;
          max-width: 40vw;
          max-height: 3em;
          text-overflow: ellipsis;
          font-size: 1em;
          color: #eeeeee;
        }
      }
    }
  }
  .art-cover{
    height: 100%;
    .cover {
      height: 100%;
      width: 100%;
    }
  }
  }


.trace-nodes-wrapper {
  width: 85%;
  margin: 20px auto;

  .trace-node {
    padding: 0 2em 20px 2em;
    transform: translateY(-0.4em);
    .label {
      font-size: 1.2em;
      font-weight: bold;
      color: #8ea3d7;
    }

    .val {
      font-size: 1.1em;
      font-weight: bold;
      color: #d0cece;
    }

    .header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;
      .time {
        font-size: 1.5em;
        font-weight: bold;
        margin-left: -1em;
        margin-right: 30px;
        color: #a89aa8;
      }

      .status {
        font-size: 1em;
        font-weight: bold;
        padding: 2px 6px;
        border-radius: 5px;
        position: relative;
        z-index: 1;

        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 5px;
          background-color: rgba(96, 91, 91, 0.25);
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
        }
      }
    }
  }
  .ending{
    font-size: 1.5em;
    font-weight: bold;
    margin-left: 0.5em;
    margin-right: 30px;
    color: #a89aa8;
  }
  .node-icon{
    margin: 10px;
  }

}


.trace-background {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
}

.circles {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;

}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}


.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}


@keyframes animate {

  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }

}


</style>

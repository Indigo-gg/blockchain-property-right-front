<template>
  <div class="protect-detail-page right-protect-center-page">
    <div class="right-protect-center-container">
      <page-header class="page-header" title='维权详情'>
        <span slot="back-icon"><svg-icon icon="arrow-left"></svg-icon></span>
        <span class="page-title" slot="title">藏品<span class="artwork-name">{{ details.artworkName }}</span>的维权详情</span>
        <span class="sub-title" slot="subTitle">流水号:{{ details.safeRecordId }}</span>
        <div slot="extra">
          <a-space>
            <a-button type="primary">刷新数据</a-button>
            <!--            <a-button @click="downloadFile" :disabled="!details.isTorted">下载维权证书</a-button>-->
          </a-space>
        </div>
        <div class="content">
        </div>
      </page-header>
      <div class="section">
        <div class="title">藏品信息</div>
        <div class="content">
          <a-row class="artwork-info" type="flex">
            <a-col class="col" :span="8">
              <AdaptiveImg
                :src="artworkInfo.markedfileId"
                :loaded="artworkInfoLoaded"
                img-class="cover">
              </AdaptiveImg>
            </a-col>
            <a-col class="col" :span="8">
              <div class="info"><span class="sub-title">藏品编号</span><span class="info-detail">{{
                  artworkInfo.id
                }}</span>
              </div>
              <div class="info"><span class="sub-title">藏品名称</span><span class="info-detail">{{
                  artworkInfo.name
                }}</span>
              </div>
              <div class="info"><span class="sub-title">作品简介</span>
                <a-tooltip :title='artworkInfo.info'>
                  <span class="info-detail text-overflow-2">{{ artworkInfo.info }}</span>
                </a-tooltip>
              </div>
            </a-col>
            <a-col class="col" :span="8">
              <div class="info"><span class="sub-title">上传时间</span><span class="info-detail">{{
                  artworkInfo.createdTime
                }}</span></div>
              <div class="info">
                <span class="sub-title">发行状态</span>
                <span class="info-detail">
               <a-tag :color="renderStatus(artworkInfo.releaseStatus).color">
                    {{ renderStatus(artworkInfo.releaseStatus).text }}
                  </a-tag>
                  </span>
              </div>
              <div class="info"><span class="sub-title">上链Hash</span><span class="info-detail">{{
                  artworkInfo.hash
                }}</span></div>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="section">
        <div class="title">维权状态概览</div>
        <div class="content">
          <div class="protect-info">
            <div>证据节点数: <span class="number">{{ evidences.length }}</span></div>
            <div>维权发起时间: <span>{{ details.createdTime }}</span></div>
            <div v-if="details.updatedTime">维权更新时间: <span>{{ details.updatedTime }}</span></div>

          </div>
        </div>
      </div>
      <div class="section">
        <div class="title">证据链</div>
        <div class="content">
          <div id="time-line">
            <a-timeline pending="处理中...">
              <xyz-transition-group appear xyz="fade down-1 right-2 stagger-1">
                <a-timeline-item v-for="node in evidences" :key="node.batch">
                  <EvidenceNode
                    :safe-record-id="details.safeRecordId"
                    :read-only="node.readOnly"
                    :default-data="node"
                    @success="onNodeChangeSuccess"
                    @fail="onNodeChangeFailed"
                    @cancel="cancelNodeAdditon"
                  >
                  </EvidenceNode>
                </a-timeline-item>
              </xyz-transition-group>
            </a-timeline>
          </div>
        </div>
      </div>
      <div class="btn">
        <a-button @click="addEvidenceNode" type="primary">追加证据点</a-button>
      </div>
      <div style="height: 300px;width: 100%"></div>
    </div>
  </div>
</template>
<script>
import PageHeader from '@/views/components/PageHeader/PageHeader'
import navBack from '@/views/components/navBack'
import {Base64} from 'js-base64'
import {GetProtectDetail} from '@/api/modules/rightProtect'
import EvidenceNode from '@/views/property-right/components/EvidenceNode'
import {Timeline} from 'ant-design-vue'
import {GetArtworkDetail} from '@/api/modules/artwork'
import {RenderPicture} from '@/api/modules/file'
import AdaptiveImg from '@/views/components/AdaptiveImg'
import html2pic from "@/views/components/html2pic/html2pic";
import {pageConfig} from "@/views/config/config";

export default {
  name: 'Detail',
  components: {
    PageHeader,
    AdaptiveImg,
    navBack,
    EvidenceNode,
    [Timeline.Item.name]: Timeline.Item,
    html2pic
  },
  data() {
    return {
      details: {},
      artworkInfo: {},
      artworkInfoLoaded: false,
      protectId: '',
      evidences: [],

    }
  },
  methods: {
    RenderImg(src) {
      return RenderPicture(src)
    },
    downloadFile() {

    },
    renderStatus(status) {
      return pageConfig.getTag(status)
    },
    async getDetail(safeRecordId) {
      this.details = {}
      this.evidences = []
      const res = await GetProtectDetail({safeRecordId})
      if (res.ok) {
        this.details = res.data
      }
      await this.getArtworkInfo(this.details.artworkId)
    },
    async getArtworkInfo(artId) {
      const res = await GetArtworkDetail({artId})
      if (res.ok) {
        this.artworkInfo = res.data[0]
        this.artworkInfoLoaded = true
      }
      console.log(res)
    },
    addEvidenceNode() {
      // const newBatchIndex = this.details.evidences.length
      console.log(this.evidences, '视图添加节点')
      this.evidences.push({
        readOnly: false,
        time: '',
        fileList: [],
        text: '',
        batch: this.evidences[this.evidences.length - 1].batch + 1
      })
    },
    async onNodeChangeSuccess(info) {
      // TODO 这里加上信息提示
      await this.getDetail(this.protectId)
      this.init()
      this.$message.info(info.info)
    },
    onNodeChangeFailed(info) {
      // TODO 这里加上消息提示
      this.$message.info(info.info)
    },
    cancelNodeAdditon() {
      this.evidences.pop()
    },
    init() {
      // 对请求到的证据结点进行只读处理
      const temp = []
      this.details.evidences.forEach(item => {
        temp.push({readOnly: true, ...item})
      })
      this.evidences = temp
    }
  },
  async mounted() {
    this.protectId = parseInt(Base64.decode(this.$route.params.protectId))
    await this.getDetail(this.protectId)
    this.init()
  }
}
</script>

<style scoped lang='less'>
.protect-detail-page {
  color: #bdbdbd;
  min-height: 100vh;
  padding-bottom: 30px;

  .section {
    width: 95%;
    padding: 0.5em 1em;
    margin: 0 auto;

    .title {
      font-size: 1.25em;
      color: #999999;
      font-weight: bold;
      margin: 1em 0;
      margin-left: -1em;
    }

    .content {
      padding: 1.5em;
      border-radius: 6px;
      background: rgba(197, 213, 218, 0.1);
    }
  }
}

.btn {
  margin-left: 40px;
}

.number {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  text-align: center;
  line-height: 1.5em;
  border-radius: 0.5em;
  //font-size: 32px;
  font-weight: 700;
  //background-color: rgba(255, 255, 255, 0.89);
}

.artwork-info {
  .col {
    display: flex;
    //align-items: center;
    justify-content: space-between;
    flex-direction: column;

    .info {
      height: 3em;
      display: flex;
      flex-direction: row;
    }

    .sub-title {
      color: #949494;
      width: 6em;
      font-size: 1.1em;
    }

    .info-detail {
      margin-left: 3px;
      width: 100%;

    }
  }

  .cover {
    width: 150px;
    height: 150px;
  }
}

</style>

<template>
  <div class="report-card">
    <div class="report-info-card-container">
      <a-row type="flex" justify="space-between" class="report-info-card">
        <a-col class="col" :span="2">
          <AdaptiveImg :src="info.markedfileId" :loaded="infoLoaded" img-class="cover"></AdaptiveImg>
        </a-col>
        <a-col class="col" :span="6">
          <div><span class="label">藏品编号</span><span class="content">{{ info.artworkId }}</span></div>
<!--          <div><span class="label">维权藏品</span><span class="content">{{ info.name }}</span></div>-->
        </a-col>
        <a-col class="col" :span="3">
          <span class="content" :class="statusClass[info.status]">{{ status[info.status] }}</span>
        </a-col>
        <a-col class="col" :span="7">
<!--          <div><span class="label">创建于</span><span class="content">{{ info.createdTtime }}</span></div>-->
          <div><span class="label">更新于</span><span class="content">{{ info.updatedTime }}</span></div>
        </a-col>
        <a-col class="col" :span="2">
          <a-button @click="goToDetail" type="primary">详情</a-button>
        </a-col>
        <a-col class="col" :span="2">
          <a-button @click="delReoprt" type="danger">放弃</a-button>
          <!--      <span @click="delProtect"><svg-icon icon="trash-bin" :color="delBtnColor"></svg-icon></span>-->
        </a-col>
      </a-row>
      <div class="selected-btn" :class="selected?'selected':''" @click="slectedChange"></div>
    </div>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
import { RenderPicture } from '@/api/modules/file'
import { GetArtworkDetail } from '@/api/modules/artwork'
import AdaptiveImg from '@/views/components/AdaptiveImg'

export default {
  name: 'ReportCard',
  components: {
    AdaptiveImg
  },
  props: {
    info: {
      type: Object,
      required: true
    }

  },
  data () {
    return {
      selected: false,
      reportId: undefined,
      status: ['处理中', '已受理', '失败'],
      statusClass: ['waiting', 'torted', 'untorted'],
      infoLoaded: false,
      artworkInfo: {}
    }
  },
  methods: {
    RenderImg (src) {
      return RenderPicture(src)
    },
    goToDetail () {
      this.$emit('goDetail', Base64.encode(this.reportId.toString()))
    },
    delReoprt () {
      this.$emit('delete', [this.reportId])
    },
    slectedChange () {
      this.selected = !this.selected
      this.$emit('switch', { selected: this.selected, reportId: this.reportId })
    }
  },
  async mounted () {
    this.reportId = this.info.reportId
    const artId = this.info.artworkId
    const res = await GetArtworkDetail({ artId })
    if (res.ok) {
      this.artworkInfo = res
      console.log(res)
    }
    if (this.artworkInfo) {
      this.infoLoaded = true
    }
  }
}
</script>

<style scoped lang='less'>

.report-info-card-container {
  padding-right: 3em;
  position: relative;
  .selected-btn {
    cursor: pointer;
    position: absolute;
    width: 1.4em;
    height: 1.4em;
    right: 0.3em;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
  }
}

.report-info-card {
  & > .col {
    font-size: 1em;
    //color: #565656;
    display: flex;
    //align-items: center;
    flex-direction: column;
    justify-content: center;

    .cover {
      height: 60px;
      width: 60px;
    }

    .label {
      font-size: 0.9em;
      margin-right: 5px;
    }

    .content {
      //color: #3b3b3b;
      font-size: 1.2em;
      font-weight: 500;
    }

    .waiting {
      color: #a7c9f8;
    }

    .torted {
      color: #8cbe84
    }

    .untorted {
      color: #FDDDBCFF;
    }


    .selected-btn {
      border-radius: 50%;
      background-color: #8f9ac0;
      width: 1.5em;
      height: 1.5em;
      display: inline-block;
      padding: 5px;
      cursor: pointer;
      float: right;
    }
  }
}


</style>

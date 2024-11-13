<template>
  <div class="protect-info-card-container" >
    <a-row type="flex" justify="space-between" class="protect-info-card">
      <a-col class="col" :span="3">
        <div class="artId"><span>藏品编号</span><span class="idText">{{ briefInfo.artworkId }}</span></div>

        <AdaptiveImg :src="artworkInfo.markedfileId" :loaded="infoLoaded" img-class="cover"></AdaptiveImg>
      </a-col>
      <a-col class="col" :span="3">
        <span style="font-size: 1.2em">
                  《{{ briefInfo.artworkName }}》
        </span>
      </a-col>
      <!--      <a-col class="col" :span="4">-->
      <!--&lt;!&ndash;        <div><span class="label">维权藏品</span><span class="content">{{  briefInfo.artworkName }}</span></div>&ndash;&gt;-->
      <!--      </a-col>-->
      <a-col class="col" :span="6">
        <!--        <div><span class="label">创建于</span><span class="content">{{ briefInfo.createdTime }}</span></div>-->
        <div><span class="label">更新时间</span><span class="content">{{ briefInfo.updatedTime }}</span></div>
      </a-col>
      <a-col class="col" :span="4">
        <div>
          <a-tag :color="statusClass[briefInfo.isTorted]" style="font-size: 1.1em;padding: 0 0.5em">
            {{ status[briefInfo.isTorted] }}
          </a-tag>
        </div>
      </a-col>
      <a-col class="col" :span="3">
        <a-button @click="goToDetail" type="primary">详情</a-button>
      </a-col>
      <a-col class="col" :span="3">
        <a-button @click="delProtect" type="danger">放弃</a-button>
      </a-col>
    </a-row>
    <div class="selected-btn" :class="selected?'selected':''" @click="slectedChange"></div>
  </div>
</template>
<script>
import { Base64 } from 'js-base64'
import { GetArtworkDetail } from '@/api/modules/artwork'
import AdaptiveImg from '@/views/components/AdaptiveImg'
import { RenderPicture } from '@/api/modules/file'

export default {
  name: 'ProtectCard',
  components: {
    AdaptiveImg
  },
  props: {
    briefInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      protectId: undefined,
      selected: false,
      delBtnColor: '#123456',
      infoLoaded: false,
      artworkInfo: {},
      statusClass: ['cyan', 'blue', 'green', 'red'],
      status: ['待审核', '审核中', '维权成功', '维权驳回']
    }
  },
  methods: {
    // onClickCard(e) {
    //   const btnList = ['', '', '']
    //   if (e.target.className) {
    //
    //   }
    // },
    RenderImg (src) {
      return RenderPicture(src)
    },
    goToDetail () {
      this.$emit('goDetail', Base64.encode(this.protectId.toString()))
    },
    async delProtect () {
      this.$emit('delete', [this.protectId])
    },
    slectedChange () {
      this.selected = !this.selected
      this.$emit('switch', { selected: this.selected, protectId: this.protectId })
    }
  },
  async mounted () {
    this.protectId = this.briefInfo.id
    const artId = this.briefInfo.artworkId
    console.log(this.briefInfo)
    const res = await GetArtworkDetail({ artId })
    if (res.ok) {
      this.artworkInfo = res.data[0]
    }
    if (this.artworkInfo) {
      console.log('卡片信息加载完成！！！！', this.artworkInfo)
      this.infoLoaded = true
    }
  },
  watch: {
    infoLoaded (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped lang='less'>

.protect-info-card-container {
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

.protect-info-card {
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

    .artId {
      padding: 1px;
      margin: 4px 0;
      //padding-bottom: 2px;
      color: #909399;
      font-size: 9px;
    }

    .idText {
      font-size: 12px;
      color: #8f87e4;
    }

    .label {
      font-size: 0.9em;
      margin-right: 5px;
    }

    .content {
      //color: #3b3b3b;
      font-size: 1em;
      font-weight: 500;
    }

    .waiting {
      color: #8cb5ee;
    }

    .torted {
      color: #8cbe84
    }

    .untorted {
      color: #FDDDBCFF;
    }


    .selected-btn {
      border-radius: 50%;
      //background-color: #8f9ac0;
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

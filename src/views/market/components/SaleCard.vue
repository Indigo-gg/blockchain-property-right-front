<template>
  <!--商城页的藏品卡片-->
  <div class="SaleCardWrapper">
    <!--    <adaptive-img :src="RenderImg(info.markedfileId)" :loaded="infoLoaded" img-class="cover"></adaptive-img>-->
    <adaptive-img :src="info.markedfileId" :loaded="infoLoaded" img-class="cover"></adaptive-img>
    <div class="footer flex-col-space-between">
      <div class="author-list">
        <AvatarGroup :authors="authors"></AvatarGroup>
      </div>
      <!--藏品名字和售卖价格-->
      <div class="footer-item flex-row-space-between">
        <span class="artworkName">
          {{ info.name }}
        </span>
        <span class="price">
          <span>{{ info.price }}CCN</span>
          <svg-icon icon="coin"></svg-icon>
        </span>
      </div>
      <!--藏品标签-->
      <div class="footer-item flex-row-space-between">
        <a-tag class="tag" color="#77777777"># {{ pageConfig.artworkTags[info.type - 1].text }}</a-tag>
      </div>
      <!--操作按钮-->
      <div class="footer-item flex-row-space-between">
        <div class="button" @click="()=>{this.$message.info(&quot;开发中，敬请期待!&quot;)}">
          简介
        </div>
        <div class="button" @click="goToDetail">
          详情
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pageConfig } from '@/views/config/config'
// import { GetUsufructStatus, GetOwnershipStatus } from '@/api/modules/transition'
import AvatarGroup from '@/views/components/avatarGroup/avatarGroup'
import AdaptiveImg from '@/views/components/AdaptiveImg'
import { RenderPicture } from '@/api/modules/file'
import { Base64 } from 'js-base64'

export default {
  name: 'SaleCard',
  components: { AdaptiveImg, AvatarGroup },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      pageConfig,
      authors: [],
      infoLoaded: false,
      // 此字段对应
      saleMode: ''
    }
  },
  methods: {
    RenderImg (fileId) {
      return RenderPicture(fileId)
    },
    // 查询发售状态
    FetchSaleStatus () {

    },
    goToDetail () {
      this.$router.push({
        name: 'ArtworkDetail',
        params: { artworkId: `${Base64.encode(this.info.id.toString())}` }
      })
    }
  },
  mounted () {
    console.log('.......', this.info)
    if (this.info.markedfileId) {
      this.infoLoaded = true
      this.authors = this.info.author
    }
  }
}
</script>

<style scoped lang='less'>
.SaleCardWrapper {
  position: relative;
  margin: 30px;
  height: 320px;
  width: 250px;

  .cover {
    width: 100%;
    height: 100%;
  }

  .footer {
    width: 100%;
    height: 135px;
    position: absolute;
    bottom: 0;
    background: rgba(175, 172, 172, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(10.5px);
    -webkit-backdrop-filter: blur(10.5px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 20px 16px 10px;

    .author-list {
      left: 16px;
      top: -16px;
      position: absolute;
    }

    .footer-item {
      width: 100%;
    }

    .tag {
      font-size: 1.1em;
      margin: 0;
      border-radius: 0.2em;
    }

    .artworkName {
      font-size: 1.3em;
      letter-spacing: 4px;
      position: relative;
      margin-bottom: 3px;

      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        bottom: -3px;
        left: 0;
        height: 2px;
        background-color: #fff;
        border-radius: 2px;
        width: 90%;
      }
    }

    .price {
      font-size: 1.2em;
      color: #646fee;
    }

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4em;
      height: 2em;
      cursor: pointer;
      background: rgba(30, 28, 28, 0.25);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(10.5px);
      -webkit-backdrop-filter: blur(10.5px);

      &:hover {
        background: #4B4B4B;
      }
    }
  }
}


</style>

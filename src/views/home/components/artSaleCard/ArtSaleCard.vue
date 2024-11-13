<template>
  <!--TODO 废稿-->
  <div class="artwork-sale-card">
    <a-row class="brief">
      <a-col class="artwork-img" :span="20">
        <img v-if="imgLoaded" :src="imgPath" alt="" @error="imgLoadFailed" />
        <svg-icon v-else icon="img-empty" width="200" height="200" style="border-radius: 3px"></svg-icon>
      </a-col>
      <a-col class="button-list" :span="4">
        <span><svg-icon class="icon" icon="star-collect"></svg-icon></span>
        <span @click="gotoArtDetail"><svg-icon class="icon" icon="rocket"></svg-icon></span>
        <span @click="cancelCollect" v-if="info.isFavorites"><svg-icon class="icon" icon="collected"></svg-icon></span>
        <span @click="openCollectBoard" v-else><svg-icon class="icon" icon="uncollected"></svg-icon></span>
      </a-col>
    </a-row>
    <a-row class="artwork-info">
      <a-col class="col-1">
        <span class="name">{{ info.name }}</span>
        <span class="remaining">
          <svg-icon icon="repo"></svg-icon>
          库存:{{ info.remaining }}</span>
      </a-col>
      <a-col class="price">
        <svg-icon icon="cocoin" color="#ffbc78"></svg-icon>
        <span>{{ info.price }}cocoin起</span>
        <OrangeBtn class="buy" @click="gotoArtDetail"></OrangeBtn>
      </a-col>
    </a-row>
    <!--显示收藏的弹出框-->
    <a-modal
      class="collect-edit-modal"
      maskClosable
      :visible="openCollect"
      @cancel="()=>this.openCollect=false"
      :footer="null"
    >
      <CollectEditForm
        :artwork-id="this.info.id"
        @success="CollectSucceed"
        @fail="CollectFailed"
      >
      </CollectEditForm>
    </a-modal>
  </div>
</template>
<script>
import { RenderPicture } from '@/api/modules/file'
import { Base64 } from 'js-base64'
import OrangeBtn from '@/views/components/OriangeBtn'
import CollectEditForm from '@/views/components/CollectEditForm'

export default {
  name: 'ArtWorkCard',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  components: {
    OrangeBtn, CollectEditForm
  },
  data () {
    return {
      // 默认图片可以加载成功
      imgLoaded: true,
      openCollect: false
    }
  },
  methods: {
    RenderAvatar (id) {
      return RenderPicture(id)
    },
    gotoArtDetail () {
      console.log('artworkItem', this.info)
      this.$router.push({
        name: 'ArtworkDetail',
        params: {artworkId: `${Base64.encode(this.info.id)}`}
      })
    },
    imgLoadFailed (e) {
      console.log(e)
      this.imgLoaded = false
    },
    // 取消收藏:只能跳转至我的收藏页面进行取消收藏
    cancelCollect () {
      this.$router.push({ name: 'UserCollections' })
    },
    openCollectBoard () {
      this.openCollect = true
    },
    CollectSucceed (msg) {
      console.log('CollectSucceed', msg)
      this.openCollect = false
    },
    CollectFailed (msg) {
      console.log('CollectFailed', msg)
      this.openCollect = false
    }
  },
  computed: {
    imgPath () {
      // console.log(this.info.fileId)
      return RenderPicture(this.info.fileId)
    }
  },
  mounted () {
    this.info.usePriceMin = parseFloat(this.info.usePriceMin).toFixed(0)
  }
}
</script>

<style scoped>
.artwork-sale-card {
  width: 260px;
  height: 300px;
  margin: 30px 0;
  padding: 1em;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.artwork-sale-card .brief {
  height: 170px;
}

.artwork-img {
  position: relative;
  top: -25px;
  left: -25px;
}

.artwork-img img {
  height: 200px;
  width: 210px;
  border-radius: 5px;
}


.button-list {
  font-size: 2.5em;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #0e0011;
  position: relative;
  z-index: 6;
  cursor: pointer;
}

.button-list .icon {
  padding: 2px;
  margin-bottom: 20px;
  border-radius: 25%;
}

.button-list .icon:hover {
  background-color: rgba(218, 215, 215, 0.97);
}

.artwork-info {
  font-size: 1.3em;
}

.artwork-info .col-1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.artwork-info .name {
  color: #7aa0ff;
  font-size: 0.8em;
  font-family: 'sans-serif';
  letter-spacing: 0.1em;
  margin-right: 0.3em;
  max-width: 200px;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
}

.artwork-info .name::after {
  content: '';
  display: block;
  position: absolute;
  background-color: #e1e3e5;
  height: 2px;
  width: 80%;
  right: 0;
  bottom: -6px;
}


.artwork-info .remaining {
  letter-spacing: 2px;
  color: #999999;
  font-size: 0.7em;
}

.artwork-info .price {
  font-size: 0.8em;
  color: #f1a04f;
  padding: 0.5em;
  display: flex;
  align-items: center;
  letter-spacing: 2px;
  position: relative;
}

.artwork-info .price .buy {
  font-size: 1.2em;
  width: 4em;
  height: 1.6em;
  color: #a6c5f3;
  position: absolute;
  right: 0.2em;
  cursor: pointer;
}


.authors {
  font-size: 1em;
  font-family: 微软雅黑;
  color: #0e0011;
}

.authors img {
  height: 20px;
  width: 20px;
  border-radius: 50%;
}



</style>

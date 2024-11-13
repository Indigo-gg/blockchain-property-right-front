<template>
  <div>
    <div class="card">
      <div class="card-img" @click="gotoArtDetail">
        <img :src="imgPath" alt="" @error="imgLoadFailed"/>
        <!--      <svg-icon v-else icon="img-empty" width="100%" height="200" style="border-radius: 3px"></svg-icon>-->
      </div>
      <div class="card-body">
        <h4>{{ info.name }}</h4>
        <div class="collect">
          <span @click="cancelCollect" v-if="info.isFavorites">
            <svg-icon
              size="20"
              color="hsl(178, 100%, 50%)"
              class="heart"
              icon="heart"></svg-icon>
          </span>
          <span @click="openCollectBoard" v-else>
            <svg-icon class="icon" size="20" icon="heart"></svg-icon></span>
        </div>
        <a-tooltip placement="right">
          <template slot="title">
            {{ info.brief }}
          </template>
          <p style="cursor: pointer" class="text-overflow-2">{{ info.brief }}</p>
        </a-tooltip>
        <!--        <div class="card-body-footer">-->
        <!--          <div>-->
        <!--            <svg-icon icon="cocoin" size="15" color="#ffbc78"></svg-icon>-->
        <!--            <span> <span style="font-size: 16px;font-weight: 600">{{ info.price }}</span>&nbsp;cocoin起</span></div>-->
        <!--          <div>-->
        <!--          <span><svg-icon size="15" icon="repo"></svg-icon>-->
        <!--          库存:{{ info.remaining }}</span>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
      <div class="card-footer" :class=" info.remaining?'flex-row-space-between':'flex-row-start'">

        <span>
          <avatar-group :authors="info.author"></avatar-group>
        </span>
        <span style="font-size: 0.7em;float: right;">
          <!--        <svg-icon-->
          <!--          size="14"-->
          <!--          color="hsl(178, 100%, 50%)"-->
          <!--          class="heart"-->
          <!--          icon="hasSale"></svg-icon>-->
          <span v-if="info.remaining">库存：{{ info.remaining }}</span>
        </span>
      </div>
    </div>
    <XyzTransition>
      <div class="collect-modal-overlay" v-if="openCollect" xyz="fade short-100% delay-1 ease-out-back">
        <CollectEditForm
          :artwork-id="this.info.id"
          @success="CollectSucceed"
          @fail="CollectFailed"
        >
        </CollectEditForm>
      </div>
    </XyzTransition>

    <!--    </a-modal>-->

  </div>

</template>

<script>
import { RenderPicture } from '@/api/modules/file'
import { Base64 } from 'js-base64'
import OrangeBtn from '@/views/components/OriangeBtn'
import CollectEditForm from '@/views/components/CollectEditForm'
import avatarGroup from '@/views/components/avatarGroup/avatarGroup'

export default {
  name: 'IndexArtCard',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  components: {
    OrangeBtn,
    CollectEditForm,
    avatarGroup
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
      // console.log('artworkItem', this.info)
      this.$router.push({
        name: 'ArtworkDetail',
        params: { artworkId: `${Base64.encode(this.info.id.toString())}` }
      })
    },
    imgLoadFailed (e) {
      console.log(e)
      this.imgLoaded = false
    },
    // 取消收藏:只能跳转至我的收藏页面进行取消收藏
    cancelCollect () {
      this.$router.push({
        path: `/user/${this.$store.getters.userInfo.id}/collections`
      })
    },
    openCollectBoard () {
      // console.log('点击收藏')
      this.openCollect = true
    },
    CollectSucceed (msg) {
      console.log('CollectSucceed', msg)
      this.openCollect = false
      this.info.isFavorites = true
    },
    CollectFailed (msg) {
      console.log('CollectFailed', msg)
      this.openCollect = false
    }
  },
  computed: {
    imgPath () {
      // console.log(this.info.fileId)
      return this.info.markedfileId
    }
  },
  mounted () {
    console.log('artCard', this.info)
    this.info.usePriceMin = parseFloat(this.info.usePriceMin).toFixed(0)
  }
}
</script>

<style scoped>


/*mystyle*/
.remaining {
  letter-spacing: 2px;
  color: #999999;
  font-size: 0.7em;
}

/*body {*/
/*  background: hsl(217, 54%, 11%);*/
/*  font-size: 18px;*/
/*  width: 100vw;*/
/*  height: 100vh;*/
/*  display: flex;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*  margin: 0;*/
/*  padding: 0;*/
/*  font-family: 'Outfit', sans-serif;*/
/*  font-family: 'Rubik', sans-serif;*/
/*}*/
.card {
  font-size: 18px;
  width: 280px;
  height: 400px;
  border-radius: 10px;
  background-color: hsl(216, 50%, 16%);
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  /*transform: scale(0.9);*/
}

.card-img {
  height: 55%;
  /*padding-bottom: 5%;*/
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.card-img::after {
  content: url(https://rvs-nft-preview-card.netlify.app/images/icon-view.svg);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: hsla(180, 64%, 87%, 0.3);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  z-index: -1;
}

.card-img:hover::after {
  z-index: 1;
}

.card-img img {
  width: 100%;
  height: 100%;
}

.card-body {
  height: 30%;
  color: hsl(215, 51%, 70%);
  font-size: 16px;
  padding: 10px;
  border-bottom: 1px solid hsl(215, 32%, 27%);
}

.card-body h4 {
  color: hsl(0, 0%, 100%);
  margin-bottom: 0;
  font-size: 18px;
  cursor: pointer;
  font-weight: 400;
}

.card-body .collect {
  float: right;
  cursor: pointer;
  font-weight: 400;
}

.card-body p {
  font-weight: 300;
}

.card-body h4:hover {
  color: hsl(178, 100%, 50%)
}

.card-body-footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.card-body-footer div {
  position: relative;
  padding-left: 2px;
}

.card-body-footer div:nth-child(1) {
  color: hsl(178, 100%, 50%);
}

.card-body-footer div:nth-child(2) {
  padding-left: 22px;
}

/*.card-body-footer div::before, .card-body-footer div::before {*/
/*  content: url(https://rvs-nft-preview-card.netlify.app/images/icon-ethereum.svg);*/
/*  position:absolute;*/
/*  top: 50%;*/
/*  left: 0;*/
/*  transform: translate(0%, -50%);*/
/*  line-height: 0px;*/
/*}*/
/*.card-body-footer div:nth-child(2):before {*/
/*  content: url(https://rvs-nft-preview-card.netlify.app/images/icon-clock.svg);*/
/*}*/
.card-footer {
  height: 15%;
  display: flex;
  align-items: center;
  /*column-gap: 15px;*/
}

.card-footer img {
  width: 25px;
  height: 25px;
  border: 1px solid hsl(0, 0%, 100%);
  border-radius: 50%;
}

.card-footer p {
  font-size: 14px;
  color: hsl(215, 51%, 70%);
  font-weight: 300;
}

.card-footer span {
  margin-left: 5px;
  color: hsl(170, 38%, 59%);
  cursor: pointer;
}

.card-footer span:hover {
  color: hsl(178, 100%, 50%)
}

.collect-modal-overlay {
  z-index: 11;
  position: absolute;
  position: fixed;
  top: 30vh;
  left: 30vw;
  transform: translateX(-50%);
}

</style>

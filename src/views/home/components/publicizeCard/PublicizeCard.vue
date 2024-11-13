<template>
  <div class="box" :style="{margin:0,padding:'10px',backgroundColor:$props.bgColor,minHeight: $props.height }">
    <a-card
      type="inner"
      :style="{padding:0,width: $props.width,minHeight: $props.height,borderRadius:'10px'}"
      :bordered="false"
      size="small"
      :bodyStyle="{
        backgroundColor:$props.bgColor,
        height:'100%',
        width:'100%'
      }"
    >
      <div class="img my-flex-center" @click="gotoArtDetail">
        <adaptive-img
          :loaded="true"
          height="140px"
          width="210px"
          :src="artwork.markedfileId"
        />
      </div>
      <a-card-meta>
        <div class="title" slot="title">{{ artwork.artworkName }}</div>
        <div class="author" slot="description">
          <a-tooltip placement="leftTop">
            <span slot="title">版权证明</span>
            <div class="preview">
              <img-preview :imgs="imgs"></img-preview>
            </div>
          </a-tooltip>
          <!--          <a-tag style="font-size: 6px" :color="colors[index]" class="au-tag" v-for="(a,index) in artwork.author" :key="a.id">-->
          <!--            {{a.name}}-->
          <!--          </a-tag>-->
          <!--          <div class="au-tag"-->
          <!--               :style="{color:color}"-->
          <!--               v-for="(a,index) in artwork.author">-->
          <!--            @{{a.name}}-->
          <!--          </div>-->

        </div>
        <div class="jubao-btn flex-row-space-around" slot="description">
          <my-avatar-group :authors="artwork.author"></my-avatar-group>
          <div class="btn" @click="toJubao">
            举报
          </div>
        </div>
      </a-card-meta>
    </a-card>

  </div>
</template>

<script>
import { pageConfig } from '@/views/config/config'
import adaptiveImg from '@/views/components/AdaptiveImg'
import imgPreview from '@/views/components/imgPreview/imgPreview'
import { RenderPicture } from '@/api/modules/file'
import MyAvatarGroup from '@/views/components/avatarGroup/avatarGroup'
import { Base64 } from 'js-base64'

export default {
  name: 'PublicizeCard',
  components: {
    MyAvatarGroup,
    adaptiveImg,
    imgPreview
  },
  props: {
    artwork: {
      type: Object,
      require: true
    },
    type: {
      type: String,
      default: 'normal'
    },
    width: {
      type: String,
      default: '240px'
    },
    height: {
      type: String,
      default: '240px'
    },
    bgColor: {
      type: String,
      default: '#182f4f'

    }
  },
  data () {
    return {
      color: pageConfig.getTag(1).color,
      RenderPicture,
      imgs: []
    }
  },
  methods: {
    toJubao () {
      this.$router.push({
        path: `/user/${this.$store.getters.userInfo.id}/report/list`,
        query: { artworkId: this.artwork.artworkId, openSubmit: true }
      })
    },
    gotoArtDetail () {
      // console.log('artworkItem', this.info)
      this.$router.push({
        name: 'ArtworkDetail',
        params: { artworkId: `${Base64.encode(this.info.id)}` }
      })
    }
  },
  mounted () {
    console.log('artwork', this.artwork)
    if (this.artwork.documentIds) {
      this.artwork.documentIds.forEach(file => {
        this.imgs.push({
          src: file.markedfileId
        })
      })
    }
  }
}
</script>

<style scoped>
.box {
  z-index: 1111;

  padding: 10px;
  /*margin: 20px;*/
  border-radius: 10px;
}

.img {
  width: 100%;

}

.info {
  /*padding:20px 0;*/
  height: 1em;
  text-overflow: ellipsis;
  overflow: hidden;
}

.title {
  /*padding-top:5px;*/
  padding-top: 10px;
  cursor: pointer;
  /*height: 1em;*/
  color: rgb(142, 241, 219);
}

.title:hover {
  /*padding-top:5px;*/
  padding-top: 10px;
  /*height: 1em;*/
  color: rgb(192, 217, 211);
}


.jubao-btn {
  /*position: relative;*/
  /*width: 100%;*/
  /*left: 60%;*/

  text-align: right;
}

.author {
  width: 100%;
  font-size: 6px;
  /*display: flex;*/
  /*flex-wrap: wrap;*/
  padding: 5px;
  height: auto;
  /*min-height: 10em;*/
}

.au-tag {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0 3px;
  max-width: 9em;
  /*width: 10em;*/
  height: 3em;
  text-overflow: ellipsis;
  overflow: hidden;
  border-radius: 5px;
  margin: 0 2px;
}

.preview {
  margin-left: 10px;
  min-height: 40px;
}

.btn {
  display: inline-block;
  cursor: pointer;
  text-align: center;
  line-height: 2em;
  border-radius: 5px;
  width: 4em;
  height: 2em;
  color: #15a284;
  border: #405566 1px solid
}

.btn:hover {
  color: #59e3c5;

}
</style>

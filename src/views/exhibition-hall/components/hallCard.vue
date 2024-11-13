<template>
  <div class="box" :style="{backgroundColor:bgColor,minHeight:height }">
    <a-card
      size="small"
      :style="{padding:0,width: $props.width,minHeight: $props.height}"
      :bordered="false"
      :bodyStyle="{
        fontSize:'14px',
        backgroundColor:bgColor,
      }"
    >
      <div class="card-actions">
        <svg-icon color="#000" icon="del" @click="handleDel(artwork.artworkId)"></svg-icon>
      </div>
      <adaptive-img
        :loaded="true"
        height="90px"
        width="100%"
        :src="artwork.markedfileId"
      />
      <div class="title text-overflow-1">{{ artwork.artworkName }}</div>
      <div class="author">
        <avatar-group :authors="artwork.authors"></avatar-group>
      </div>
    </a-card>
  </div>
</template>

<script>
import { pageConfig } from '@/views/config/config'
import adaptiveImg from '@/views/components/AdaptiveImg'
import svgIcon from '@/components/svgIcon/svgIcon'
import {RenderPicture} from "@/api/modules/file";
import AvatarGroup from "@/views/components/avatarGroup/avatarGroup";
export default {
  name: 'HallCard',
  components: {
    adaptiveImg,
    svgIcon,
    AvatarGroup
  },
  props: {
    artwork: {
      type: Object,
      require: true
    },
    width: {
      type: String,
      default: '180px'
    },
    height: {
      type: String,
      default: '240px'
    },
    bgColor: {
      type: String,
      default: 'rgba(140,136,136,0.6)'
    },
  },
  data () {
    return {
      color: pageConfig.getTag(1).color,
      RenderPicture
    }
  },
  methods:{
    handleDel(e){
      this.$emit('handleDel',e)
    }
  }
}
</script>

<style scoped>
.box {
  padding: 5px;
  margin: 20px;
  border-radius: 5px;
}

.info {
  /*padding:20px 0;*/
  height: 1em;
  text-overflow: ellipsis;
  overflow: hidden;
}

.title {
  /*padding-top:5px;*/
  padding: 3px;
  /*height: 24px;*/
  font-size: 16px;
  color: rgb(37, 175, 144);
}

.author {
  width: 100%;
  /*height: 100%;*/
  min-height: 12em;
  font-size: 6px;
  flex:1
}

.au-tag {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0 3px;
  min-width: 4em;
  /*width: 10em;*/
  height: 3em;
  text-overflow: ellipsis;
  overflow: hidden;
  border-radius: 5px;
  margin: 0 2px;
}
.card-actions {
  padding: 3px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  /*background-color: red;*/
}
.card-actions > *:hover{
  cursor: pointer;
  color: #46cfff;
  transform: scale(110%);

}
</style>

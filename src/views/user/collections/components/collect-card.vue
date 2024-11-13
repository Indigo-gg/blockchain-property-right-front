<template>
  <div :class="showCheckBox?'selected collect-container':'collect-container'" ref="collectCard">
    <div class="collect-card" >
      <img :src="imgPath" style="cursor:pointer;" v-if="imgLoaded" @click="handleClick" @error="imgLoadFailed">
      <img :src="errImgPath" v-else>
      <div class="content" :style="{backgroundColor:'#04506e'}">
        <span class="name">{{ info.artworkName }}</span>
        <div class="footer">
          <div class="time" v-text="`收藏于:${info.createdTime}`"></div>
          <div class="tool">
            <a-dropdown>
              <span
                class="hover-btn"
                @mouseover="()=>this.isMeunOpen=true"
                @mouseleave="()=>this.isMeunOpen=true"
              >更多 <a-icon type="down"/>
              </span>
              <a-menu slot="overlay" :visible="isMeunOpen">
                <a-menu-item>
                  <span @click="cancelCollect">取消收藏</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </div>
      </div>
      <span v-if="showCheckBox"  :class="selected?'selected-btn':'btn'" @click="toggleSelect"></span>
    </div>
  </div>
</template>
<script>
import { RenderPicture } from '@/api/modules/file'

export default {
  name: 'CollectCard',
  props: {
    info: {
      type: Object,
      required: true
    },
    showCheckBox: {
      type: Boolean,
      required: true
    },
    bgColor: {
      type: String,
      default: 'rgba(0,0,0,0.6)'
      // required: true
    }
  },
  data () {
    return {
      selected: false,
      imgPath: '',
      errImgPath: '',
      imgLoaded: true,
      isMeunOpen: false,
    }
  },
  methods: {
    toggleSelect () {
      this.selected = !this.selected
      this.$emit('toggle', { select: this.selected, id: this.info.id })
      // if (this.selected) {
      //   this.$refs.collectCard.classList.add('selected')
      // } else {
      //   this.$refs.collectCard.classList.remove('selected')
      // }
    },
    cancelCollect() {
      this.$emit('delcollect', this.info.id)
    },
    imgLoadFailed() {
      this.imgLoaded = false
    },
    handleClick() {
      this.$emit('click')
    }
  },
  mounted () {
    this.info.createdTime = this.info.createdTime.slice(0, 10)
    console.log(this.info)
    // this.imgPath = RenderPicture(this.info.fileId)
    this.imgPath = this.info.markedfileId

  }
}
</script>

<style scoped lang='less'>
.collect-container {
  width: 240px;
  height: 320px;
  border-radius: 5px;
  position: relative;
  transition: all ease 0.3s;
  .collect-card > img {
    width: 240px;
    height: 180px;
    border-radius: 5px 5px 0 0;
    //-webkit-mask-image: url("./mask-2.png");
    //-webkit-mask-box-image: url("./mask-2.png");
    //mask-image: url("./mask-2.png");
  }

  .content {
    width: 240px;
    padding: 0 20px;
    height: 96px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    overflow: hidden;
    //background: #4d4b4b;

    .name {
      font-size: 1.2em;
      color: #f0f2f5;
    }
    .footer{
      display: flex;
      width: 100%;
      height: 2em;
      align-items: center;
      //flex-direction: ;
      justify-content: space-between;
      font-size: 12px;
      color: #FFFFFF;
    }
    .tool{
      cursor: pointer;
    }
  }
}


.selected-btn {
  cursor: pointer;
  position: absolute;
  right: 6px;
  top: 5px;
  display: inline-block;
  height: 25px;
  width: 25px;
  padding: 5px;
  border-radius: 50%;
  background-clip: content-box;
  background: #46cfff;
}
.btn{
  cursor: pointer;
  position: absolute;
  right: 6px;
  top: 5px;
  display: inline-block;
  height: 25px;
  width: 25px;
  padding: 5px;
  border-radius: 50%;
  background-clip: content-box;
  background: #1a1717;
}


.collect-container.selected {
  //transform: translateY(-10px);
  transform: scale(102%);
  transition: all ease 0.3s;

  & > img {
  }

  //.selected-btn{
  //  background-clip: content-box;
  //  background: #46cfff;
  //}
}
</style>

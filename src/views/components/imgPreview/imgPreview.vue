<!--使用之前要注意里面的命名是fileId-->
<template>
  <div class="con">
    <div class="imgs flex-row-start">
      <div class="img" v-for="(item, index) in imgs" :key="index" @click="preview(item)">
        <adaptive-img :loaded="true" :width="width" :height="height" :src="item.src">
        </adaptive-img>
      </div>
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <adaptive-img :loaded="true" alt="example" style="width: 100%" :src="curImg"/>
    </a-modal>
  </div>
</template>

<script>
import AdaptiveImg from "@/views/components/AdaptiveImg";

export default {
  name: 'ImgPreview',
  components: {AdaptiveImg},
  props: {
    imgs: {
      type: Array,
      required: true
    },
    width: {
      type: String,
      default: '40px'
    },
    height: {
      type: String,
      default: '40px'
    }
  },
  data() {
    return {
      previewVisible: false,
      curImg: ''
    }
  },
  methods: {
    preview(item) {
      this.curImg = item.src
      this.previewVisible = true
    },
    handleCancel() {
      this.previewVisible = false
    }
  },
  mounted() {
    console.log('imgs', this.imgs)
  }
}
</script>

<style scoped>
.con {
  height: 100%;
  margin: 0;
  padding: 0;
}

.imgs {
  padding: 0;
  width: 100%;
  overflow-x: scroll;
}

.img {
  margin: 5px;
  /*width: 60px;*/
  /*height: 60px;*/
}

</style>

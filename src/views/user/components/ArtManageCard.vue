<template>
  <div class="ArtManageCard">
    <a-row class="title row"></a-row>
    <a-row class="content">
      <a-col>
        <adaptive-img src="" :loading="!infoLoaded"></adaptive-img>
      </a-col>
      <a-col>
        <div></div>
        <div></div>
      </a-col>
      <a-col>
        <p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
      </a-col>
      <a-col>
        <a-tag></a-tag>
      </a-col>
      <a-col>
        <a-space>

        </a-space>
      </a-col>
    </a-row>

  </div>
</template>

<script>
import AdaptiveImg from '@/views/components/AdaptiveImg'
import { RenderPicture } from '@/api/modules/file'

export default {
  name: 'ArtManageCard',
  props: {},
  components: {
    AdaptiveImg
  },
  data () {
    return {
      infoLoaded: false
    }
  },
  methods: {
    renderImg (fileId) {
      return RenderPicture(fileId)
    }
  }
}
</script>

<style scoped lang='less'>
.ArtManageCard {

}

</style>

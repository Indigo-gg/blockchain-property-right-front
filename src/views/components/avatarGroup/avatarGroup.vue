<template>
  <div class="author  flex-row-start">
    <!--  <a-avatar-group>-->
    <div
      class="avatar"
      v-for="(author,index) in authors"
      :key="index">
      <a-tooltip :title="author.username">
        <a-avatar
          style='cursor: pointer'
          @click="goToUserSpace(author.userId)"
          :src="RenderPicture(author.photoFileId||author.avatar||author.fileId)"
        ></a-avatar>
      </a-tooltip>
    </div>

    <!--  </a-avatar-group>-->
  </div>
</template>

<script>

import { RenderPicture } from '@/api/modules/file'

export default {
  name: 'AvatarGroup',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    authors: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      RenderPicture
    }
  },
  methods: {
    // renderTooltip (author) {
    //   if (this.authors.length === 1) {
    //     return `${author.username} 个人创作`
    //   } else {
    //     return `${author.username} 贡献:`
    //   }
    // }
    // 点击用户头像前往他的空间
    goToUserSpace (userId) {
      this.$router.push({ name: 'UserSpace', params: { userId: userId } })
    }
  },
  mounted () {
    console.log('组件获取到的author', this.authors)
    // console.log('avatar',this.authors)
  }
}
</script>

<style scoped>

/*.author:nth-child(1) {*/
/*  position: relative;*/
/*  right: 10px;*/
/*}*/
.author {
  margin-left: 10px;
}

.author div:nth-child(2) {
  position: relative;
  right: 10px;
  z-index: 112;

}

.author div:nth-child(3) {
  position: relative;
  right: 20px;
  z-index: 113;

}

.author div:nth-child(4) {
  position: relative;
  right: 30px;
  z-index: 114;

}

.author div:nth-child(5) {
  position: relative;
  right: 40px;
  z-index: 115;
}
</style>

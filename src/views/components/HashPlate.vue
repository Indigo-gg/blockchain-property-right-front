<template>
  <!--hash铭牌-->
  <div class="HashPlate">
    <svg-icon class="hash-icon" :icon="icons[color]"></svg-icon>
    <div class="hash" :class="color" @click="copy">
      <span class="text ">{{ Hash }}</span>
    </div>
  </div>
</template>

<script>
// import VueClipboard from 'vue-clipboard2'

export default {
  name: 'HashPlate',
  props: {
    hash: {
      type: [String, Number],
      required: true
    },
    color: {
      type: String,
      default: () => {
        return 'gold'
      }
    }
  },
  data () {
    return {
      Hash: '',
      icons: {
        'purple': 'hash-purple',
        'gold': 'hash-gold',
        'blue': 'hash-blue',
        'sliver': 'hash-sliver',
        'copper': 'hash-copper'
      }
    }
  },
  methods: {
    copy () {
      this.$copyText(this.Hash).then(
        () => {
          this.$message.success('复制成功!' + this.Hash)
        },
        () => {
          this.$message.error('复制失败!')
        }
      )
    }
  },
  mounted () {
    this.Hash = this.hash
    console.log(this.Hash)
  },
  watch: {
    hash (val) {
      this.Hash = val
    }
  }
}
</script>

<style scoped lang='less'>
.HashPlate {
  display: flex;
  align-items: center;

  .hash-icon {
    font-size: 2em;
    position: relative;
    z-index: 2;
  }

  .hash {
    cursor: pointer;
    user-select: none;
    margin-left: -1em;
    position: relative;
    padding: 0 0.7em 0 1.2em;
    border-radius: 5px;
    height: 1.4em;
    display: flex;
    align-items: center;

    .text {
      display: inline-block;
      height: 100%;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &.gold {
      background-image: linear-gradient(to left bottom, #fbcc83aa, #facc7eaa, #facd78aa, #f8cd73aa, #f7ce6daa, #f6d06caa, #f5d26baa, #f4d46aaa, #f4d86daa, #f4dc71aa, #f4e074aa, #f4e478);

      .text {
        color: #ffddb1;
      }
    }

    &.purple {
      background-image: linear-gradient(to right, #bb6bd1aa, #ba70d6aa, #b876daaa, #b77bdeaa, #b680e2aa, #b37fe5aa, #af7de9aa, #ab7cecaa, #a474f0aa, #9b6df3aa, #9266f7aa, #875ffbaa);

      .text {
        color: #d6bbf6;
      }
    }

    &.sliver {
      background-image: linear-gradient(to right, #d8dee3aa, #d5dde7aa, #d3dbebaa, #d5d9eeaa, #d8d6f0aa, #dad4f1aa, #dcd3f2aa, #dfd1f3aa, #ded1f5aa, #dcd1f8aa, #dbd1faaa, #d9d1fdaa);

      .text {
        color: #dbdcea;
      }
    }

    &.blue {
      background-image: linear-gradient(to right, #718fd3aa, #738ed2aa, #758ed1aa, #768dd0aa, #788dcfaa, #7b8fcfaa, #7f92d0aa, #8294d0aa, #899ad2aa, #8fa0d4aa, #96a6d6aa, #9dacd8aa);

      .text {
        color: #9fa8c0;
      }
    }

    &.copper {
      background-image: linear-gradient(to right, #e09b66aa, #df9c69aa, #de9e6baa, #dd9f6eaa, #dca071aa, #d89f73aa, #d59f75aa, #d19e77aa, #ca9c79aa, #c39a7aaa, #bc987caa, #b5967eaa);

      .text {
        color: #bbb8b4;
      }
    }
  }
}

</style>

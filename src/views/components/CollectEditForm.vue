<template>
  <div class="collect-edit-box">
    <div class="title">Add to collection</div>
    <div class="folder-list">
      <a-row type="flex" justify="space-between" class="folder-item" v-for="folder in FolderList" :key="folder.id">
        <a-col :span="4" class="pic col">
          <svg-icon icon="no-data" height="34" width="34"></svg-icon>
        </a-col>
        <a-col :span="16" class="name col">{{ folder.name }}</a-col>
        <a-col :span="4" class="add col" @click="subAddFavorite(folder.id)">
          <svg-icon icon="add-plus" height="20" width="20"></svg-icon>
        </a-col>
      </a-row>
    </div>
    <span v-if="!isEditFolderName" class="button" @click="()=>this.isEditFolderName=true">新建收藏夹</span>
    <div v-else class="folder-input">
      <input v-model="newFolder" type="text" placeholder="输入新收藏夹名称">
      <div>
        <span @click="subAddFolder">
          <svg-icon icon="ok" height="16" width="16"></svg-icon>
        </span>
        <span @click="()=>this.isEditFolderName=false">
          <svg-icon icon="cancel" height="16" width="16"></svg-icon>
        </span>
      </div>
    </div>
    <span @click="cancelCollect" class="close-btn"><svg-icon icon="close-cross" color="#eeeeee"></svg-icon></span>
  </div>
</template>

<script>
import { AddCollectFolder, ListCollectFolders, AddFavorite } from '@/api/modules/collection'

export default {
  name: 'CollectEditForm',
  props: {
    artworkId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      FolderList: [],
      isEditFolderName: false,
      // 新建文件夹的名字
      newFolder: ''
    }
  },
  methods: {
    async subAddFolder () {
      const res = await AddCollectFolder({ name: this.newFolder })
      console.log('subAddFolder', res)
      if (res.ok) {
        await this.getFolders()
      } else {
        this.$emit('fail', res.msg)
      }
      this.isEditFolderName = false
    },
    async subAddFavorite (folder) {
      const res = await AddFavorite({ artworkId: this.artworkId, collectId: folder })
      if (res.ok) {
        this.$message.success('藏品已收藏成功~')
        this.$emit('success', res.msg)
      } else {
        this.$emit('fail', res.msg)
      }
      console.log('subAddFavorite', res)
    },
    async getFolders () {
      const res = await ListCollectFolders()
      if (res.ok) {
        this.FolderList = res.data
      } else {
        this.$emit('fail', res.msg)
      }
    },
    cancelCollect () {
      this.$emit('fail', 'collect canceled!')
    }
  },
  mounted () {
    this.getFolders()
  }
}
</script>

<style scoped lang='less'>
.collect-edit-box {
  width: 350px;
  position: relative;
  padding: 1em 1.5em;
  color: #FFFFFF;
  background: rgba(0, 0, 0, 0.65);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.folder-list {
  &:not:first-child {
    border-top: 1px dot-dash rgba(255, 255, 255, 0.2);
  }
}

.folder-item {
  overflow: hidden;
  border-radius: 5px;

  .col {
    height: 40px;
    padding: 3px;
    display: flex;
    align-items: center;
    border-radius: 5px;
  }

  .add {
    cursor: pointer;
    justify-content: center;

    &:hover {
      background-color: rgba(129, 120, 120, 0.5);
    }
  }

  &:hover {
    background-color: rgba(129, 120, 120, 0.2);
  }
}


.title {
  font-size: 1.5em;
}

.close-btn {
  position: absolute;
  right: 0.7em;
  top: 0.5em;
  cursor: pointer;
}

.icon-box {
  height: 2.2em;
  width: 2.2em;
  padding: 0.1em;
}


.folder-input,
.button {
  margin: 1em auto;
  display: inline-block;
  border-radius: 5px;
  width: 100%;
  height: 2em;
  padding: 0.2em;
  background-color: rgba(153, 153, 153, 0.41);
  text-align: center;
  vertical-align: center;
}

.button {
  cursor: pointer;
}

.folder-input {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  & > div {
    height: 100%;
    display: inline-block;
    position: absolute;
    right: 0;
    &>span{
      cursor: pointer;
      margin: 0 5px;
    }
  }
  & > input {
    width: 100%;
    height:100%;
    border: none;
    background-color: transparent;
    &:focus{
      outline: none;
    }
  }

}


</style>

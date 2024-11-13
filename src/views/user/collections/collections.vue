<template>
  <div class="personal-center-page">
    <div class="personal-center-page-container user-collection-page">
      <template>
        <a-row>
          <a-col class="folder" span="3">
            <!--            <div class="title">收藏夹</div>-->
            <div
              :class="curFolder===tab.id?'tab select-tab':'tab un-select-tab'"
              v-for="tab in collectFolderList"
              @click="onSelect(tab.id)"
              :key="tab.id">
              <div>
                {{ tab.name }}
              </div>
              <span>
                <a-dropdown>
                  <span
                    @click="showMore"
                    @mouseleave="hideMore"
                  ><svg-icon icon="more"></svg-icon>
                  </span>
                  <a-menu slot="overlay" :visible="isMore">
                    <a-menu-item>
                      <span @click="delFolder(tab.id)">删除收藏夹</span>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>


            </div>

          </a-col>
          <a-col class="content" span="20">
            <div class="loading">
              <Loading :loading="!colsLoaded" icon="loading1">
              </Loading>
            </div>
            <div class="box" v-if="colsLoaded">
              <div class="actions" v-if="curCollections.length>0">
                <a-button class="action" @click="multiSelect">批量取消收藏</a-button>
                <a-button
                  class="action"
                  v-if="isOnSelect"
                  @click="cancelCollect"
                >确认
                </a-button>
                <a-button
                  class="action"
                  v-if="isOnSelect"
                  type="danger"
                  @click="cancelOnSelect">取消
                </a-button>
              </div>
              <div class="card" v-if="curCollections.length>0">
                <a-list :grid="myGrid" :data-source="curCollections">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <div class="my-flex-center">
                      <div class="click">
                        <CollectCard
                          @click="gotoDetail"
                          :show-check-box="isOnSelect"
                          :info="item"
                          @delcollect="cancelSimpleCollect"
                          @toggle="changeSelected"
                        >
                        </CollectCard>
                      </div>
                    </div>
                  </a-list-item>
                </a-list>
              </div>
              <div class="null" v-else>
                <img :src="emptyPicPath" alt="空图片">
                <span class="notice">当前收藏夹内没有藏品哦~</span>
                <!--TODO 全局信息提示并跳转-->
                <a-button type="primary" @click="()=>this.$router.push({name:'Home'})">前去浏览</a-button>
              </div>
            </div>
          </a-col>
        </a-row>
      </template>
    </div>
  </div>
</template>
<script>
import CollectCard from '@/views/user/collections/components/collect-card'
import { DelFavorite, DelCollectFolder, DelFavoriteMore, GetCollectionsInFolder, ListCollectFolders } from '@/api/modules/collection'
import Loading from '@/views/components/Loading/Loading'
import svgIcon from '@/components/svgIcon/svgIcon'

export default {
  name: 'Collections',
  components: { CollectCard, Loading, svgIcon },
  data () {
    return {
      emptyPicPath: require('@/assets/user/empty.svg'),
      colsLoaded: false,
      collectFolderList: [],
      //  当前的收藏列表内容
      curCollections: [],
      // 当前收藏夹id
      curFolder: -1,
      isOnSelect: false,
      isMore: false,
      myGrid: {
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 3
      },
      //  被选中的收藏卡片的id（对应artworkId）
      selecteds: []
    }
  },
  methods: {
    showMore () {
      this.isMore = true
    },
    hideMore () {
      this.isMore = false
    },
    gotoDetail (id) {
      if (this.isOnSelect) { return }
      this.$router.push({ name: 'ArtworkDetail', params: { artworkId: id } })
    },
    async getCollections (id) {
      this.colsLoaded = false
      const _this = this
      const res = await GetCollectionsInFolder({ collectId: id })
      this.curCollections = res.data
      console.log('cols', res)
      setTimeout(() => {
        _this.colsLoaded = true
      }, 300)
    },
    async getFolders () {
      const res = await ListCollectFolders()
      this.collectFolderList = res.data
      if (this.curFolder === -1) {
        this.curFolder = res.data[0].id
        await this.getCollections(this.curFolder)
      }
    },
    delFolder (id) {
      if (id === this.curFolder) {
       return
      }
      DelCollectFolder({ collectIds: id }).then(() => {
        console.log('this.curFolder', this.curFolder)
        this.getFolders()
      })
    },
    // cancelSimpleCollect(id) {
    //   const data = {
    //     artworkId: id,
    //     collectId: parseInt(this.curFolder)
    //   }
    //   console.log('取消收藏', data)
    //   DelFavorite(data)
    //   // TODO 这里需要加上信息提示
    //   this.getCollections(this.curFolder)
    // },
    cancelCollect () {
      const data = {
        artworkIds: this.selecteds.join(','),
        collectId: parseInt(this.curFolder)
      }
      console.log('取消收藏', data)
      DelFavoriteMore(data).then((res) => {
        if (res.ok) {
          setTimeout(() => {
            this.getCollections(this.curFolder)
          }, 100)
        }
      })
    },
    cancelSimpleCollect (id) {
      const data = {
        artworkId: id,
        collectId: parseInt(this.curFolder)
      }
      console.log('取消收藏', data)
      DelFavorite(data).then((res) => {
        if (res.ok) {
          setTimeout(() => {
            this.getCollections(this.curFolder)
          }, 100)
        }
      })
    },

    multiSelect () {
      this.isOnSelect = true
    },
    cancelOnSelect () {
      this.isOnSelect = false
    },
    /**
     * 收藏夹的函数
     */
    onSelect (id) {
      if (id === this.curFolder) { return }
      this.curFolder = id
      this.colsLoaded = false
      this.getCollections(id)
    },
    onExpand () {
      console.log('Trigger Expand')
    },
    changeSelected (args) {
      if (args.select) {
        this.selecteds.push(args.id)
      } else {
        this.selecteds.splice(this.selecteds.indexOf(args.id), 1)
      }
      console.log('当前的选择框内有这些东西', this.selecteds)
    }
  },
  async mounted () {
    await this.getFolders()
    this.colsLoaded = true
    console.log('curFolder', this.curFolder)
  },
  watch: {}
}
</script>

<style scoped lang='less'>
.user-collection-page {
  height: 100vh;
  position: relative;

  .loading {
    position: absolute;
    display: block;
    margin: 0 auto;
    top: 10vh;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .null {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > img {
      width: 300px;
      height: 300px;
      position: relative;
    }

    .notice {
      color: #f0f2f5;
      font-size: 16px;
      margin-bottom: 10px;
    }
  }

  .tree {
    padding: 20px;
  }

}

.folder {
  height: 100vh;
  overflow-y: scroll;
  background: rgba(4, 80, 110, 0.3);

}

.tab {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  color: rgba(208, 213, 225, 0.77);
  height: 50px;
}


.tab:hover {
  cursor: pointer;
}


.content {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  //width: 100%;
  height: 100vh;
  overflow-y: scroll;
  position: relative;
}

.box{
  width: 100%;
}
.select-tab {
  background: rgba(4, 80, 110, 0.8);
}

.un-select-tab {
}

.actions {
  padding-right: 20px;
  width: 100%;
  height: 50px;
  text-align: right;
}

.action {
  margin: 0 10px;
}
</style>

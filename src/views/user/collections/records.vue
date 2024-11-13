<template>
  <div>
    <scroll-load style="height: 100vh;position: relative">
      <Loading :loading="isLoading" icon="loading1"></Loading>
      <div v-if="!isLoading">
        <div class="null my-flex-center" v-if="historyList.length<1">
          <svg-icon width="200" height="200" style="border-radius: 3px" icon="no-data"></svg-icon>
          <div class="tips">{{ nullTips }}</div>
        </div>
        <div class="unNull" v-else>
          <a-list item-layout="horizontal" :bordered="false" :split="false" :data-source="historyList">
            <a-list-item @click="toDetail(item.artworkId)" slot="renderItem" slot-scope="item,index" class="box" :rowKey="item.id">
              <a-row class="item" type="flex" align="middle">
                <a-col :span="4" align="center">
                  <img :src="render(item.sketchId)" class="img"/>
                  <!--                  <img style="width: 10px;height: 10px" :src="item.avatarId"/>-->
                </a-col>
                <a-col :span="16">
                  <div class="name">
                    {{ item.name }}
                  </div>
                  <div class="description">
                    {{ tips }}{{ item.time }}
                  </div>
                </a-col>
                <a-col :span="4" align="center">
                  <a-dropdown>
                    <a-button
                      @mouseenter="()=>this.isShowMenu=true"
                      @mouseleave="()=>this.isShowMenu=false"
                      ghost
                      class="btn"
                      type="link"
                      style="color:#919dec">
                      <svg-icon size="25" icon="more" color="#919dec"></svg-icon>
                    </a-button>
                    <a-menu slot="overlay" :visible="isShowMenu">
                      <a-menu-item>
                        <span @click="delHistory(item.historyId)">删除记录</span>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>

                </a-col>
              </a-row>
            </a-list-item>
          </a-list>
        </div>
      </div>
    </scroll-load>
  </div>
</template>

<script>
import { GetHistoryList, DelHistory } from '@/api/modules/history'
import { pageConfig } from '@/views/config/config'
import scrollLoad from '@/views/components/scrollLoad/ScrollLoad'
import Loading from '@/views/components/Loading/Loading'
import { RenderPicture } from '@/api/modules/file'
import svgIcon from '@/components/svgIcon/svgIcon'
import { Base64 } from 'js-base64'
export default {
  name: 'Records',
  components: {
    scrollLoad,
    Loading,
svgIcon
  },
  data () {
    return {
      historyList: [],
      isShowMenu: false,
      index: 0,
      isLoading: true,
      nullTips: '你还没有浏览记录',
      tips: '浏览于',
      render: RenderPicture
    }
  },
  methods: {
    getHistory () {
      GetHistoryList().then(res => {
        this.historyList = res.data
        setTimeout(() => {
          this.isLoading = false
        }, pageConfig.loadingTime)
        console.log('我的浏览历史列表', this.historyList)
      })
    },
    delHistory (id) {
        DelHistory({ historyId: id }).then(() => {
          this.getHistory()
        })
    },
    toDetail (id) {
      console.log('toDetail', id)
      this.$router.push({ name: 'ArtworkDetail', params: { artworkId: Base64.encode(id) } })
    }
  },
  mounted () {
    this.getHistory()
  }
}
</script>

<style scoped>
.item {
  cursor: pointer;
  width: 80%;
  height: 65px;
  background-color: rgba(238, 238, 238);
  border-radius: 5px;
}
.name{
  font-size: 20px;
  color: rgb(14, 14, 14);
  font-weight: 400;
  padding: 2px;

}
.description{
  font-size: 9px;
  color: rgba(108, 107, 107, 0.99);
  padding: 2px;
}

.box {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.btn{
  /*margin-right: 20px;*/
}
.img{
  height: 60px;
  width: 60px;
  /*margin-left: 40px;*/
}
.null{
  width: 100%;
  /*background-color: #1a1717;*/
  position: absolute;
  height: 100%;
}
</style>

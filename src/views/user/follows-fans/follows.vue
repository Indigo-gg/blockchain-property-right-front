<template>
  <div class="personal-center-page">
    <div class="personal-center-page-container">
      <scroll-load style="height: 100vh;  width:100%; position: relative">
        <Loading :loading="isLoading" icon="loading1"></Loading>
        <div v-if="!isLoading">
          <div class="null my-flex-center" v-if="followList.length<1">
            <svg-icon width="200" height="200" style="border-radius: 3px" icon="no-data"></svg-icon>
            <div class="tips">{{ nullTips }}</div>
          </div>
          <div class="unNull" v-else>
            <a-list item-layout="horizontal" :bordered="false" :split="false" :data-source="followList">
              <a-list-item slot="renderItem" slot-scope="item,index" class="box" :rowKey="item.id">
                <!--            <a-list-item-meta>-->
                <!--              <a-avatar slot="avatar">-->
                <!--              </a-avatar>-->
                <!--            </a-list-item-meta>-->
                <a-row class="item" type="flex" align="middle">
                  <a-col :span="4" align="center">
                    <a-avatar :src="render(item.avatarId)" class="avatar"></a-avatar>
                  <!--                  <img style="width: 10px;height: 10px" :src="item.avatarId"/>-->
                  </a-col>
                  <a-col :span="16">
                    <div class="name">
                      {{ item.username }}
                    </div>
                    <div class="description">
                      {{ item.brief }}
                    </div>
                  </a-col>
                  <a-col :span="4" align="center">
                    <a-button ghost class="btn" style="color:#919dec" @click="cancelFollow(item)">取消关注</a-button>
                    <!--                  <a-button v-else ghost class="btn" style="color:#6fbeb1" @click="backFollow(item)">回关</a-button>-->
                  </a-col>
                </a-row>
              </a-list-item>
            </a-list>
          </div>
        </div>
      </scroll-load>
    </div>
  </div>
</template>

<script>
import { AddAttention, DelAttention, GetFollowList } from '@/api/modules/attention'
import scrollLoad from '@/views/components/scrollLoad/ScrollLoad'
import Loading from '@/views/components/Loading/Loading'
import { pageConfig } from '@/views/config/config'
import { RenderPicture } from '@/api/modules/file'
export default {
  name: 'Follows',
  components: {
    scrollLoad,
    Loading
  },
  data () {
    return {
      followList: [],
      index: 0,
      isLoading: true,
      nullTips: '你还没有关注别人',
      render: RenderPicture,
      params: {
        pageSize: 10,
        pageNumber: 1
      }
    }
  },
  methods: {
    getMyFollows () {
      GetFollowList(this.params).then(res => {
        this.followList = res.data
        pageConfig.updateArtParams(this.params)
        setTimeout(() => {
          this.isLoading = false
        }, pageConfig.loadingTime)
        console.log('我的关注列表', this.fansList)
      })
    },
    cancelFollow (user) {
      // console.log('user',user)
        DelAttention({ userId: user.userId }).then(() => {
          this.followList = this.followList.filter(item => {
            return item.userId !== user.userId
          })
        })
    }
  },
  mounted () {
    this.getMyFollows()
  }
}
</script>

<style scoped>
.item {
  width: 80%;
  height: 80px;
  background-color: rgba(238, 238, 238, 0.89);
  border-radius: 5px;
}
.name{
  font-size: 20px;
  color: #4b4a4a;
  font-weight: 400;
  padding: 2px;

}
.description{
  font-size: 12px;
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
.avatar{
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

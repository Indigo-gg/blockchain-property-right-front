<template>
  <div class="personal-center-page">
    <div class="personal-center-page-container hall my-flex-center">
      <a-row class="hallInfo card-box-bgColor" type="flex" justify="space-around" align="middle">
        <Loading :loading="isHallLoading" icon="lodaing1">
        </Loading>
        <a-col
          :span="8"
          class="my-flex-center"
          style="border-right: 1px #eee solid;"
          v-if="!isHallLoading"
        >
          <img style="height:20vw;width:20vw" :src="myRoom.cover"/>
          <div class="container">
            <div class="heat" v-if="myRoom.heat>=0">
              热度：
              <svg-icon icon="heat" color="red"></svg-icon>
              <span class="heatTip">
                {{ myRoom.heat }}  </span></div>
            <div class="heat" v-if="myRoom.view>=0">
              浏览量：
              <svg-icon icon="visits"></svg-icon>
              <span class="heatTip">
                {{ myRoom.view }}
              </span>
            </div>
          </div>
        </a-col>
        <a-col :span="16" align="top" style="height: 100%">
          <Loading :loading="isHallLoading" icon="lodaing1">
          </Loading>
          <div v-if="!isHallLoading">
            <div class="actions">
              <a v-if="myRoom.showroomId===EMPTY" class="enter flex-row-space-around" @click="showEdit">激活展馆</a>
              <span v-else class="enter flex-row-space-around">
                <a @click="showEdit">设置展馆</a>
                <a @click="intoMyHall">进入展馆</a>
              </span>
            </div>
            <div class="title">{{ myRoom.name }}</div>
            <div class="info text-overflow-8">{{ myRoom.info }}</div>
          </div>
        </a-col>
        <div class="time" v-if="myRoom.createdTime">{{ timeTip }}：{{ myRoom.createdTime }}</div>
      </a-row>
      <a-row class="artworks card-box-bgColor">
        <Loading :loading="isLoading" icon="lodaing1">
        </Loading>
        <div v-if="!isLoading">
          <div class="tabs" v-if="myRoom.showroomId!==EMPTY">
            <div style="font-size: 24px">{{ artTip }}</div>
            <svg-icon icon="plus" size="40" :color="colors.add" @click="showAdd"></svg-icon>
          </div>
          <a-list :grid="workGrid" :data-source="artworks" v-if="artworks.length>0">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <div class="my-flex-center">
                <hall-card @handleDel="handleDelWork" height="210px" :artwork="item">
                </hall-card>
              </div>
            </a-list-item>
          </a-list>
          <div class="empty" v-else>
            <svg-icon width="200" height="200" style="border-radius: 3px" icon="no-data"></svg-icon>
          </div>
        </div>
      </a-row>
      <a-drawer
        destroyOnClose
        title="新增藏品"
        :width="720"
        :visible="isShowAdd"
        :body-style="{ paddingBottom: '80px' }"
        @close="closeAdd"
      >
        <add-room-works
          :current-list="artworks"
          :showroom-id="myRoom.showroomId"
          @handleAddWorks="handleAddWorks"
        ></add-room-works>
      </a-drawer>
      <a-drawer
        title="编辑展馆信息"
        :width="720"
        :visible="isShowEdit"
        :body-style="{ paddingBottom: '80px' }"
        @close="closeEdit"
      >
        <edit-room
          :room="myRoom"
          @handleCancel="closeEdit"
          @handleConfirm="editRoom"></edit-room>
      </a-drawer>
    </div>
  </div>
</template>
<script>
import Loading from '@/views/components/Loading/Loading'
import { getMyRoom, addRoomWork, getRoomWork, editMyRoom, delRoomWork } from '@/api/modules/showroom'
import { hallOptions } from '@/views/exhibition-hall/config/config'
import adaptiveImg from '@/views/components/AdaptiveImg'
import svgIcon from '@/components/svgIcon/svgIcon'
import hallCard from '@/views/exhibition-hall/components/hallCard'
// import {GetArtworkList} from "@/api/modules/artwork";
import { pageConfig } from '@/views/config/config'
// import '@/utils/mock/getMotheds'
import EditRoom from '@/views/components/editRoom/editRoom'
import addRoomWorks from '@/views/components/addRoomWork/addRoomWork'
import store from "@/store";

export default {
  name: 'Exhibition',
  components: {
    Loading,
    EditRoom,
    addRoomWorks,
    adaptiveImg,
    svgIcon,
    hallCard
  },
  data () {
    return {
      workGrid: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4
      },
      EMPTY: -1,
      isShowAdd: false,
      isShowEdit: false,
      artworks: [],
      colors: {
        add: '#b0d8e7'
      },
      // 默认展馆配置
      myRoom: {
        showroomId: -1,
        pattern: 0,
        name: `${store.getters.userInfo.name}的展馆`,
        createdTime: undefined,
        view: -1,
        heat: -1,
        info: '激活3D展馆获取美妙体验',
        cover: ''
      },
      cardColor: 'rgb(75, 74, 74)',
      timeTip: '创建日期',
      artTip: '编辑展馆作品',
      isLoading: true,
      isHallLoading: true,
      showroomId: -1
    }
  },
  methods: {
    // 初始化我的展馆
    initRoom (room) {
      if (parseInt(room.showroomId) !== this.EMPTY) {
        const obj = Object.keys(room)
        obj.forEach(o => {
          this.myRoom[o] = room[o]
        })
      }
      const myOptions = hallOptions.find(hall => {
        return hall.type === this.myRoom.pattern
      })
      console.log('我的展馆信息', this.myRoom)
      this.myRoom.cover = myOptions.cover
      // 如果是存在展馆
    },
    intoMyHall () {
      this.$router.push({
        name: 'ExhibitionHall',
        params: { hallNo: this.myRoom.showroomId, pattern: this.myRoom.pattern }
      })
    },
    showEdit () {
      this.isShowEdit = true
    },
    editRoom (e) {
      console.log('index-e', e)
      editMyRoom(e).then(() => {
        this.getMyRoom()
        this.closeEdit()
      })
    },
    closeEdit () {
      this.isShowEdit = false
    },
    closeAdd () {
      this.isShowAdd = false
    },
    showAdd () {
      // console.log('showAdd',this.isShowAdd)
      this.isShowAdd = true
    },
    async getMyRoom () {
      // return new Promise((resolve)=>{
      await getMyRoom().then(res => {
        console.log('my-room', res.data)
        this.initRoom(res.data)
        setTimeout(() => {
          this.isHallLoading = false
        }, pageConfig.loadingTime)
        this.getArtworks()
      })
      // })
    },
    getArtworks () {
      getRoomWork({ showroomId: this.myRoom.showroomId }).then(res => {
        this.artworks = res.data
        setTimeout(() => {
          this.isLoading = false
        }, pageConfig.pubFreshTime)
      })
    },
    handleAddWorks (e) {
      const str = e.join(',')
      // console.log(str)
      addRoomWork({ artworkIds: str, showroomId: this.myRoom.showroomId }).then(() => {
        this.getArtworks()
        this.closeAdd()
      })
    },
    handleDelWork (e) {
      console.log('artworkIds', e)
      delRoomWork({ artworkIds: e, showroomId: this.myRoom.showroomId }).then(() => {
        this.getArtworks()
      })
    }
  },
  mounted () {
    this.getMyRoom()
    // this.getArtworks()
  }
}
</script>

<style scoped>
.hall {
  /*margin-top: 3vw;*/
  min-height: 100vh;
  width: 100%;
  color: #565a5a;
  /*background-color: #46cfff;*/
}

.tabs {
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tabs > *:hover {
  cursor: pointer;
  transform: scale(110%);

}

.container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

}

.actions {
  padding: 0 10px;
  width: 100%;
  text-align: right;
  position: relative;
  bottom: 20px;
}

.enter {
  display: inline;
  width: 10em;
}

.enter a {
  padding: 5px;
}

.title {
  margin-bottom: 40px;
  font-size: 32px;
  text-align: center;
  /*padding: 20px;*/
  font-weight: 700;
  color: #46cfff;
}

.heat {
  display: flex;
  justify-content: space-around;
  display: flex;
  align-items: center;
  color: #909399;
  line-height: 1em;
  font-weight: 500;
  margin: 10px;

}


.heatTip {
  margin: 5px;
  font-size: 18px;
  color: rgb(176, 216, 231);
  font-weight: 700;

}

.hallInfo {
  position: relative;
  margin-top: 20px;
  width: 90%;
  min-height: 400px;
  border-radius: 20px;

  /*background-color: #ffffff;*/
}

.info {
  padding: 0 20px;
  margin-bottom: 20px;
  font-size: 18px;
  color: #eff1f1;
  height: 12em;
  line-height: 1.5em;
  text-indent: 2em;
}

.time {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #eff1f1;

}

.artworks {
  border-radius: 20px;
  margin: 5vw 0px;
  width: 90%;
  position: relative;
  min-height: 50vh;
  /*background-color: #46cfff;*/
}

.empty {
  width: 100%;
  text-align: center;
}
</style>

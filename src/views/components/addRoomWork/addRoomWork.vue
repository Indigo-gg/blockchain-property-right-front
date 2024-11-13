<template>
  <div>
    <scroll-load style="height: 100vh;position: relative">
      <Loading :loading="isLoading" icon="loading1"></Loading>
      <div v-if="!isLoading">
        <div class="null my-flex-center" v-if="roomWorkList.length<1">
          <svg-icon width="200" height="200" style="border-radius: 3px" icon="no-data"></svg-icon>
          <div class="tips">{{nullTips}}</div>
        </div>
        <div class="unNull" v-else>
          <div class="actions">
            <a-button @click="addWorks">新增作品</a-button>
          </div>
          <a-list item-layout="horizontal" :bordered="false" :split="false" :data-source="roomWorkList">
            <a-list-item slot="renderItem" slot-scope="item,index" class="box" :rowKey="item.id">
              <!--            <a-list-item-meta>-->
              <!--              <a-avatar slot="avatar">-->
              <!--              </a-avatar>-->
              <!--            </a-list-item-meta>-->
              <a-row class="item" type="flex" align="middle">
                <a-col :span="4" align="center">
                  <img :src="item.markedfileId" class="img"/>
                  <!--                  <img style="width: 10px;height: 10px" :src="item.avatarId"/>-->
                </a-col>
                <a-col :span="16">
                  <div class="name">
                    {{ item.artworkName }}
                  </div>
                </a-col>
                <a-col :span="4" align="center">
                  <a-checkbox :value="item.artworkId"  @change="onChange"></a-checkbox>
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
import {pageConfig} from "@/views/config/config";
import scrollLoad from "@/views/components/scrollLoad/ScrollLoad";
import Loading from "@/views/components/Loading/Loading";
import { RenderPicture} from "@/api/modules/file";
import {getRoomWork, getSelectRoomWork} from "@/api/modules/showroom";
export default {
  name: 'addRoomWork',
  components: {
    scrollLoad,
    Loading
  },
  props:{
    showroomId:{
      type:Number,
      require:true
    },
    currentList:{
      type:Array,
      require:true
    }
  },
  data() {
    return {
      nullTips:'您还没有藏品',
      roomWorkList: [],
      selectList:[],
      index: 0,
      isLoading:true,
      render:RenderPicture
    }
  },
  methods: {
    getMyRoomWork() {
      getSelectRoomWork({showroomId:this.showroomId}).then(res => {
        this.roomWorkList = res.data.filter((v) => this.currentList.every((val) => val.artworkId!= v.id));
        setTimeout(()=>{
          this.isLoading=false
        },pageConfig.loadingTime)
        console.log('我的藏品列表', this.roomWorkList)
      })
    },
    onChange(e){
      console.log('e',e)
      if(e.target.checked){
          this.selectList.push(e.target.value)
      }
      else {
        this.selectList=this.selectList.filter(item=>{
         return  item!==e.target.value
        })
      }

    },
    addWorks(){
      this.$emit('handleAddWorks',this.selectList)
    }
  },
  mounted() {
    this.getMyRoomWork()
  }
}
</script>

<style scoped>
.item {
  width: 80%;
  height: 70px;
  background-color: #efefef;
  border-radius: 5px;
}
.name {
  font-size: 20px;
  color: rgba(14, 14, 14, 0.96);
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

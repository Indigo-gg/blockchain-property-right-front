<template>
<div class="body">
  <a-form hide-required-mark layout="vertical" ref="room">
    <a-row>
      <a-col :span="12">
        <a-form-item label="展馆名称">
          <a-input
            v-model="myRoom.name"
            v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: '请输入展馆名称' }],
                  },
                ]"
            placeholder="请输入展馆名称"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="20">
        <a-form-item label="展馆介绍">
          <a-textarea v-model="myRoom.info"
            v-decorator="[
                  'url',
                  {
                    rules: [{ required: true, message: '请输入对展馆的介绍' }],
                  },
                ]"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <div class="pickRoom">
          <pick-room  @currentRoom="handleCurrentRoom"></pick-room>
        </div>
      </a-col>
    </a-row>

  </a-form>
  <a-button :style="{ marginRight: '8px' }" @click="emitCancel">
    取消
  </a-button>
  <a-button type="primary" @click="emitSend">
    提交
  </a-button>
</div>
</template>

<script>
import pickRoom from "@/views/components/pickRoom/pickRoom";
import {pageConfig} from "@/views/config/config";
export default {
  name: "editRoom",
  components:{
    pickRoom
  },
  props:{
    room:{
      type:Object,
      require:true
    }
  },
  data(){
    return{
      myRoom:{
        name:'',
        info:'',
        pattern:'',
        workSum:pageConfig.workSum
      }
    }
  },
  methods:{
    handleCurrentRoom(e){
      console.log('当前的展馆类型',e)
        this.myRoom.pattern=e
    },
    emitCancel(){
        this.$emit('handleCancel')
    },
    emitSend(){
        this.$emit('handleConfirm',this.myRoom)
    }
  },
  mounted() {
    this.myRoom.name=this.room.name
    this.myRoom.pattern=this.room.pattern
    this.myRoom.info=this.room.info
  }
}
</script>

<style scoped>
.body{
  min-height: 100%;
  width: 100%;
  overflow: hidden;
}
.pickRoom{
  width: 100%;
  overflow: hidden;
  /*background: #7e8185;*/
}
</style>
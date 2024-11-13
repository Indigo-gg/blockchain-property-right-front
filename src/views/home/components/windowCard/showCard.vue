<template>
  <div class="box my-flex-center" :style="{backgroundColor:bgColor,height: height,width: width}">
    <div class="img my-flex-center">
      <adaptive-img
        height="162px"
        width="216px"
        :loaded="true"
        :src="artwork.markedfileId"
      />
    </div>

    <!--        <div class="title" slot="title">{{artwork.name}}</div>-->
    <!--        <div class="author" slot="description">-->
    <!--          &lt;!&ndash;          <a-tag style="font-size: 6px" :color="colors[index]" class="au-tag" v-for="(a,index) in artwork.author" :key="a.id">&ndash;&gt;-->
    <!--          &lt;!&ndash;            {{a.name}}&ndash;&gt;-->
    <!--          &lt;!&ndash;          </a-tag>&ndash;&gt;-->
    <!--          <div class="au-tag"-->
    <!--               :style="{color:colors[index]}"-->
    <!--               v-for="(a,index) in artwork.author">-->
    <!--            @{{a.name}}-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="info"  slot="description" v-if="$props.type==='info'">-->
    <!--          &lt;!&ndash;        <span>&ndash;&gt;-->
    <!--          {{artwork.info}}-->
    <!--          &lt;!&ndash;        </span>&ndash;&gt;-->
    <!--        </div>-->
    <!--        <div  class="jubao-btn" slot="description">-->
    <!--          <a-button  :style="{color:'#fff',border:'#405566 1px solid'}" type="danger" ghost size="small">举报</a-button>-->
    <!--        </div>-->


  </div>
</template>

<script>
import {pageConfig} from "@/views/config/config";
import adaptiveImg from "@/views/components/AdaptiveImg";
import { RenderPicture} from "@/api/modules/file";
export default {
  name: "showCard",
  components:{
    adaptiveImg
  },
  props:{
    artwork:{
      type:Object,
      require:true
    },
    type:{
      type:String,
      default:'normal'
    },
    width:{
      type:String,
      default: '240px'

    },
    height:{
      type:String,
      default: '180px'

    },
    bgColor:{
      type:String,
      default: 'rgb(255,255,255)'
    }
  },
  data(){
    return{
      colors:pageConfig.tagColors,
      RenderPicture
    }
  }
}
</script>

<style  scoped>
.box{
  /*padding: 5px;*/
  /*margin: 20px;*/
  /*border-radius: 5px;*/
}
.img{
  width: 100%;
  /*background:url("/images/index/kuang1.png") no-repeat;*/
  background-size: 100% 100%;
}
.info{
  /*padding:20px 0;*/
  height: 1em;
  text-overflow: ellipsis;
  overflow: hidden;
}
.title{
  /*padding-top:5px;*/
  padding: 10px;
  /*height: 1em;*/
  color: rgb(47, 245, 201);
}
</style>
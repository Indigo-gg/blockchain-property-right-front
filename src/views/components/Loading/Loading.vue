<template>
<div class="loading" v-if="loading" :style="{backgroundColor: $props.bgColor}">
  <a-spin :spinning="$props.loading" :tip="$props.tip" v-if="$props.icon">
<!--    <img :width="$props.size" :height="$props.size" :src="$props.src" slot="indicator" v-if="$props.src" />-->
    <svg-icon class="spinner" :color="color" :icon="$props.icon" :size="$props.size" slot="indicator"></svg-icon>
  </a-spin>
  <div v-else>
    <a-spin size="large" :spinning="$props.loading">
    </a-spin>
  </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props:{
    // src:{
    //   type: String
    // },
    icon:{
      type:String,
    },
    tip:{
      type:String,
      default:''
    },
    loading:{
      type:Boolean,
      require:true
    },
    size:{
      type:Number,
      default: 60
    },
    bgColor:{
      type:String,
      default: 'rgba(14,14,14,0.1)'
    },
    color:{
      type:String
    },
    customClass:{
      type:String
    }
  }
}
</script>

<style scoped>
.loading{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  height:100%;
  width: 100%;
  border-radius: 10px;
}
.spinner{
  animation: rotate 2s linear infinite;
}
@keyframes rotate {
  0% {
    transform:rotate(0deg) ;
  }
  25% {
    transform:rotate(180deg) ;
  }
  50% {
    transform:rotate(270deg) ;
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
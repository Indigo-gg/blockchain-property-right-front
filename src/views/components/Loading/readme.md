##loading组件  

1.使用方法：
```vue
<!--父元素需要设置为relative，Lodaing自动铺满父元素-->
<!--icon:填入svg名字即可-->
<!--size为数字单位为px-->
<!--bgColor 加载时的遮罩-->
<!--'rgba(0,0,0,0.2)'-->
<!--'#fff'-->
<!--isLoading控制loading的显示与否-->
<template>
  <father style="position:relative">
    <Loading :icon="svgName" :size="70" :loading="isloading">

    </Loading>
  </father>
</template>

```
2.使用案例

```vue
<template>
  <div class="area">
    <Loading  :size="70" :loading="isLoading" icon="cocoin"></Loading>
    <div class="content" v-if="!isLoading">
      {{youContent}}
    </div>
  </div>
</template>

<script>
export default{
  name: 'Main',
  components: {
    Loading
  },
  data(){
    return{
      isLoading:true,
      youContent:' '
    }
    
  },
  mounted() {
    axios.get(url,data).then(res=>{
      this.youContent=res.data
      setTimeout(()=>{
        this.isLoading=false
      },2000)
    })
  }

}
</script>

<style>
.area{
  height: 100px;
  width: 100px;
  position: relative;
}
</style>
 
```
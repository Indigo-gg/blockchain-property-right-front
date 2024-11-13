```vue

<!--:watchInput:开启输入监听-->
<!--:isShowOptions:显示侧边选项-->
<!--width="30vw"宽度-->
<!--placeholder="搜索"-->
<!--:options="options"侧边选项配置-->
<!--@handleSearch返回参数：{value,searchType(isShowOptions)}-->
<!--@handleChange返回参数：{value,searchType}(watchInput) -->
<work-search :watchInput="true"
             :isShowOptions="true"
             width="30vw"
             placeholder="搜索"
             :options="options"
>

</work-search>
<script>
import WorkSearch from "./workSearch";

export default {
  components: {WorkSearch},
  data(){
    return{
      options:[
        {
          title:'按照用户查找',
          value:'user'
        },
        {
          title:'按照作品查找',
          value:'work'
        }]
    }
  }
}
</script>
```
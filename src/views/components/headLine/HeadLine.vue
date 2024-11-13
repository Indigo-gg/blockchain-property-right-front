<template>
  <a-divider>
    <div class="title" :style="{color:color}">{{ title }}</div>
    <div class="title-eng">{{ titleEng }}</div>
  </a-divider>
</template>

<script>
export default {
  name: 'HeadLine',
  props: ['title', 'titleEng', 'color']
}
</script>

<style scoped>
.title{
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #46cfff;
}
.title-eng{
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: #8da3b0;
}

</style>

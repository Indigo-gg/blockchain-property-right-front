<template>
  <div>
    <a-button @click="navBack">返回上一页</a-button>
  </div>
</template>

<script>
export default {
  name: 'NavBack',
  methods: {
    navBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>

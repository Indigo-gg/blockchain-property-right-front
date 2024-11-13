<template>
  <div class="star" id="mySky">

  </div>
</template>

<script>
import {DrawSky} from "@/views/components/mysky/utils";
export default {
  name: "mysky",
  props: ['height'],
  methods: {},
  mounted() {
    let mySky = document.getElementById('mySky')
    DrawSky(mySky, this.height)
  }
}
</script>

<style scoped>

</style>
<template>
  <button class="custom-btn btn-7" @click="onClick">
    <span class='span'>
      购买
    </span>
  </button>
</template>

<script>
export default {
  name: 'OriangeBtn',
  methods: {
    onClick () {
      this.$emit('click', '')
    }
  }
}
</script>

<style scoped>
.btn-7 {
  background-image: linear-gradient(to right top, #97e6fc, #29abdc, #0e76b4, #466786, #4c73ff);
  line-height: 42px;
  padding: 0;
  border: none;
  border-radius: 6px;
}

.btn-7 span {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: center;
  line-height: 100%;
  letter-spacing: 3px;
  font-size: 0.7em;
  width: 100%;
  height: 100%;
  color: #f0f2f5;
  transition: all 0.5s ease;
}




.btn-7:before,
.btn-7:after {
  position: absolute;
  content: "";
  right: 0;
  bottom: 0;
  background-image: linear-gradient(to right top, #26afd4, #00a6e6, #0099f6, #0089ff, #4c73ff);

  box-shadow: -7px -7px 20px 0px rgba(255, 255, 255, .9),
  -4px -4px 5px 0px rgba(255, 255, 255, .9),
  7px 7px 20px 0px rgba(0, 0, 0, .2),
  4px 4px 5px 0px rgba(0, 0, 0, .3);
  transition: all 0.3s ease;
}
/*.btn-7:hover span{*/
/*  color: #c28282;*/
/*}*/
/*.btn-7:before {*/
/*  height: 0%;*/
/*  width: 2px;*/
/*}*/

/*.btn-7:after {*/
/*  width: 0%;*/
/*  height: 2px;*/
/*}*/

/*.btn-7:hover {*/
/*  color: rgba(251, 75, 2, 1);*/
/*  background: transparent;*/
/*}*/

/*.btn-7:hover:before {*/
/*  height: 100%;*/
/*}*/

/*.btn-7:hover:after {*/
/*  width: 100%;*/
/*}*/

/*.btn-7 span:before,*/
/*.btn-7 span:after {*/
/*  position: absolute;*/
/*  content: "";*/
/*  left: 0;*/
/*  top: 0;*/
/*  background-image: linear-gradient(to right top, #26afd4, #00a6e6, #0099f6, #0089ff, #4c73ff);*/
/*  box-shadow: -7px -7px 20px 0px rgba(255, 255, 255, .9),*/
/*  -4px -4px 5px 0px rgba(255, 255, 255, .9),*/
/*  7px 7px 20px 0px rgba(0, 0, 0, .2),*/
/*  4px 4px 5px 0px rgba(0, 0, 0, .3);*/
/*  transition: all 0.3s ease;*/
/*}*/

/*.btn-7 span:before {*/
/*  width: 2px;*/
/*  height: 0%;*/
/*}*/

/*.btn-7 span:after {*/
/*  height: 2px;*/
/*  width: 0%;*/
/*}*/

/*.btn-7 span:hover:before {*/
/*  height: 100%;*/
/*}*/

/*.btn-7 span:hover:after {*/
/*  width: 100%;*/
/*}*/

</style>

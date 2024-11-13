<template>
  <div class="custom-btn" @click="onclick">
    <span>开始探索</span>
  </div>
</template>

<script>
export default {
  name: 'AnimateButton',
  methods: {
    onclick () {
      this.$emit('click', '')
    }
  }
}
</script>

<style scoped>
/*开始探索的按钮*/
.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 8px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 4px;
  text-align: center;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
  7px 7px 20px 0px rgba(0, 0, 0, .1),
  4px 4px 5px 0px rgba(0, 0, 0, .1);
  outline: none;
  z-index: 10;
}

.custom-btn {
  /*background: rgb(247, 150, 192);*/
  /*background: radial-gradient(circle, rgba(247, 150, 192, 1) 0%, rgba(118, 174, 241, 1) 100%);*/
  line-height: 42px;
  padding: 0;
  border: none;
}

.custom-btn span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

.custom-btn::before,
.custom-btn::after {
  position: absolute;
  content: "";
  height: 0%;
  width: 1px;
  box-shadow: -1px -1px 4px 0px rgba(255, 255, 255, 1),
  -4px -4px 5px 0px rgba(255, 255, 255, 1),
  7px 7px 20px 0px rgba(0, 0, 0, .4),
  4px 4px 5px 0px rgba(0, 0, 0, .3);
  z-index: 11;
}

.custom-btn::before {
  right: 0;
  top: 0;
  transition: all 500ms ease;
}

.custom-btn::after {
  left: 0;
  bottom: 0;
  transition: all 500ms ease;
}

.custom-btn:hover {
  background: transparent;
  color: #93bfff;
  box-shadow: none;
}

.custom-btn:hover ::before {
  transition: all 500ms ease;
  height: 100%;
}

.custom-btn:hover ::after {
  transition: all 500ms ease;
  height: 100%;
}

.custom-btn span::before,
.custom-btn span::after {
  position: absolute;
  content: "";
  display: inline-block;
  box-shadow: -1px -1px 20px 0px rgba(255, 255, 255, 1),
  -4px -4px 5px 0px rgba(255, 255, 255, 1),
  7px 7px 20px 0px rgba(0, 0, 0, .4),
  4px 4px 5px 0px rgba(0, 0, 0, .3);
  z-index: 10;
}

.custom-btn::before {
  left: 0;
  top: 0;
  width: 0%;
  height: .5px;
  transition: all 500ms ease;
}

.custom-btn span::after {
  right: 0;
  bottom: 0;
  width: 0%;
  height: .5px;
  transition: all 500ms ease;
}

.custom-btn span:hover ::before {
  width: 100%;
}

.custom-btn span:hover ::after {
  width: 100%;
}
</style>

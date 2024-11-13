<template>
  <svg
    @click="onClick"
    class="svg-icon"
    :style="{
      fontSize: size + 'px',
      width: width + 'px',
      height: height + 'px',
      color: color
    }"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      // svg图标名称
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'rgb(246,248,255)'
    },
    size: {
      // svg尺寸
      type: [Number, String]
    },
    width: {
      // svg宽度
      type: [Number, String]
    },
    height: {
      // svg高度
      type: [Number, String]
    }
  },
  data () {
    return {}
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.icon}`
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

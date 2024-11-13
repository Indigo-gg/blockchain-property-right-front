<template>
  <div id="Ripple-container" :style="estyle">
  </div>
</template>

<script>
import { Liquid, measureTextWidth } from '@antv/g2plot'

export default {
  name: 'Ripple',
  props: {
    edata: {
      type: [String, Number],
      required: true
    },
    estyle: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      liquidPlot: {}
    }
  },
  methods: {
    init () {
      const options = {
        percent: 0.01,
        radius: 0.8,
        statistic: {
          title: {
            formatter: () => '藏品所有权',
            style: ({ percent }) => ({
              fill: percent > 0.6 ? 'white' : 'rgba(184,189,199,0.85)'
            })
          },
          content: {
            style: ({ percent }) => ({
              fontSize: 60,
              lineHeight: 1,
              fill: percent > 0.6 ? 'white' : 'rgba(203,210,218,0.85)'
            }),
            customHtml: (container, view, { percent }) => {
              const { width, height } = container.getBoundingClientRect()
              const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
              const text = `持有比 ${(percent * 100).toFixed(0)}%`
              const textWidth = measureTextWidth(text, { fontSize: 60 })
              const scale = Math.min(d / textWidth, 1)
              return `<div style='width:${d}px;display:flex;align-items:center;color:#FFFFFF;justify-content:center;font-size:${scale}em;line-height:${
                scale <= 1 ? 1 : 'inherit'
              }'>${text}</div>`
            }
          }
        },
        liquidStyle: ({ percent }) => {
          return {
            fill: percent > 0.4 ? '#5B8FF9' : '#FAAD14',
            stroke: percent > 0.4 ? '#5B8FF9' : '#FAAD14'
          }
        },
        color: () => '#5B8FF9'
      }
      this.liquidPlot = new Liquid(document.getElementById('Ripple-container'), options)
      this.liquidPlot.render()
      this.addAnimation()
    },
    reloadData () {
      console.log('我要加载我的数据了', this.edata)
      this.init()
    },
    addAnimation () {
      let data = 0
      const interval = setInterval(() => {
        data += 0.01
        if (data > this.edata) {
          this.liquidPlot.changeData(data)
          clearInterval(interval)
        } else {
          this.liquidPlot.changeData(data)
        }
      }, 30)
    }
  },
  mounted () {
   this.reloadData()
  }
}
</script>

<style scoped lang='less'>

</style>

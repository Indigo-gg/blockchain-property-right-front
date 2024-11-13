<template>
  <div id="container" :style="estyle">
  </div>
</template>

<script>
import { Radar } from '@antv/g2plot'
export default {
  name: 'Radar',
  props: {
    estyle: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      radarPlot: {}
    }
  },
  methods: {
    init () {
      const data = [
        {
          'item': '用户信誉',
          'user': '我',
          'score': 70
        },
        {
          'item': '平台活跃',
          'user': '我',
          'score': 60
        },
        {
          'item': '财富储值',
          'user': '我',
          'score': 50
        },
        {
          'item': '权益保障',
          'user': '我',
          'score': 40
        },
        {
          'item': '藏品累积',
          'user': '我',
          'score': 60
        }
      ]
      const radarPlot = new Radar('container', {
        data,
        xField: 'item',
        yField: 'score',
        seriesField: 'user',
        meta: {
          score: {
            alias: '分数',
            min: 0,
            max: 80
          }
        },
        xAxis: {
          line: null,
          tickLine: null,
          grid: {
            line: {
              style: {
                lineDash: null
              }
            }
          }
        },
        // 开启面积
        area: {},
        // 开启辅助点
        point: {
          size: 2
        }
      })
      radarPlot.render()
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped lang='less'>

</style>

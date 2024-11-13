<template>
  <div id="barChart"></div>
</template>

<script>
import {Bar} from '@antv/g2plot'
// import { pageConfig } from '@/views/config/config'
// import * as moment from '_moment@2.29.4@moment'

export default {
  name: 'Bar',
  data () {
    return {}

  },
  methods: {
    init () {
      const data = this.getRightSaleData()
      const stackedBarPlot = new Bar('barChart', {
        data: data.reverse(),
        isStack: true,
        xField: 'counts',
        yField: 'time',
        seriesField: 'type',
        label: {
          // 可手动配置 label 数据标签位置
          position: 'middle', // 'left', 'middle', 'right'
          // 可配置附加的布局方法
          layout: [
            // 柱形图数据标签位置自动调整
            { type: 'interval-adjust-position' },
            // 数据标签防遮挡
            { type: 'interval-hide-overlap' },
            // 数据标签文颜色自动调整
            { type: 'adjust-color' }
          ]
        },
        legend: {
          // position: 'top-left',
          itemName: {
            style: { fill: '#fff' }
          },
          itemValue: {
            style: { fill: '#fff' }
          }
        }
      })
      stackedBarPlot.render()
    },
    render () {
      setTimeout(() => {
        this.$nextTick(() => {
          this.init()
        })
      }, 100)
    },
    /**
     * 临时函数仅做demo用
     * @returns {*[]}
     */
    getRightSaleData () {
      const startDate = '2022-12-1'
      const endDate = '2023-5-1'
      const daysList = []
      let start = this.$moment(startDate)
      const end = this.$moment(endDate)
      const month = end.diff(start, 'months')

      daysList.push(
        {
          time: start.format('M月'),
          counts: Math.round(Math.random() * 10 + 1),
          // useCounts:Math.round(Math.random() * 15+3)
          type: '使用权交易量'
        })
      for (let i = 1; i <= month; i++) {
        daysList.push(
          {
            time: start.add(1, 'months').format('M月'),
            counts: Math.round(Math.random() * 10 + 1),
            type: '使用权交易量'
            // useCounts:Math.round(Math.random() * 15+3)
          })
      }


      start = this.$moment(startDate)
      daysList.push(
        {
          time: start.format('M月'),
          counts: Math.round(Math.random() * 10 + 1),
          // useCounts:Math.round(Math.random() * 15+3)
          type: '所有权交易量'
        })
      for (let i = 1; i <= month; i++) {
        daysList.push(
          {
            time: start.add(1, 'months').format('M月'),
            counts: Math.round(Math.random() * 10 + 1),
            type: '所有权交易量'
            // useCounts:Math.round(Math.random() * 15+3)
          })
      }
      return daysList
    }
  }
}
</script>

<style scoped>

</style>

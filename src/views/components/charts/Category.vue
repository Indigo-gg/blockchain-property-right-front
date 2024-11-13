<template>
  <div id="visual-rect" style="width:100%;height:400px;"></div>
</template>

<script>
import * as echarts from 'echarts'
// import { showTrend } from '@/api/audit'

export default {
  name: 'Category',
  data() {
    return {
      indicator: [],
      values: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      // showTrend().then(res => {
      // TODO:设置数据源
      let res = {}
      console.log('类别数据', res)
      for (var i = 0; i < 7; i++) {
        this.values[i] = res.data[i].num
      }
      // var max = Math.max(this.values)
      // // console.log(max)
      const temp = res.data.map((item) => {
        return {
          name: item.categoryName,
          max: 50
        }
      })
      this.indicator = temp
      console.log(this.values)
      // this.values = valueOfNum
      this.setCharts()
      // })
    },
    setCharts() {
      // 点击事件触发
      setTimeout(() => {
        // 延时加载echarts 初始化函数
        this.initDom()
      }, 100)
    },
    initDom() {
      var chartDom = document.getElementById('visual-rect')
      var myChart = echarts.init(chartDom)
      this.setOption(myChart)
    },
    setOption(myChart) {
      var option = {
        tooltip: {
          trigger: 'item'
        },
        radar: {
          // shape: 'circle',
          indicator: this.indicator
        },
        series: [
          {
            name: '艺术品交易趋势',
            type: 'radar',
            data: [
              {
                // value: [4200, 3000, 4200, 4200, 4200, 4200],
                value: this.values,
                name: 'Allocated Budget'
              }
            ]
          }
        ]
      }
      option && myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  }
}
</script>

<style scoped>

</style>

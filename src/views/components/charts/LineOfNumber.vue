<template>
  <div id="visual-line" style="width: 100%;height: 400px"></div>
</template>

<script>
import * as echarts from 'echarts'
// import { showTrend2 } from '@/api/audit'
export default {
  name: 'LineOfNumber',
  data() {
    return {
      category: [],
      data: []
    }
  },
  mounted() {
    this.getDay(-1)
    this.getData()
  },
  methods: {
    getDay(day) {
      var today = new Date()
      // eslint-disable-next-line camelcase
      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
      today.setTime(targetday_milliseconds) // 注意，这行是关键代码
      // var tYear = today.getFullYear()
      var tMonth = today.getMonth()
      var tDate = today.getDate()
      tMonth = this.doHandleMonth(tMonth + 1)
      tDate = this.doHandleMonth(tDate)
      return tMonth + '-' + tDate
    },
    doHandleMonth(month) {
      var m = month
      if (month.toString().length === 1) {
        m = '0' + month
      }
      return m
    },
    getData() {
      // showTrend2().then(res => {
      // TODO:设置数据源
      let res = {}
      console.log('showTrend2', res)
      this.data = []
      if (res.code === 0) {
        this.category = Object.keys(res.data[0])
        console.log('category', this.category)
        var temp = []
        for (let j = 0; j < this.category.length; j++) {
          for (let i = 0; i < 7; i++) {
            temp[i] = res.data[i][this.category[j]]
          }
          temp = temp.reverse()
          console.log('temp', temp)
          this.data.push({
            name: this.category[j],
            type: 'line',
            stack: 'Total',
            data: temp
          })
          temp = []
        }
        console.log('datadata', this.data)
      }
      this.$nextTick(() => {
        this.setCharts()
      })
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
      var chartDom = document.getElementById('visual-line')
      var myChart = echarts.init(chartDom)
      this.setOption(myChart)
    },
    setOption(myChart) {
      var option = {
        // title: {
        //   text: 'Stacked Line'
        // },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.category
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [this.getDay(-6), this.getDay(-5), this.getDay(-4), this.getDay(-3), this.getDay(-2), this.getDay(-1), this.getDay(0)]
          // data: [this.getDay(0), this.getDay(-1), this.getDay(-2), this.getDay(-3), this.getDay(-4), this.getDay(-5), this.getDay(-6)]
        },
        yAxis: {
          type: 'value'
        },
        series: this.data
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

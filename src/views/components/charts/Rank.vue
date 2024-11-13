<template>
  <div id="visual-rank" style="width: 100%;height: 400px"></div>
</template>

<script>
import * as echarts from 'echarts'
// import { showTrend2 } from '@/api/audit'
export default {
  name: 'Rank',
  data() {
    return {
      category: [],
      dataList: [],
      current: 0
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      // showTrend2().then(res => {
      // TODO:设置数据源
      let res = {}
      this.category = Object.keys(res.data[0])
      console.log('动态数据', res)
      this.dataList = res.data
      // console.log(this.dataList)
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
      var chartDom = document.getElementById('visual-rank')
      var myChart = echarts.init(chartDom)
      this.setOption(myChart, this.dataList)
    },
    setOption(myChart, Val) {
      var current = 0
      var data = Object.values(Val[current])
      console.log('数据', data)
      var option = {
        xAxis: {
          max: 'dataMax'
        },
        yAxis: {
          type: 'category',
          data: this.category,
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          max: 5 // only the largest 3 bars will be displayed
        },
        series: [
          {
            realtimeSort: true,
            // name: 'X',
            type: 'bar',
            data: data,
            label: {
              show: true,
              position: 'right',
              valueAnimation: true
            },
            itemStyle: {
              color: function (params) { // 标签国家字体颜色
                var colorarrays = ['#6bc0fb', '#7fec9d', '#fedd8b', '#ffa597', '#84e4dd', '#749f83',
                  '#ca8622', '#bda29a', '#a8d8ea', '#aa96da', '#fcbad3', '#ffffd2',
                  '#f38181', '#fce38a', '#eaffd0', '#95e1d3', '#e3fdfd', '#749f83', '#ca8622',
                  '#6bc0fb', '#7fec9d', '#fedd8b', '#ffa597', '#84e4dd', '#749f83',
                  '#ca8622', '#bda29a', '#a8d8ea', '#aa96da', '#fcbad3', '#ffffd2',
                  '#f38181', '#fce38a', '#eaffd0', '#95e1d3', '#e3fdfd', '#749f83', '#ca8622'
                ]
                // return colorarrays[Math.ceil(Math.random()*10)];
                return colorarrays[params.dataIndex]
              }
            }
          }
        ],
        legend: {
          show: true
        },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
      }

      function run() {
        console.log(Val[current])
        data = Object.values(Val[current++])
        if (current + 1 === Val.length) {
          current = 0
        }
        myChart.setOption({
          series: [
            {
              type: 'bar',
              data
            }
          ]
        })
      }

      setTimeout(function () {
        run()
      }, 0)
      setInterval(function () {
        run()
      }, 3000)
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

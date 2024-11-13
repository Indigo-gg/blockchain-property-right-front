<template>
  <div id="visual-price" style="width: 100%;height: 400px"></div>
</template>

<script>
import * as echarts from 'echarts'
// import { showTrend5 } from '@/api/audit'
export default {
  name: 'Price',
  data() {
    return {
      category: [],
      data: []
    }
  },
  mounted() {
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
      // showTrend5().then(res => {
      // TODO:设置数据源
      console.log('res', res)
      this.category = Object.keys(res.data[0])
      // // console.log(this.category)
      var current = 0
      for (var i = 0; i < 7; i++) {
        for (var j = 0; j < this.category.length; j++) {
          this.data[current++] = [j, 6 - i, res.data[i][this.category[j]]]
          console.log('类别' + j, '天数' + i, res.data[i][this.category[j]])
        }
      }
      this.data = this.data.reverse()
      // // console.log(temp)
      // this.setCharts()
      console.log('this.data', this.data)
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
      var chartDom = document.getElementById('visual-price')
      var myChart = echarts.init(chartDom)
      this.setOption(myChart)
    },
    setOption(myChart) {
      // x轴数据
      const hours = this.category
      const days = [this.getDay(-6), this.getDay(-5), this.getDay(-4), this.getDay(-3), this.getDay(-2), this.getDay(-1), this.getDay(0)]
      // const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      const data = this.data
      // console.log(data)
      var option = {
        color: ['#7b8ed3', '#acd68d', '#ea8484', '#98cde6', '#70b58c', '#f69c71'],
        // title: {
        //   text: 'Punch Card of Github'
        // },
        legend: {
          data: ['Punch Card'],
          left: 'right'
        },
        tooltip: {
          position: 'top',
          formatter: function (params) {
            return (
              days[params.value[1]] +
              ' 新发布 ' +
              params.value[2] +
              ' 幅 ' + hours[params.value[0]] + '艺术品'
            )
          }
        },
        grid: {
          left: 2,
          bottom: 10,
          right: 10,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: hours,
          boundaryGap: false,
          splitLine: {
            show: true
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: days,
          axisLine: {
            show: false
          }
        },
        series: [
          {
            colorBy: [],
            // name: 'Punch Card',
            type: 'scatter',
            symbolSize: function (val) {
              if (val[2] > 0 && val[2] < 5) {
                return 10
              }
              return val[2] * 3.2
            },
            data: data,
            // itemStyle: {
            //   normal: {
            //     color: function (params) {
            //       // 定制显示（按顺序）
            //       // eslint-disable-next-line standard/array-bracket-even-spacing
            //       var colorList = ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB' ]
            //       return colorList[params.dataIndex]
            //     },
            //     opacity: 1,
            //     barBorderRadius: 5
            //   }
            // },
            animationDelay: function (idx) {
              return idx * 5
            }
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

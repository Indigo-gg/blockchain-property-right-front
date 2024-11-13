<template>
  <div id="visual-pie" style="width: 100%;height: 400px"></div>
</template>

<script>
import * as echarts from 'echarts'
// import { showTrend3 } from '@/api/audit'
export default {
  name: 'Pie',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      // showTrend3().then(res => {
      // // console.log('类别数量', res)
      // TODO:设置数据源
      this.list = res.data.map((item) => {
        return {
          value: item.num,
          name: item.type
        }
      })
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
      var chartDom = document.getElementById('visual-pie')
      var myChart = echarts.init(chartDom)
      this.setOption(myChart)
    },
    setOption(myChart) {
      var option = {
        legend: {
          top: 'bottom'
        },
        tooltip: {
          trigger: 'item'
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: true },
        //     restore: { show: false },
        //     saveAsImage: { show: true }
        //   }
        // },
        series: [
          {
            name: '平台各艺术品占比',
            type: 'pie',
            radius: [20, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 6
            },
            data: this.list
            // data: [
            //   { value: 40, name: 'rose 1' },
            //   { value: 38, name: 'rose 2' },
            //   { value: 32, name: 'rose 3' },
            //   { value: 30, name: 'rose 4' },
            //   { value: 28, name: 'rose 5' },
            //   { value: 26, name: 'rose 6' },
            //   { value: 22, name: 'rose 7' },
            //   { value: 18, name: 'rose 8' }
            // ]
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

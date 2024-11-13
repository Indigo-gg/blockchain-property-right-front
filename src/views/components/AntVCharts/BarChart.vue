<template>
  <div id="BarChart" :style="estyle">

  </div>
</template>

<script>
import {Bar} from '@antv/g2plot'

export default {
  name: 'BarChart',
  props: {
    estyle: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      BarChart: {},
      datas: []
    }
  },
  methods: {
    init() {
      const option = {
        data: this.datas,
        xField: 'contribution',
        yField: 'name',
        seriesField: 'name',
        legend: {
          position: 'top-left',
          itemName: {
            style: {fill: '#fff'}
          }
        }
      }
      this.BarChart = new Bar('BarChart', option)
      this.BarChart.render()
    },
    renderData(data) {
      this.datas = []
      const temp = []
      console.log(data)
      data.forEach(item => {
        const {username, contribution} = item
        temp.push({name: username, contribution: contribution})
      })
      this.datas = temp
      this.init()
    }
  },
  mounted() {
    // this.init()
  }
}
</script>

<style scoped lang='less'>

</style>

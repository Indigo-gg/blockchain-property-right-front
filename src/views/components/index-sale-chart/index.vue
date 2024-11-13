<template>
  <div>
    <div ref="indexSale" :style="`height:${$props.height}`"></div>

  </div>
</template>

<script>
import { Chart } from '@antv/g2'
// import { Line } from '@antv/g2plot';
import { pageConfig } from '@/views/config/config'

export default {
  name: 'Index',
  props: ['height'],
  methods: {
   render () {
     const tagOption = pageConfig.artworkTags
     let data = []
     tagOption.forEach(tag => {
       data = data.concat(pageConfig.getTagSaleData(tag.text, tag.value))
     })
     const chart = new Chart({
       container: this.$refs.indexSale,
       theme: 'classic',
       autoFit: true
       // padding: [20, 0, 20, 0], // 上，右，下，左
     })


     console.log('chartData', data)
     chart.data(data)
     chart.scale('time', {
       type: 'time'
     })
     chart.scale('counts', {
       nice: true
     })

     chart.tooltip({
       showCrosshairs: true,
       shared: true
     })
     chart.axis('counts', {
       // title:{
       title: {
         text: '交易量',
         style: { fill: '#fff' }
       },
       label: {
         style: { fill: '#fff' }
       },
       position: 'left'
       // }

     })
     chart.axis('time', {
       // title:{
       title: {
         text: '日期',
         style: { fill: '#fff' }
       },
       label: {
         style: { fill: '#fff' }
       }


     })

     chart
       .area()
       .adjust('stack')
       .position('time*counts')
       .color('tag')
       .shape('smooth')

     chart
       .line()
       .adjust('stack')
       .position('time*counts')
       .color('tag')
       .shape('smooth')

     chart.interaction('element-highlight')
     chart.legend('tag', {
       itemName: {
         style: { fill: '#fff' }
       }
     })

     chart.render()
   }
  },
  mounted () {
    // console.log('近三个月时间', pageConfig.getSaleData())
    // const line = new Line(this.$refs.indexSale, {
    //   data:pageConfig.getSaleData(),
    //   xField: 'time',
    //   yField: 'counts',
    //   xAxis: {
    //     // type: 'timeCat',
    //     tickCount: 5,
    //   },
    // });
    // line.render()

    // chart.scale({
    //   time: {
    //     tickCount: 10
    //   },
    //   counts: {
    //     nice: true,
    //   }
    // });
    // chart.data(pageConfig.getSaleData())
    // chart.line().position('time*counts');
    // chart
    //   .line()
    // .encode('x', 'time')
    // .encode('y', 'counts')
    // .encode('color', '#9ae4b4')
    // .axis('y', {title: '交易次数'})
    // .axis('x', {
    //   title:{position:'end',text:'日期'} ,
    // })
    // .tooltip({
    //   items: [
    //     (d, index, data, column) => ({
    //       name: '交易次数', // 指定 item 的名字
    //       value: column.y.value[index], // 使用 y 通道的值
    //     }),
    //   ],
    // })

    // chart.interaction('tooltip', {
    //   render: () => `<div>交易量</div>`,
    // });

    //   range: ['05-05'],
    // });
    //   .axis('x', {
    //   tickLine: {
    //     length: 4,
    //     stroke: '#e8e8e8',
    //     lineWidth: 1
    //   },
    //   label: {
    //     textAlign: 'end',//改变横坐标的显示位置，可以设置start或者end
    //     textBaseline: 'middle',
    //     fontSize:'13',//横坐标字号
    //     rotate: -Math.PI / 3 //倾斜角度
    //
    //     //Math.PI / 2 纵坐标垂直显示
    //     //Math.PI / 3 和-Math.PI / 3都是倾斜显示，只是方向相反
    //     //如果是Math.PI / 3 正向的就设置textAlign: 'start'
    //     //如果是-Math.PI / 3 反向的就设置textAlign: 'end'
    //   }
    // })


    // chart.render();
  }
}
</script>

<style scoped>

</style>

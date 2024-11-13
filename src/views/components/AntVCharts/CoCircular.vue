<!--基于G2Plot的协作者贡献比环形图-->
<template>
  <div id="circular" :style="boxStyle">
  </div>
</template>
<script>
import { Pie, measureTextWidth } from '@antv/g2plot'
// import { RenderPicture } from '@/api/modules/file'

export default {
  name: 'Circular',
  props: {
    coData: {
      type: Array,
      required: true
    },
    boxStyle: {
      type: String
    }
  },
  data () {
    return {
      config: {},
      datas: [],
      pieplot: undefined
    }
  },
  methods: {
    sortAuthors (authors) {
      //  对数据进行排序
      const data = []
      authors.sort((a, b) => {
        return b.contribution - a.contribution
      })
      authors.forEach((item, index) => {
        data.push({
          type: index === 0 ? '主创者' : `协作者${index}`,
          value: item.contribution ,
          ...item
        })
      })
      return data
    },
    renderStatistic (containerWidth, text, style) {
      const textWidth = measureTextWidth(text, style)
      const textHeight = style.lineHeight || style.fontSize
      const R = containerWidth / 2
      let scale = 1
      if (containerWidth < textWidth) {
        scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1)
      }
      const textStyleStr = `width:${containerWidth}px;`
      return `<div style='${textStyleStr};font-size:${scale}em;color:#fff;line-height:${scale < 1 ? 1 : 'inherit'};'>${text}</div>`
    },
    init (data) {
      const _this = this
      this.piePlot = new Pie('circular', {
        appendPadding: 10,
        data: data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.5,
        meta: {
          type: {
            alias: '角色'
          },
          value: {
            alias: '贡献度',
            formatter: (v) => `${v} %`
          },
          username: {
            alias: '创作者'
          }
        },
        label: {
          type: 'inner',
          offset:
            '-50%',
          style:
            {
              textAlign: 'center',
              fontSize:
                '20'
            },
          autoRotate: true,
          content:
            '{value}'
        },
        statistic: {
          title: {
            offsetY: -4,
            customHtml:
              (container, view, datum) => {
                console.log('当前所选数title', datum)
                const { width, height } = container.getBoundingClientRect()
                const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))
                const text = datum ? datum.username : '总计'
                return _this.renderStatistic(d, text, { fontSize: 32 })
              }
          },
          content: {
            offsetY: 4,
            style:
              {
                fontSize: '32px'
              },
            customHtml: (container, view, datum, data) => {
              console.log('当前所选数content', datum)
              const { width } = container.getBoundingClientRect()
              const text = datum ? `${datum.value} %` : `${data.reduce((r, d) => r + d.value, 0)}%`
              console.log('当前选择到的作者', text)
              return _this.renderStatistic(width, text, {fontSize: 20})
            }
          }
        },
        tooltip: {
          title: 'type',
          fields: ['username', 'type', 'value']
        },
        legend: {
          // position: 'top-left',
          itemName: {
            style: {fill: '#fff'}
          },
          itemValue: {
            style: {fill: '#fff'}
          }
        },
        // 添加 中心统计文本 交互
        interactions: [{type: 'element-selected'}, {type: 'element-active'}, {type: 'pie-statistic-active'}, {type: 'tooltip'}, {type: 'pie-legend-active'}]
      })
      this.piePlot.render()
    },
    loadChart (author) {
      const data = this.sortAuthors(author)
      this.piePlot.changeData(data)
    }
  },
  mounted () {
    console.log(this.coData)
    this.init(this.sortAuthors(this.coData))
  },
  watch: {
    cooperates (newVal) {
      console.log('数据更新啦！', newVal)
      this.pieplot.changeData(newVal)
    }
  }
}
</script>

<style scoped>

</style>

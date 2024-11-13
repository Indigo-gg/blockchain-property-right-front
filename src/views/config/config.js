import * as moment from 'moment'

const indexConfig = {
  sorts: {
    hot: {
      title: '版权艺术品',
      titleEng: 'ART RIGHT',
      color: '#e19bef'

    },
    latest: {
      title: '热榜艺术品',
      titleEng: 'ART HOT',
      color: '#f5afa5'
    },
    saleChart: {
      title: '交易趋势图',
      titleEng: 'SALE TREND',
      color: '#b6c5f1'
    },
    publicize: {
      title: '数字作品公示区',
      titleEng: 'Publicity area',
      color: '#89f3da',
      pubTip: '更多公示',
      refreshTime: 5000
    },
    recommend: {
      title: '精选艺术品'
    }
  }
}
const pageConfig = {
  loadingTime: 100,
  pubFreshTime: 100,
  // 展馆最大数量
  workSum: 20,
  getTagSaleData: (tag, key) => {
    const startDate = '2023-5-10'
    const endDate = '2023-5-25'
    const tagList = []
    const start = moment(startDate)
    const end = moment(endDate)
    const day = end.diff(start, 'days')
    tagList.push(
      {
        tag: tag,
        time: start.format('YYYY-MM-DD'),
        counts: Math.round(Math.random() * 5 * key + 1)
      })
    for (let i = 1; i <= day; i++) {
      tagList.push(
        {
          tag: tag,
          time: start.add(1, 'days').format('YYYY-MM-DD'),
          counts: Math.round(Math.random() * 5 * key + 1)
        })
    }
    return tagList
  },
  getTag: (type) => {
    const tagColors = ['cyan', 'orange', 'blue', 'red', 'purple', 'green', 'green', 'green']
    const tagText = ['审核中', '已退回', '公示中', '举报处理中', '已上链', '使用权在售', '所有权在售', '发售中']
    return {
      color: tagColors[type - 1],
      text: tagText[type - 1]
    }
  },
  // 更新页数
  updateArtParams: (artworkParams, total) => {
    if (artworkParams.pageSize * artworkParams.pageNumber < total) {
      artworkParams.pageNumber++
    } else {
      artworkParams.pageNumber = 1
    }
  },
  rightStatus: {
    myCreate: 0,
    myBuyOwn: 1,
    myBuyUse: 2
  },
  status: {
    // 1-待审核 2-退回 3-审核通过(进入公示)
    examine: 1,
    rejected: 2,
    publicize: 3,
    // 4-公示被举报再次审核(公示举报受理中)
    report: 4,
    // 5-公示成功上链
    onChain: 5,
    // 6-发布售卖
    onSale: 6,
    // 7-售卖被举报打入黑洞
    intoHall: 7
  },
  // TODO 标签颜色待更改
  renderArtworkTag: (tag) => {
    const color = 'rgba(179,189,232,0.76)'
    const text = ['全部', '机械', '建筑', '动物', '花草树木', '人物', '气象', '风景', '宇宙', '赛博朋克', '水墨画', '星空', '二次元']
    return { color: color, text: text[tag] }
  },
  artworkTags: [{ text: '机械', value: 1 },
    { text: '建筑', value: 2 },
    { text: '动物', value: 3 }, {
      text: '花草树木',
      value: 4
    }, { text: '人物', value: 5 }, { text: '气象', value: 6 }, { text: '风景', value: 7 }, {
      text: '宇宙',
      value: 8
    }, { text: '赛博朋克', value: 9 }, { text: '水星', value: 10 },
    { text: '星空', value: 11 }, { text: '二次元', value: 12 }]
}
const indexs = ['-1', '0', '1', '2', '3']
const cerColor = ['cyan', 'orange', 'blue', 'red', 'purple']

const types = ['所有证书', '著作权证书', '使用权证书', '所有权证书', '证据证书']
const typeName = ['create', 'use', 'own', 'evi']

export function getCerTypeById (id) {
  for (let i = 0; i < indexs.length; i++) {
    if (indexs[i] === id) {
      return {
        color: cerColor[i],
        name: types[i]
      }
    }
  }
}

const certificateConfig = {
  indexs: indexs,
  getTab (type) {
    for (let i = 0; i < indexs.length; i++) {
      if (indexs[i] === type) {
        return types[i]
      }
    }
  },
  getPicType (type) {
    const t = parseInt(type)
    return typeName[t]
  },
  L_logo: 'http://blockchain.maplesky.cn/StaticResource/Certificate/a_logo.png',
  zhang: 'http://blockchain.maplesky.cn/StaticResource/Certificate/coco.png',
  user: {
    type: '4',
    height: '700px',
    width: '496px',
    paddingSHU: '120px',
    paddingHENG: '60px',
    // src: require('@/assets/certificate/z_1.png'),
    src: 'http://blockchain.maplesky.cn/StaticResource/Certificate/z_1.png',
    title: '用户虚拟身份认证'
  },
  create: {
    type: '0',
    height: '700px',
    width: '496px',
    paddingSHU: '90px',
    paddingHENG: '50px',
    // src: require('@/assets/certificate/z_4.png'),
    src: 'http://blockchain.maplesky.cn/StaticResource/Certificate/z_4.png',
    title: '艺术品著作权证书'
  },
  use: {
    type: '1',
    height: '700px',
    width: '496px',
    paddingSHU: '90px',
    paddingHENG: '60px',
    // src: require('@/assets/certificate/z_3.png'),
    src: 'http://blockchain.maplesky.cn/StaticResource/Certificate/z_3.png',
    title: '艺术品使用权证书'
  },
  own: {
    type: '2',
    height: '700px',
    width: '496px',
    paddingSHU: '90px',
    fontSize: '14px',
    signFontSize: '9px',
    paddingHENG: '60px',
    // src: require('@/assets/certificate/z_5.png'),
    src: 'http://blockchain.maplesky.cn/StaticResource/Certificate/z_5.png',
    title: '艺术品所有权证书'
  },
  evi: {
    type: '3',
    height: '800px',
    width: '580px',
    paddingSHU: '120px',
    paddingHENG: '90px',
    // src: require('@/assets/certificate/z_2.png'),
    src: 'http://blockchain.maplesky.cn/StaticResource/Certificate/z_2.png',
    title: '艺术品维权证书'
  }
}

const traceNodeConfig = {
  status: ['作品上链', '发售使用权', '发售所有权', '使用权库存增发', '所有权份额增发', '调整使用权价格', '调整所有权价格', '使用权交易', '所有权交易', '作品冻结'],
  renderTag: (i) => {
    const key = parseInt(i)
    const tagColor = ['cyan', 'blue', 'blue', 'orange', 'orange', 'orange', 'orange', 'purple', 'pink', 'red']
    return {
      text: traceNodeConfig.status[key - 1],
      color: tagColor[key - 1]
    }
  }
}


export { indexConfig, pageConfig, certificateConfig, traceNodeConfig }

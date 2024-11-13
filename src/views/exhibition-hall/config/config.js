
const commonColor='#fff'
const listConfig=[
  {
    x:0,
    y:0
  },
  {
    x:0,
    y:0
  },
  {
    x:0,
    y: 0
  },
  {
    x: -40,
    y: 150
  },
  {
    x: -40,
    y: 205
  },
  // {
  //   x:0,
  //   y:880
  // },
  // {
  //   x:0,
  //   y:60
  // }
]
const colors={
  //画布颜色
  clearColor: '#000',
  commonLightColor: '#fff',
  yellow: 'yellow',
  red: 'red',
  white: '#ffffff',
  green: 'green',
  dark: '#ffffff',
}
const home={
  size: {
    x: 1000,
    y: 500,
    z: 1000
  },
  padding: 200,
  position: {
    x: 0,
    y: 50,
    z: 0
  },
}
const border= {
  maxNumber: 100,
  size: {
    width: 40,
    height: 30,
    depth: 5,
  },
  bgSize: {
    height: 10,
    width: 45,
    depth: 10
  },
  color: '#ffffff'
}
const plane={
  position:{
    x:0,
    y:0.1,
    z:0
  },
}

const light={
  commonColor:commonColor,
  directionalLight:{
    position:{
      x:30,
      y:30,
      z:30
    },
    color:commonColor
  },
  ambientLight:{
    color:commonColor,
    intensity:0.3
  },
  pointLight:{
    intensity:2,
    position:{
      x:0,
      y:30,
      z:0
    },
    color: colors.white
  }

}
const textures= {
  moon: 'http://blockchain.maplesky.cn/StaticResource/Show/foot.png',
  star: 'http://blockchain.maplesky.cn/StaticResource/Show/star_2.jpg',
  star2: 'http://blockchain.maplesky.cn/StaticResource/Show/star_3.jpg',
  diban: 'http://blockchain.maplesky.cn/StaticResource/Show/diban.jpeg',
  grassLand: 'texture/green-land.jpg',
  // grassCartoon: 'texture/greenland-1.jpeg',
  // grassCartoon2: 'texture/greenland-2.png',
  // grassSky: 'texture/greenSky.jpg',
  lakeSky: 'http://blockchain.maplesky.cn/StaticResource/Show/lake-sky.jpg',
  floor1: 'http://blockchain.maplesky.cn/StaticResource/Show/floor_1.png',
  white_1: 'http://blockchain.maplesky.cn/StaticResource/Show/whiteTai.jpg',
  // white_2: 'texture/white_2.jpg',
  // white_3: 'texture/white_3.jpg',
  white_top: 'http://blockchain.maplesky.cn/StaticResource/Show/white_top.png',
  white_denguang: 'http://blockchain.maplesky.cn/StaticResource/Show/dengguang_white.png',
  white_zhuzi: 'http://blockchain.maplesky.cn/StaticResource/Show/litizhuzi.png',
  taizi_white: 'http://blockchain.maplesky.cn/StaticResource/Show/taizi_white.jpg',
  zhuzi_white2: 'http://blockchain.maplesky.cn/StaticResource/Show/zhuzi_2.jpg',
  zhuzi_white3: 'http://blockchain.maplesky.cn/StaticResource/Show/zhuzi_3.jpg',
  logo: 'http://blockchain.maplesky.cn/StaticResource/Show/logo_l.png',
  // grass6:'texture/sea-train.jpg'
}


/**
 * texture:第三个是顶部
 * @type {[{cover: *, border: {maxNumber: number, size: {depth: number, width: number, height: number}, color: string, bgSize: {depth: number, width: number, height: number}}, mouse: string, clearColor: string, textures: (string)[], light: {commonColor: string, directionalLight: {color: string, position: {x: number, y: number, z: number}}, ambientLight: {intensity: number, color: string}, pointLight: {intensity: number, color: string, position: {x: number, y: number, z: number}}} & {ambientLight: {intensity: number, color: string}}, name: string, artworkArea: number, boxNumber: number, type: number, floor: string, pointLight: {intensity: number, color: string, position: {x: number, y: number, z: number}}},{cover: *, border: {maxNumber: number, size: {depth: number, width: number, height: number}, color: string, bgSize: {depth: number, width: number, height: number}}, mouse: string, clearColor: string, textures: (string)[], light: {commonColor: string, directionalLight: {color: string, position: {x: number, y: number, z: number}}, ambientLight: {intensity: number, color: string}, pointLight: {intensity: number, color: string, position: {x: number, y: number, z: number}}} & {ambientLight: {intensity: number, color: string}}, name: string, artworkArea: number, boxNumber: number, type: number, floor: string, pointLight: {intensity: number, color: string, position: {x: number, y: number, z: number}}},{cover: *, border: {maxNumber: number, size: {depth: number, width: number, height: number}, color: string, bgSize: {depth: number, width: number, height: number}}, mouse: string, clearColor: string, textures: string[], light: {commonColor: string, directionalLight: {color: string, position: {x: number, y: number, z: number}}, ambientLight: {intensity: number, color: string}, pointLight: {intensity: number, color: string, position: {x: number, y: number, z: number}}}, name: string, artworkArea: number, boxNumber: number, type: number, floor: string},{cover: *, border: {maxNumber: number, size: {depth: number, width: number, height: number}, color: string, bgSize: {depth: number, width: number, height: number}}, mouse: string, clearColor: string, textures: string[], light: {commonColor: string, directionalLight: {color: string, position: {x: number, y: number, z: number}}, ambientLight: {intensity: number, color: string}, pointLight: {intensity: number, color: string, position: {x: number, y: number, z: number}}}, name: string, artworkArea: number, boxNumber: number, type: number, floor: string}]}
 */
const hallOptions=[
  {
    name: '星空馆',
    type: 0,
    // cover: require('@/assets/images/hall/house_0.png'),
    cover: 'http://blockchain.maplesky.cn/StaticResource/Show/house_0.png',
    artworkArea: 0.6,
    textures: [
      textures.star,
      textures.star,
      textures.star2,
      textures.star,
      textures.star,
      textures.star,
    ],
    floor: textures.diban,
    light: Object.assign(light, {
      ambientLight: {
        color: commonColor,
        intensity: 0.6
      },
    }),
    pointLight: light.pointLight,
    border: border,
    clearColor: '#000',
    boxNumber: 100,
    mouse: textures.moon
  },
  {
    name: '白色展厅',
    // cover: require('@/assets/images/hall/house_1.png'),
    cover: 'http://blockchain.maplesky.cn/StaticResource/Show/house_1.png',

    type: 1,
    artworkArea: 0.6,
    textures: [
      textures.white_zhuzi,
      textures.white_zhuzi,
      textures.white_top,
      textures.white_zhuzi,
      textures.white_zhuzi,
      textures.white_zhuzi,
    ],
    border: border,
    floor: textures.white_1,
    light: light,
    clearColor: '#000',
    boxNumber: 100,
    mouse: textures.logo
  },
  {
    name: '星空馆2',
    type: 2,
    // cover: require('@/assets/images/hall/house_2.png'),
    cover: 'http://blockchain.maplesky.cn/StaticResource/Show/house_2.png',

    artworkArea: 0.6,
    textures: [
      textures.star,
      textures.star,
      textures.star2,
      textures.star,
      textures.star,
      textures.star,
    ],
    floor: textures.diban,
    light:Object.assign(light,{ambientLight:{
        color:commonColor,
        intensity:0.6
      },}),
    pointLight:light.pointLight,
    border:border,
    clearColor:'#000',
    boxNumber:100,
    mouse:textures.moon
},
  {
    name: '清新馆',
    // cover: require('@/assets/images/hall/house_3.png'),
    cover: 'http://blockchain.maplesky.cn/StaticResource/Show/house_3.png',

    type: 3,
    artworkArea: 0.6,
    textures: [
      textures.lakeSky,
      textures.lakeSky,
      textures.lakeSky,
      textures.lakeSky,
      textures.lakeSky,
      textures.lakeSky,
    ],
    border: border,
    floor: textures.lakeSky,
    light: light,
    clearColor: '#000',
    boxNumber: 100,
    mouse: textures.logo
  },
  {
    name: '白色展馆Plus',
    // cover: require('@/assets/images/hall/house_4.png'),
    cover: 'http://blockchain.maplesky.cn/StaticResource/Show/house_4.png',

    type: 4,
    artworkArea: 0.6,
    textures: [
      textures.white_denguang,
      textures.white_denguang,
      textures.white_top,
      textures.white_denguang,
      textures.white_denguang,
      textures.white_denguang,
    ],
    border: border,
    floor: textures.floor1,
    light: light,
    clearColor: '#000',
    boxNumber: 100,
    mouse: textures.logo
  }
]


function getHallById(id){
  console.log('hallId',id)
  return hallOptions.find(hall=>{
    return hall.type===id
  })
}


export {
  home,border,
  plane,textures,
  colors,light,
  hallOptions,getHallById,
  listConfig
}
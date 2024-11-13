const Width=1000
const Height=1000
export default {
  goodsSize: {width: Width, height: Height},
  camera:{
    position:{
      x:6,
      y:6,
      z:4
    },
    option:{
      fov:45,
      aspect:Width/Height
    }
  },
  controls:{
    enableDamping:false,
    resizable:false,
    xyRotatable:false,
    zRotatable:false,
    //控制相机平移
    enablePan:false,
    // 是否自动旋转
    autoRotate:true
  },
  models: {
    house: {
      name:'house',
      path: 'resources/house-in-desert/models/house.glb',
      children: [
        {
          name: 'baked',
          texture: 'resources/house-in-desert/textures/baked.jpg'
        }
      ],
    },
    cartoonRoom:{
      name:'cartoon-room',
      path:'resources/carton-room/models/room.glb',
      children: [],
      texture:'resources/carton-room/textures/kda.mp4'
    },
    artHouse:{
      name:'artHouse',
      path:'model/scene.fbx',
      children: [],
    },
    // horse:{
    //   name:'horse',
    //   path:'resources/sampler-particles/horse.glb'
    // },
    // otherTest:{
    //   name:'test',
    //   path:'model/工具/Servo_Mount.stl'
    // },
    // jianzhu:{
    //   name:'test',
    //   path:'model/建筑/Arc_triomphe.stl'
    // },
    // shengwu:{
    //   name:'shengwu',
    //   path:'model/生物/ironman_bust.stl',
    //   texture:'artwork/2.jpg'
    // }
  },

}


//加载第三方作品
<template>
<canvas id="model"></canvas>
</template>

<script>
import THREE, { Scene, TextureLoader,
  sRGBEncoding, PlaneGeometry,
  Mesh, MeshBasicMaterial, Color,
  PerspectiveCamera, WebGLRenderer,PointLight,
  AmbientLight,
  Clock } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader.js'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import config from '@/config/model'
import BackgroundMaterial from "@/views/components/test/materials/Background";
// import BackgroundMaterial from '@/views/components/test/materials/Background.js'
// import FloorShadowMaterial from '@/views/components/test/materials/FloorShadow.js'
export default {
  name: "model",
  props: {
    size:{
      type:Number,
      default:1
    },
    resizable:{
      type:Boolean,
      default:config.controls.resizable
    },
    xyRotatable:{
      type:Boolean,
      default:config.controls.xyRotatable
    },
    enableDamping:{
      type:Boolean,
      default:config.controls.enableDamping
    },

    zRotatable:{
      type:Boolean,
      default:config.controls.zRotatable
    },
    enableZoom:{
      type:Boolean,
      default:config.controls.enableZoom
    },
    enablePan:{
      type:Boolean,
      default:config.controls.enablePan
    },
    autoRotate:{
      type:Boolean,
      default:config.controls.autoRotate
    },
    //模型地址
    model:{
    type:Object,
    require:true
    },
    background:{
      type:Object
    },
    cameraPosition:{
      type:Object,
      default:()=> {
        return config.camera.position
      }
    },
    cameraOption:{
      type:Object,
      default:()=> {
        return config.camera.option
      }
    }
  },
  data(){
    return {
      scene:{},
      camera: {},
      renderer:{},
      width:0,
      height:0,
      dom:{},
      // Loader
      gltfLoader:{},
      //controls
      controls:{},
      //texture&material
      Texture:{},
      Material:{}
    }
  },
  methods:{
    initLight(){
      let point = new PointLight(0xffffff);
      point.position.set(400, 200, 300); //点光源位置
      this.scene.add(point); //点光源添加到场景中
      //环境光
      let ambient = new AmbientLight(0x444444);
      this.scene.add(ambient);
    },
    initBackground(){
      const backgroundGeometry = new PlaneGeometry(2, 2, 2, 2)
      const backgroundMaterial = new BackgroundMaterial()

      // 背景和材质结合
      const backgroundMesh= new Mesh(backgroundGeometry,backgroundMaterial)
      backgroundMesh.frustumCulled = false
      backgroundMesh.matrixAutoUpdate = false
      // 添加到场景
      this.scene.add(backgroundMesh)
    },
    initModel(){
      // console.log('config',goodsSize)
      let goodsSize=config.goodsSize
      this.dom=document.getElementById('model')
      this.scene=new Scene()
      console.log('size',model)
      // 这里的宽高控制相机的比例和canvas的大小
      this.width=goodsSize.width*this.size
      this.height=goodsSize.height*this.size
      // Camera
      this.camera=new PerspectiveCamera(this.cameraOption.fov,this.cameraOption.aspect)
      this.camera.position.x=this.cameraPosition.x
      this.camera.position.y=this.cameraPosition.y
      this.camera.position.z=this.cameraPosition.z
      this.scene.add(this.camera)
      //Loader
      // Draco loader
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('draco/')
      // GLTF loader
      this.gltfLoader = new GLTFLoader()
      this.gltfLoader.setDRACOLoader(dracoLoader)
      //texture

      //Materials

      this.Material=new MeshBasicMaterial({ map: this.Texture })
      // console.log('this.Material',this.Material)
      //Controls
      this.controls = new OrbitControls(this.camera, this.dom)
      this.controls.enableDamping = true
      this.controls.enablePan=this.enablePan
      this.controls.enableZoom = this.enableZoom
      this.controls.autoRotate=this.autoRotate
      // Renderer
      this.renderer= new WebGLRenderer({
        canvas:this.dom,
        antialias:true
      })
      this.renderer.setSize(this.width,this.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.renderer.outputEncoding = sRGBEncoding

      //eventListener
      window.addEventListener('resize', () => {
        // Update sizes
        // this.width = window.innerWidth
        // this.height = window.innerHeight
        // this.width()
        // this.height()
        // Update camera
        this.camera.aspect = this.width / this.height
        // 更新相机
        this.camera.updateProjectionMatrix()

        // Update renderer
        this.renderer.setSize(this.width, this.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })
    },
    //处理模型各个组成部分
    handleLoad(model,gltf){

      if(model.texture)
      {
        const textureLoader = new TextureLoader()
        let tempTexture= textureLoader.load(this.model.texture)
        tempTexture.flipY = false
        tempTexture.encoding = sRGBEncoding
        //更改material
        // const tempMesh = gltf.scene.find(item=>item.name===this.model.name)
        console.log('gltf.scene',gltf.scene)
        // tempMesh.material = new MeshBasicMaterial({ map: tempTexture })
        // this.Texture = textureLoader.load(this.texture)
        // tempMesh.material = tempMaterial
      }

      //子模型处理

      if(model.children&&model.children.length>0){
        let list=model.children
        for(let i=0;i<list.length;i++)
        {
          // 加载texture
          const textureLoader = new TextureLoader()
          const tempTexture = textureLoader.load(list[i].texture)
          tempTexture.flipY = false
          tempTexture.encoding = sRGBEncoding
          //更改material
          const tempMesh = gltf.scene.children.find(child => child.name === list[i]['name'])
          tempMesh.material = new MeshBasicMaterial({ map: tempTexture })
          // this.Texture = textureLoader.load(this.texture)
          // tempMesh.material = tempMaterial
        }

      }
    },
    getModelType(modelPath){
      let glb=new RegExp(/^[\s\S]*\.(glb|GLB)$/)
      let fbx=new RegExp(/^[\s\S]*\.(fbx|FBX)$/)
      let stl=new RegExp(/^[\s\S]*\.(stl|STL)$/)
      if(glb.test(modelPath))
        return 'glb'
      else if(stl.test(modelPath))
        return 'stl'
      else if(fbx.test(modelPath))
        return 'fbx'
    },
    handleStl(geometry){
      // let t=new TextureLoader()
      const textureLoader = new TextureLoader()
      let tempTexture= textureLoader.load(this.model.texture)
      // tempTexture.flipY = false
      // tempTexture.encoding = sRGBEncoding
      let material=new MeshBasicMaterial({map:tempTexture})
      let mesh=new Mesh(geometry,material)
      this.scene.add(mesh)
    },
    // handleFbx(object){
    //
    // }
    loadModel(){
      if(this.getModelType(this.model.path)==='glb')
      {
        this.gltfLoader.load(
          this.model.path,
          gltf => {
            this.handleLoad(this.model,gltf)
            // const Mesh = gltf.scene.children[0]
            // Mesh.material = this.Material
            // console.log('加载的模型参数 Mesh',Mesh)
            this.scene.add(gltf.scene)
          }
        )
      }
      else if(this.getModelType(this.model.path)==='stl'){
        const stlLoader=new STLLoader()
        stlLoader.load(this.model.path,this.handleStl)
      }
      else if(this.getModelType(this.model.path)==='fbx'){
        const fbxLoader=new FBXLoader()
        fbxLoader.load(this.model.path, function (object) {
          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
      })
        })
      }

      //animate
      // const clock = new Clock()
      const tick = () => {
        // const elapsedTime = clock.getElapsedTime()
        // Update controls
        this.controls.update()
        // Render
        this.renderer.render(this.scene, this.camera)
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
      }
      tick()
    }
  },
  // computed:{
  //   width:()=>{
  //     return `${window.innerWidth/model.goodsSize.width*this.size}px`
  //   },
  //   height:()=>{
  //     return `${window.innerHeight/model.goodsSize.height*this.size}px`
  //   }
  // },
  mounted() {
    this.initModel()
    // this.initBackground()
    this.initLight()
    this.loadModel()
  }
}
</script>

<style scoped>

</style>

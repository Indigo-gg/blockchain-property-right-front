import * as THREE from "three";
import {border,colors,home} from "@/views/exhibition-hall/config/config";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
const loader=new THREE.TextureLoader()
loader.crossOrigin = ''
/**
 * 获取展品实例
 * @param artwork
 * @returns {Object}
 */
function getBoard (artwork,options) {
  const lineMaterial = new THREE.LineBasicMaterial({
    color:options.commonLightColor,
    transparent:true,
    opacity:0.8,
    depthFunc:THREE.AlwaysDepth
  })
  let border=options.border
  let box1=new THREE.Mesh(
    new THREE.BoxGeometry(border.size.width,
      border.size.height,border.size.depth))
      loader.load(artwork.path,texture=>{
      box1.material=new THREE.MeshBasicMaterial({
        map: texture,
      })
      })
  let bgSize = border.bgSize
  const material = new THREE.MeshBasicMaterial({color: border.color});
  let border1 = new THREE.Mesh(
    new THREE.BoxGeometry(border.bgSize.width,
      border.bgSize.height,
      border.bgSize.depth)
    , material)
  //设置作品的随机位置范围
  let position = {
    x: (Math.random() - 0.5) * home.size.x * options.artworkArea,
    y: 10 * options.artworkArea,
    z: (Math.random() - 0.5) * home.size.z * options.artworkArea
  }
  // let position={x:Math.random()*(home.size.x-2*home.padding)+home.padding,
  //   y:10*options.artworkArea,
  //   z:Math.random()*(home.size.z-2*home.padding)+home.padding}
  console.log('画板的位置', position)
  box1.position.set(position.x, border.bgSize.height + border.size.height / 2, position.z)
  border1.position.set(position.x, position.y, position.z)
  border1.castShadow = true
  box1.name = 'box'
  const album = new THREE.Group()
  album.add(box1, border1)
  const borderLine = new THREE.LineSegments(new THREE.EdgesGeometry(box1.geometry), lineMaterial)
  album.name = `album`
  borderLine.name = `border`
  borderLine.visible = false
  return {
    album,
    borderLine
  }
}


/**
 * 设置控制器
 * @returns {*}
 */
function initControls(camera,renderer) {
  const  controls = new OrbitControls(camera, renderer.domElement);
  // 如果使用animate方法时，将此函数删除
  //controls.addEventListener( 'change', render );
  // 使动画循环使用时阻尼或自转 意思是否有惯性
  controls.enableDamping = true;
  //动态阻尼系数 就是鼠标拖拽旋转灵敏度
  //controls.dampingFactor = 0.25;
  //是否可以缩放
  controls.enableZoom = false;
  //是否自动旋转
  // controls.autoRotate = true;
  controls.autoRotateSpeed = 0.3;
  //设置相机距离原点的最远距离
  controls.minDistance = 1;
  //设置相机距离原点的最远距离
  controls.maxDistance = 1000;
  //是否开启右键拖拽
  controls.enablePan = false
  return controls
}

/**
 * 设置场景光源
 * @param scene
 */
function setLight(scene,options){
  //平行光
  let light=options.light
  const directionalLight=new THREE.DirectionalLight(light.commonColor)
  let directLight=light.directionalLight
  directionalLight.position.set(directLight.position.x,
    directLight.position.y,
    directLight.position.z).normalize()
  scene.add(directionalLight)
  //开启投射阴影
  directionalLight.castShadow=true
  //环境光
  const ambientLight=new THREE.AmbientLight(light.commonColor,options.light.ambientLight.intensity)
  scene.add(ambientLight)
  let point=light.pointLight
  const pointLight=new THREE.PointLight(point.color,point.intensity)
  pointLight.position.set(point.position.x,point.position.y,point.position.z)
  pointLight.castShadow=true
  scene.add(pointLight)
}


/**
 * 设置场馆外壳
 * @param scene
 */
function setHome(scene,options){
  const Home=new THREE.Mesh(new THREE.BoxBufferGeometry(home.size.x,
      home.size.y,home.size.z),
    [
      // tempMaterial,
      new THREE.MeshStandardMaterial({color :colors.dark,side:THREE.BackSide}),
      new THREE.MeshStandardMaterial({color :colors.dark,side:THREE.BackSide}),
      new THREE.MeshStandardMaterial({color :colors.dark,side:THREE.BackSide}),
      new THREE.MeshStandardMaterial({color :colors.dark,side:THREE.BackSide}),
      new THREE.MeshStandardMaterial({color :colors.dark,side:THREE.BackSide}),
      new THREE.MeshStandardMaterial({color :colors.dark,side:THREE.BackSide})
    ])
  // let tempMaterial
  for(let i=0;i<6;i++){
    loader.load(options.textures[i],texture=>{
      let M=new THREE.MeshBasicMaterial({
        map:texture,
        side:THREE.BackSide,
      })
     Home.material[i]=M

    })
  }

  Home.position.set(home.position.x,
    home.position.y,home.position.z)
  scene.add(Home)
}




function setPlane(scene,options){
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(home.size.x,home.size.y))
  loader.load(options.floor,texture=>{
    plane.material=new THREE.MeshBasicMaterial({
      map:texture,
      side:THREE.DoubleSide
    })
  })
  plane.rotateX(-Math.PI/2)
  plane.name = 'plane'
  plane.position.set(plane.position.x,plane.position.y,plane.position.z)
  scene.add(plane)
  plane.receiveShadow = true
}
export {getBoard,setLight,
        setHome,setPlane,
          initControls
}
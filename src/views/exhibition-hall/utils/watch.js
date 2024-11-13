import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

const circle = new THREE.Mesh( new THREE.CircleGeometry(5,50),
  new THREE.MeshBasicMaterial({
    transparent:true,
    opacity:0.2,
    side:THREE.DoubleSide
  }))
let isMoving = false

const setCircle=(scene,options)=>{
  circle.visible = false
  circle.rotateX(-0.5*Math.PI)
  circle.name = 'circle'
  scene.add(circle)
  let circleBorder
  const loader=new THREE.TextureLoader()
  loader.load(options.mouse,texture =>{
    circle.material = new THREE.MeshBasicMaterial({
      map:texture,
      transparent:true,
      opacity:0.9,
      side:THREE.DoubleSide,
      depthTest:false
    })
    circleBorder = new THREE.Mesh( new THREE.CircleGeometry(5,50),
      circle.material)
    circleBorder.position.y = 0.2
    circle.add(circleBorder)
  })

  // let timeout;//用于存储定时器的变量
  // dom.$on('mousemove',function() {
  //   timeout= true
  //   circle.visible = setTimeout(function() {
  //     isMoving = false
  //     $("body").css({
  //       cursor:'grab'
  //     })
  //   }, 200);//鼠标按下0.5秒后发生alert事件
  // })
  // dom.$on('mouseup',function() {
  //   isMoving = false
  //   clearTimeout(timeout);//清理掉定时器
  // })
  return {circleBorder,circle}
}


const watchMouse=(dom,scene,options,ysThree)=>{

  // dom.mousedown().mouseup()
  let currentHover
  dom.addEventListener('mousemove',function (event) {
    event.preventDefault()
    const res= ysThree.getIntersectObject(dom,event,scene,true)
    if(res.objectList.length > 0) {
      const obj = res.objectList[0]
      // console.log('obj',obj)
      if((obj.object.name === 'plane'|| obj.object.name ==='circle')&&!isMoving){ //如果是面或当前circle
        // console.log('经过plane&&circle')
        circle.position.copy(obj.point)
        circle.position.y = 0.2
        circle.visible = true
        if(currentHover)
          currentHover.visible = false
        currentHover = null
      }else{
        circle.visible = false
        if ( obj.object.name === 'album' ){
          console.log('经过album')
          if (currentHover) { currentHover.visible = false }
          currentHover = obj.object.getObjectByName('border')
          currentHover.visible = true
        }else{
          if(currentHover)
            currentHover.visible = false
          currentHover = null
        }
      }
    } else {
      circle.visible = false
      // $("body").css({
      //   cursor:'grab'
      // })
      if(currentHover)
        currentHover.visible = false
      currentHover = null
    }
  })
  }

const watchClick=(dom,cb)=>{
  dom.addEventListener('click',function (event) {
    // let haveClick = false
    event.preventDefault()
    const res= ysThree.getIntersectObject(dom,event)
    if(res.objectList.length > 0) {
      const obj = res.objectList[0]
      let name=obj.object.name
      cb(name)
    }else{

    }
  })

}


export {watchMouse,watchClick,setCircle}
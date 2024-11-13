<template>
  <div class="hello">
    <div id="dom" style="overflow: hidden;cursor: hand"></div>
  </div>
</template>

<script>
import model from '@/views/components/model/model'
import modelOption from '@/config/model'
import learnModel from "@/views/components/test/learn/learn-model";
import '@/utils/ysThree'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import {getBoard, setHome, setLight, setPlane} from "@/views/exhibition-hall/utils/initHall";
export default {
  name: "test",
  components:{
    model:model,
    learnModel
  },
  data(){
    return {
      model:modelOption.models.shengwu,
      //base
      scene:{},
      camera:{},
      renderer:{},
      textLoader:new THREE.TextureLoader(),
      // texture:modelOption.models.cartoonRoom.texture
      //数据区
      artworks:[
        {
          path:'artwork/1.jpg',
          info:'和哥哥的合照捏',
          ratio:0.8
        },
        {
          path:'artwork/2.jpg',
          info:'和哥哥的合照2捏',
          ratio:0.6
        }
      ],
      //配置区
      //画布颜色
      clearColor:'#000',
      commonLightColor:'#fff',
      yellow:'yellow',
      red:'red',
      white:'#ffffff',
      green:'green',
      dark:'#413636',
      homeSize:{
        x:1000,
        y:1000,
        z:1000
      },
      boxNumber:100,
    }
  },
  methods:{
    loadHall(){
      const el=document.getElementById('dom')
      /**
       * 初始化ysTree实例
       */
      ysThree.init({
        el:el,
        cameraType:1,
        clearColor:this.clearColor//画布颜色
      },(scene,camera,renderer)=>{
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.shadowMap.enabled=true
        setLight(scene)
        setHome(scene)
        setPlane(scene)
        /**
         * addBox
         */
        const lineMaterial = new THREE.LineBasicMaterial({
          color:this.commonLightColor,
          transparent:true,
          opacity:0.8,
          depthFunc:THREE.AlwaysDepth
        })
        for(let i =0 ;i<this.artworks.length ;i++) {
          const box1 = getBoard(this.artworks[i])
          box1.position.set(Math.random()*1000-500,5,Math.random()*1000-100)
          scene.add(box1)
          box1.castShadow = true
          const borderLine = new THREE.LineSegments(new THREE.EdgesGeometry(box1.geometry), lineMaterial)
          box1.name = `box`
          borderLine.name  = `border`
          borderLine.visible = false
          box1.add(borderLine)
        }

        /**
         * mousemove
         */
        const circle = new THREE.Mesh( new THREE.CircleGeometry(5,50),
          new THREE.MeshBasicMaterial({
            color:this.green,
            transparent:true,
            opacity:0.2,
            side:THREE.DoubleSide
          }))
        circle.visible = false
        circle.rotateX(-0.5*Math.PI)
        circle.name = 'circle'
        scene.add(circle)
        let circleBorder
        const loader=new THREE.TextureLoader()
        loader.load(this.texture.mouse,texture =>{
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
        let isMoving = false
        const dom=document.getElementById('dom')
        console.log('dom',dom.onmousedown)

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
        // dom.mousedown().mouseup()
        let currentHover
        el.addEventListener('mousemove',function (event) {
          event.preventDefault()
          const res= ysThree.getIntersectObject(el,event)
          if(res.objectList.length > 0) {
            const obj = res.objectList[0]
            if((obj.object.name === 'plane'|| obj.object.name ==='circle')&&!isMoving){ //如果是面或当前circle
              circle.position.copy(obj.point)
              circle.position.y = 0.2
              circle.visible = true
              if(currentHover)
                currentHover.visible = false
              currentHover = null
            }else{
              circle.visible = false
              if ( obj.object.name === 'box' ){
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
        let haveClick = false
        el.addEventListener('click',function (event) {
          event.preventDefault()
          const res= ysThree.getIntersectObject(el,event)
          if(res.objectList.length > 0) {
            const obj = res.objectList[0]
            if(obj.object.name ==='circle'){
              const x = circle.position.x
                ,z = circle.position.z,
                y = camera.position.y,
                v = camera.position.clone().sub(controls.target.clone()) //差
              haveClick = true
              ysThree.flyTo(TWEEN,controls,{
                position:[x ,y ,z],
                controls:[x-v.x ,y-v.y ,z-v.z],
                duration:500,
                done:function () {

                }
              })
            }else if(obj.object.name ==='box'){
              console.log('you click box')
            }
          }else{

          }
        })


        function initControls() {
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
        const  controls = initControls()

        controls.target.set(0,20,0)
        camera.position.set(0.0001,20,0.0001) //差值使相机向前看。


        let count = 1
        const clock= new THREE.Clock()
        function animate() {
          requestAnimationFrame(animate)
          renderer.render(scene,camera)
          controls.update(clock.getDelta())

          TWEEN.update()

          if(haveClick && circleBorder){
            count = count + 0.05
            circleBorder.material.opacity =  circleBorder.material.opacity - 0.05
            if(count > 2){
              count = 1
              circleBorder.material.opacity =1
              haveClick = false
            }
            circleBorder.scale.set(count,count,count)
          }

          // if(stats) stats.update()
        }
        animate()
      })



    },
    onmousemove(e){

    }

  },
  mounted () {
    // this.produce3D()
    this.loadHall()

  }
}
</script>

<style scoped>
 #dom{
   height: 100vh;
   width: 100vw;
   overflow: hidden;
 }
</style>

<!--//了解模型-->
<!--<template>-->
<!--  <div class="learn">-->
<!--    &lt;!&ndash;  <model></model>&ndash;&gt;-->
<!--    <canvas id="container" :style="{width:width,height:height}"></canvas>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import model from "@/views/components/model/model";-->
<!--import * as THREE from "three";-->
<!--import config from '@/config/model'-->
<!--import {sRGBEncoding} from "three";-->
<!--export default {-->
<!--  name: "learn-model",-->
<!--  components: {-->
<!--    model-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      scene: {},-->
<!--      camera: {},-->
<!--      container: document.getElementById('container'),-->
<!--      renderer: {},-->
<!--      sphereList:[],-->
<!--      width:config.goodsSize.width,-->
<!--      height:config.goodsSize.height-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    test(){-->
<!--      //Object-->
<!--      const ball=new THREE.SphereGeometry(1,24,24)-->
<!--      const material=new THREE.MeshBasicMaterial({color:0x565656})-->
<!--      const BALL=new THREE.Mesh(ball,material)-->
<!--      BALL.position.set(0,0,0)-->
<!--      //Scene-->
<!--      this.scene=new THREE.Scene()-->
<!--      this.scene.add(BALL)-->
<!--      //Camera-->
<!--      this.camera=new THREE.PerspectiveCamera(45,this.width/this.height,1,10000)-->
<!--      this.camera.position.set(10,10,10)-->
<!--      this.camera.lookAt(0,0,0)-->
<!--      this.scene.add(this.camera)-->
<!--      //Renderer-->
<!--      this.renderer=new THREE.WebGLRenderer({-->
<!--        canvas:document.getElementById('container'),-->
<!--        antialias: true-->
<!--      })-->
<!--      this.renderer.setClearColor('#000000')-->
<!--      this.renderer.setSize(this.width, this.height)-->
<!--      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))-->
<!--      this.renderer.outputEncoding = sRGBEncoding-->


<!--      this.renderer.render(this.scene,this.camera)-->



<!--    },-->
<!--    randomColor() {-->
<!--      return `rgb(${parseInt(Math.random() * 256)},-->
<!--      ${parseInt(Math.random() * 256)},-->
<!--      ${parseInt(Math.random() * 256)})`-->
<!--    },-->
<!--    initBall() {-->
<!--      //场景-->
<!--      this.scene = new THREE.Scene();-->
<!--      //相机-->
<!--      this.camera = new THREE.PerspectiveCamera(45, this.width/this.height, 1, 10000);-->
<!--      this.camera.position.set(0, 100, 150)-->
<!--      this.camera.lookAt(this.scene.position);-->
<!--      // 渲染器-->
<!--      this.renderer = new THREE.WebGLRenderer({-->
<!--        canvas:document.getElementById('container'),-->
<!--        antialias: true-->
<!--      });-->
<!--      this.renderer.setSize(this.width, this.height);-->
<!--      // const container=-->
<!--      this.renderer.setClearColor('#000');-->
<!--      this.renderer.setSize(this.width, this.height);-->

<!--      //坐标轴-->
<!--      //坐标轴辅助-->
<!--      const axes = new THREE.AxesHelper(10); //红x 绿y 蓝z-->
<!--      this.scene.add(axes);-->
<!--      //灯光-->
<!--      //添加灯光-->
<!--      let pointLight = new THREE.PointLight(0xffffff, 2, 0);-->
<!--      pointLight.position.set(0, 70, 10);-->
<!--      this.scene.add(pointLight);-->
<!--      //灯光辅助-->
<!--      let sphereSize = 1;-->
<!--      let pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);-->
<!--      this.scene.add(pointLightHelper)-->
<!--      //地面-->
<!--      const planeGeometry = new THREE.PlaneGeometry(150, 150);-->
<!--      const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});-->
<!--      const plane = new THREE.Mesh(planeGeometry, planeMaterial);-->
<!--      //水平面旋转并且设置位置-->
<!--      plane.rotation.x = -0.5 * Math.PI;-->
<!--      plane.position.set(0, 0, 0)-->
<!--      this.scene.add(plane);-->
<!--      // 添加球体-->
<!--      for(let i = 0;i<100;i++){-->
<!--        const  sphere = this.addSphere ()-->
<!--        sphere.v = 0;-->
<!--        sphere.a = -0.01;-->
<!--        sphere.isMoving = true-->
<!--        this.sphereList.push( sphere )-->
<!--      }-->
<!--      //renderer-->
<!--      //阴影映射-->
<!--      this.renderer.shadowMap.enabled=true-->
<!--      //光源设置阴影-->
<!--      pointLight.castShadow=true-->
<!--      //平面接受阴影-->
<!--      plane.receiveShadow=true-->
<!--      this.renderScene()-->

<!--    },-->
<!--    //添加球体-->
<!--    addSphere() {-->
<!--      const sphereGeometry = new THREE.SphereGeometry(2, 20, 20); // 20为切割数量 &#45;&#45;实际并非球体而是一定量的切割面-->
<!--      const sphere = new THREE.Mesh(sphereGeometry, new THREE.MeshLambertMaterial({color: this.randomColor()}));-->
<!--      //设置球体位置-->
<!--      sphere.position.x = Math.random() * 100 - 50;-->
<!--      sphere.position.y = Math.random() * 100;-->
<!--      sphere.number = parseInt(sphere.position.y / 5) //粗略根据初始高度决定弹几次-->
<!--      sphere.position.z = Math.random() * 100 - 50;-->
<!--      this.scene.add(sphere);-->
<!--      //球体是具有阴影-->
<!--      sphere.castShadow = true;-->
<!--      return sphere-->
<!--    },-->
<!--    renderScene(){-->
<!--      // console.log('list',this.sphereList)-->
<!--      this.sphereList.forEach(e=>{-->
<!--        console.log('sphere',e)-->
<!--        this.go(e)-->
<!--      })-->
<!--      requestAnimationFrame(this.renderScene)-->
<!--      this.renderer.render(this.scene,this.camera)-->
<!--    },-->
<!--    go(e) {-->
<!--      if (e.isMoving) {-->
<!--        e.position.y += e.v;-->
<!--        e.v += e.a;-->
<!--        if (e.position.y <= 2) {-->
<!--          e.v = -e.v * 0.9;-->
<!--          e.number = e.number - 1-->
<!--        }-->
<!--        if (e.number <= 0) {-->
<!--          e.isMoving = false;-->
<!--          e.position.y = 2;-->
<!--          // scene.remove(e); //移除-->
<!--        }-->
<!--      }-->
<!--    }-->


<!--  },-->
<!--  mounted() {-->
<!--    // this.init()-->
<!--    this.test()-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

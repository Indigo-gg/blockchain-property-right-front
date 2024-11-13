<template>
  <div class="body" id="screen">
    <div class="back-icon" @click="handleBack">
      <svg-icon size="30" icon="exit2" color="#bababa"></svg-icon>
    </div>
    <div class="exit" @click="handleFullScreen">
      <svg-icon size="40" :icon="isFull?'back-screen':'full-screen'" color="#bababa"></svg-icon>
    </div>
    <div id="dom" style="overflow: hidden;cursor: none">
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { getBoard, initControls, setHome, setLight, setPlane } from '@/views/exhibition-hall/utils/initHall'
import TWEEN from '@tweenjs/tween.js'
import { getHallById } from '@/views/exhibition-hall/config/config'
import '@/utils/ysThree'
import { getRoomWork } from '@/api/modules/showroom'
import { ShowArtList } from '@/api/modules/artwork'
import model from '@/views/components/model/model'
import config from '@/config/model'
import { setCircle, watchClick, watchMouse } from '@/views/exhibition-hall/utils/watch'
import { RenderPicture } from '@/api/modules/file'
import store from '@/store'
import { pageConfig } from '@/views/config/config'

export default {
  name: 'ExhibitionHall',
  components: {
    model
  },
  data () {
    return {
      model: config.models.artHouse,
      scene: {},
      camera: {},
      renderer: {},
      textLoader: new THREE.TextureLoader(),
      artworks: [
        // {
        //   path:'artwork/1.jpg',
        //   info:'和哥哥的合照捏',
        //   ratio:0.8
        // },
        // {
        //   path:'artwork/2.jpg',
        //   info:'和哥哥的合照2捏',
        //   ratio:0.6
        // }
      ],
      options: {},
      showroomId: 0,
      pattern: 0,
      isFull: false
    }
  },
  methods: {
    initHall () {
      this.options = getHallById(this.pattern)
      // console.log('options',this.options,this.showRoomId, this.$route.params.hallNo)
      this.loadHall()
    },
    handleFullScreen () {
      const dom = document.getElementById('screen')
      if (this.isFull) {
        this.$fullscreen.exit(dom, {
          wrap: false,
          callback: f => {
            this.isFull = f
          }
        })
      } else {
        this.$fullscreen.enter(document.getElementById('screen'), {
          wrap: false,
          callback: f => {
            this.isFull = f
          }
        })
      }
    },
    handleBack () {
      this.$router.go(-1)
    },
    loadHall () {
      const el = document.getElementById('dom')
      /**
       * 初始化ysTree实例
       */
      ysThree.init({
        el: el,
        cameraType: 1,
        clearColor: this.options.clearColor// 画布颜色
      }, (scene, camera, renderer) => {
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.shadowMap.enabled = true
        setLight(scene, this.options)
        setHome(scene, this.options)
        setPlane(scene, this.options)
        /**
         * addBox
         */
        for (let i = 0; i < this.artworks.length; i++) {
          const { album, borderLine } = getBoard(this.artworks[i], this.options)
          scene.add(album)
          const box = album.getObjectByName('box')
          // console.log('box',box)
          box.add(borderLine)
        }
        const { circleBorder, circle } = setCircle(scene, this.options)
        watchMouse(el, scene, this.options, ysThree)
        let haveClick = false
        watchClick(el, (name) => {
          if (name === 'circle') {
            const x = circle.position.x
            const z = circle.position.z
            const y = camera.position.y
            const v = camera.position.clone().sub(controls.target.clone()) // 差
            haveClick = true
            ysThree.flyTo(TWEEN, controls, {
              position: [x, y, z],
              controls: [x - v.x, y - v.y, z - v.z],
              duration: 500,
              done: function () {
              }
            })
          } else if (name === 'box') {
            console.log('you click box')
          }
        })
        const controls = initControls(camera, renderer)
        controls.target.set(0, 20, 0)
        camera.position.set(0.0001, 20, 0.0001) // 差值使相机向前看。

        let count = 1
        const clock = new THREE.Clock()

        function animate () {
          requestAnimationFrame(animate)
          renderer.render(scene, camera)
          controls.update(clock.getDelta())
          TWEEN.update()
          if (haveClick && circleBorder) {
            count = count + 0.05
            circleBorder.material.opacity = circleBorder.material.opacity - 0.05
            if (count > 2) {
              count = 1
              circleBorder.material.opacity = 1
              haveClick = false
            }
            circleBorder.scale.set(count, count, count)
          }
        }

        animate()
      })
    },
    handleRes (artList) {
      const list = []
      artList.forEach(art => {
        const data = {
          id: art.id,
          path: art.markedfileId,
          info: '作品介绍',
          ratio: 0.8,
          author: art.author,
          position: art.position
        }
        list.push(data)
      })
      return list
    }
  },
  mounted () {
    this.showroomId = this.$route.params.hallNo
    this.pattern = this.$route.params.pattern
    getRoomWork({ showroomId: this.showroomId }).then(res => {
      console.log('作品列表', res.data)
      this.artworks = this.handleRes(res.data)
      this.initHall()
    })
  }
}
</script>

<style scoped>
.body {
  /*height: ;*/
  width: 100%;
  z-index: 111;
  position: relative;
}

.exit {
  cursor: pointer;
  position: absolute;
  right: 40px;
  top: 30px;
  padding: 0 0 100px 100px;
}

.back-icon {
  cursor: pointer;
  position: absolute;
  left: 40px;
  top: 30px;
  padding: 0 100px 100px 0;
}

#dom {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>

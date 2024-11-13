<template>
  <div class="box">
    <a-modal cancelText="取消" okText="下载证书" :width="option.width"
             :bodyStyle="{positon:'relative',width: option.width,height:option.height}"
             :visible="previewVisible" @ok="dowload" @cancel="handleCancel">
      <Loading :loading="loading" icon="loading1"></Loading>
      <div id="pic" class="flex-col-space-between" ref="pic"
           :style="{padding:`${option.paddingSHU} ${option.paddingHENG}`,width: option.width,height:option.height,backgroundImage:`url(${option.src})`}">
        <!--        <div class="logo" :style="{backgroundImage:`url(${logo})`}">-->
        <!--          &lt;!&ndash;          <svg-icon icon="hash-blue" color="rgba(0,0,0,0.1)" size="70"></svg-icon>&ndash;&gt;-->
        <!--        </div>-->
        <div class="top">
          <div class="certificate">
            <div class="cer-hash">
              证书哈希: &nbsp; {{ info.certificateHash }}
            </div>
          </div>
          <div class="title">{{ option.title }}</div>
        </div>
        <div class="content">{{ info.eviContent }}</div>
        <div class="bottom">
          <div class="signs flex-col-space-around-reverse">
            <div class="sign" v-for="s in info.sign">
              <div :class="s.isWitness===1?'p-name':'name'">{{ s.name }}:</div>
              <div class="hash">{{ s.publicAdd }}</div>
            </div>
          </div>
          <div class="red">
            <div class="zhang" :style="{backgroundImage:`url(${zhang})`}">
            </div>
            <div class="time"><span style="font-size: 12px">授予时间：</span>{{ info.awardTime }}</div>

          </div>
        </div>
      </div>
    </a-modal>
    <a-button type="primary" @click="showModal">{{ btn }}</a-button>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import Loading from "@/views/components/Loading/Loading";
import {certificateConfig} from "@/views/config/config";
import svgIcon from "@/components/svgIcon/svgIcon";
import {UserCertificate} from "@/api/modules/certificate";

export default {
  name: "user2pic",
  components: {
    svgIcon,
    Loading
  },
  props: {
    id: {
      type: Number,
      require: true
    },
    fileEnd: {
      type: String,
      default: '权星艺链平台证书'
    },
    type: {
      type: String,
      require: true
    },
    btn: {
      type: String,
      default: '查看证书'
    }

  },
  data() {
    return {
      previewVisible: false,
      loading: true,
      option: certificateConfig.user,
      info: {},
      zhang: certificateConfig.zhang,
    }
  },
  methods: {
    getDetail() {
      this.loading = true
      UserCertificate().then(res => {
        if (res.ok) {
          this.info = res.data
          this.loading = false
          this.init()
        }
      })
    },
    dowload() {
      // this.btn='下载中'
      this.generateImage()
      this.previewVisible = false
    },
    showModal() {
      this.previewVisible = true
      this.getDetail()
    },
    handleCancel() {
      this.previewVisible = false
    },
    generateImage: function () {
      const that = this
      // 通过this.$refs获取vue页面中的dom元素
      let canvasID = this.$refs['pic'];
      let _this = this;
      let a = document.createElement('a');
      // 获取元素的可滚动内容的高度
      let height = document.querySelector('#user').scrollHeight
      console.log(canvasID)
      canvasID.style.height = height + "px";
      canvasID.style.zIndex = '-1';
      html2canvas(canvasID).then(function (canvas) {
        let dom = document.body.appendChild(canvas);
        dom.style.display = 'none';
        a.style.display = 'none';
        document.body.removeChild(dom);
        let blob = _this.dataURLToBlob(dom.toDataURL('image/png'));
        a.setAttribute('href', URL.createObjectURL(blob));
        //这块是保存图片操作  可以设置保存的图片的信息
        a.setAttribute('download', that.fileEnd + '.png');
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(blob);
        document.body.removeChild(a);
        // this.btn='查看证书'
        // this.previewVisible=false
      });
    },
    dataURLToBlob(dataurl) {
      let arr = dataurl.split(',');
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type: mime});
    }
  },
  mounted() {
    // this.getDetail()
  }
}
</script>

<style scoped>
.box {
  font-family: '仿宋GBK';
}

#pic {
  background-size: 100% 100%;
  color: black;
  position: relative;
  /*z-index: -1;*/

}

.logo {
  position: absolute;
  top: 80px;
  right: 60px;
  height: 60px;
  width: 60px;
  background-size: 100% 100%;
}

.cer-hash {
  color: #4b4a4a;
  font-weight: 600;
}

.top {
  width: 100%;
}

.certificate {
  padding: 10px 0;
  font-size: 9px;
  color: #7e8185;
  width: 100%;
  text-align: left;
}

.signs {

  margin-bottom: 0px;
}

.title {
  padding-top: 20px;
  font-family: 'fangsong', 'Times New Roman';
  text-align: center;
  font-size: 24px;
}

.content {
  position: relative;
  bottom: 30px;
  text-indent: 1.5em;
  font-family: '仿宋GBK';
  font-size: 16px;
  color: #7e8185;
  margin: 10px 0;
  line-height: 1.8em;
  /*margin-bottom: 10%;*/
  /*text-wrap: none;*/
}

.bottom {
  width: 100%;
}

.sign {
  width: 100%;
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

}

.name {
  font-size: 12px;
  color: #919191;
}

.p-name {
  font-size: 12px;
  color: rgba(211, 184, 86, 0.88);
}

.hash {
  color: #7e8185;
  font-size: 9px;
}

.red {
  padding-top: 40px;
  height: 80px;
  position: relative;
}

.zhang {
  position: absolute;
  /*width: 100%;*/
  right: 40px;
  bottom: -30px;
  opacity: 0.8;
  width: 100px;
  height: 100px;
  z-index: 222;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.time {
  /*vertical-align: center;*/
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-weight: 600;
  justify-content: flex-end;
  /*right: 10px;*/
  /*bottom: 10px;*/
  /*position: absolute;*/
  color: #6c6b6b;
  font-size: 14px;
  width: 100%;
  text-align: right;
}
</style>
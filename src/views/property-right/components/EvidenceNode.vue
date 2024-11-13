<template>
  <div>
    <!--处于编辑模式下的结点-->
    <a-form-model :model="fromData" v-if="!readOnly">
      <div class="form-item-block">
        <div class="title">追加证据结点</div>
        <a-row type="flex" justify="space-between" :gutter="32">
          <a-col :span="12">
            <div class="file-title">
              图片上传
            </div>
            <div class="content file-content">
              <a-form-model-item>
                <FileUploader
                  upload-type="list-file"
                  @uploadFilesChange="filesChanged"
                ></FileUploader>
              </a-form-model-item>
            </div>
          </a-col>
          <a-col :span="12">
            <div class="file-title">
              视频上传
            </div>
            <div class="content file-content">
              <a-form-model-item>
                <FileUploader
                  upload-type="list-file"
                  @uploadFilesChange="videoChange"
                ></FileUploader>
              </a-form-model-item>
            </div>
          </a-col>
        </a-row>
      </div>
      <a-form-model-item class="form-item-block">
        <div class="file-title">
          填写证据追加描述
        </div>
        <a-input type="textarea" v-model="fromData.text"></a-input>
      </a-form-model-item>
      <a-space>
        <a-button type="primary" @click="subAddEvidence">新增结点</a-button>
        <a-button type="primary" @click="cancelAddEvidence">取消新增</a-button>
      </a-space>
    </a-form-model>
    <!--处于预览模式下的结点-->
    <div v-else class="read-only">
      <div class="status flex-row-end">
        <div style="color: red" v-if="NodeInfo.eviNodeStatus===status.notPass">未通过</div>
        <div style="color: #4ea94e" v-else-if="NodeInfo.eviNodeStatus===status.pass">已通过</div>
        <div style="color: #4dc0c0" v-else-if="NodeInfo.eviNodeStatus===status.undeal">待处理</div>
      </div>
      <div class="title">{{ NodeInfo.time }}</div>
      <div class="batch">节点批次:{{ NodeInfo.batch }}</div>
      <div class="hash">节点Hash:{{ NodeInfo.hash }}</div>
      <div class="content">
        <div class="text"><p>{{ NodeInfo.text }}</p></div>
        <a-divider></a-divider>
        <a-row class="file-list flex-row-start" type="flex" :gutter="32">
          <a-col v-for="file in RofileList" :key="file" flex="150px">
            <img-preview :imgs="[{src:RenderImg(file)}]" width="150px" height="100px">
            </img-preview>
          </a-col>
          <a-col flex="150px" :key="video" >
            <video-player :src="video" ref="video-player" width="150px" height="100px"> </video-player>
          </a-col>
        </a-row>
      </div>
      <div class="btn">
        <a-button type="danger" @click="subDelEvidence">弃用此结点</a-button>
      </div>
    </div>
  </div>
</template>
<script>
import FileUploader from '@/views/components/FileUploader/DragableUploader'
import { AddEvidence, DelEvidence } from '@/api/modules/rightProtect'
import AdaptiveImg from '@/views/components/AdaptiveImg'
import { RenderPicture, VideoUpload } from '@/api/modules/file'
import VideoPlayer from '@/views/components/VideoPlayer'
import imgPreview from '@/views/components/imgPreview/imgPreview'
export default {
  name: 'EvidenceNode',
  components: {
    FileUploader,
    AdaptiveImg,
    imgPreview,
    VideoPlayer
  },
  props: {
    readOnly: {
      type: Boolean,
      required: true
    },
    defaultData: {
      type: Object,
      default: () => {
        return { fileList: [], text: '', evidenceId: 0 }
      }
    },
    safeRecordId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 只读模式
      video: '',
      loaded: false,
      NodeInfo: {},
      RofileList: [],
      // 编辑模式
      fromData: {
        videoFileId: '',
        fileList: '',
        text: '',
        evidenceId: ''
      },
      status: {
        undeal: 1,
        pass: 2,
        notPass: 3
      }
    }
  },
  methods: {
    async subAddEvidence () {
      const fileIds = []
      this.fromData.fileList.forEach(item => {
        fileIds.push(item.fileId)
      })
      const res = await AddEvidence({
        safeRecordId: this.safeRecordId,
        text: this.fromData.text,
        fileId: fileIds.toString(),
        videoFileId: this.fromData.videoFileId
      })
      const video = await VideoUpload({ videoFileId: this.fromData.videoFileId })
      if (res.ok && video.ok) {
        this.$emit('success', { type: 'add', info: res.msg })
      } else {
        this.$emit('fail', { type: 'add', info: res.msg })
      }
    },
    async subDelEvidence () {
      const res = await DelEvidence({ evidenceId: this.NodeInfo.evidenceId })
      if (res.ok) {
        this.$emit('success', { type: 'del', info: res.msg })
      } else {
        this.$emit('fail', { type: 'del', info: res.msg })
      }
    },
    filesChanged (files) {
      this.fromData.fileList = files
    },
    videoChange (file) {
      this.fromData.videoFileId = file[0].fileId
    },
    cancelAddEvidence () {
      this.$emit('cancel', { type: 'cancel', info: '取消追加结点' })
    },
    RenderImg (src) {
      return RenderPicture(src)
    },
    init () {
      if (this.readOnly) {
        // 只读模式
        this.NodeInfo = this.defaultData
        this.RofileList = this.NodeInfo.fileId.split(',')
        this.video = this.NodeInfo.videoFileId
        this.$refs['video-player'].reload(this.NodeInfo.videoFileId)
        this.loaded = true
      } else {
        // 编辑模式
        this.fromData = this.defaultData
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped lang='less'>
//上链过的证据结点
.read-only {
  .title {
    font-size: 1.5em;
    transform: translateY(-20%);
  }

  .content {
    margin-top: 8px;
    padding: 5px 10px;
    border-radius: 3px;
    background-color: rgba(185, 176, 176, 0.5);
    min-height: 100px;

    .text {
      margin: 0.5em 0;

      & > p {
        color: #3a3838;

        &::first-letter {
          margin-left: 2em;
        }
      }
    }

    .file-list {
      margin: 5px;

      .file {
        height: 80px;
        width: 80px;
        border-radius: 3px;
        box-shadow: 0px 0px 5.3px rgba(0, 0, 0, 0.028),
        0px 0px 17.9px rgba(0, 0, 0, 0.042),
        0px 0px 80px rgba(0, 0, 0, 0.07);
      }
    }
  }

}

.form-item-block {
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > .title {
    color: #7e7d7d;
    font-size: 1.2em;
    margin-left: 1em;
    letter-spacing: 1px;
    font-weight: bold;
    margin-bottom: 10px;
    position: relative;
    transform: translateX(-1em);
  }
  .file-title{
    color: #aba6a6;
    font-weight: bold;
    margin-bottom: 5px;
  }
}

.btn {
  position: absolute;
  right: 10px;
  bottom: 20px;
}

</style>

<template>
  <div class="protect-form-page ">
    <div class="">
      <a-page-header :ghost="true" class="page-header">
        <svg-icon icon="arrow-left" slot="backIcon"></svg-icon>
        <span class="page-title" slot="title">申请藏品维权</span>
        <span slot="subTitle">RightsSafeguard</span>
        <div class="content">
        </div>
      </a-page-header>
      <a-form-model class="protect-form">
        <div class="form-item-block">
          <div class="title">维权涉及藏品</div>
          <div class="content">
            <template v-if="autoWrite">
              <a-row class="relate-artwork-info" type="flex" justify="start" :gutter="32">
                <a-col flex="160px" class="info-col artwork-cover" :span="6">
                  <AdaptiveImg
                    :src="info.markedfileId"
                    :loaded="infoLoaded"
                    alt="藏品图片"
                    img-class="cover"></AdaptiveImg>
                </a-col>
                <a-col flex="auto" class="info-col" :span="18">
                  <div>
                    <span class="label">编号</span><span class="content">{{ info.id }}</span>
                  </div>
                  <div>
                    <span class="label">名称</span><span class="content">{{ info.name }}</span>
                  </div>
                  <div class="text-overflow-2">
                    <span class="label">简介</span><p class="content text-overflow-2">{{ info.info }}</p>
                  </div>
                  <div>
                    <span class="label">作者</span>
                    <avatar-group :authors="info.author"></avatar-group>
                  </div>
                </a-col>
              </a-row>
            </template>
            <template v-else>
              <div class="search-artwork">
                <span class="notice">未选择要维权的藏品</span>
                <a-button type="primary" @click="()=>{this.openSearch=true}">搜索藏品</a-button>
              </div>
            </template>
          </div>
        </div>
        <div class="form-item-block">
          <div class="title">维权证据上传</div>
          <a-row type="flex" justify="space-between" :gutter="32">
            <a-col :span="12">
              <div class="file-title">
                图片上传
              </div>
              <div class="content file-content">
                <a-form-model-item>
                  <FileUploader
                    upload-type="list-file"
                    @uploadFilesChange="fileListChange"
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
                    @uploadFilesChange="videoListChange"
                  ></FileUploader>
                </a-form-model-item>
              </div>
            </a-col>
          </a-row>
        </div>
        <div class="form-item-block">
          <div class="title">违规行为描述</div>
          <div class="content">
            <a-form-model-item>
              <a-textarea
                class="form-edit"
                v-model="formData.text"
                placeholder="请描述该藏品涉嫌违规行为"
                :auto-size="{ minRows: 4, maxRows: 8 }"></a-textarea>
            </a-form-model-item>
          </div>
        </div>
      </a-form-model>
      <div class="form-submit">
        <a-button type="danger" @click="submitProtect" :block="false" :loading="submitLoading">提交申请维权</a-button>
      </div>
      <a-drawer
        width="600"
        placement="right"
        :closable="false"
        :visible="openSearch"
        :maskClosable="true"
        :keyboard="true"
        @close="()=>{this.openSearch=false}"
      >
        <a-button type="primary" @click="()=>{this.openSearch=false}"></a-button>
      </a-drawer>
    </div>
  </div>
</template>

<script>
import { AddProtect } from '@/api/modules/rightProtect'
import { GetArtworkDetail } from '@/api/modules/artwork'
import { RenderPicture, VideoUpload } from '@/api/modules/file'
import FileUploader from '@/views/components/FileUploader/DragableUploader'
import SingleUploader from '@/views/components/FileUploader/SingleUploader'
import AdaptiveImg from '@/views/components/AdaptiveImg'
import AvatarGroup from '@/views/components/avatarGroup/avatarGroup'
export default {
  name: 'Protect',
  components: {
    FileUploader,
    AdaptiveImg,
    AvatarGroup,
    SingleUploader
  },
  props: {
    artworkId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      info: {},
      infoLoaded: false,
      openSearch: false,
      autoWrite: false,
      formData: {
        fileId: '',
        videoFileId: '',
        artworkId: '',
        text: ''
      },
      submitLoading: false,
      avatarEmptySrc: require('@/assets/images/empty/star-fall.svg')
    }
  },
  methods: {
    RenderImage (fileId) {
      return RenderPicture(fileId)
    },
    fileListChange (fileList) {
      const fileIds = []
      fileList.forEach(item => {
        fileIds.push(item.fileId)
      })
      this.formData.fileId = fileIds.toString()
    },
    videoListChange (file) {
      console.log('上传了视频', file)
      this.formData.videoFileId = file[0].fileId
    },
    async submitProtect () {
      this.submitLoading = true
      const res = await AddProtect(this.formData)
      const video = await VideoUpload({ videoFileId: this.formData.videoFileId })
      if (res.ok && video.ok) {
        this.submitSuccess()
      } this.submitLoading = false
    },
    submitSuccess () {
      setTimeout(() => {
        this.subLoading = false
        const key = `${Date.now()}`
        this.$notification.open({
          message: '维权事件提交成功~',
          description: <span>您的维权事件已被提交至审核,请您耐心等待，我们会在3-5个工作日内完成处理</span>,
          icon: <a-icon type='smile' style='color: #108ee9' />,
          duration: 6,
          btn: h => {
            return h(
              'a-button',
              {
                props: { type: 'primary', size: 'small' },
                on: { click: () => this.$notification.close(key) }
              },
              '我已了解'
            )
          },
          key
        })
        this.$emit('subSuccess', '')
      }, 800)
    },
    async getDetail (artId) {
      const res = await GetArtworkDetail({ artId })
      this.info = res.data[0]
      this.infoLoaded = true
    },
    async initForm () {
      const related = this.artworkId
      console.log('打开了弹窗', related)
      if (related) {
        this.autoWrite = true
        await this.getDetail(related)
        this.formData.artworkId = this.info.id
      }
    }
  }
}
</script>

<style scoped lang='less'>


.page-title {
  font-size: 1em;
  font-weight: bold;
}

.protect-form {
  width: 90%;
  margin: 0 auto;

  .form-item-block {
    margin: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > .title {
      color: #7e7d7d;
      font-size: 1.2em;
      letter-spacing: 1px;
      font-weight: bold;
      margin-bottom: 10px;
      position: relative;
      transform: translateX(-1em);
    }

    & > .content {
      padding: 0.5em 1em;
      background: rgba(255, 255, 255, 0.35);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
      backdrop-filter: blur(8.5px);
      -webkit-backdrop-filter: blur(8.5px);
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      min-height: 15vh;
      // 相关藏品信息
      .relate-artwork-info {
        .info-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 170px;

          &.artwork-cover {
            flex-direction: row;
            align-items: center;
          }

          .cover {
            height: 160px;
            width: 160px;
            border-radius: 5px;
          }

          & > div {
            display: flex;
            align-items: center;

            span {
              font-size: 1em;
              height: 2em;
              color: #4B4B4B;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .label {
              display: flex;
              width: 3em;
              font-size: 1.2em;
              color: #999999 !important;
              margin-right: 0.5em;
              width: 20%;
            }

            .content {
              width: 80%;
              position: relative;
              display: flex;
              font-size: 1.2em;
              max-height: 3em;
              .avatar {
                display: inline-block;
                height: 1.5em;
                width: 1.5em;
                border-radius: 50%;
              }

              .author-name {
              }
            }
          }
        }
      }
    }
  }
}

.file-content{
  padding: 0.5em 1em;
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  min-height: 15vh;
}

.file-title{
  color: #807f7f;
  font-size: 1em;
  letter-spacing: 1px;
  font-weight: bold;
  margin-bottom: 10px;
  position: relative;
  transform: translateX(-1em);
}


.search-artwork {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-submit {
  margin: 6em 0em 3em;
  display: flex;
  align-items: center;
  justify-content: center;
}


</style>

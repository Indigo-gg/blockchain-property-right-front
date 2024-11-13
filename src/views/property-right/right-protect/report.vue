<template>
  <div class="report-form-page">
    <!--    <a-page-header :ghost="true" class="page-header">-->
    <!--      <span slot="backIcon"><svg-icon icon="arrow-left"></svg-icon></span>-->
    <!--      <span class="page-title" slot="title">违规作品举报</span>-->
    <!--      <span slot="subTitle">Reporting of violations </span>-->
    <!--      <div class="content">-->
    <!--        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-->
    <!--        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-->
    <!--        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-->
    <!--      </div>-->
    <!--    </a-page-header>-->
    <a-form-model class="report-form">
      <div class="form-item-block">
        <div class="title">选择举报藏品</div>
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
                <div>
                  <span class="label">简介</span><span class="content text-overflow-2">{{ info.info }}</span>
                </div>
                <div>
                  <span class="label">作者</span>
                  <avatar-group :author="info.author"></avatar-group>
                </div>
              </a-col>
            </a-row>
          </template>
          <template v-else>
            <div>
              <span class="notice">当前未选择要举报的违规藏品</span>
              <a-button type="primary" @click="()=>{this.openSearch=true}">搜索藏品</a-button>
            </div>
          </template>
        </div>
      </div>
      <div class="form-item-block">
        <div class="title">违规证据上传</div>
        <div class="content">
          <a-form-model-item>
            <FileUploader
              upload-type="list-file"
              @uploadFilesChange="fileListChange"
            ></FileUploader>
          </a-form-model-item>
        </div>
      </div>
      <div class="form-item-block">
        <div class="title">违规行为描述</div>
        <div class="content">
          <a-form-model-item>
            <a-textarea
              class="form-edit"
              v-model="formData.info"
              placeholder="请描述该藏品涉嫌违规行为"
              :auto-size="{ minRows: 4, maxRows: 8 }"></a-textarea>
          </a-form-model-item>
        </div>
      </div>
    </a-form-model>
    <div class="form-submit">
      <a-button type="danger" @click="submitReport" :block="false" :loading='submitLoading'>提交举报信息</a-button>
    </div>
  </div>
</template>

<script>
import AvatarGroup from '@/views/components/avatarGroup/avatarGroup'
import { GetArtworkDetail } from '@/api/modules/artwork'
import { AddRightReport } from '@/api/modules/rightReport'
import { RenderPicture } from '@/api/modules/file'
import FileUploader from '@/views/components/FileUploader/DragableUploader'
import AdaptiveImg from '@/views/components/AdaptiveImg'

export default {
  name: 'Report',
  components: {
    FileUploader,
    AdaptiveImg,
    AvatarGroup
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
        artworkId: '',
        info: '',
        fileId: ''
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
    async submitReport () {
      this.submitLoading = true
      const res = await AddRightReport(this.formData)
      console.log(res)
      if (res.ok) {
        // 新增成功则跳转至页面
       this.submitSuccess()
      }
      this.submitLoading = false
    },
    submitSuccess () {
      setTimeout(() => {
        this.subLoading = false
        const key = `${Date.now()}`
        this.$notification.open({
          message: '举报事件提交成功~',
          description: <span>您的举报事件已被提交至审核,请您耐心等待，我们会在3-5个工作日内完成处理</span>,
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
.report-form-page {
  height: 100%;
}


.page-title {
  font-size: 1em;
  font-weight: bold;
}

.report-form {
  width: 90%;
  margin: 0 auto;

  .form-item-block {
    margin: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > .title {
      color: #b2b0b0;
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

.form-submit {
  margin: 6em 0em 3em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

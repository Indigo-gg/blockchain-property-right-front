<template>
  <div class="ArtworkEditForm">
    <a-form-model :model="formData" ref="artworkEdtForm" :rules="formRules" class="artwork-form">
      <a-row>
        <a-col :span="12">
          <div class="form-item-block">
            <div class="title">{{ labels.artworkName }}</div>
            <div class="content">
              <!--藏品名称-->
              <a-form-model-item prop="artworkName">
                <a-input v-model="formData.artworkName" class="form-edit" placeholder="请输入藏品名称"></a-input>
              </a-form-model-item>
              <!--藏品类型-->
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-item-block">
            <div class="title">{{ labels.artworkType }}</div>
            <div class="content">
              <a-form-model-item prop="artworkType">
                <a-select placeholder="请选择藏品类型" v-model="formData.artworkType" class="form-edit">
                  <a-select-option v-for="(type) in artworkTypes" :value="type.value" :key="type.value">
                    {{ type.text }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <div class="form-item-block">
            <div class="title">{{ labels.uploadfileId }}</div>
            <div class="content">
              <a-form-model-item prop="uploadfileId">
                <FileUploader
                  @uploadSingleFileSuccess="artworkUploaded"
                  upload-type="single-file"
                  class="form-edit"></FileUploader>
              </a-form-model-item>
            </div>
          </div>
        </a-col>
        <!--        <a-col :span="12">-->
        <!--          <template v-if="formData.artworkType===2">-->
        <!--            <div class="form-item-block">-->
        <!--              <div class="title">{{ labels.fileId }}</div>-->
        <!--              <div class="content">-->
        <!--                <a-form-model-item prop="fileId">-->
        <!--                  <FileUploader-->
        <!--                    @uploadPicSuccess="coverUploaded"-->
        <!--                    upload-type="single-img"-->
        <!--                    class="form-edit"></FileUploader>-->
        <!--                </a-form-model-item>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </a-col>-->
      </a-row>
      <!--藏品封面-->
      <div class="form-item-block">
        <div class="title">作者信息添加
          <a-button type="primary" @click="addAuthor('',contr_margin)">
            <a-icon type="plus" />
            添加创作者
          </a-button>
        </div>
        <div class="content">
          <!--动态添加创作者-->
          <a-list :grid="{gutter:16,column:2}" :data-source="formData.creators">
            <a-list-item slot-scope="author,index" :key="author.tid" slot="renderItem" class="author-card">
              <a-row>
                <a-col>
                  <a-space>
                    <span><a-tag color="green">作者{{ index + 1 }}</a-tag></span>
                    <span v-if="author.info.id===formData.mainCreator">
                      <a-tag color="orange">主创人</a-tag>
                    </span>
                    <span v-else @click="setMainCreator(author.info.id)">
                      <a-tag color="blue">共创者</a-tag>
                    </span>
                  </a-space>
                </a-col>
              </a-row>
              <a-row style="width: 90%" type="flex" :gutter="16">
                <a-col class="col" :span="12">
                  <a-form-model-item
                    :prop="'creators.'+index+'.info'"
                    :rules="{required:true,message:'请选择创作者',trigger:'blur'}">
                    <a-select
                      placeholder="请选择创作者"
                      style="width: 100%;height: 100%"
                      class="form-edit"
                      show-search
                      :show-arrow="false"
                      :filter-option="false"
                      :not-found-content="null"
                      @search="searchUser"
                      @change="userSelected"
                    >
                      <a-select-option
                        v-for="(item,i) in authorSelects"
                        :value="item.id"
                        :key="i"
                        :data-aindex="index">
                        <a-row>
                          <a-avatar :src="RenderAvatar(item.photoFileId)" size="small" />
                          <span>{{ item.name }}</span>
                        </a-row>
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col class="col" :span="10">
                  <a-form-model-item
                    :prop="'creators.'+index+'.contribution'"
                    :rules="{required:true,validator:contriValidator,trigger:'change'}">
                    <a-input
                      class="form-edit"
                      onkeyup="this.value=this.value.replace(/\D/g,'')"
                      placeholder="贡献点(1~10)"
                      suffix="/10点"
                      v-model="author.contribution"></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col class="col" :span="2">
                  <a-form-model-item v-if="formData.creators.length > 1">
                    <span @click="removeAuthor(author)" class="del-author-btn">
                      <svg-icon icon="close-circle"></svg-icon>
                    </span>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-list-item>
          </a-list>
        </div>
      </div>
      <div class="form-item-block">
        <div class="title">{{ labels.documentationId }}</div>
        <div class="content">
          <a-form-model-item prop="documentationId">
            <document-uploader @uploadFilesChange="documentUploaded"></document-uploader>
          </a-form-model-item>
        </div>
      </div>
      <div class="form-item-block">
        <div class="title">{{ labels.artworkInfo }}</div>
        <div class="content">
          <a-form-model-item prop="artworkInfo">
            <a-textarea
              class="form-edit"
              v-model="formData.artworkInfo"
              placeholder="不如和我们分享一下藏品的故事吧~"
              :auto-size="{ minRows: 4, maxRows: 8 }"></a-textarea>
          </a-form-model-item>
        </div>
      </div>
    </a-form-model>
    <div class="form-submit">
      <a-button type="primary" @click="submitArtworkForm" :block="false" :loading="subLoading">
        {{ subLoading ? '上传中...' : '上传作品' }}
      </a-button>
    </div>
  </div>
</template>

<script>
import { RenderPicture, addVisibleMark } from '@/api/modules/file'
import { SearchUser } from '@/api/modules/user'
import { pageConfig } from '@/views/config/config'
import cloneDeep from 'lodash.clonedeep'
import { AddArtwork, AddInvisibleWatermark } from '@/api/modules/artwork'
import DocumentUploader from '@/views/user/components/DocumentUploader'
import FileUploader from '@/views/components/FileUploader/DragableUploader'

export default {
  name: 'ArtworkEditForm',
  components: {
    DocumentUploader,
    FileUploader
  },
  data () {
    return {
      subLoading: false,
      myself: {},
      myselfSelected: true,
      defaultAuthor: {},
      // 贡献余量
      contr_margin: 10,
      // 待添加水印的文件
      files2watermark: [],
      formData: {
        artworkName: '',
        artworkType: '',
        fileId: '',
        uploadfileId: '',
        documentationId: [],
        artworkInfo: '',
        creators: [],
        mainCreator: ''
      },
      formRules: {
        artworkName: [{ required: true, message: '请输入藏品名称', trigger: 'blur' }],
        artworkType: [{ required: true, message: '请选择藏品类型', trigger: 'blur' }],
        fileId: [{ required: true, validator: this.vaidatorCover, trigger: 'change' }],
        documentationId: [{ required: true, validator: this.vaidatorDocument, trigger: 'change' }],
        uploadfileId: [{ required: true, validator: this.vaidatorArtwork, trigger: 'change' }]
      },
      labels: {
        artworkName: '藏品名称',
        artworkType: '藏品类型',
        fileId: '藏品封面图',
        creators: '作者',
        uploadfileId: '上传藏品文件',
        documentationId: '版权使用证明文件',
        artworkInfo: '藏品故事'
      },
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      },
      artworkTypes: [],
      authorSelects: []
    }
    // eslint-disable-next-line no-unreachable
  },
  methods: {
    // 封面图上传完毕
    coverUploaded (cover) {
      this.formData.fileId = cover.fileId
    },
    // 藏品上传完毕
    artworkUploaded (artwork) {
      // console.log('藏品上传完毕ID:', artwork)
      this.formData.uploadfileId = artwork.fileId
    },
    // 证明文件上传完毕
    documentUploaded (fileList) {
      this.formData.documentationId = []
      console.log('当前文件列表', fileList)
      this.files2watermark = fileList
      fileList.forEach(file => {
        this.formData.documentationId.push(file.fileId)
      })
    },
    // 作品上传校验
    vaidatorArtwork (rule, value, callback) {
      if (!this.formData.uploadfileId) {
        callback(new Error('请上传您的藏品文件~'))
      } else {
        callback()
      }
    },
    // 封面上传校验
    vaidatorCover (rule, value, callback) {
      if (this.formData.fileId === '') {
        callback(new Error('请上传您的藏品封面图'))
      } else {
        callback()
      }
    },
    vaidatorDocument (rule, value, callback) {
      if (this.formData.documentationId.length == 0) {
        callback(new Error('请上传版权使用文件'))
      } else {
        callback()
      }
    },
    // 贡献度检验
    contriValidator (value, rule, callback) {
      if (!value) {
        callback(new Error(`请输入贡献点:1~${this.contr_margin}`))
      } else {
        let cur = 0
        console.log('共创检验触发')
        this.formData.creators.forEach(item => {
          cur += parseInt(item.contribution)
        })
        console.log('当前的共创度总和', cur)
        if (cur !== 10) {
          callback(new Error('贡献点总和应为10'))
        } else {
          callback()
        }
      }
    },
    // 根据头像Id渲染图片
    RenderAvatar (id) {
      return RenderPicture(id)
    },
    // 设置一个作者为主创者
    setMainCreator (id) {
      this.formData.mainCreator = id
    },
    // 去除一个创作者
    removeAuthor (author) {
      let index = -1
      for (index = 0; index < this.formData.creators.length; index++) {
        if (author.tid === this.formData.creators[index].tid) {
          break
        }
      }
      if (index !== -1) {
        this.formData.creators.splice(index, 1)
        if (author.info) {
          this.authorSelects.push(author.info)
        }
      }
    },
    // 添加一个创作者
    addAuthor () {
      this.contr_margin = 0
      this.formData.creators.push({
        tid: (new Date()).getTime(),
        info: '',
        contribution: 0
      })
    },
    // 选中一个待选用户
    userSelected (user, e) {
      // aindex当前所选创作者在共创者中的排位index
      const aindex = e.data.attrs['data-aindex']
      this.formData.creators[aindex].contribution = this.contr_margin
      // uindex 当前所选作者在候选作者列表中的排位
      const uindex = e.data.key
      console.log('用户已选择', uindex)
      // 当前创作者位已有创作者，则进行调换（先push再索引不会影响原索引的结果）
      if (this.formData.creators[aindex].info !== '') {
        this.authorSelects.push(this.formData.creators[aindex].info)
      }
      this.formData.creators[aindex].info = this.authorSelects[uindex]
      this.authorSelects.splice(uindex, 1)
    },
    // 搜索用户
    async searchUser (keyword) {
      if (keyword) {
        const res = await SearchUser({ keyword })
        if (res.data.length > 0) {
          this.authorSelects = res.data
        }
      }
    },
    // 添加水印
    addWaterMark (file) {
      const key = Date.now() + file.fileId
      return new Promise(async (resolve, reject) => {
        // this.$message.loading({ content: `正在为${file.name}添加水印保护....`, key: key, duration: 0 })
        const res = await addVisibleMark(file.fileId)
        if (res.ok) {
          // this.$message.success({ content: `${file.name}水印添加成功!`, key: key })
          resolve({ fileId: file.fileId, ok: true })
        } else {
          // this.$message.success({ content: `${file.name}水印添加失败!`, key: key })
          reject(new Error(res.msg))
        }
      })
    },
    water2Artwork ({ artworkId, fileId }) {
      return new Promise(async (resolve, reject) => {
        // this.$message.loading({ content: `正在为作品添加隐形水印保护....`, key: artworkId, duration: 0 })
        const res = await AddInvisibleWatermark({ artworkId, fileId })
        if (res.ok) {
          // this.$message.success({ content: `隐水印添加成功!`, key: artworkId })
          resolve({ ok: true })
        } else {
          // this.$message.success({ content: `隐水印添加失败!`, key: artworkId })
          reject(new Error(res.msg))
        }
      })
    },
    water2Document (files) {
      return new Promise((resolve, reject) => {
        files.forEach(async file => {
          const res = await this.addWaterMark(file)
          if (!res.ok) {
            // console.log('水印未添加成功~~~~')
            reject(new Error('水印未全部添加成功'))
          }
        })
        resolve({ ok: true })
      })
    },
    // 调整作者结构方便服务端接参
    parseCreator (creators) {
      console.log('即将转换的作者', creators)
      let data = ``
      creators.forEach(item => {
        data = data.concat(`${item.info.id},${item.contribution * 10},`)
      })
      return data.substring(0, data.length - 1)
    },
    submitArtworkForm () {
      this.subLoading = true
      const temp = cloneDeep(this.formData)
      this.$refs.artworkEdtForm.validate(async valid => {
        if (valid) {
          temp.fileId = this.formData.uploadfileId
          temp.creators = this.parseCreator(temp.creators)
          temp.documentationId = temp.documentationId.toString()
          console.log('准备提交的作品~', temp)
          const res = await AddArtwork(temp)
          this.afterSubmit(res)
        } else {
          this.$message.error('作品上传信息有误哦~')
          setTimeout(() => { this.subLoading = false }, 1500)
        }
      })
    },
    // 作品上传后进行水印的添加
    async afterSubmit (res) {
      if (res.ok) {
        // 手动延长提交时间
        setTimeout(() => {
          this.subLoading = false
          const key = `${Date.now()}`
          this.$notification.open({
            message: '稿件提交成功~',
            description: <span>您的稿件已被提交至审核,您可以在投稿中心查看作品状态</span>,
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
        }, 1600)
        const res1 = await this.water2Artwork({ artworkId: res.data.artworkId, fileId: this.formData.uploadfileId })
        const res2 = await this.water2Document(this.files2watermark)
        if (res1.ok && res2.ok) {
          // TODO 上传藏品的所有工作都做好了，可以提示用户上传成功~以及接下来的信息
          // UNDO 水印太慢了，提示放后面用户体验很差
        } else {
          // 文件上传失败，可能是网络出现问题或者服务器崩溃(ಥ﹏ಥ)
        }
      } else {
        // 藏品上传失败
        this.subLoading = false
      }
    }
  },
  async mounted () {
    this.artworkTypes = pageConfig.artworkTags
    if (!this.$store.getters.hasUserInfo) {
      await this.$store.dispatch('GetInfo')
    }
    const { id, name, avatar } = await this.$store.getters.userInfo
    this.myself = { photoFileId: avatar, id, name }
    // 默认添加一个主创人
    this.myself.name = this.myself.name + '(我)'
    this.authorSelects.push(this.myself)
    this.addAuthor()
    this.formData.mainCreator = this.myself.id
    console.log('已经增添一个创作者', this.formData.creators)
  },
  watch: {
    'formData.creators': {
      handler (val) {
        let cur = 0
        val.forEach(item => {
          cur += item.contribution
        })
        if (cur <= 10) {
          this.contr_margin = 10 - cur
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped lang='less'>
.page-title {
  font-size: 1em;
  font-weight: bold;
}

.artwork-form {
  width: 90%;
  margin: 0 auto;

  .form-item-block {
    margin: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1em;

    .col {
      //display: flex;
      //flex-direction: column;
      //justify-content: center;
    }

    .title {
      color: #b2b0b0;
      font-size: 1.2em;
      letter-spacing: 1px;
      font-weight: bold;
      margin-bottom: 10px;
      position: relative;
      transform: translateX(-1em);
    }

    .content {
      padding: 0.5em 1em;
      background: rgba(255, 255, 255, 0.35);
      //box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
      backdrop-filter: blur(8.5px);
      -webkit-backdrop-filter: blur(8.5px);
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.18);

      .author-card {
        .del-author-btn {
          font-size: 1.7em;
          display: inline-block;
          cursor: pointer;
        }

      }
    }
  }
}

.form-submit {
  margin: 4em 0em 3em;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>

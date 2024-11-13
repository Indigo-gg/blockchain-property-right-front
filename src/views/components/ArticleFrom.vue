<template>
  <div class="article-form-container">
    <a-divider orientation="left">基本信息</a-divider>
    <a-row class="article-form">
      <a-form-model
        :hide-required-mark="true"
        ref="form"
        :model="form"
        :rules="rules"
        layout="inline">
        <a-row :gutter="48">
          <a-col :span="12">
            <a-form-model-item label="标题" prop="title">
              <a-input v-model="form.title" placeholder="请输入标题"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="48">
          <a-col :span="12">
            <a-form-model-item label="来源" prop="source">
              <a-input v-model="form.source" placeholder="请输入来源"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="合作机构" prop="administration">
              <a-input v-model="form.administration" placeholder="请输入合作机构"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="合作企业" prop="company">
              <a-input v-model="form.company" placeholder="请输入合作企业"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="合作项目" prop="project">
              <a-input v-model="form.project" placeholder="请输入合作项目"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="发布时间" prop="pageDate">
              <a-date-picker v-model="form.pageDate" placeholder="请选择发布时间" style="width: 100%"></a-date-picker>
            </a-form-model-item>
          </a-col>
        </a-row>

        <template>
          <a-divider orientation="left">封面及摘要</a-divider>
          <a-row :gutter="48">
            <a-col :span="6">
              <a-form-model-item prop="fileList">
                <a-upload
                  :action="uploadFileHost"
                  :headers="headers"
                  :data="fileData"
                  list-type="picture-card"
                  :file-list="form.fileList"
                  @preview="handlePreview"
                  :remove="handleRemove"
                  @change="handleChange"
                >
                  <template v-if="form.fileList.length===0">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">
                      选择
                    </div>
                  </template>
                </a-upload>
              </a-form-model-item>
            </a-col>
            <a-col :span="18">
              <a-form-model-item prop="intro">
                <a-textarea
                  v-model="form.intro"
                  :rows="6"
                  placeholder="请输入摘要"
                  allowClear
                  :maxLength="500"></a-textarea>
              </a-form-model-item>
            </a-col>
          </a-row>
        </template>
        <template>
          <a-divider orientation="left">详细内容</a-divider>
          <a-row :gutter="48">
            <a-col :span="24">
              <a-form-model-item prop="content">
<!--                <ckeditor v-model="form.content" class="my-editor" :editor="ckeditor.editor" :config="ckeditor.editorConfig" />-->
              </a-form-model-item>
            </a-col>
          </a-row>
        </template>
      </a-form-model>
    </a-row>
    <footer-tool-bar :custom-bar-width="1000">
      <a-button @click="$emit('close')">关闭</a-button>
      <a-button type="primary" class="ml-5" @click="handleSubmit" :loading="loading">确定</a-button>
    </footer-tool-bar>

    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
// import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor'
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'
import cloneDeep from 'lodash.clonedeep'
import moment from 'moment'
import { parseFormData } from '@/utils'
// import { } from '@/api/api'
// import { editCase, getCaseInfo } from '@/api/case'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// import FileUploader from '@/components/FileUploader'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  name: 'ArticleForm',
  components: { FooterToolBar },
  props: {
    // ID
    id: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data () {
    return {
      uploadFileHost: process.env.VUE_APP_API_HOST + '/file/upload',
      headers: {
        ACCESS_TOKEN: storage.get(ACCESS_TOKEN)
      },
      fileData: {
        type: 2,
        source: 1
      },
      loading: false,
      data: {
        articleTypeList: []
      },
      ckeditor: {
        editor: ClassicEditor,
        editorConfig: {
          // Run the editor with the German UI.
          language: 'zh-cn',
          imageUpload: (file) => {
            const formData = new FormData()
            formData.append('type', '2')
            formData.append('source', '2')
            return new Promise((resolve, reject) => {
              formData.append('file', file)
              uploadFile('/file/upload', formData).then(res => {
                resolve({ url: process.env.VUE_APP_STATIC + '/image/' + res['data']['fileName'] })
              })
            })
          },
          mediaEmbed: {
            extraProviders: [
              {
                name: 'leo',
                url: [
                  /(.*?)/
                ],
                html: match => {
                  const src = match.input
                  return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;pointer-events: auto;">' +
                    '<video controls style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" src="' + src + '">' +
                    '</video>' +
                    '</div>'
                  )
                }
              }
            ]
          },
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading', view: 'h1', title: '标题', class: 'ck-heading_heading' },
              { model: 'heading1', view: 'h2', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h4', title: 'Heading 3', class: 'ck-heading_heading3' }
            ]
          },
          fontSize: {
            options: [10, 14, 'default', 24, 30, 36]
          }
        }
      },
      transForm: {
        show: false
      },
      previewVisible: false,
      previewImage: '',
      form: {
        id: 0,
        title: '',
        intro: '',
        fileList: [],
        content: '',
        source: '',
        pageDate: undefined,
        administration: '',
        company: '',
        project: '',
        type: 4
      },
      rules: {
        title: { required: true, trigger: 'blur', message: '请输入标题' },
        fileList: { required: true, type: 'array', trigger: ['blur', 'change'], message: '请选择封面图' },
        intro: { required: true, trigger: 'blur', message: '请输入简介' },
        pageDate: { required: true, trigger: 'change', message: '请选择发布时间' },
        content: { required: true, trigger: 'blur', message: '请输入内容' }
        // orderNumber: { required: true, trigger: 'blur', message: '请输入排序字段' }
      }
    }
  },
  mounted () {
    this.getInfo()
    this.initType()
  },
  watch: {
    id () {
      this.getInfo()
    },
    departmentId () {
      this.initType()
    }
  },
  methods: {
    initType () {
      if (this.typeId !== 0) {
        this.form.articleTypeId = this.typeId
      }
    },
    moment,
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    resetForm () {
      this.form.id = 0
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
      this.form.title = ''
      this.form.intro = ''
      this.form.type = undefined
      this.form.fileList = []
      this.form.content = ''
      this.form.pageDate = undefined
      this.form = this.$options.data().form
      this.initType()
    },

    parseModelToFile (file, ext = 'image') {
      return {
        'name': file['originalName'],
        'uid': file['id'],
        'url': process.env.VUE_APP_STATIC + '/' + ext + '/' + file['newName'],
        'id': file['id'],
        'fileName': file['newName'],
        'status': 'done'
      }
    },

    getInfo () {
      if (this.id === 0) {
        return
      }
      this.resetForm()
      getCaseInfo(this.id).then(response => {
        const { data } = response
        const date = data.date
        parseFormData(this.form, data)
        this.form.pageDate = moment(date)
        this.form.fileList = [{ id: data['coverId'], url: process.env.VUE_APP_API_HOST + '/file/image/' + data['coverId'], 'status': 'done', 'uid': data['coverId'] }]
        // const file = data['coverFile']
        // if (file) {
        //   // 封面数据转换
        //   this.form.fileList = [this.parseModelToFile(file, 'image')]
        // }
        // this.form.attachmentList = []
        // if (data['attachmentFiles']) {
        //   this.form.attachmentList = data['attachmentFiles'].map(item => this.parseModelToFile(item, 'download'))
        // }
      })
    },

    async handlePreview (file) {
      console.log('handlePreview', file)
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },

    handleCancel () {
      this.form = this.$options.data().form
      this.previewVisible = false
    },

    // 提交
    handleSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          const requestData = cloneDeep(this.form)
          if (requestData['fileList'].length > 0) {
            requestData['coverId'] = requestData['fileList'][0]['id']
            // requestData['coverFileName'] = requestData['fileList'][0]['fileName']
          }
          // requestData['attachmentFile'] = requestData['attachmentList'].map(item => item.id).join(',')
          delete requestData['fileList']
          // delete requestData['attachmentList']
          // if (requestData['cnContent']) {
          //   requestData['cnContent'] = encodeURIComponent(requestData['cnContent'])
          // }
          requestData['pageDate'] = moment(requestData['pageDate']).format('YYYY/MM/DD')
          editCase(requestData).then(() => {
            this.$emit('ok')
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },

    handleRemove (file) {
      const index = this.form.fileList.findIndex(item => item.id === file.id)
      this.form.fileList.splice(index, 1)
    },

    parseFile (file) {
      console.log('parse', file)
      let fileData = {}
      if (file.response) {
        const { data } = file.response
        fileData.name = file.name
        fileData.uid = file.uid
        fileData.url = process.env.VUE_APP_API_HOST + '/file/image/' + data['id']
        fileData.id = data['id']
        // fileData.fileName = data.fileName
        fileData.status = file.status
      } else {
        fileData = file
      }
      return fileData
    },
    // 上传文件（将上传文件逻辑写成一样的，统一管理）
    handleChange (info) {
      console.log('handleChange1', info)
      this.form.fileList = [this.parseFile(info.file)]
      console.log('handleChange2', this.form)
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name || ''} 上传成功`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name || ''} 上传失败`)
      }
    }
  }
}
</script>

<style lang="less">
.article-form {
  margin-bottom: 30px;

  .ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-bottom: 8px;
      margin-right: 0;

      .ant-form-item-control-wrapper {
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        width: 90px;
      }

      .ant-form-item-control {
        min-height: 32px;
        line-height: 32px;
      }
    }
  }

  .ant-upload.ant-upload-select-picture-card{
    width: 230px;
    height: 136px;
  }

  .ant-upload-list-picture-card .ant-upload-list-item{
    width: 230px;
    height: 136px;
  }
}
</style>

<style lang='less' scoped>
/deep/ .ck-content {
  min-height: 600px;
}

.transForm{
  /deep/ .ck-content {
    min-height: 800px;
  }
}
</style>

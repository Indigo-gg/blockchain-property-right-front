<template>
  <div>
    <template v-if="uploadType==='draggable'">
      <a-upload-dragger
        :customRequest="handleUpload"
        @preview="handlePreview"
        :remove="fileListRemove"
        @change="handleListChange"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">
          点击上传或拖拽文件到此区域
        </p>
        <p class="ant-upload-hint">
          支持单个或批量上传，严禁上传公司数据
        </p>
      </a-upload-dragger>
    </template>
    <!--    单文件上传用于头像-->
    <template v-else-if="uploadType=='single-file'">
      <a-upload
        list-type="picture"
        :customRequest="handleUpload"
        :remove="singleRemove"
        @change="handleSingleChange"
      >
        <a-button v-if="!singleFile.loaded">
          <a-icon type="upload" />
          点击上传
        </a-button>
      </a-upload>
    </template>
    <!--    多文件上传列表-->
    <template v-else-if="uploadType=='list-file'">
      <a-upload
        class="upload-list-inline"
        list-type="picture"
        :customRequest="handleUpload"
        :remove="fileListRemove"
        @change="handleListChange"
      >
        <a-button>
          <a-icon type="upload" />
          点击上传
        </a-button>
      </a-upload>
    </template>
    <template v-else-if="uploadType==='single-img'">
      <a-upload
        name="avatar"
        list-type="picture-card"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        :customRequest="handleUpload"
        @preview="handlePreview"
        @change="handlePicChange"
        :remove="singlePicRemove"
        class="avatar-uploader"
      >
        <template v-if="imgFile.loaded">
          <img :src="imgFile.file.url" alt="图像异常" style="height:100px;width: 100px" />
        </template>
        <div v-else>
          <a-icon :type=" imgFile.loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">
            上传
          </div>
        </div>
      </a-upload>
    </template>
  </div>
</template>

<script>
import { RenderPicture, UploadFile } from '@/api/modules/file'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default {
  name: 'FileUploader',
  props: {
    uploadType: {
      type: String,
      require: true,
      default: 'draggable'
    },
    uploadFileList: {
      type: Array,
      default: () => []
    },
    imgFile: {
      type: Object,
      default: () => {
        return {
          loading: false,
          file: {},
          loaded: false
        }
      }
    },
    singleFile: {
      type: Object,
      default: () => {
        return {
          loaded: false,
          file: {}
        }
      }
    }
  },
  data () {
    return {
      // // 上传文件列表
      // uploadFileList: [],
      // // 仅上传单张图片
      // imgFile: {
      //   loading: false,
      //   file: {},
      //   loaded: false
      // },
      // singleFile: {
      //   loaded: false,
      //   file: {}
      // }
    }
  },
  methods: {
    async handlePreview (file) {
      console.log('handlePreview', file)
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },

    beforeUpload (file, UpFileList) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('封面仅能上传图片哦~')
      }
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isLt2M) {
        this.$message.error('上传的封面要小于5MB哦~')
      }
      return isJpgOrPng && isLt2M
      // // file：上传单个文件时候的文件内容，UpFileList：上传多个文件时的文件内容组成的数组
      // // 1、控制文件数量
      // if (this.uploadFileList.length + UpFileList.length > 10) {
      //   this.$message.warning('超过文件上传数量限制')
      //   // 设置上传的文件为错误状态
      //   file.status = 'error'
      //   return false
      // }
      // // 2、控制上传的文件大小
      // if (file.size > 1073741824) {
      //   this.$message.warning('文件大小超过最大限度1G')
      //   file.status = 'error'
      //   return false
      // }
      // // 3、控制上传文件不能为空
      // if (file.size === 0) {
      //   this.$message.warning('所选信息中存在空文件或目录，请重新选择')
      //   file.status = 'error'
      //   return false
      // }
      // // 4、控制已上传文件不重复
      // this.uploadFileList.map(item => {
      //   if (item.name === file.name) {
      //     this.$message.warning('不允许重复上传')
      //     file.status = 'error'
      //     return false
      //   }
      // })
      // // 5、控制上传文件的类型 arr是上传类型的白名单
      // const type = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
      // const arr = ['.jpg', '.png', '.jpeg', '.doc', '.docx', '.mp3', '.mp4']
      // if (arr.includes('.' + type)) {
      //   return true
      // } else {
      //   this.$message.warning(`不支持以 .${type} 扩展类型的文件或图片上传!`)
      //   file.status = 'error'
      //   return false
      // }
    },
    // 文件上传的自定义处理
    handleUpload (file) {
      const fileData = new FormData()
      fileData.append('file', file.file)
      const type = this.praseFileType(file.file.type)
      if (type < 0) {
        this.$message.error('上传文件类型转换错误')
      }
      fileData.append('type', type)
      fileData.append('source', 1)
      UploadFile(fileData).then(res => {
        // console.log('接口返回结果', res.data)
        file.onSuccess(res, file)
      }).catch(err => {
        console.log('fileUploadErr', err)
        // 文件上传失败
        this.$emit('uploadErr', err)
        file.onError(err, file)
      })
    },
    praseFileType (rawType) {
      // 判断传给服务端的文件类型参数
      let code = -1
      const types = [
        { pattern: 'text', code: 1 },
        { pattern: 'image', code: 2 },
        { pattern: 'audio', code: 3 },
        { pattern: 'video', code: 4 },
        { pattern: 'application', code: 5 }
      ]
      for (let i = 0; i < types.length; i++) {
        if (rawType.indexOf(types[i].pattern) >= 0) {
          code = types[i].code
          break
        }
      }
      return code
    },
    // 取出合适的值作为传递给父组件的信息
    parseFile (file) {
      let fileData = {}
      if (file.response) {
        fileData.name = file.name
        fileData.uid = file.uid
        fileData.fileId = file.response.data.fileId
        fileData.status = file.status
      } else {
        fileData = file
      }
      return fileData
    },
    /**
     * type===dragger
     */
    // 删除整体拖拽文件处理函数
    fileListRemove (file) {
      console.log('移除文件！！！', file, '当前filelist', this.uploadFileList)
      let removeIndex = -1
      for (let index = 0; index < this.uploadFileList.length; index++) {
        if (this.uploadFileList[index].uid === file.uid) {
          removeIndex = index
        }
      }
      this.uploadFileList.splice(removeIndex, 1)
      this.$emit('uploadFilesChange', this.uploadFileList)
    },
    // 当上传文件的状态发生变化时
    handleListChange (info) {
      if (info.file.status === 'done') {
        // console.log('此时的文件列表', this.uploadFileList)
        this.$message.success(`${info.file.name || ''} 上传成功`)
        // 当文件上传成功时，向父组件传达此时的文件列表
        this.uploadFileList.push(this.parseFile(info.file))
        this.$emit('uploadFilesChange', this.uploadFileList)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name || ''} 上传失败`)
      }
    },
    /**
     * type===single-file
     */
    // 删除单个文件
    singleRemove () {
      this.singleFile.loaded = false
      this.singleFile.file = undefined
    },
    handleSingleChange (info) {
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name || ''} 上传成功`)
        this.singleFile.file = this.parseFile(info.file)
        this.singleFile.loaded = true
        this.$emit('uploadSingleFileSuccess', this.singleFile.file)
      }
    },
    /**
     * type===img-only
     */
    // 单个图片上传删除
    singlePicRemove () {

    },
    // 响应图片文件上传的函数
    handlePicChange (info) {
      if (info.file.status === 'uploading') {
        this.imgFile.loading = true
      } else if (info.file.status === 'done') {
        this.imgFile.file = this.parseFile(info.file)
        // 文件fileId
        this.imgFile.loaded = true
        this.imgFile.file.url = RenderPicture(this.imgFile.file.fileId)
        this.$emit('uploadPicSuccess', this.imgFile.file)
      }
    },

    mounted () {
      // console.log(this.uploadType)
    }
  }
}
</script>

<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.upload-list-inline >>> .ant-upload-list-item {
  float: left;
  width: 250px;
  margin-right: 8px;
}
</style>

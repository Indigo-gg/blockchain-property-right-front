<template>
  <div>
    <a-upload
      class="upload-list-inline"
      list-type="picture"
      :customRequest="handleUpload"
      :before-upload="beforeUpload"
      :remove="fileListRemove"
      @change="handleListChange"
    >
      <a-button>
        <a-icon type="upload" />
        上传证明文件
      </a-button>
    </a-upload>
  </div>
</template>

<script>
import { UploadFile } from '@/api/modules/file'

export default {
  name: 'DocumentUploader',
  props: {},
  data () {
    return {
      uploadFileList: []
    }
  },
  methods: {
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
    handleUpload (file) {
      const fileData = new FormData()
      fileData.append('file', file.file)
      fileData.append('type', 2)
      fileData.append('source', 1)
      UploadFile(fileData).then(res => {
        file.onSuccess(res, file)
      }).catch(err => {
        this.$emit('uploadErr', err)
        file.onError(err, file)
      })
    },
    beforeUpload (file, UpFileList) {
      return new Promise((resolve, reject) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
          this.$message.error('证明文件只支持上传图片哦~')
          reject(new Error('证明文件只支持上传图片'))
        }
        const isLt5M = file.size / 1024 / 1024 < 5
        if (!isLt5M) {
          this.$message.error('上传的证明文件要小于5MB哦~')
          reject(new Error('上传的证明文件要小于5MB'))
        }
        // 控制文件数量
        if (this.uploadFileList.length + UpFileList.length > 5) {
          this.$message.warning('超过文件上传数量限制')
          file.status = 'error'
          reject(new Error('超过文件上传数量限制'))
        }
        // 控制已上传文件不重复
        console.log('当前上传的文件', file)
        console.log('当前已有的文件', UpFileList)
        this.uploadFileList.map((item, index) => {
          if (item.name === file.name) {
            this.uploadFileList.splice(index, 1)
            this.$message.warning('文件名重复,已替换旧文件!')
            file.status = 'error'
            reject(new Error('不可重复上传文件'))
          }
        })

        resolve(true)
      })
    },
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
    }
  }
}
</script>

<style scoped lang='less'>

</style>

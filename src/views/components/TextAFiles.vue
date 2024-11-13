<template>
  <div>
    <a-form-model :model="fromData">
      <a-form-model-item>
        <FileUploader upload-type="draggable" @uploadFilesChange="filesChanged"></FileUploader>
      </a-form-model-item>
      <a-form-model-item>
        <a-input type="textarea" @change="textChanged" v-model="fromData.text"></a-input>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import FileUploader from '@/views/components/FileUploader/DragableUploader'

export default {
  name: 'EvidenceForm',
  components: {
    FileUploader
  },
  props: {
   defaultData: {
     type: Object,
     default: () => { return { fileList: [], text: '' } }
   }
  },
  data () {
    return {
      fromData: {
        fileList: [],
        text: ''
      }
    }
  },
  methods: {
    filesChanged (files) {
      this.fromData.fileList = files
      console.log('filesChanged', this.fromData.fileList)
      this.emitContent()
    },
    textChanged () {
      this.emitContent()
    },
    emitContent () {
      this.$emit('changed', this.fromData)
      // console.log('TextAFilesEmited!',this.fromData)
    }
  },
  mounted () {
    this.fromData = this.defaultData
  }
}
</script>

<style scoped>

</style>

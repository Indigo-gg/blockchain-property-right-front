<template>
  <div id="userEditForm">
    <a-form-model :model="formData" :rules="formRules">
      <a-form-model-item>
        <!--用户上传头像-->
        <a-form-model-item>
          头像
          <FileUploader
            @uploadPicSuccess="avatarUploaded"
            upload-type="single-img"
            :img-file="defaultAvatar()"
          >
          </FileUploader>
        </a-form-model-item>
        <a-form-model-item :has-feedback="true" prop="name">
          <a-input v-model="formData.name" :disabled="hasUplink"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          性别
          <a-radio-group v-model="formData.gender">
            <a-radio :value="1">
              男
            </a-radio>
            <a-radio :value="2">
              女
            </a-radio>
            <a-radio :value="0">
              不愿透露
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item>
          生日
          <a-date-picker
            @change="datePicked"
            style="display: block"
            :defaultValue="defaultBirth()"></a-date-picker>
        </a-form-model-item>
        <a-form-model-item prop="email">
          邮箱
          <a-input v-model="formData.email"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          简介
          <a-input v-model="formData.brief"></a-input>
        </a-form-model-item>
      </a-form-model-item>
      <a-form-model-item>
        <a-popconfirm
          v-if="!hasUplink"
          okText="确定"
          cancelText="再想想"
          title="您键入的名字将被用作生成本平台内您的唯一身份认证，因此一经确认不支持更改"
          @confirm="GenerateAccount">
          <a-button type="primary">生成虚拟身份</a-button>
        </a-popconfirm>
        <a-button v-else type="primary" @click="submitUserInfoEdit">提交用户修改信息</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import FileUploader from '@/views/components/FileUploader/DragableUploader'
import GenderToggle from '@/views/components/GenderToggle/GenderToggle'
import moment from 'moment'
import { validEmail } from '@/utils/validate'
import { RenderPicture } from '@/api/modules/file'
import { UserNameLeagal } from '@/api/modules/user'

export default {
  name: 'UserEditForm',
  components: { FileUploader, GenderToggle },
  props: {
    profile: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      moment,
      formData: {
        avatar: '',
        name: '',
        brief: '',
        email: '',
        gender: 0,
        birth: ''
      },
      formRules: {
        name: [{ required: true, validator: this.nameValidator, trigger: 'change' }],
        email: [{ required: true, validator: this.emailValidator, trigger: 'blur' }]
      },
      hasUplink: false
    }
  },
  methods: {
    defaultAvatar () {
      return {
        loading: false,
        file: { url: RenderPicture(this.formData.avatar) },
        loaded: Boolean(this.formData.avatar)
      }
    },
    defaultBirth () {
      if (this.formData.birth) {
        return moment(this.formData.birth, 'YYYY-MM-DD')
      } else {
        return null
      }
    },
    // 头像上传成功
    avatarUploaded (avatar) {
      this.formData.avatar = avatar.fileId
    },
    datePicked (val, valString) {
      this.formData.birth = valString
    },
    // 当用户想要编辑信息时，将已有的信息传入~
    initUserInfo () {
      const { avatar, name, brief, email, gender, birth, publicAdd } = this.profile
      this.hasAccount = publicAdd === ''
      this.formData = { avatar, name, brief, email, gender, birth }
    },
    GenerateAccount () {
      this.$emit('generate', this.formData)
    },
    submitUserInfoEdit () {
      this.$emit('submit', this.formData)
    },
    emailValidator (rule, value, callback) {
      if (value !== '' && !validEmail(value)) {
        callback(new Error('邮箱格式不对哦~'))
      } else {
        callback()
      }
    },
    async nameValidator (rule, value, callback) {
      console.log(rule, value, callback)
      if (value === '') {
        callback(new Error('请填写用户名'))
      } else {
        const res = await UserNameLeagal({ name: value })
        console.log(res)
        res.data.isRepeated === 0 ? callback() : callback(new Error('已存在的用户名'))
      }
    }
  },
  mounted () {
    this.hasUplink = this.$store.getters.hasUpLink
    // 传入有效初值将触发表单填充
    if (this.profile !== undefined && typeof this.profile === 'object') {
      this.initUserInfo()
    }
  },
  // 监听profile的值从而解决父组件异步传入值子组件不更新
  watch: {
    profile: {
      handler () {
        this.initUserInfo()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>

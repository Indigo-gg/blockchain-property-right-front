<template>
  <div class="pwd-change-box">
    <a-form-model>
      <!--    旧密码-->
      <template v-if="ChangeType==BYOLDPWD">
        <a-form-model-item>
          <a-input v-model="formData.oldPassword"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="formData.newPassword"></a-input>
        </a-form-model-item>
      </template>
      <template v-else>
        <a-form-model-item>
          <a-input v-model="formData.newPassword"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-row>
            <a-col>
              <a-input v-model="formData.code"></a-input>
            </a-col>
            <a-col>
              <a-button></a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </template>
      <a-form-model-item>

      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: 'PasswordChange',
  data () {
    return {
      BYCAPTCHA: 0,
      BYOLDPWD: 1,
      ChangeType: this.BYCAPTCHA,
      formData: {
        oldPassword: '',
        newPassword: '',
        mobile: '',
        code: ''
      }
    }
  }
}
</script>

<style scoped>


</style>

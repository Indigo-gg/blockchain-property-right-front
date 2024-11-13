<template>
  <div class="withDrawSteps">
    <a-steps type="navigation" v-model="currentStep" >
      <a-step title="确认金额" :disabled="true">
        <template #icon>
          <svg-icon icon="withdraw-step1" ></svg-icon>
        </template>
      </a-step>
      <a-step title="提现方式" :disabled="true">
        <template #icon>
          <svg-icon icon="withdraw-step2"></svg-icon>
        </template>
      </a-step>
      <a-step title="用户认证" :disabled="true">
        <template #icon>
          <svg-icon icon="withdraw-step3"></svg-icon>
        </template>
      </a-step>
      <a-step title="提现完成" :disabled="true">
        <template #icon>
          <svg-icon icon="withdraw-step4"></svg-icon>
        </template>
      </a-step>
    </a-steps>
    <!--步骤1-->
    <div class="step" v-if="currentStep==0">
      <div>介绍体现的规则和额度、展示余额并提供输入选择</div>
    </div>
    <!--步骤2-->
    <div class="step" v-if="currentStep==1">
      <div>选择提现方式</div>
    </div>
    <!--步骤3-->
    <div class="step" v-if="currentStep==2">
      信息确认与认证
    </div>
    <!--步骤4-->
    <div class="step" v-if="currentStep==3">
      成功消息
    </div>
  </div>
</template>

<script>
import svgIcon from '@/components/svgIcon/svgIcon'
export default {
  name: 'WithDrawSteps',
  props: {},
  components: {
    svgIcon
  },
  data () {
    return {
      currentStep: 1
    }
  },
  methods: {
    next () {
      this.currentStep++
    }
  }
}
</script>

<style scoped lang='less'>

.withDrawSteps{
  .step{
    background-color: #c2eeac;
    width: 100%;
    height: 400px;
  }
}

</style>

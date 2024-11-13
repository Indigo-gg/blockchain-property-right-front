<template>
  <div class="report-detail-page right-protect-center-page">
    这里是举报页面的详情页
    <div v-for="(key,val,index) in details" :key="index">
      {{ val }}--- {{ key }}
    </div>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
import { GetReportDetail } from '@/api/modules/rightReport'

export default {
  name: 'ReportDetail',
  data () {
    return {
      details: {}
    }
  },
  methods: {
    async getDetail (reportId) {
      const res = await GetReportDetail({ reportId })
      this.details = res.data[0]
    }
  },
  mounted () {
    console.log('什么情况', this.$route.params.reportId)
    const reportId = Base64.decode(this.$route.params.reportId)
    this.getDetail(reportId)
  }
}
</script>

<style scoped>
.report-detail-page {

}
</style>

<template>
  <div class="report-list-page personal-center-page">
    <div class="personal-center-page-container">

      <page-header class="page-header" title="我发起的举报事件">
        <span slot="subTitle">protectList</span>
        <div slot="extra">
          <a-space>
            <a-button @click="getReportList" type="primary">刷新数据</a-button>
            <a-button :disabled="selected.length<1" type="danger" @click="delBatchs(selected)">批量删除</a-button>
          </a-space>
        </div>
        <!--        <div class="content">-->
        <!--          XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-->
        <!--        </div>-->
      </page-header>

      <div class="list-content-area">
        <div class="list-empty" v-if="reportList.length===0">
          <!--TODO 这里放上列表的空图片-->
        </div>
        <XyzTransitionGroup appear xyz="fade down-1 right-2 stagger-1" class="report-list">
          <div class="report-list-item personal-center-list-wrapper" v-for="(item,index) in reportList" :key="index">
            <div class="wrapper personal-center-list-item">
              <ReportCard
                :info="item"
                @switch="selectChange"
                @delete="delBatchs"
                @goDetail="goToDetail"
              >
              </ReportCard>
            </div>
          </div>
        </XyzTransitionGroup>
      </div>


      <a-drawer
        title="举报违规藏品"
        :width="900"
        :visible="submitVisible"
        :body-style="{ paddingBottom: '80px' }"
        @close="()=>{this.submitVisible=false}"
      >
        <report-form ref="submit-form" :artwork-id="artIdformRoute" @subSuccess="handleSubmitSuccess"></report-form>
      </a-drawer>
    </div>
  </div>
</template>

<script>

import ReportForm from '@/views/property-right/right-protect/report'
import { DelRightReport, ListRightReport } from '@/api/modules/rightReport'
import ReportCard from '@/views/property-right/components/ReportCard'
import PageHeader from '@/views/components/PageHeader/PageHeader'
export default {
  name: 'ReportList',
  components: {
    ReportCard,
    ReportForm,
    PageHeader
  },
  data () {
    return {
      // 从路由处跳转得到的藏品id
      artIdformRoute: 0,
      // 是否打开侧边表单
      submitVisible: false,
      loading: false,
      reportList: [],
      selected: []
    }
  },
  methods: {
    async getReportList () {
      this.reportList = []
      this.loading = true
      const res = await ListRightReport({ pageSize: 10, pageNumber: 1 })
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!', res)
      if (res.ok) {
        this.reportList = res.data
        console.log(this.reportList)
      }
      this.loading = false
    },
    async delBatchs (ids) {
      const data = { reportId: ids.toString() }
      const res = await DelRightReport(data)
      console.log(res)
      if (res.ok) {
        // TODO 这里需要有提示
        this.getReportList()
      }
    },
    goToDetail (reportId) {
      this.$router.push({
        name: 'RightReportDetail',
        params: { reportId: reportId }
      })
    },
    selectChange (item) {
      if (item.selected) {
        this.selected.push(parseInt(item.reportId))
      } else {
        this.selected.splice(this.selected.indexOf(item.reportId), 1)
      }
      console.log('report-selected:', this.selected)
    },
    // 处理维权事件生成成功的函数~
    handleSubmitSuccess () {
      this.submitVisible = false
      this.getReportList()
    }
  },
  mounted () {
    this.getReportList()
    if (this.$route.query.openSubmit) {
      this.artIdformRoute = this.$route.query.artworkId
      this.submitVisible = true
      setTimeout(() => {
        this.$refs['submit-form'].initForm()
        this.artIdformRoute = undefined
      }, 300)
    }
  }
}
</script>

<style scoped lang='less'>
.report-list-page {
  color: #eeeeee;
  min-height: 100vh;
}

.report-list {
  width: 90%;
  margin: 0 auto;
}

.report-list-item {
  padding: 0.65em;
  margin: 7px 0;
  //transition: all 0.4s ease;
  //border-radius: 6px;
  &:hover {
    transform: translateY(-0.5em);
    //background-color: rgba(255, 255, 255, 0.22);
  }
  .wrapper {
    //border-radius: 6px;
  }

  &:hover {

  }
}

</style>

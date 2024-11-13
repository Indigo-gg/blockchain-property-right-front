<template>
  <div class="personal-center-page">
    <div class="personal-center-page-container protect-list-page">
      <page-header :ghost="true" class="page-header" title="我发起的维权事件">
        <span slot="backIcon"><svg-icon icon="arrow-left"></svg-icon></span>
        <div slot="extra">
          <a-space>
            <a-button @click="getProtectedList" type="primary">刷新数据</a-button>
            <a-button :disabled="selected.length<1" type="danger" @click="DelBatchs(selected)">批量删除</a-button>
          </a-space>
        </div>
        <div slot="content">
        </div>
      </page-header>
      <div class="list-content-area">
        <div class="list-empty" v-if="protectList.length===0">
          <!--  TODO 空状态的图片-->
        </div>
        <XyzTransitionGroup appear xyz="fade down-1 right-2 stagger-1" class="protect-list">
          <div class="protect-list-item personal-center-list-wrapper" v-for="(item,index) in protectList" :key="index">
            <div class="wrapper personal-center-list-item">
              <protect-card
                :brief-info="item"
                @delete="DelBatchs"
                @switch="selectChange"
                @goDetail="goToDetail"
              >
              </protect-card>
            </div>
          </div>
        </XyzTransitionGroup>
      </div>
      <a-drawer
        :width="900"
        :visible="submitVisible"
        :body-style="{ paddingBottom: '80px' }"
        @close="()=>{this.submitVisible=false}"
      >
        <ProtectForm :artworkId="artIdformRoute" ref="submit-form" @subSuccess="handleSubmitSuccess"></ProtectForm>
      </a-drawer>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/views/components/PageHeader/PageHeader'
import ProtectForm from '@/views/property-right/right-protect/protect'
import { DelProtect, GetProtectList } from '@/api/modules/rightProtect'
import ProtectCard from '@/views/property-right/components/ProtectCard'
// import { Base64 } from 'js-base64'

export default {
  name: 'Index',
  components: {
    PageHeader,
    ProtectCard,
    ProtectForm
  },
  data () {
    return {
      loading: false,
      protectList: [],
      selected: [],
      submitVisible: false,
      artIdformRoute: 0
    }
  },
  methods: {
    async DelBatchs (ids) {
      const data = { saveRecordIds: ids.toString() }
      const res = await DelProtect(data)
      console.log('放弃维权事件结果！', res)
      if (res.ok) {
        this.getProtectedList()
      }
    },
    async getProtectedList () {
      this.protectList = []
      this.loading = true
      const res = await GetProtectList()
      if (res.ok) {
        this.protectList = res.data
      }
      this.loading = false
    },
    goToDetail (protectId) {
      this.$router.push({
        name: 'RightProtectDetail',
        params: { protectId: protectId }
      })
    },
    selectChange (item) {
      if (item.selected) {
        this.selected.push(parseInt(item.protectId))
      } else {
        this.selected.splice(this.selected.indexOf(item.protectId), 1)
      }
    },
    // 处理维权事件生成成功的函数~
    handleSubmitSuccess () {
      this.submitVisible = false
      this.getProtectedList()
    }
  },
  mounted () {
    this.getProtectedList()
    // 如果是从别的页面直接跳转过来的，那么会直接打开编辑框并填入内容
    // console.log('我从别的地方跳过来了', this.$route.query)
    if (this.$route.query.openSubmit) {
      this.artIdformRoute = this.$route.query.artworkId
      this.submitVisible = true
      setTimeout(() => {
        this.$refs['submit-form'].initForm()
        this.artIdformRoute = undefined
      }, 100)
    }
  }
}
</script>

<style scoped lang='less'>

.protect-list-page {
  color: #eeeeee;
  min-height: 100vh;
}

.protect-list {
  width: 90%;
  margin: 0 auto;
}
.protect-list-item {
  &:hover {
    transform: translateY(-0.5em);
    //background-color: rgba(255, 255, 255, 0.22);
  }
  .wrapper {
  }

  &:hover {

  }
}

</style>

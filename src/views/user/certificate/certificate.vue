<template>
  <div class="personal-center-page">
    <div class="personal-center-page-container artwork-manage-page ">
      <page-header
        title="我的证书"
        :back-icon="false"
      >
        <template slot="footer">
          <a-tabs default-active-key="-1" @change="tabChanged">
            <a-tab-pane :tab="getTypes(tab)" v-for="tab in indexs" :key="tab"/>
          </a-tabs>
        </template>
      </page-header>
      <div class="list-content-area">
        <div class="list-empty" v-if="certificateList.length===0">
          <!--TODO 空状态的图片-->
        </div>
        <XyzTransitionGroup appear xyz="fade down-1 right-2 stagger-0.5" class="protect-list">
          <div class="my-artwork-wrapper personal-center-list-wrapper " v-for="item in certificateList" :key="item.id">
            <!--这里是具体的条目-->
            <div class="my-artwork-item personal-center-list-item">
              <a-row type="flex" :gutter="16" justify="space-between">
                <a-col :span="6" class="col">
                  <a-tooltip title="证书区块链地址（可点击复制）">
                    <hash-plate :hash="item.certificateHash" color="blue"></hash-plate>
                  </a-tooltip>
                </a-col>
                <a-col :span="4" class="col">
                  <div>
                    <div class="title">《{{ item.artworkName }}》</div>
                  </div>
                </a-col>
                <a-col :span="2" class="col">
                  <a-tag :color="getCerTypeById(item.certificateType.toString()).color">
                    {{ getCerTypeById(item.certificateType.toString()).name }}
                  </a-tag>
                </a-col>
                <a-col :span="5" class="col">
                  <div class="time" v-if="item.certificateType===OWN_TYPE">更新时间：{{ item.updatedTime }}</div>
                  <div class="time" v-else>颁发时间：{{ item.createdTime }}</div>
                </a-col>
                <a-col :span="3" class="col">
                  <a-space>
                    <html2pic :id="item.id"></html2pic>
                  </a-space>
                </a-col>
              </a-row>
            </div>
          </div>
          <!--          <div class="empty" v-if="certificateList.length<=0" :key="-1">-->
          <!--            <svg-icon width="400" height="400" style="border-radius: 3px" icon="no-data"></svg-icon>-->
          <!--          </div>-->
        </XyzTransitionGroup>
      </div>


      <div class="pagination">
        <echo-pagination :total="totalCounts" @change="paginationChange"></echo-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import html2pic from '@/views/components/html2pic/html2pic'
import EchoPagination from '@/views/components/EchoPagination'
import PageHeader from '@/views/components/PageHeader/PageHeader'
import HashPlate from '@/views/components/HashPlate'
import {certificateConfig, getCerTypeById} from '@/views/config/config'
import {CertificateList} from '@/api/modules/certificate'
import Loading from '@/views/components/Loading/Loading'

export default {
  name: 'Certificate',
  components: {
    html2pic,
    EchoPagination,
    PageHeader,
    HashPlate,
    Loading
  },
  data() {
    return {
      getCerTypeById,
      pageLoading: true,
      picLoading: true,
      curTabKey: '0',
      OWN_TYPE: '2',
      totalCounts: 0,
      selectKey: '0',
      certificateList: [],
      certificateInfo: {},
      getTypes: certificateConfig.getTab,
      indexs: certificateConfig.indexs,
      params: {
        pageSize: 10,
        pageNumber: 1,
        certificateType: ''
      }
    }
  },
  methods: {
    tabChanged(key) {
      console.log('当前激活的key', key)
      this.selectKey = key
      this.params.certificateType = key
    },
    paginationChange(val) {
      this.params = {...this.params, ...val}
    },
    getList(type) {
      const LoadKey = Date.now()
      this.$message.loading({content: '正在获取...', key: LoadKey, duration: 0})
      this.pageLoading = true
      if (type === '-1') {
        this.params.certificateType = ''
      } else {
        this.params.certificateType = type
      }
      CertificateList(this.params).then(res => {
        console.log('certificate', res)
        if (res.ok) {
          this.certificateList = res.data
          this.pageLoading = false
          this.totalCounts = res.total
          this.$message.success({content: '获取成功!', key: LoadKey, duration: 2})
        }
      }).catch(err => {
        console.log('获取证书列表出错', err)
        this.$message.error({content: '获取数据异常!请检查网络', key: LoadKey, duration: 2})
      })
    }
  },
  watch: {
    params: {
      handler(val) {
        this.getList(val.certificateType)
      },
      immediate: true,
      deep: true
    }

  }
}
</script>

<style lang='less' scoped>

.filter-area {
  padding: 24px;
  background-color: #fff;
  border-radius: 5px;
}

.sale-brief-cover {
  width: 100px;
  height: 100px;
  background-color: #837e7e;
}


.my-artwork-wrapper {
  .my-artwork-item {
    .col {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .header {
      color: #707070;
      margin: 10px;
    }

    .cover {
      height: 70px;
      width: 70px;
      background-color: rgba(79, 79, 171, 0.65);
      border-radius: 3px;
    }

    .title {
      font-size: 1.2em;
      color: #6fbeb1;

    }

    .author {

    }

    .brief {

    }

  }

}

.time {
  font-size: 10px
}

.pagination {
  width: 80%;
  margin: 50px auto 30px;
}

.empty {
  width: 100%;
  text-align: center;
}

</style>

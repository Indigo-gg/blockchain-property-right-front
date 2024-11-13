<template>
  <div class="personal-center-page">
    <div class="personal-center-page-container">
      <page-header
        title="藏品管理"
        :back-icon="false"
      >
        <div slot="content">
          <!--这里放上一概览和饼图内容-->
        </div>
        <template slot="footer">
          <a-tabs default-active-key="1" @change="tabChanged">
            <a-tab-pane key="1" tab="我的创作"/>
            <a-tab-pane key="2" tab="已购得所有权藏品"/>
            <a-tab-pane key="3" tab="已购得使用权藏品"/>
          </a-tabs>
        </template>
      </page-header>
      <!--这里是筛选框-->
      <div class="filter-area">
        <a-row type="flex" justify="space-around">
          <a-col :span="4">
            <a-select default-value="1" @change="timeFilterChange" style="width: 100%">
              <a-select-option value="2">最近一周</a-select-option>
              <a-select-option value="3">最近一月</a-select-option>
              <a-select-option value="4">最近一年</a-select-option>
              <a-select-option value="1">全部时间</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="4">
            <a-input-search
              placeholder="按名称搜索"
              @search="nameFilterChange"></a-input-search>
          </a-col>
          <a-col :span="4">
            <a-select @change="tagFilterChange" style="width: 100%" placeholder="标签筛选">
              <a-select-option v-for="(type) in artworkTypes" :value="type.value" :key="type.value">
                {{ type.text }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="4">
            <a-select style="width: 100%" @change="statusFilterChange" placeholder="状态筛选">
              <a-select-option value="">全部状态</a-select-option>
              <a-select-option value="5">已上链待发售</a-select-option>
              <a-select-option value="6">使用权发售中</a-select-option>
              <a-select-option value="7">所有权发售中</a-select-option>
              <a-select-option value="8">两权发售中</a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </div>
      <div class="list-content-area">
        <div class="list-empty" v-if="ArtworkList.length==0">
          <!--TODO 这里放上空状态图-->
        </div>
        <XyzTransitionGroup appear xyz="fade down-1 right-2 stagger-0.5" class="protect-list">
          <div
            class="my-artwork-wrapper  personal-center-list-wrapper"
            v-for="(item) in ArtworkList"
            :key="item.artworkId">
            <!--这里是具体的条目-->
            <div class="my-artwork-item personal-center-list-item">
              <div class="header">
                <a-space>
                  <a-tooltip :title="hashType.text">
                    <hash-plate :hash="renderHash(item)" :color="hashType.color"></hash-plate>
                  </a-tooltip>
                  <!--                  <span>获取时间:{{ item.time }}</span>-->
                </a-space>
              </div>
              <a-row type="flex" :gutter="16" justify="space-between">
                <a-col :span="3" class="col">
                  <a-tooltip placement="topLeft" title="" arrow-point-at-center>
                  </a-tooltip>
                  <adaptive-img
                    :src="item.markedFileId"
                    :loaded="ArtworkListLoaded&&!!item.markedFileId"
                    img-class="cover"></adaptive-img>
                </a-col>
                <a-col :span="4" class="col">
                  <div>
                    <div class="title">《{{ item.artworkName }}》</div>
                    <div class="author">
                      <avatar-group :authors="item.author"></avatar-group>
                    </div>
                  </div>
                </a-col>
                <a-col :span="5" class="col">
                  <p class="brief text-overflow-2">{{ item.brief }}</p>
                </a-col>
                <a-col :span="2" class="col">
                  <a-tag :color="renderTags(item.tag).color">{{ renderTags(item.tag).text }}</a-tag>
                </a-col>
                <a-col :span="2" class="col">
                  <a-tag :color="renderStatus(item.status).color">
                    {{ renderStatus(item.status).text }}
                  </a-tag>
                </a-col>
                <a-col :span="8" class="col">
                  <a-space>
                    <a-button type="primary" @click="goToDetail(item.artworkId)">详情</a-button>
                    <a-button type="primary" @click="saleManage(item)">发售管理</a-button>
                    <a-button type="primary" @click="goToTrace(item.artworkId)">藏品溯源</a-button>
                  </a-space>
                </a-col>
              </a-row>
            </div>
          </div>
        </XyzTransitionGroup>
      </div>


      <div class="pagination">
        <echo-pagination :total="totolCounts" @change="paginationChange"></echo-pagination>
      </div>
      <a-modal
        :visible="openSaleManage"
        @cancel="()=>{this.openSaleManage=false}"
        :footer="null"
      >
        <div style="padding: 24px">
          <adaptive-img
            :src="selecedArtwork.markedFileId"
            :loaded="selecedArtworkLoaded"
            img-class="sale-brief-cover"></adaptive-img>
          <span>{{ selecedArtwork.name }}</span>
        </div>
        <a-tabs style="padding: 0 24px" default-active-key="Usufruct" @change="getSaleStatus">
          <a-tab-pane key="Usufruct" tab="使用权发售">
            <usufruct-sale
              :artwork-id="selecedArtwork.artworkId"
              :status="saleStatus"
              @change="getSaleStatus('Usufruct')"
            ></usufruct-sale>
          </a-tab-pane>
          <a-tab-pane key="Ownership" tab="所有权发售">
            <ownership-sale
              :artwork-id="selecedArtwork.artworkId"
              :status="saleStatus"
              @change="getSaleStatus('Ownership')"
            ></ownership-sale>
          </a-tab-pane>
        </a-tabs>
      </a-modal>
    </div>
  </div>
</template>

<script>
import AvatarGroup from '@/views/components/avatarGroup/avatarGroup'
import HashPlate from '@/views/components/HashPlate'
import EchoPagination from '@/views/components/EchoPagination'
import PageHeader from '@/views/components/PageHeader/PageHeader'
import AdaptiveImg from '@/views/components/AdaptiveImg'
import UsufructSale from '@/views/user/components/UsufructSale'
import OwnershipSale from '@/views/user/components/OwnershipSale'
import { pageConfig } from '@/views/config/config'
import { RenderPicture } from '@/api/modules/file'
import { GetManageList, GetOwnershipStatus, GetUsufructStatus, AtrworkRightOverlook } from '@/api/modules/transition'
import { Base64 } from 'js-base64'
import cloneDeep from 'lodash.clonedeep'

export default {
  name: 'ArtworkManage',
  components: { AdaptiveImg, PageHeader, UsufructSale, OwnershipSale, EchoPagination, HashPlate, AvatarGroup },
  props: {},
  data () {
    return {
      overlook: {
        'ownerNum': 0,
        'usufructNum': 0,
        'creatNum': 0
      },
      loading: false,
      curTabKey: 1,
      ArtworkList: [],
      artworkTypes: [],
      totolCounts: 0,
      ArtworkListLoaded: false,
      selecedArtworkLoaded: false,
      openSaleManage: false,
      saleStatus: {},
      timeFilters: [],
      hashType: {
        text: '藏品著作权资产地址',
        color: 'purple'
      },
      searchKeys: {
        type: '',
        artworkName: '',
        artworkType: '',
        status: '',
        formDate: '',
        toDate: '',
        pageSize: 10,
        pageNumber: 1
      },
      selecedArtwork: {
        id: '',
        markedFileId: '',
        name: '',
        createdTime: '',
        brief: '',
        type: '',
        releaseStatus: 1
      }
    }
  },
  methods: {
    RenderImg (fileId) {
      return RenderPicture(fileId)
    },
    renderStatus (status) {
      return pageConfig.getTag(status)
    },
    renderTags (tag) {
      return pageConfig.renderArtworkTag(tag)
    },
    renderHash (item) {
      if (this.searchKeys.type === '1') {
        return item.artworkHash
      } else if (this.searchKeys.type === '2') {
        return item.ownAdd
      } else {
        return item.utilizeAdd
      }
    },
    timeFilterChange (val) {
      const today = this.$moment().format('YYYY-MM-DD')
      switch (val) {
        case '1':
          this.searchKeys = { ...this.searchKeys, formDate: '', toDate: '' }
          break
        case '2':
          const lastWeek = this.$moment().subtract(7, 'days').format('YYYY-MM-DD')
          this.searchKeys = { ...this.searchKeys, formDate: lastWeek, toDate: today }
          break
        case '3':
          const lastMonth = this.$moment().subtract(30, 'days').format('YYYY-MM-DD')
          this.searchKeys = { ...this.searchKeys, formDate: lastMonth, toDate: today }
          break
        case '4':
          const lastYear = this.$moment().subtract(365, 'days').format('YYYY-MM-DD')
          this.searchKeys = { ...this.searchKeys, formDate: lastYear, toDate: today }
          break
      }
    },
    tagFilterChange (val) {
      this.searchKeys.artworkType = val
    },
    statusFilterChange (val) {
      if (val === '4') {
        this.searchKeys.status = ''
      } else {
        this.searchKeys.status = val
      }
    },
    nameFilterChange (val) {
      this.searchKeys.artworkName = val
    },
    paginationChange (val) {
      this.searchKeys = { ...this.searchKeys, ...val }
    },
    // tab栏更改后默认以pageSize：10，pageNumber:1来请求
    tabChanged (key) {
      this.searchKeys = {
        type: key,
        artworkName: '',
        artworkType: '',
        status: '',
        formDate: '',
        toDate: '',
        pageSize: 10,
        pageNumber: 1
      }
    },
    // 点开发售管理弹出子页面
    async saleManage (item) {
      const hasIdentified = this.$store.getters.hasIdentified
      if (!hasIdentified) {
        const key = `${Date.now()}`
        this.$notification.open({
          message: '未开通账户',
          description: <span>您并未开通账户,因此无法进行发售行为。请前往【个人中心>我的主页】完成实名认证激活账户]</span>,
          icon: <a-icon type='cry' style='color: #108ee9' />,
          duration: 4,
          btn: h => {
            return h(
              'a-button',
              {
                props: { type: 'primary', size: 'small' },
                on: { click: () => this.$notification.close(key) }
              },
              '我已了解'
            )
          },
          key
        })
      } else {
        this.selecedArtwork = item
        this.selecedArtworkLoaded = true
        await this.getSaleStatus('Usufruct')
        this.openSaleManage = true
      }
    },
    // 点开发售管理后的tab栏切换事件
    async getSaleStatus (key) {
      let res = {}
      if (key === 'Usufruct') {
        res = await GetUsufructStatus({ artworkId: this.selecedArtwork.artworkId })
        console.log('查看使用权发售状态返回结果', res)
      } else if (key === 'Ownership') {
        res = await GetOwnershipStatus({ artworkId: this.selecedArtwork.artworkId })
        console.log('查看所有权发售状态返回结果', res)
      } else {
        console.log('tab出错了')
      }
      console.log('我看看查到的saleStatus', res.data)
      this.saleStatus = res.data
    },
    async getArtworkList () {
      // 请求数据时添加加载效果      //提示信息
      const Loadkey = Date.now()
      this.ArtworkListLoaded = false
      this.$message.loading({ content: '正在获取...', duration: 0, key: Loadkey })
      try {
        const res = await GetManageList(this.searchKeys)
        this.$message.success({ content: '获取成功!', key: Loadkey, duration: 2 })
        this.ArtworkList = res.data
        this.ArtworkListLoaded = true
        this.totolCounts = res.total
        const key = this.searchKeys.type
        if (key === '1') {
          this.hashType = {
            text: '藏品著作权资产地址',
            color: 'gold'
          }
        } else if (key === '2') {
          this.hashType = {
            text: '藏品所有权资产地址',
            color: 'purple'
          }
        } else {
          this.hashType = {
            text: '藏品使用权资产地址',
            color: 'sliver'
          }
        }
      } catch (e) {
        this.ArtworkListLoaded = true
      }
    },
    goToDetail (artworkId) {
      console.log('我拿到的artworkID', artworkId)
      this.$router.push({
        name: 'ArtworkDetail',
        params: { artworkId: `${Base64.encode(artworkId.toString())}`, myCreate: this.searchKeys.type === '1' }
      })
    },
    goToTrace (id) {
      this.$router.push({
        name: 'ArtworkTrace',
        params: {
          artworkId: Base64.encode(id.toString())
        }
      })
      console.log('前往溯源页面')
    },
    async getArtworkOverlook () {
      const res = await AtrworkRightOverlook()
      this.overlook = res.data
    },
    refreshData () {
      this.getArtworkOverlook()
      this.getArtworkList()
    }
    // 获取我创作的藏品
  },
  mounted () {
    // 默认激活的tab是创作权的tab切换栏
    const temp = cloneDeep(pageConfig.artworkTags)
    temp.unshift({ text: '全部', value: '' })
    this.artworkTypes = temp
    this.tabChanged('1')
  },
  watch: {
    searchKeys: {
      async handler (val) {
        if (val.type !== '') {
          console.log('藏品筛选条件更新', val)
          this.getArtworkList()
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped lang='less'>

.filter-area {
  padding: 24px;
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
      color: #bdbdbd;
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
      color: #9abdec;
      text-align: center;
    }

    .author {
      width: 100%;
      transform: scale(0.8);
      text-align: center;

    }

    .brief {

    }
  }

}

.pagination {
  width: 80%;
  margin: 50px auto 30px;
}


</style>

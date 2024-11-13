<template>
  <div class="personal-center-page">
    <div class="personal-center-page-container">
      <page-header title="投稿中心" :back-icon="false">
        <div slot="extra">
          <a-space>
            <a-button @click="getMyArtworks">刷新</a-button>
            <a-button @click="openSubmitEdit">上传我的作品</a-button>
          </a-space>
        </div>
      </page-header>
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
            <a-select style="width: 100%" @change="statusFilterChange" placeholder="稿件状态筛选">
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="1">待审核</a-select-option>
              <a-select-option value="2">已退回</a-select-option>
              <a-select-option value="3">公示中</a-select-option>
              <a-select-option value="4">被举报</a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </div>
      <div class="list-content-area">
        <div class="list-empty" v-if="artworkList.length===0">
          <!--TODO 里面填上空缺图片-->
        </div>
        <XyzTransitionGroup appear xyz="fade down-1 right-2 stagger-1" class="protect-list">
          <div class="my-artwork-wrapper personal-center-list-wrapper" v-for="(item,index) in artworkList" :key="index">
            <div class="my-artwork-item personal-center-list-item">
              <!--              <div class="header">-->
              <!--                <span>编号:{{ item.artworkId }}</span>-->
              <!--                <span>上传时间:{{ item.createdTime }}</span>-->
              <!--              </div>-->
              <a-row type="flex" :gutter="16" justify="space-between">
                <a-col :span="3" class="col">
                  <div class="my-flex-center">
                    <adaptive-img
                      :src="item.markedfileId"
                      :loaded="!loading"
                      img-class="cover">
                    </adaptive-img>
                  </div>

                </a-col>
                <a-col :span="4" class="col">
                  <div class="my-flex-center">
                    <div class="title text-overflow-1">《{{ item.artworkName }}》</div>
                    <div class="authors">
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
                <a-col :span="3" class="col">
                  <a-tag :color="renderStatus(item.releaseStatus).color">
                    {{ renderStatus(item.releaseStatus).text }}
                  </a-tag>
                </a-col>
                <a-col :span="4" class="col">
                  <a-space>
                    <a-button type="primary" @click="goToDetail(item.artworkId)">详情</a-button>
                    <a-button type="danger" @click="abort(item.artworkId)">废弃</a-button>
                  </a-space>
                </a-col>
              </a-row>
            </div>
          </div>
        </XyzTransitionGroup>
      </div>
      <div class="pagination">
        <echo-pagination :total="totalCounts" @change="paginationChange"></echo-pagination>
      </div>
      <a-drawer
        title="编辑上传藏品信息"
        :width="720"
        :visible="ArtworkEditVisible"
        :body-style="{ paddingBottom: '80px' }"
        @close="()=>{this.ArtworkEditVisible=false}"
      >
        <ArtworkEditForm @subSuccess="SubmitArtSuccess" :key="Date.now()"></ArtworkEditForm>
      </a-drawer>
    </div>
  </div>
</template>
<script>
import { RenderPicture } from '@/api/modules/file'
import { MyUploadedArtworkList, DelArtwork } from '@/api/modules/artwork'
import AvatarGroup from '@/views/components/avatarGroup/avatarGroup'
import AdaptiveImg from '@/views/components/AdaptiveImg'
import ArtworkEditForm from '@/views/user/components/ArtworkEditForm'
import PageHeader from '@/views/components/PageHeader/PageHeader'
import EchoPagination from '@/views/components/EchoPagination'
import { pageConfig } from '@/views/config/config'
import { Base64 } from 'js-base64'
import cloneDeep from 'lodash.clonedeep'

export default {
  name: 'MultiSubmit',
  components: {
    ArtworkEditForm,
    PageHeader,
    EchoPagination,
    AdaptiveImg,
    AvatarGroup
  },
  data () {
    return {
      ArtworkEditVisible: false,
      artworkList: [],
      artworkTypes: [],
      totalCounts: 0,
      loading: false,
      selected: [],
      searchKeys: {
        type: '',
        artworkName: '',
        tag: '',
        status: '',
        formDate: '',
        toDate: '',
        pageSize: 10,
        pageNumber: 1
      }
    }
  },
  methods: {
    RenderImg (fileId) {
      return RenderPicture(fileId)
    },
    renderTags (tag) {
      return pageConfig.renderArtworkTag(tag)
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
      this.searchKeys.tag = val
    },
    statusFilterChange (val) {
      this.searchKeys.status = val
    },
    nameFilterChange (val) {
      this.searchKeys.artworkName = val
    },
    paginationChange (val) {
      this.searchKeys = { ...this.searchKeys, ...val }
    },
    // 用户想要打开上传界面
    openSubmitEdit () {
      const hasUplink = this.$store.getters.hasUpLink
      console.log('看一下我是不是上链', hasUplink)
      if (!hasUplink) {
        const key = `${Date.now()}`
        this.$notification.open({
          message: '个人信息未完善',
          description: <span>您当前为游客身份，暂未加入元宇宙世界。请前往【个人中心>我的主页】生成虚拟身份来继续探索叭~</span>,
          icon: <a-icon type='frown' style='color: #108ee9' />,
          duration: 4,
          btn: h => {
            return h(
              'a-button',
              {
                props: { type: 'primary', size: 'small' },
                on: { click: () => { this.$router.push({ name: 'UserHome' }) } }
              },
              '立即前往'
            )
          },
          key
        })
      } else {
        this.ArtworkEditVisible = true
      }
    },
    SubmitArtSuccess () {
      this.ArtworkEditVisible = false
      this.getMyArtworks()
    },
    async abort (id) {
      const res = DelArtwork({ id })
      console.log('废弃结果', res)
      if (res.ok) {
        this.$message.success('稿件已废弃！')
        await this.getMyArtworks()
      }
    },
    async getMyArtworks () {
      this.artworkList = []
      const LoadKey = Date.now()
      this.$message.loading({ content: '正在获取...', key: LoadKey, duration: 0 })
      this.loading = true
      const res = await MyUploadedArtworkList(this.searchKeys)
      console.log('查看投稿中心的返回数据', res)
      if (res.ok) {
        this.totalCounts = res.total
        this.artworkList = res.data
        this.loading = false
        this.$message.success({ content: '获取成功!', key: LoadKey, duration: 2 })
      }
    },
    renderStatus (status) {
      return pageConfig.getTag(status)
    },
    goToDetail (artworkId) {
      this.$router.push({
        name: 'ArtworkDetail',
        params: { artworkId: `${Base64.encode(artworkId.toString())}`, myCreate: true }
      })
    }
  },
  mounted () {
    const temp = cloneDeep(pageConfig.artworkTags)
    temp.unshift({ text: '全部', value: '' })
    this.artworkTypes = temp
    // this.getMyArtworks()
  },
  watch: {
    searchKeys: {
      handler (val) {
        this.getMyArtworks()
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped lang='less'>

//列表空状态的区域
.list-content-area {
  min-height: 40vh;
}

.filter-area {
  margin: 20px;
  border-radius: 5px;
}

.pagination {
  width: 80%;
  margin: 50px auto 30px;
}

.my-artwork-wrapper {
  .my-artwork-item {
    margin-bottom: 1em;

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
      font-size: 10px;
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
    }

    .author {
      transform: scale(0.6);

    }

    .brief {

    }
  }

}

.item {
  color: rgba(28, 28, 28, 0.98);
  font-size: 1.2em;
  margin: 20px auto;
}
</style>

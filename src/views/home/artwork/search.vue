<template>
  <div class="page">
    <div class="head">
      <div class="title">
        <!--    {{title}}-->
        <work-search
          ref="search"
          :is-hidden-input="false"
          size="large"
          width="60em"
          @handleSearch="handleSearch"
        ></work-search>
      </div>
      <div class="tip">{{ tips }}</div>

    </div>
    <div class="body">
      <div class="artworks">
        <Loading class="loading" :size="70" :loading="isLoading" icon="loading1"></Loading>
        <div class="artwork" v-if="!isLoading">
          <!--          <div class="art-group" v-for="work in artworks" v-if="artworks.length>0">-->
          <a-list :grid="workGrid" :data-source="artworks" v-if="artworks.length>0">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <div class="my-flex-center">
                <art-card :info="item">
                </art-card>
              </div>
            </a-list-item>
          </a-list>
          <!--          </div>-->
          <div class="empty" v-else>
            <svg-icon width="200" height="200" style="border-radius: 3px" icon="no-data"></svg-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/views/components/Loading/Loading'
import svgIcon from '@/components/svgIcon/svgIcon'
import artCard from '@/views/home/components/artSaleCard/ArtSaleCard'
import workSearch from '@/views/home/components/search/workSearch'
import { GetArtworkList } from '@/api/modules/artwork'
import { pageConfig } from '@/views/config/config'

export default {
  name: 'Search',
  components: {
    workSearch,
    Loading,
    svgIcon,
    artCard
  },
  data () {
    return {
      artworkParams: {
        artworkType: '',
        keyword: '',
        formDate: '',
        toDate: '',
        release_status: '',
        sortedWay: '',
        li_status: '',
        pageNumber: 1,
        pageSize: 10
      },
      title: '搜索结果',
      value: '',
      type: '',
      isLoading: true,
      artworks: [],
      tips: '搜索结果如下',
      workGrid: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3
      }

    }
  },
  methods: {
    setInput () {
      const search = this.$refs.search
      search.$data.value = this.value
      search.$data.searchType = this.type
      console.log('searchDom', search, this.value, this.type)
    },
    getList () {
      this.isLoading = true
      console.log(this.artworkParams)
      GetArtworkList(this.artworkParams).then(res => {
        this.artworks = res.data
        setTimeout(() => {
          this.isLoading = false
        }, pageConfig.loadingTime)
      })
    },
    handleSearch (e) {
      this.type = e.searchType
      this.value = e.value
      this.getList()
    }
  },
  async mounted () {
    console.log('route', this.$route.params)
    this.artworkParams = { ...this.artworkParams, li_status: this.$route.params.searchType, keyword: this.$route.params.value }
    const res = await GetArtworkList(this.artworkParams)
    this.isLoading = false
    console.log('拿到了搜索的结果', res)
    this.artworks = res.data
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  width: 100vw;
  background-color: #4b4a4a;
}

.head {
  display: flex;
  align-items: center;
  flex-direction: column;
  /*margin-top: 20px;*/
  height: 100px;
}
.tip{
  display: inline;
  align-self: flex-start;
  margin-left: 5vw;
}

.title {
  margin-top: 20px;
  width: 100%;
  text-align: center;
}
.empty {
  width: 100%;
  text-align: center;
}
</style>

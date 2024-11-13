<template>
  <pagination
    show-size-changer
    :page-size-options="pageSizeOptions"
    :total="total"
    @showSizeChange="pageSizeChange"
    @change="pageNumChange"
  />
</template>

<script>
import { Pagination } from 'ant-design-vue'
export default {
  name: 'EchoPagination',
  components: {
   Pagination
  },
  props: {
    total: {
      type: Number,
      required: true,
      default: () => {
        return 30
      }
    }
  },
  data () {
    return {
      size: 10,
      number: 1,
      pageSizeOptions: ['10', '20', '30', '40', '50']
    }
  },
  methods: {
    pageSizeChange (current, size) {
      this.emitChange(current, size)
    },
    pageNumChange (page, pageSize) {
      this.emitChange(page, pageSize)
    },
    emitChange (pageNumber, pageSize) {
      this.$emit('change', { pageSize, pageNumber })
    }
  },
  mounted () {
    this.size = this.pageSize
    this.number = this.pageNumber
  }
}
</script>

<style scoped lang='less'>

</style>


<template>
  <!-- 分页模块 -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageParams.pageNum"
    :page-sizes="pageSizes"
    :page-size="pageParams.pageSize"
    :layout="layout"
    :total="pageParams.total">
  </el-pagination>
</template>
<script>
export default {
  name: 'wuiPage',
  props: {
    pageParams: {
      type: Object,
      default: () => ({})
    },
    total: [Number, String],
    pageSizes: {
      type: Array,
      default: () => ([10, 20, 50, 100])
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  methods: {
    handleCurrentChange (vals) {
      this.$emit('number', vals)
    },
    handleSizeChange (vals) {
      this.$emit('size', vals)
    }
  }
}
</script>

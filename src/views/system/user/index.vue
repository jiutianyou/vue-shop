<template>
  <el-table :data="tableData" border>
    <el-table-column label="序号" type="index" width="50" align="center">
    </el-table-column>
    <el-table-column label="用户名称" min-width="120" show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.applyCode }}</template>
    </el-table-column>
    <el-table-column label="账号" min-width="120" show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.patentName }}</template>
    </el-table-column>
    <el-table-column label="性别" min-width="120" show-overflow-tooltip>
      <template slot-scope="scope">
        {{ scope.row.caseTypeName}}
      </template>
    </el-table-column>
    <el-table-column label="手机号" min-width="120" show-overflow-tooltip>
      <template slot-scope="scope">
        {{ scope.row.applyDate}}
      </template>
    </el-table-column>
    <el-table-column label="邮箱" min-width="120" show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.patentStatusDesc }}</template>
    </el-table-column>
    <el-table-column label="职位" min-width="120" show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.patentStatusDesc }}</template>
    </el-table-column>
    <el-table-column label="状态" min-width="120" show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.patentStatusDesc }}</template>
    </el-table-column>
    <el-table-column label="创建时间" min-width="120" show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.patentStatusDesc }}</template>
    </el-table-column>
    <el-table-column label="修改时间" min-width="120" show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.patentStatusDesc }}</template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {

  },
  data () {
    return {
      tableData: []
    }
  },
  mounted () {

  },
  methods: {

  }
  
}
</script>
<style lang="scss" scoped>

</style>

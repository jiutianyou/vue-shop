<template>
  <article class="ips-content ips-content--fixed">
    <IpsSearchBar labelWidth="8em" @search="findTableDatas" @clear="resetFun" :advance="false" :multipleActions="false">
      <FormItem labelWidth="0">
        <el-input v-model="searchForm.searchKey" placeholder="用户名称" clearable>
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </FormItem>
      <FormItem label="创建时间">
        <el-date-picker :picker-options="pickerOptions"
          value-format="yyyy-MM-dd" @change="changeFilingFun"
          v-model="filingDate"
          type="date"
          align="right">
        </el-date-picker>
      </FormItem>
    </IpsSearchBar>
    <ListLayout>
      <el-table v-loading="loading" border :data="tableDatas" :max-height="tableHeight">
        <el-table-column label="序号" width="55" type="index" align="center">
        </el-table-column>
        <el-table-column label="操作" width="60px" align="center">
          <template slot-scope="scope">
            <OperationWrap>
              <el-button type="text" class="btn_item_li" @click="clickDetailFun(scope.row, 'checkDetail')">详情</el-button>
              <el-button type="text" class="btn_item_li" @click="clickDetailFun(scope.row, 'checkEdit')">编辑</el-button>
            </OperationWrap>
          </template>
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
    </ListLayout>
    <!-- 分页模块 -->
    <div class="ips-content--fixed__footer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
    </div>
  </article>
</template>
<script>
import { getUserList } from '@/api/system/user.js'
import { emitResize } from '@/utils/autoHeight'
import { pickerOptions } from '@/utils/index'
import { ListLayout, IpsSearchBar, FormItem, OperationWrap } from '@/components/UI'
export default {
  components: {
    ListLayout, IpsSearchBar, FormItem, OperationWrap
  },
  props: {
    activeTab: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      pickerOptions: {
        shortcuts: pickerOptions
      },
      tableHeight: 50000,
      tableDatas: [],
      selectedData: [], // 选中数据
      pageNum: 1,
      pageSize: 10,
      pageTotal: 0,
      searchForm: {},
      filingDate: []
    }
  },
  mounted () {
    emitResize(this)
    // this.findTableDatas()
  },
  methods: {
    changeFilingFun (vals) {
      vals = Array.isArray(vals) ? vals : []
      this.searchForm.filingDateStart = vals[0] || ''
      this.searchForm.filingDateEnd = vals[1] || ''
    },
    resetFun () {
      this.searchForm = {}
      this.filingDate = []
      this.findTableDatas()
    },
    // 调用列表数据
    async findTableDatas () {
      let params = { ...this.searchForm, pageSize: this.pageSize, pageNum: this.pageNum, type: this.activeTab }
      this.loading = true
      let res = await getUserList(params)
      res = res.data
      if (res.status === 0 && res.data) {
        this.loading = false
        this.tableDatas = Array.isArray(res.data.list) ? res.data.list : []
        this.pageTotal = res.data.total
      }
    },
    // 选中数据
    selectedChange (vals) {
      this.selectedData = vals
    },
    // pageSize切换事件
    handleSizeChange (val) {
      this.pageNum = 1
      this.pageSize = val
      this.findTableDatas()
    },
    // pageNum切换事件
    handleCurrentChange (val) {
      this.pageNum = val
      this.findTableDatas()
    },
    clickDetailFun (row, type) {
      let url = ''
      this.$router.push({ path: url })
    }
  }
}
</script>

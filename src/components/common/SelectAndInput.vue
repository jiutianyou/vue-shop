<template>
  <el-autocomplete popperClass="auto_complete_input"
    v-model="formData[value]"
    :fetch-suggestions="querySearchFun"
    placeholder="请输入内容" @clear="handleClear" clearable
    @select="handleSelect">
    <template slot-scope="{ item }">
      <div class="name">{{ item[listName] }}</div>
    </template>
  </el-autocomplete>
</template>
<script>
import { getAllUser } from '@/api/common'
export default {
  name: 'autoComleteInput',
  props: {
    formData: {
      type: Object,
      default: () => ({})
    },
    label: String,
    id: String,
    value: [Number, String],
    dataList: {
      type: Array,
      default: () => ([])
    },
    listName: String,
    listValue: [Number, String]
  },
  data () {
    return {
    }
  },
  methods: {
    // 选择
    handleSelect (item) {
      this.formData[this.id] = item[this.listValue]
      this.formData[this.value] = item[this.listName]
    },
    // 清除
    handleClear () {
      this.formData[this.id] = ''
      this.formData[this.value] = ''
    },
    querySearchFun (query, cb) {
      let _this = this
      let result = []
      if (!query) {
        result = this.dataList
      } else {
        result = this.dataList.filter(item => {
          if (item[_this.listName].includes(query)) {
            return item
          }
        })
      }
      cb(result)
    },
    // 搜索当前公司员工列表
    async querySearchAsync (query, cb) {
      let result = []
      if (!query) {
        result = []
      } else {
        let data = {
          status: 0, searchKey: query
        }
        let res = await getAllUser(data)
        res = res.data
        if (res.status === 0 && res.data) {
          result = Array.isArray(res.data) ? res.data : []
        }
      }
      cb(result)
    }
  }
}
</script>

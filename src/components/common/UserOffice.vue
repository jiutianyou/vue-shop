<template>
  <el-select
    ref="customer"
    v-model="formDataCopy[value]"
    clearable
    placeholder="请输入选择"
    :disabled="disabled"
    @change="changeFun"
    filterable
    remote
    :collapse-tags="collapseTag"
    :multiple="multiple"
    @focus="getAllUserFocus"
    :remote-method="getAllUserAPI"
    :loading="loading">
    <el-option v-for="item in userList"
      :key="item.id"
      :label="showlabelFun(item)"
      :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
// import { deepClone } from '@/utils/index'
import { getAllUser, getAllUserById } from '@/api/common'
export default {
  name: 'userOffice',
  props: {
    priorityId: { // 优先id查询
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    value: [Number, String],
    name: String,
    formData: {
      type: Object,
      default: () => ({
        [this.value]: ''
      })
    },
    extraName: String,
    multiple: {
      type: Boolean,
      default: false
    },
    collapseTag: {
      type: Boolean,
      default: true
    },
    callApi: Function
  },
  data () {
    return {
      loading: false,
      userList: [],
      cachVal: '',
      formDataCopy: {
        [this.value]: ''
      }
    }
  },
  watch: {
    formData: {
      handler (val) {
        this.formDataCopy = this.formData
        let vals = this.formDataCopy[this.value]
        if (vals && typeof vals === 'string') {
          this.formDataCopy[this.value] = Number(vals)
        }
        // id优先查询
        if (this.priorityId && val[this.value]) {
          this.getAllUserByIdFun(val[this.value])
        } else if (val[this.name] && this.cachVal !== val[this.name]) {
          // 名称查询
          this.cachVal = val[this.name]
          this.getAllUserAPI(val[this.name])
        } else if (!val[this.name] && val[this.value]) {
          this.getAllUserByIdFun(val[this.value])
        }
      },
      deep: true
    }
  },
  methods: {
    // 显示值
    showlabelFun (item) {
      if (this.extraName && item[this.extraName]) {
        return `${item.name}_${item[this.extraName]}`
      }
      return `${item.name}`
    },
    // 根据用户名称查询用户列表
    async getAllUserAPI (query) {
      if (!query) {
        return
      }
      let data = {
        // status: 0,
        searchKey: query
      }
      this.loading = true
      let callService = this.callApi ? this.callApi : getAllUser
      // let res = await getAllUser(data)
      let res = await callService(data)
      this.loading = false
      res = res.data
      if (res.status === 0 && res.data) {
        this.userList = Array.isArray(res.data) ? res.data : []
      }
    },
    // 值改变
    changeFun (id) {
      if (!id) {
        this.formDataCopy[this.name] = ''
        this.$emit('change', '', this.name)
        return
      }
      if (!this.name) {
        return
      }
      for (let item of this.userList) {
        if (item.id === id) {
          this.formDataCopy[this.name] = item.name
          break
        }
      }
      this.$emit('change', id, this.name, this.formDataCopy)
    },
    // 根据id查询用户
    async getAllUserByIdFun (id) {
      let params = [id]
      let { data } = await getAllUserById(params)
      if (data.status === 0 && data.data) {
        this.userList = Array.isArray(data.data) ? data.data : []
      }
    },
    // 获取焦点查询数据
    getAllUserFocus () {
      if (this.userList.length) {
        return
      }
      this.getAllUserAPI('a')
    }
  }
}
</script>

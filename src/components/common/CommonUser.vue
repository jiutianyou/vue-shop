<template>
  <el-select
    ref="customer"
    v-model="formData[value]"
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
        this.formDataCopy = { ...this.formData }
        let vals = this.formDataCopy[this.value]
        if (vals && typeof vals === 'string') {
          this.formDataCopy[this.value] = Number(vals)
          this.$set(this.formData, [this.value], Number(vals))
        }
        // id优先查询
        if (this.priorityId && val[this.value]) {
          this.getAllUserByIdFun(val[this.value])
        } else if (val[this.name] && this.cachVal !== val[this.name]) {
          // 名称查询
          this.cachVal = val[this.name]
          this.getAllUserAPI(val[this.name])
        } else if (val[this.value]) {
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
        let str = `${item[this.extraName]}`
        let set = new Set(str.split(','))
        str = Array.from(set).join()
        return `${item.name}_${str}`
      }
      return `${item.name}`
    },
    // 根据用户名称查询用户列表
    async getAllUserAPI (query) {
      if (!query) {
        return
      }
      let data = {
        searchKey: query
      }
      this.loading = true
      let callService = this.callApi ? this.callApi : getAllUser
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
        this.$set(this.formData, [this.name], '')
        this.$emit('change', this.formData)
        return
      }
      if (!this.name) {
        return
      }
      for (let item of this.userList) {
        if (item.id === id) {
          this.$set(this.formData, [this.name], item.name)
          break
        }
      }
      this.$emit('change', this.formData)
    },
    // 根据id查询用户
    async getAllUserByIdFun (id) {
      let params = []
      if (Array.isArray(id)) {
        params = id
      } else if (id) {
        params = [id]
      }
      if (!params.length) {
        return
      }
      let { data } = await getAllUserById(params)
      if (data.status === 0 && data.data) {
        this.userList = Array.isArray(data.data) ? data.data : []
        if (!this.userList.length && id) {
          this.$set(this.formData, [this.value], '')
        }
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

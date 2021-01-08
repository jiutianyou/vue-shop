<template>
  <div class="auto_complete_input_warp">
    <el-autocomplete class="auto_complete_input" popperClass=""
      v-model="content"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容" @clear="handleClear" clearable
      @select="handleSelect">
      <template slot-scope="{ item }">
        <div class="name" v-if="item[label]">{{ item[label] }}: {{ item[listName] }}</div>
        <div class="name" v-else>{{ item[listName] }}</div>
      </template>
    </el-autocomplete>
    <el-button style="margin-left:5px;" :disabled="!content" type="primary" size="mini" @click="addItemFun('')">{{btnText}}</el-button>
    <div class="multiple__div">
      <span v-for="item in formData[this.value]" :key="item"
        class="span__name">{{item}}
        <i class="el-icon-circle-close" @click="deleteFun(item)"></i>
      </span>
    </div>
  </div>
</template>
<script>
import { deepClone } from '@/utils/index'
export default {
  name: 'autoComleteInput',
  props: {
    maxTips: {
      type: String,
      default: ''
    },
    maxSize: {
      type: Number,
      default: 20
    },
    validateFn: Function,
    btnText: {
      type: String,
      default: '确定'
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    label: String,
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
      content: '',
      initData: true
    }
  },
  watch: {
    formData: {
      handler (vals) {
        if (this.formData[this.value] && this.initData) {
          this.content = this.formData[this.value].join()
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 搜索过滤数据
    querySearchAsync (query, cb) {
      let result = []
      if (query) {
        result = this.dataList.filter(item => {
          let vals = String(item[this.listName])
          if (vals && vals.includes(query)) {
            return item
          }
        })
      }
      if (!result.length) {
        if (!query) {
          result = deepClone(this.dataList)
        } else {
          result = []
        }
      }
      this.arylist = result
      cb(result)
    },
    handleSelect (item) {
      this.addItemFun(item[this.listName])
    },
    handleClear () {
      this.content = ''
    },
    // 删除
    deleteFun (vals) {
      let index = -1
      this.formData[this.value].forEach((item, i) => {
        if (item === vals) {
          index = i
        }
      })
      this.formData[this.value].splice(index, 1)
      this.initData = false
    },
    // 点击添加按钮
    addItemFun (vals) {
      vals = vals || this.content
      if (typeof this.validateFn === 'function') {
        let msg = this.validateFn(vals)
        if (msg) {
          this.$message.warning(msg)
          return
        }
      }
      if (vals && this.formData[this.value].includes(vals)) {
        this.$message.warning('不能输入或选择重复的数据')
        return
      }
      if (this.formData[this.value].length >= this.maxSize) {
        let tips = this.maxTips || `最多限制${this.maxSize}条数据`
        this.$message.warning(tips)
        return
      }
      if (vals) {
        this.formData[this.value].push(vals)
      }
      this.initData = false
    }
  }
}
</script>
<style scoped lang="scss">
  .auto_complete_input_warp{
    // display: flex;
    .auto_complete_input{
      width:200px;
    }
    .multiple__div{
      margin-top: 10px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border: 1px solid #D3E1EF;
      height: 60px;
      overflow-y: auto;
      padding-left: 10px;
      padding-bottom: 5px;
      .span__name{
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        padding: 0px 5px;
        margin-right: 5px;
        margin-top: 5px;
        float: left;
        :hover{
          cursor: pointer;
          border-color: aquamarine;
        }
      }
    }
  }
</style>

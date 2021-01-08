
<template>
  <!-- 表格模块 -->
  <el-table-column
    :fixed="item.fixed"
    :label="item.label"
    :min-width="item.minWidth"
    :width="item.width"
    :show-overflow-tooltip="item.showTip"
  >
    <template slot-scope="scope" >
      <div v-if="fieldType === 'date'">
        {{ scope.row[value] | parseDate }}
      </div>
      <div v-if="fieldType === 'dateTime'">
        {{ scope.row[value] | parseTime }}
      </div>
      <div v-if="fieldType === 'general'">
        {{ item.filter ? callFilterdFun(item.filter, scope.row) : scope.row[value] }}
      </div>
      <OperationWrap :row="scope.row" v-if="fieldType==='operation'">
        <el-button v-for="opt in optBtns" style="float:left;"
          :key="opt.id"
          :type="opt.type"
          :disabled="opt.disabled ? callDisabledFun(opt.disabled, scope.row) : false"
          v-show="opt.show ? callShowFun(opt.show, scope.row) : true"
          v-permission="opt.permission"
          @click="callBackFun(opt.callName, scope.row)">
          {{opt.name}}
        </el-button>
      </OperationWrap>
    </template>
  </el-table-column>
</template>
<script>
import { OperationWrap } from '@/components/UI'
export default {
  name: 'wuiColumn',
  components: {
    OperationWrap
  },
  props: {
    fieldType: {
      type: String,
      default: 'general'
    },
    type: String,
    optBtns: {
      type: Array,
      default: () => ([])
    },
    item: {
      type: Object,
      default: () => ({})
    },
    minWidth: {
      type: [Number, String],
      default: 'auto'
    },
    width: {
      type: [Number, String],
      default: '120'
    },
    value: String,
    showTip: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 点击事件
    callBackFun (callName, vals) {
      this.$emit('handChange', callName, vals)
    },
    // 是否禁用按钮
    callDisabledFun (callName, vals) {
      this.$emit('handChange', callName, vals)
      return vals['priDisabled']
    },
    // 是否展示按钮
    callShowFun (callName, vals) {
      this.$emit('handChange', callName, vals)
      return vals['priShowed']
    },
    // 处理过滤器
    callFilterdFun (callName, vals) {
      this.$emit('handChange', callName, vals)
      return vals['priFilterVals']
    }
  }
}
</script>

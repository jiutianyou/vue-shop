<template>
<el-dialog :title="dialogProp.title" :visible.sync="dialogProp.visible" append-to-body
    :close-on-press-escape='false' :close-on-click-modal='false'
    custom-class="patent__form__common__valid__dialog" :before-close="closeFn" :width="dialogWidth">
    <el-form v-if="isShowForm" ref="formDataRef" :model="searchFormProp" :label-width="labelWidth"
        class="colon-form" label-position="left" :rules="rulesProp">
      <WForm :fields="formFields" @change="changeFun" :searchForm="searchFormProp"/>
    </el-form>
    <WGrid v-if="isShowGrid" :tableData="tableDataProp" :tableLabel="tableLabelProp" :tableOpt="tableOpt" />
    <slot name="content"></slot>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeFn" size="mini">{{closeBtnName}}</el-button>
      <el-button type="info" size="mini" @click="submitFun" >{{cinfimBtnName}}</el-button>
      <slot name="operateBtn"></slot>
    </div>
</el-dialog>
</template>
<script>
import WForm from '@/views/components/wuiForm/index'
import WGrid from '@/views/components/wuiGrid/Grid'
export default {
  components: {
    WForm,
    WGrid
  },
  props: {
    dialogProp: {
      type: Object,
      default: () => ({})
    },
    rulesProp: {
      type: Object,
      default: () => ({})
    },
    searchFormProp: {
      type: Object,
      default: () => ({})
    },
    formFields: {
      type: Array,
      default: () => ([])
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    dialogWidth: {
      type: String,
      default: '500px'
    },
    closeBtnName: {
      type: String,
      default: '取消'
    },
    cinfimBtnName: {
      type: String,
      default: '确认'
    },
    tableDataProp: {
      type: Array,
      default: () => ([])
    },
    tableLabelProp: {
      type: Array,
      default: () => ([])
    },
    tableOpt: {
      type: Object,
      default: () => ({})
    }

  },
  data () {
    return {
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
    },
    // 监听参数变化
    changeFun (vals, { start, end, value, classify }) {
      if (classify === 'date' && Array.isArray(vals)) {
        vals = vals || ['', '']
        this.$set(this.dialogProp.searchForm, [start], vals[0])
        this.$set(this.dialogProp.searchForm, [end], vals[1])
      } else {
        this.$set(this.dialogProp.searchForm, [value], vals)
      }
    },
    closeFn (reload, params) {
      this.$emit('close', reload, params)
    },
    submitFun () {
      let flag = true
      this.$refs['formDataRef'].validate(valid => {
        if (!valid) {
          flag = false
        }
      })
      if (!flag) {
        return
      }
      let { data = {}, searchForm, callback } = this.dialogProp
      let params = { ...data, ...searchForm, callback }
      this.closeFn('reload', params)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dialog__wrapper /deep/ {
  .patent__form__common__valid__dialog{
    .el-form{
      .el-col{
        width:100%;
      }
    }
  }
}
</style>

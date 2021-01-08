<template>
  <el-form style="overflow:hidden;" :label-width="labelWidth" :label-position="labelPosition">
    <el-row :gutter="gutter">
      <FormItem :label="item.label" v-for="(item,index) in fieldDatas"
      :key="index" >
      <div class="customize" v-if="item.type==='customize'" v-html="customizeFn(item.format, dataInfo[item.name])"></div>
      <template v-else-if="item.type==='slot'">
        <slot :name="item.slot"></slot>
      </template>
      <div v-else :title="item.format ? formatterFn(item.format, dataInfo[item.name]) : dataInfo[item.name]">
        {{ item.format ? formatterFn(item.format, dataInfo[item.name]) : dataInfo[item.name] }}
      </div>
    </FormItem>
    </el-row>
  </el-form>
</template>
<script>
import { FormItem } from '@/components/UI' // IpsSearchBar, ListLayout
export default {
  components: {
    FormItem
  },
  props: {
    fieldList: {
      type: Array,
      default: () => ([])
    },
    dataInfo: {
      type: Object,
      default: () => ({})
    },
    gutter: {
      type: Number,
      default: 30
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    labelPosition: {
      type: String,
      default: 'left'
    }
  },
  watch: {
    fieldList: {
      handler (val) {
        this.resolueFields(val)
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      fieldDatas: [],
      datas: '<div>test hello world</div>'
    }
  },
  methods: {
    resolueFields (vals = []) {
      let temp = vals.filter(item => {
        return !item.isHidden
      })
      this.fieldDatas = [...temp]
    },
    customizeFn (callback, val) {
      return callback(val)
    },
    // 参数过滤
    formatterFn (filterFn, val) {
      try {
        if (typeof filterFn === 'function') {
          return filterFn(val)
        } else if (typeof filterFn === 'string') {
          // 注册的全局过滤器
          if (this.$root.$options.filters[filterFn]) {
            return this.$root.$options.filters[filterFn](val)
          } else {
            return val
          }
        } else if (Array.isArray(filterFn)) {
          return filterFn[val]
        }
      } catch (e) {
        console.error('过滤函数' + filterFn + '参数错误:' + e)
      }
    }
  }
}
// 使用方法
// <WDetail :dataInfo="writeForm" :fieldList="fieldList" >
//   <template slot="mobile">
//     <ShowPhone :dataInfo="writeForm" fieldKey="mobile"/>
//   </template>
// </WDetail>
// import WDetail from '@/views/components/wuiDetail/index'
// fieldList: [
//   {
//     label: '案件编号', name: 'caseCode'
//   },
//   {
//     label: '专利类型', name: 'caseTypeDesc'
//   },
//   {
//     label: '业务类型', name: 'businessBranchName'
//   },
//   {
//     label: '是否同日申请', name: 'isSameApplyDesc', isHidden: true
//   },
//   {
//     label: '相关联卷号', name: 'relateDocumentCode'
//   },
//   {
//     label: '立案时间', name: 'filingDate', format: 'parseDate'
//   },
//   {
//     label: '技术类型',
//     name: 'technicalClass',
//     format: (val) => {
//       let filterFn = this.$options.filters['techClassFilter']
//       return filterFn(val)
//     }
//   },
//   {
//     label: '关联案件',
//     name: 'sameDaySubmitCaseList',
//     type: 'customize',
//     format: (val) => {
//       let values = '孝悌忠信礼义廉耻，德智体美劳' || this.$options.filters['sameDateSubmitFilter'](val)
//       return `<div title="${values}" style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">${values}</div>`
//     }
//   },
//   {
//     label: '联系电话', slot: 'mobile', type: 'slot'
//   }
// ]
</script>
<style scoped lang="scss">
  .el-form-item__content{
    div{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>

// 表格组件
import WColumn from './Column'
export default {
  name: 'wuiGrid',
  components: {
    WColumn
  },
  props: {
    gridFields: {
      type: Array,
      default: () => ([])
    },
    type: String
  },
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    // 事件触发器
    handChange (callName, vals) {
      this.$emit('handChange', callName, vals)
    }
  },
  render (h) {
    let template = <template></template>
    template.children = []
    this.gridFields.forEach(item => {
      template.children.push(
        <WColumn
          onhandChange={this.handChange}
          item={item}
          label={item.label}
          value={item.value}
          minWidth={item.minWidth}
          width={item.width}
          showTip={item.showTip}
          fieldType={item.fieldType}
          disabled={item.disabled}
          optBtns={item.optBtns}
        >
          <solt></solt>
        </WColumn>
      )
    })
    // 确定是否有序号
    if (this.type === 'index') {
      template.children.unshift(<el-table-column fixed="left" type="index" width="45" label="序号"></el-table-column>)
    }
    return template
  }
}

// 使用方法
// <WGrid :gridFields="gridFields" type="index" @handChange="emitChangeFn" />
// import WGrid from '@/views/components/wuiGrid'
// data () {
//   return {
//    gridFields: [
//       {
//         label: '操作', width: '100', fieldType: 'operation', fixed: 'left',
//         optBtns: [
//           { id: 1, type: 'text', name: '详情', callName: 'checkOrEditDetail', disabled: 'disabledBtnFn', show: 'showBtnFn', permission: "'/patent/case/manage/detail'" },
//           { id: 2, type: 'text', name: '上传回执', callName: 'uploadFun' }
//         ]
//       },
//       {
//         label: '客户自缴批次号', width: '100', value: 'financeBatchCode'
//       },
//       {
//         label: '客户名称', width: '150', value: 'customerName'
//       },
//       {
//         label: '客户自缴时间', width: '100', value: 'financePayDate', fieldType: 'date'
//       },
//       {
//         label: '处理状态', width: '100', value: 'statusName'
//       },
//       {
//         label: '业务类型', width: '150', value: 'businessBranchName'
//       },
//       {
//         label: '总金额', width: '100', value: 'amount',
//       },
//       {
//         label: '缴费数量', width: '150', value: 'number', filter: 'numberFilterFn'
//       },
//       {
//         label: '缴费方式', width: '150', value: 'payMethodName'
//       },
//       {
//         label: '请款人', width: '100', value: 'upUserName'
//       },
//       {
//         label: '请款人所属办事处', minWidth: '150', value: 'upUserDepartmentName'
//       },
//       {
//         label: '请款时间', minWidth: '150', value: 'upRequestDate', fieldType: 'date'
//       }
//     ],
//   }
// }

// method: {
//   // 点击触发事件
//   emitChangeFn (callName, vals) {
//     this[callName](vals)
//   },
//   // 是否禁用按钮
//   disabledBtnFn (vals) {
//     let flag = vals.status !== 4
//     vals['priDisabled'] = flag
//   },
//   // 是否展示按钮
//   showBtnFn (vals) {
//     let flag = vals.status === 4
//     vals['priShowed'] = flag
//   },
//   // 处理字段显示数据
//   numberFilterFn (vals) {
//     let result = ''
//     if (vals['number'] <= 1) {
//       result = '正常'
//     } else {
//       result = '超常'
//     }
//     vals['priFilterVals'] = result
//   }
// }

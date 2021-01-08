// 表单组件
import Wselect from './Select'
import Winput from './Input'
import Wdate from './Date'
import Wcheckbox from './Checkbox'
import Wradio from './Radio'
import CommonUser from '@/views/components/common/CommonUser'
import { FormItem } from '@/components/UI'
export default {
  name: 'wuiForm',
  components: {
    Winput,
    Wselect,
    Wdate,
    Wcheckbox,
    Wradio,
    CommonUser,
    FormItem
  },
  props: {
    fields: {
      type: Array,
      default: () => ([])
    },
    multiple: Boolean,
    searchForm: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {

    }
  },
  computed: {
  },
  watch: {
    fields: {
      handler (vals) {
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handChange (vals, fd, extra) {
      console.log(arguments)
      this.$emit('change', vals, fd, extra)
    }
  },
  render (h) {
    let template = <div></div>
    template.children = []
    this.fields.forEach(item => {
      if (item.classify === 'input') {
        template.children.push(
          <Winput
            labelWidth={item.labelWidth}
            placeholder={item.placeholder}
            label={item.label}
            value={item.value}
            type={item.type}
            classify={item.classify}
            clearable={item.clearable}
            searchForm={this.searchForm}
            required={item.required}
            disabled={item.disabled}
            maxlength={item.maxlength}
            rows={item.rows}
            on-change={(e) => { this.handChange(e, item) }}
          />
        )
      } else if (item.classify === 'select') {
        template.children.push(
          <Wselect
            placeholder={item.placeholder}
            label={item.label}
            value={item.value}
            classify={item.classify}
            clearable={item.clearable}
            filterable={item.filterable}
            dataList={item.dataList}
            listValue={item.listValue}
            listName={item.listName}
            searchForm={this.searchForm}
            required={item.required}
            disabled={item.disabled}
            on-change={(e) => { this.handChange(e, item) }}
          />
        )
      } else if (['datetime', 'date'].includes(item.classify)) {
        template.children.push(
          <Wdate
            label={item.label}
            value={item.value}
            classify={item.classify}
            clearable={item.clearable}
            valueFormat={item.valueFormat}
            type={item.type}
            start={item.start}
            end={item.end}
            required={item.required}
            disabled={item.disabled}
            searchForm={this.searchForm}
            expireTimeOption={item.expireTimeOption}
            on-change={(e) => {
              if (item.type === 'daterange') {
                this.handChange(e, item)
              } else {
                this.handChange(e, item)
              }
            }}
          />
        )
      } else if (item.classify === 'radio') {
        template.children.push(
          <Wradio
            placeholder={item.placeholder}
            label={item.label}
            value={item.value}
            classify={item.classify}
            clearable={item.clearable}
            dataList={item.dataList}
            listValue={item.listValue}
            listName={item.listName}
            searchForm={this.searchForm}
            required={item.required}
            disabled={item.disabled}
            on-change={(e) => { this.handChange(e, item) }}
          />
        )
      } else if (item.classify === 'checkbox') {
        template.children.push(
          <Wcheckbox
            placeholder={item.placeholder}
            label={item.label}
            value={item.value}
            classify={item.classify}
            clearable={item.clearable}
            dataList={item.dataList}
            listValue={item.listValue}
            listName={item.listName}
            searchForm={this.searchForm}
            required={item.required}
            disabled={item.disabled}
            on-change={(e) => { this.handChange(e, item) }}
          />
        )
      } else if (item.classify === 'customizeUser') {
        template.children.push(
          <FormItem label={item.label} prop={item.value}>
            <CommonUser formData={this.searchForm} value={item.value} name={item.name} />
          </FormItem>
        )
      }
    })
    return template
  }
}
// 表单查询组件调用方法
// <WForm :fields="fields" @change="changeFun" :searchForm="patentParams"/>
// import WForm from '@/views/components/wuiForm/index'
// fields: [
//   {
//     label: '合同编号', value: 'contractCode', classify: 'input', clearable: true
//   },
//   {
//     label: '客户名称', value: 'customerName', classify: 'input', clearable: true
//   },
//   {
//     watchType: 'businessTypeList', label: '业务类型', value: 'businessBranchCode', classify: 'select', clearable: true, dataList: this.businessTypeList, listName: 'value', listValue: 'key'
//   },
//   {
//     watchType: 'patentTypeArr', label: '专利类型', value: 'caseType', classify: 'select', clearable: true, dataList: patentTypeArr, listName: 'name', listValue: 'id'
//   },
//   {
//     label: '立案日期', value: 'filingDate', start: 'filingDateStart', end: 'filingDateEnd', classify: 'date', clearable: true, type: 'daterange', valueFormat: 'timestamp'
//   }
//  {
//   label: '单选框', value: 'user', classify: 'radio', clearable: true, dataList: [{ name: '个人100%', id: 0 }, { name: '客户100%', id: 1 }], listName: 'name', listValue: 'id'
//  },
//  {
//   label: '多选框', value: 'patent', classify: 'checkbox', clearable: true, dataList: [{ name: '发明', id: 0 }, { name: '外观', id: 1 }], listName: 'name', listValue: 'id'
//  }
// ],
// 监听下拉框数据来源于异步接口
// watch: {
//   businessTypeList (vals) {
//     this.fields.forEach(item => {
//       if (item.watchType === 'businessTypeList') {
//         item['dataList'] = vals
//       }
//     })
//   }
// },
// 监听参数变化
// changeFun (vals, { start, end, value, classify }) {
//   if (classify === 'date' && Array.isArray(vals)) {
//     vals = vals || ['', '']
//     this.patentParams[start] = vals[0]
//     this.patentParams[end] = vals[1]
//     delete this.patentParams[extra]
//   } else {
//     this.patentParams[value] = vals
//   }
// },

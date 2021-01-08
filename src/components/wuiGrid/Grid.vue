<template>
  <el-table
      ref="table"
      element-loading-text="Loading"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width:100%">
      <el-table-column v-for="(item,index) in tableLabel" :key="index" :align="item.align" :label="item.label" :prop="item.param"
        :width="item.width ? item.width : ''" :sortable="item.sortable ? 'custom' : false">
        <template slot-scope="scope">
          <span v-if="item.render">
            {{item.render(scope.row)}}
          </span>
          <span v-else>{{scope.row[item.param]}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="tableOpt.label" :width="tableOpt.width" :label="tableOpt.label" :align="item.align || 'center'"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button  v-for="(item,index) in tableOpt.options" :key="index" :type="item.type" :icon="item.icon"
              @click="handleButton(item.methods,scope.row,scope.index)" size="mini">
            {{item.label}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableLabel: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableOpt: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {},
  methods: {
    handleButton (callback, item, index) {
      callback(item, index)
    }
  }
}

// 调用方法
// <table-cmp
//     :table-data="tableData"
//     :table-label="tableLabel"
//     :table-option="tableOpt">
// </table-cmp>

// tableData:[],
// tableLabel: [
//   { label: '用户名', param: 'usr', align: 'center',sortable:true },
//   { label: '公司名称', param: 'company', align: 'center' },
//   { label: '办公邮箱', param: 'email', align: 'center',width:'200' },
//   { label: '注册时间', param: 'registTime', align: 'center',sortable:true },
//   { label: '审核状态', param: 'status', align: 'center',sortable:true, render:  (row) => {
//       if (row.status === 0) {
//         return '未审核'
//       } else if (row.status === 1) {
//         return '审核通过'
//       } else if(row.status ===2) {
//         return '审核不通过'
//       } else {
//         return '禁用'
//       }
//     }
//   }
// ],
// tableOpt: {
//   label: '操作',
//   width: '200',
//   options: [
//     { label: '预览', type: 'primary', icon: 'el-icon-view', methods: 'preview' },
//     { label: '审核', type: 'primary', icon: 'el-icon-upload2', methods: 'audit' },
//   ]
// }

</script>

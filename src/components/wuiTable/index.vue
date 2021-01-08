<template>
  <div class="wui-table">
    <el-table
      :data="tableData"
      :ref="tableRef"
      @select="select"
      @select-all="selectAll"
      :row-key="rowKey"
      @selection-change="selectionChange"
      :height="filterParams(tableConfig.height, null)"
      :max-height="filterParams(tableConfig.maxHeight, null)"
      :stripe="filterParams(tableConfig.stripe, false)"
      :empty-text="filterParams(tableConfig.emptyText, '暂无数据')"
      :border="tableConfig.border || true"
      :rowClassName="tableConfig.rowClassName || null"
      :showSummary="tableConfig.showSummary || false"
      :summaryMethod="tableConfig.summaryMethod?summaryMethod : null "
      :sumText="tableConfig.sumText || '合计'"
      v-if="isShowTable"
      class="wui-table">
      <template v-for="(col,index) in columnConfig">
        <!-- 序号，选项框 -->
        <el-table-column
          v-if="defaultColumnType.includes(col.type) && !col.hide"
          :type="col.type"
          :key="index"
          :fixed="col.fixed || false"
          :align="col.align || align"
          :reserve-selection="col.reserveSelection || false"
          :selectable="col.selectable || null"
          :width="col.width || 55"
          :minWidth="col.minWidth || 'auto'"
          :label="col.label">
        </el-table-column>
        <!-- 操作按钮 -->
        <el-table-column
          v-else-if="col.type === 'operation' && !col.hide"
          :fixed="col.fixed || false"
          :align="col.align || align"
          :width="col.width || ''"
          :minWidth="col.minWidth || 'auto'"
          :key="index"
          :label="col.label"
          :prop="col.prop">
          <template slot-scope="{row, $index}">
            <div>
              <template v-for="(opt,i) in col.optConfigs">
                <el-switch
                  :key="i"
                  class="switchBtn"
                  v-if="opt.type === 'switch' && optBtnShow(opt.showFn,row)"
                  v-model="opt.model"
                  :active-color="opt.switchConfig.activeColor || '#13ce66'"
                  @change="opt.switchCallBack ? opt.switchCallBack($event, opt.prop, $index,row) : new Function()"
                  :active-value="opt.switchConfig.activeValue || 1"
                  :inactive-value="opt.switchConfig.inactiveValue || 0"
                  :inactive-color="opt.switchConfig.inactiveColor || '#cccccc'"
                  :disabled="optBtnDisabled(opt.disabledFn, row)"
                >
                </el-switch>
                <slot
                  v-else-if="opt.type === 'slot' && optBtnShow(opt.showFn, row)"
                  :name="opt.soltName"
                  :data="{row,$index}"
                  @click="opt.click ? opt.click(row,$index) : new Function()"
                >
                </slot>
                <el-button v-permission="opt.permission"
                  v-else-if="optBtnShow(opt.showFn, row)"
                  @click="opt.click ? opt.click(row,$index) : new Function()"
                  :key="i"
                  :class="opt.class"
                  :icon="opt.icon || ''"
                  :type="opt.type"
                  :disabled="optBtnDisabled(opt.disabledFn, row)"
                >
                {{opt.name}}
              </el-button>
              </template>
            </div>
          </template>
        </el-table-column>
        <!-- 自定义特殊列 -->
        <slot
          v-else-if="col.type==='solt' && !col.hide"
          :name="col.soltName"
          :prop="col.prop"
          :label="col.label"
          :width="col.label">
        </slot>
        <!-- 普通列 -->
        <el-table-column
          v-else-if="!col.hide"
          :key="index"
          :fixed="col.fixed || false"
          :align="col.align || align"
          :width="col.width || ''"
          :minWidth="col.minWidth || 'auto'"
          :label="col.label"
          :prop="col.prop"
          :show-overflow-tooltip="col.overflowHide || true">
          <template slot-scope="{row,$index}">
            <div
              :class="col.className"
              @click="col.clickFn ? item.clickFn(row,row[col.prop], $index, col.prop) : ()=>{}"
            >
              {{ col.formatter ? formatterFn(row,row[col.prop], $index, col.formatter) : row[col.prop]}}
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageConfig.pageNum"
      :page-size="pageConfig.pageSize || pageSize"
      :page-sizes="pageConfig.pageSizes || pageSizes"
      :layout="pageConfig.layout || layout"
      :total="pageConfig.total || total"
      v-if="isShowPage">
    </el-pagination>
  </div>
</template>
<script>
// import draggable from 'vuedraggable'
// import Sortable from 'sortablejs'
export default {
  components: {
    // draggable,
    // Sortable
  },
  props: {
    /**
     * ref 标识
     * 用于用户获取表格
     * 调用element的Table Methods里面的方法
     *
     */
    tableRef: {
      type: String,
      default: 'wuiTable'
    },
    // 表格数据
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     * 表格配置
     *
     * 目前支持的函数key有
     * select（当用户手动勾选数据行的 Checkbox 时触发的事件
     * selectAll（当用户手动勾选全选 Checkbox 时触发的事件）
     * selectionChange（当选择项发生变化时会触发该事件）
     * 常用配置有
     * height:string/number表格高
     * maxHeight：string/number表格最大高度
     * stripe:boolean 是否为斑马纹
     * emptyText:string 空数据时的文本
     * border:boolean
     * showSummary:boolean是否显示合计
     * summaryMethod:function ({ columns, data } 自定义的合计计算方法
     * sumText:String 合计行第一列的文本
     * rowClassName:function({row, rowIndex}) /String 行的  className 的回调方法，
     * 也可以使用字符串为所有行设置一个固定的 className，通常用于控制某行的颜色
     * */
    tableConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * 表格列配置
     * {
     * label:string, // 列标题
     * prop:string, // 对应列的字段名
     * type：string, // 当前列类型支持solt(插槽，自定义)、selection（多选框）、index（索引）、switch（switch开关）、button（按钮栏）、text(div,普通列，默认值))
     * selectable:function // 计算当前行是否可以勾选 ，当type 为selection时使用
     * switchCallBack:Function, // 当type为switch时必传   switch 开光状态改变回调函数
     * btnConfigs:array, // 当type为button时必传  ，具体参数看第71行代码  <template v-for="(btn,i) in item.btnConfigs">
     * width:string, // 对应列的宽度
     * minWidth:string, // 最小列宽
     * clickFn:function, // 当前列点击回调，常用于点跳转Function(row, cellValue,$index,prop( 对应列的字段名))
     * fixed:string, boolean // 列是否固定在左侧或者右侧，true 表示固定在左侧
     * formatter:Function,string,array // 回调函数参数Function(row, cellValue, index) ，
     * string代表是挂载在全局的过滤函数 ,array代表val是下标array[val]
     * align:string // 对齐方式
     * className:string // 列的样式类名，用于改变类颜色
     * classNameFunc:function // 用于动态计算列类名函数，便于根据不用内容显示不同样式，Function(row, cellValue, index){return calss}
     * overflowHide:boolean  //是否超出隐藏，默认是
       hide:boolean、function: true 代表隐藏此列
     vPermission:string,ips自定义权限指令  ,如果权限名称改了，请同步修改本组件v-permission
     * }
     *
     */
    columnConfig: {
      type: Array,
      required: true,
      default: () => []
    },
    /**
     * 分页配置
     * page:number, // 初始页数，默认1
     * pageSize:number , // 初始条数 。默认20
     * pageChange:Function // 点击分页页数或者条数改变回调函数 Function(page.pageSize)
     * sizes:array //下拉选择页数数组  默认[10,20,50,100]
     * total:总数
    */
    pageConfig: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 20
        }
      }
    },
    // 是否表格，单独显示分页
    isShowTable: {
      type: Boolean,
      default: true
    },
    // 是否显示分页，单独显示表格
    isShowPage: {
      type: Boolean,
      default: true
    },
    // 默认表格对齐方式
    align: {
      type: String,
      default: 'left'
    },
    rowKey: {
      type: String,
      default: null
    },
    // 是否开启拖拽
    drag: {
      type: Boolean,
      default: false
    }
    // 行拖拽结束回调函数
    // dragOnRowEnd: {
    //   type: Function,
    //   default: () => { return new Function() }
    // },
    // // 列拖拽结束回调函数
    // dragOnColumnEnd: {
    //   type: Function,
    //   default: new Function()
    // }

  },
  data () {
    return {
      pageSize: 10,
      pageNum: 1,
      pageSizes: [10, 20, 50, 100],
      total: 0,
      layout: 'total, sizes, prev, pager, next, jumper',
      defaultColumnType: ['index', 'selection']
      // defaultFunction: new Function(),
    }
  },
  mounted () {
    // if (this.drag) {
    //   if (this.rowKey === null) {
    //     console.warn('已开启拖拽功能，请定义rowKey，rowKey为行数据的 Key，用来优化 Table 的渲染；在使用 拖拽功能时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。')
    //   }
    //   this.openDrag()
    // }
  },
  methods: {
    // // 行拖拽
    // openDrag () {
    //   const tbody = document.querySelector('.el-table__body-wrapper tbody')
    //   const _this = this
    //   Sortable.create(tbody, {
    //     onEnd (data) {
    //       _this.dragOnRowEnd(data)
    //       // const currRow = _this.tableData.splice(data.oldIndex, 1)
    //       // 在新位置插入新值
    //       // _this.tableData.splice(data.newIndex, 0, currRow[0])
    //     }
    //   })
    // },
    // // 列拖拽
    // columnDrop () {
    //   const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
    //   const _this = this
    //   this.sortable = Sortable.create(wrapperTr, {
    //     animation: 180,
    //     delay: 0,
    //     onEnd: event => {
    //       const oldItem = _this.dropCol[event.oldIndex]
    //       _this.dropCol.splice(event.oldIndex, 1)
    //       _this.dropCol.splice(event.newIndex, 0, oldItem)
    //       _this.dragOnColumnEnd(data)
    //     }
    //   })
    // },
    summaryMethod (params) {
      if (this.tableConfig.summaryMethod) {
        // 如果有高，表头固定需要在初始化时主动触发重新计算合计行位置
        if (this.tableConfig.height) {
          this.$nextTick(() => {
            this.$refs.wuiTable.doLayout()
          })
        }
        return this.tableConfig.summaryMethod(params)
      }
    },
    buttonType (type) {
      return type || 'text'
    },
    // 改变page
    handleCurrentChange (vals) {
      this.pageConfig.pageNum = vals
      this.pageConfig.changeEvent({ pageNum: vals })
    },
    // 改变每页数量时，当前页回到第一页，防止请求不到数据
    handleSizeChange (vals) {
      this.pageConfig.changeEvent({ pageSize: vals, pageNum: 1 })
    },
    //  过滤参数
    filterParams (params, defaultVal) {
      return params || defaultVal
    },
    // 参数过滤
    formatterFn (row, val, index, filterFn) {
      try {
        if (typeof filterFn === 'function') {
          return filterFn(row, val, index)
        } else if (typeof filterFn === 'string') {
          if (this.$root.$options.filters[filterFn]) {
            return this.$root.$options.filters[filterFn](val)
          } else {
            return val
          }
        } else if (Array.isArray(filterFn)) {
          return filterFn[val]
        }
      } catch (e) {
        console.error('表格过滤函数 == ' + filterFn + ' ==参数错误:' + e)
      }
    },
    // 操作按钮是否禁用
    optBtnDisabled (fn, row) {
      if (typeof fn === 'function') {
        return fn(row)
      }
      return false
    },
    // 操作栏按钮隐藏
    optBtnShow (fn, row) {
      if (typeof fn === 'function') {
        return fn(row)
      }
      return true
    },
    // 选项框改变事件
    selectionChange (e) {
      if (this.tableConfig.selectionChange) {
        this.tableConfig.selectionChange(e)
      }
    },
    // 全选事件
    selectAll (e) {
      if (this.tableConfig.selectAll) {
        this.tableConfig.selectAll(e)
      }
    },
    // 勾选事件
    selectFn (selection, row) {
      if (this.tableConfig.select) {
        this.tableConfig.select(selection, row)
      }
    }
  }
}
// ****************使用方法 start ******************
// data () {
//   return {
//     searchForm: {}, // 查询数据
//     tableConfig: {
//       selectionChange: this.selectionChange
//     },
//     pageConfig: {
//       pageSize: 10,
//       pageNum: 1,
//       total: 0,
//       changeEvent: this.changePageEvent || function () {}
//     },
//     columnConfig: [
//       {
//         type: 'index'
//       },
//       {
//         type: 'button',
//         label: '操作',
//         btnConfigs: [
//           {
//             name: '办理',
//             click: (row) => {
//               this.$router.push({
//                 path: '/IPOperation/caseBeforeDetail',
//                 query: {
//                   contractCode: row.contractCode,
//                   caseStatus: row.caseStatus
//                 }
//               })
//             }
//           }
//         ]
//       },
//       {
//         type: 'text',
//         label: '立案号',
//         prop: 'filingCode',
//         minWidth: 150
//       },
//       {
//         type: 'text',
//         label: '合同号',
//         prop: 'contractCode',
//         minWidth: 150
//       },
//       {
//         type: 'text',
//         label: '客户名称',
//         minWidth: 150,
//         prop: 'customerName'
//       },
//       {
//         type: 'text',
//         label: '业务类型',
//         prop: 'businessBranchName'
//       },
//       {
//         type: 'text',
//         label: '产品分类',
//         prop: 'businessProjectName'
//       },
//       {
//         type: 'text',
//         label: '立案日',
//         prop: 'filingDate',
//         formatter: 'parseDate'
//       },
//       {
//         type: 'text',
//         label: '剩余办理时间',
//         prop: 'limitTime'
//       }
//     ]
//   }
// },
// method: {
//   // 获取表格数据
//   getTableDatasFn () {
//     let { pageSize, pageNum } = this.pageConfig
//     let params = { ...this.searchForm, pageSize, pageNum }
//     // 调用接口服务
//   },
//   changePageEvent (vals = {}) {
//     this.pageConfig = {...this.pageConfig, ...val }
//     this.getTableDatasFn()
//   },
//   // 选项框改变事件
//   selectionChange (vals) {
//     this.selectedList = vals
//   }
// }
// ****************使用方法 end ******************

</script>

<style lang="scss" scoped>
.wui-table {
  width: 100%;
  margin: 10px auto;
}
.el-select .el-input .el-select__caret {
  line-height: 30px;
}
.delt.el-button--text {
  color: #ff0000;
}
//排序图标
.el-icon-sort-down,
.el-icon-sort-up {
  transform: scale(1, 1.2);
  margin: 0;
  margin-right: -2px;
  padding: 0;
}
.el-icon-sort-down:before,
.el-icon-sort-up:before {
  color: #409eff;
  font-size: 16px;
  cursor: pointer;
}
.overflowHide {
  width: 100%;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}
.alink {
  color: #0068d0;
}
.alink:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>

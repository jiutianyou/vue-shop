<template>
  <div
    class="wui-time-line"
    :class="[selfClass]"
  >
    <ul class="wui-time-line-ul-warp">
      <li class="root-li" v-for="item in datas" :key="item.id">
        <i class="el-icon-time"></i>
        <span class="wui-time-line-root-span">{{item.name}}</span>
        <ul v-if="item.childs" class="wui-time-line-ul-childs">
          <li class="child-li" v-for="ite in item.childs" :key="ite.id">
            <div class="child-li-span">
              <!-- <i @click="shrinkUnfoldFn(ite)" class="el-icon-d-arrow-right" :class="[ite.children && childId === ite.id && 'hasShrink']"></i> 1.展开多个列表条件使用-->
              <i @click="shrinkUnfoldFn(ite)" class="el-icon-d-arrow-right" :class="[ite.children && cacheMap[ite.id] === ite.id && 'hasShrink']"></i>
              <span class="wui-time-line-child-span">{{ite.name}}</span>
            </div>
            <!-- <ul v-show="ite.children && childId === ite.id" class="wui-ul-child"> 展开1个列表条件使用-->
            <ul v-show="ite.children && cacheMap[ite.id] === ite.id" class="wui-ul-child">
              <li
                class="children-li"
                v-for="it in ite.children"
                :key="it.id"
              >
                <div class="children-li-span">
                  <i class="el-icon-time"></i>
                  <span>{{it.name}}</span>
                </div>
                <div class="render-div-parent" v-html="renderHtmlFn(it)"></div>
                <!-- <div class="wui-time-line-children-content">
                  {{it.date}}
                </div>
                <div class="wui-time-line-children-content">
                  {{it.office}}
                </div>
                <div class="wui-time-line-children-content">
                  {{it.feelName}}
                </div> -->
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'wuiTimeLine',
  components: {},
  props: {
    selfClass: String,
    timeLineData: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      cacheMap: {}, // 缓存展开收缩值可以展开多个列表
      childId: '', // 用于判断只能展开一个列表
      hasShrink: true, // 是否展开收缩
      datas: [
        {
          name: '办案阶段',
          id: 1,
          childs: [
            {
              name: '分案交底',
              id: 11,
              children: [
                {
                  name: '开始节点-发起流程',
                  date: '2021-11-17 12:14:20',
                  office: '深圳办事处',
                  feelType: '公司请款',
                  feelName: '专利第2年年费',
                  feelMoney: 120,
                  dealDate: 20211117
                },
                {
                  name: '办理缴费-提交',
                  date: '2021-11-17 12:14:20',
                  office: '深圳办事处',
                  feelType: '公司请款',
                  feelName: '专利第2年年费',
                  feelMoney: 120,
                  dealDate: 20211117
                },
                {
                  name: '补充缴费信息-提交',
                  date: '2021-11-17 12:14:20',
                  office: '深圳办事处',
                  feelType: '公司请款',
                  feelName: '专利第2年年费',
                  feelMoney: 120,
                  dealDate: 20211117
                }
              ]
            },
            {
              name: '案前申请',
              id: 12,
              children: [
                {
                  name: '开始节点-发起流程',
                  date: '2021-11-17 12:14:20',
                  office: '深圳办事处',
                  feelType: '公司请款',
                  feelName: '专利第2年年费',
                  feelMoney: 120,
                  dealDate: 20211117
                }
              ]
            },
            {
              name: '专利撰写',
              id: 13,
              children: [
                {
                  name: '开始节点-发起流程',
                  date: '2021-11-17 12:14:20',
                  office: '深圳办事处',
                  feelType: '公司请款',
                  feelName: '专利第2年年费',
                  feelMoney: 120,
                  dealDate: 20211117
                }
              ]
            }
          ]
        },
        {
          name: '审查阶段',
          id: 2,
          childs: [
            {
              name: '收到通知书',
              id: 21,
              children: [
                {
                  name: '开始节点-发起流程',
                  date: '2021-11-17 12:14:20',
                  office: '深圳办事处',
                  feelType: '公司请款',
                  feelName: '专利第2年年费',
                  feelMoney: 120,
                  dealDate: 20211117
                }
              ]
            },
            {
              name: '官费缴费',
              id: 22,
              children: [
                {
                  name: '开始节点-发起流程',
                  date: '2021-11-17 12:14:20',
                  office: '深圳办事处',
                  feelType: '公司请款',
                  feelName: '专利第2年年费',
                  feelMoney: 120,
                  dealDate: 20211117
                }
              ]
            },
            {
              name: '变更处理',
              id: 23,
              children: [
                {
                  name: '开始节点-发起流程',
                  date: '2021-11-17 12:14:20',
                  office: '深圳办事处',
                  feelType: '公司请款',
                  feelName: '专利第2年年费',
                  feelMoney: 120,
                  dealDate: 20211117
                }
              ]
            }
          ]
        },
        {
          name: '维持阶段',
          id: 3,
          childs: [
            {
              name: '官费缴费',
              id: 31,
              children: [
                {
                  name: '开始节点-发起流程',
                  date: '2021-11-17 12:14:20',
                  office: '深圳办事处',
                  feelType: '公司请款',
                  feelName: '专利第2年年费',
                  feelMoney: 120,
                  dealDate: 20211117
                }
              ]
            }
          ]
        }
      ]
    }
  },
  watch: {
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
    },
    shrinkUnfoldFn (row) {
      // 1.展开多个列表条件使用
      let keyId = String([row.id])
      if (!this.cacheMap[keyId]) {
        this.$set(this.cacheMap, [keyId], row.id)
      } else {
        let values = this.cacheMap[keyId] === row.id ? '' : row.id
        this.$set(this.cacheMap, [keyId], values)
      }
      // 2.用于展开一个列表条件使用
      // this.childId = this.childId === row.id ? '' : row.id
    },
    renderHtmlFn (row) {
      let htmls = ''
      for (let k in row) {
        if (k !== 'name') {
          let values = row[k]
          htmls += `<div style="margin-left:15px;padding:5px 0;">${values}</div>`
        }
      }
      return htmls
    }
  }
}
</script>
<style scoped lang="scss">
.wui-time-line{
  .hasShrink{
    transform: rotate(90deg);
  }
  .root-li{
    border-left: 1px solid #ddd;
    > .el-icon-time{
      font-size:20px;
      position: relative;
      left: -10px;
      background: #fff;
    }
  }
  .wui-time-line-root-span{
    font-size:16px;
    font-weight: bold;
  }
  .wui-time-line-ul-childs{
    margin-left:15px;
    .child-li{
      border: 1px solid #ddd;
      padding: 10px 3px;
      margin: 8px 0;
      .el-icon-d-arrow-right{
        font-size: 16px;
        cursor: pointer;
        font-weight: bold;
      }
      .child-li-span{
        padding:5px 0;
      }
      .wui-time-line-children-content{
        margin-left:15px;
        padding:5px 0;
      }
      .wui-time-line-child-span{
        font-weight: bold;
        font-size: 14px;
      }
      .children-li{
        border-left: 1px solid #ddd;
        margin-left:20px;
        .children-li-span{
          padding-bottom:8px;
          span{
            font-weight: bold;
          }
          .el-icon-time{
            font-size: 16px;
            font-weight: bold;
            position: relative;
            left: -8px;
            background: #fff;
          }
        }
      }
    }
  }
}

</style>

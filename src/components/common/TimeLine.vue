<template>
  <div
    class="wui-time-line"
    :class="[selfClass]"
  >
    <ul class="wui-time-line-ul-warp">
      <li class="root-li" v-for="item in treeData" :key="item.phaseCode">
        <i class="el-icon-time"></i>
        <span class="wui-time-line-root-span">{{item.phaseName}}</span>
        <ul v-if="item.flowTypeVos" class="wui-time-line-ul-childs">
          <li class="child-li" v-for="ite in item.flowTypeVos" :key="ite.flowId">
            <div class="child-li-span">
              <i @click="shrinkUnfoldFn(ite)" class="el-icon-d-arrow-right" :class="[ite.children && cacheMap[ite.flowId] === ite.flowId && 'hasShrink']"></i>
              <span class="wui-time-line-child-span">{{ite.flowTypeName}}</span>
            </div>
            <ul v-show="ite.children && cacheMap[ite.flowId] === ite.flowId" class="wui-ul-child">
              <li
                class="children-li"
                v-for="(it, i) in ite.children"
                :key="i"
              >
                <div class="children-li-span">
                  <i class="el-icon-time"></i>
                  <span>{{it.nodeName}}</span>
                  <span v-if="it.operateResult">-{{it.operateResult}}</span>
                </div>
                <div class="render-div-parent other-div">
                  <span v-if="it.operatorName">{{it.operatorName}}</span>
                  <span v-if="it.operatorOffice">({{it.operatorOffice}})</span>
                  <span v-if="it.submitTime">{{it.submitTime | parseTime }}</span>
                </div>
                <div v-if="it.comment" class="render-div-parent other-div">
                  <span style="margin-left:10px;">【备注】{{it.comment}}</span>
                </div>
                <template v-if="it.otherInfoVos && it.otherInfoVos.length > 0">
                  <div v-for="kkk in it.otherInfoVos" :key="kkk.otherName" class="other-div">
                    <span v-if="kkk.otherName" style="margin-left:10px;">【{{kkk.otherName}}】</span>
                    <span v-if="!kkk.otherUrl && kkk.otherValue">{{kkk.otherValue}}</span>
                    <el-button v-if="kkk.otherUrl && kkk.otherValue"  style="margin-left:15px;" type="text" @click="downLoadFn(kkk.otherUrl)">{{kkk.otherValue}}</el-button>
                  </div>
                </template>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <div v-if="!treeData.length" style="text-align:center">暂无数据</div>
    </ul>
  </div>
</template>
<script>
import { getPatentFlowPhaseApi, getPatentFlowLogApi } from '@/api/patent/patentSearchManager'
import { deepClone } from '@/utils/index'
export default {
  name: 'TimeLine',
  components: {},
  props: {
    selfClass: String,
    tabName: String
  },
  data () {
    return {
      cacheMap: {}, // 缓存展开收缩值可以展开多个列表
      childId: '', // 用于判断只能展开一个列表
      hasShrink: true, // 是否展开收缩
      treeData: []
    }
  },
  watch: {
    tabName (val) {
      if (val === 'PatentLife') {
        // this.initData()
      }
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    async initData () {
      const { patentApplyId } = this.$route.query
      const params = {
        patentApplyId
      }
      let { data } = await getPatentFlowPhaseApi(params)
      if (data.status === 0) {
        this.treeData = Array.isArray(data.data) ? data.data : []
        if (!this.treeData.length) {
          return
        }
        // 有数据时，最后节点数据展开
        let res = deepClone(this.treeData[this.treeData.length - 1])
        if (res.flowTypeVos.length > 0) {
          let row = deepClone(res.flowTypeVos[res.flowTypeVos.length - 1])
          this.shrinkUnfoldFn(row)
        }
      }
    },
    // 数据处理
    resolveData (flowId, result) {
      for (let i = 0, iLen = this.treeData.length; i < iLen; i++) {
        let child = this.treeData[i].flowTypeVos
        if (Array.isArray(child)) {
          for (let item of child) {
            if (item.flowId === flowId) {
              item.children = result
              this.$set(this.treeData[i], i, child)
              break
            }
          }
        }
      }
      // console.log(this.treeData)
    },
    async shrinkUnfoldFn (row) {
      let result = null
      if (!Array.isArray(row.children) || row.children.length === 0) {
        let params = {
          flowId: row.flowId
        }
        let { data } = await getPatentFlowLogApi(params)
        if (data.status === 0) {
          result = Array.isArray(data.data) ? data.data : []
        }
        this.resolveData(row.flowId, result) // 数据处理
      }
      // 1.展开多个列表条件使用
      let keyId = String([row.flowId])
      if (!this.cacheMap[keyId]) {
        this.$set(this.cacheMap, [keyId], row.flowId)
      } else {
        let values = this.cacheMap[keyId] === row.flowId ? '' : row.flowId
        this.$set(this.cacheMap, [keyId], values)
      }
    },
    renderHtmlFn (row) {
      let htmls = ''
      for (let k in row) {
        if (!['otherInfoVos', 'nodeName'].includes(k) && row[k]) {
          let values = row[k]
          htmls += `<span style="margin-left:15px;padding:8px 0;display:inline-block;">${values}</span>`
        }
      }
      return htmls
    },
    // 下载附件
    downLoadFn (url) {
      if (!url) {
        return
      }
      window.open(url)
    },
    // 模拟数据
    mockData () {
      return [
        {
          phaseName: '办案阶段',
          phaseCode: 1,
          flowTypeVos: [
            {
              flowTypeName: '分案交底',
              flowId: 11,
              children: [
                {
                  nodeName: '开始节点-发起流程',
                  comment: '公司请款',
                  operateResult: '完成',
                  operatorName: '战三',
                  operatorOffice: '深圳办事处',
                  submitTime: '2021-11-17 12:14:20'
                },
                {
                  nodeName: '办理缴费-提交',
                  date: '2021-11-17 12:14:20',
                  office: '深圳办事处',
                  feelType: '公司请款',
                  feelName: '专利第2年年费',
                  feelMoney: 120,
                  dealDate: 20211117
                },
                {
                  nodeName: '补充缴费信息-提交',
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
          phaseName: '审查阶段',
          phaseCode: 2,
          flowTypeVos: [
            {
              flowTypeName: '变更处理',
              flowId: 23,
              children: [
                {
                  nodeName: '开始节点-发起流程',
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
          phaseName: '维持阶段',
          phaseCode: 3,
          flowTypeVos: [
            {
              flowTypeName: '官费缴费',
              flowId: 31,
              children: [
                {
                  nodeName: '开始节点-发起流程',
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
  .render-div-parent, .other-div{
    span{
      margin-left:15px;padding:8px 0;display:inline-block;
    }
  }
  .other-div:last-child{
    margin-bottom: 8px;
  }
}

</style>

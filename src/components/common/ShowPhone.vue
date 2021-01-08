<template>
  <div>
    <span>{{phoneObj.phoneStar || '--'}}</span>
    <i v-show="isShowIcon" @click="getPhoneFun" class="el-icon-view" style="padding:6px;cursor:pointer;"></i>
  </div>
</template>
<script>
import { getPhoneNumberApi } from '@/api/common'
export default {
  name: 'showPhone',
  props: {
    dataInfo: {
      type: Object,
      default: () => ({})
    },
    fieldKey: String
  },
  watch: {
    dataInfo: {
      handler (vals) {
        if (vals && vals[this.fieldKey]) {
          this.resolvePhoneFun(vals)
        }
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      phoneObj: {},
      isShowIcon: false
    }
  },
  methods: {
    // 解析电话号码数据
    resolvePhoneFun (vals) {
      let temp = {}
      if (vals[this.fieldKey]) {
        temp = JSON.parse(vals[this.fieldKey])
      }
      this.phoneObj = temp
      if (this.phoneObj.phoneStar) {
        this.isShowIcon = true
      }
    },
    // 获取电话号码
    async getPhoneFun () {
      let { customerCode, customerName, linkmanName } = this.dataInfo
      let params = {
        phoneHex: this.phoneObj.phoneHex,
        customerCode,
        customerName,
        linkmanName
      }
      let res = await getPhoneNumberApi(params)
      res = res.data
      if (res.status === 0) {
        this.isShowIcon = false
        let result = JSON.parse(res.data)
        this.phoneObj = {
          phoneStar: result.phone,
          phoneHex: result.phoneHex
        }
      }
    }
  }
}
</script>


<template>
<FormItem :label="label" :prop="value">
  <el-date-picker
    @change="handleChange"
    v-model="searchForm[value]"
    :value-format="valueFormat"
    :disabled="disabled"
    :type="type"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :align="align"
    :picker-options="expireTimeOption"
  />
</FormItem>
</template>

<script>
import { FormItem } from '@/components/UI'
export default {
  components: { FormItem },
  props: {
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    searchForm: {
      type: Object,
      default: () => ({})
    },
    align: {
      type: String,
      default: 'right'
    },
    type: String,
    value: [Number, String],
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    required: Boolean,
    expireTimeOption: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      // expireTimeOption: {
      //   disabledDate (date) {
      //     // 当天可选：date.getTime() < Date.now() - 24 * 60 * 60 * 1000
      //     // return date.getTime() < Date.now()
      //     return date.getTime() < Date.now() - 24 * 60 * 60 * 1000
      //   }
      // }
    }
  },
  methods: {
    handleChange (val) {
      this.$emit('change', val)
    }
  }
}
</script>

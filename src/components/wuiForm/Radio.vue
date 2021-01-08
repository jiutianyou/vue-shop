<template>
  <FormItem :label="label" :labelWidth="labelWidth" :prop="value">
    <el-radio-group v-model="searchForm[value]" :disabled="disabled" @change="handleChange">
      <el-radio v-for="(item,index) in dataList" :key="index" :label="item[listValue]">{{item[listName]}}</el-radio>
    </el-radio-group>
  </FormItem>
</template>
<script>
import { FormItem } from '@/components/UI'
export default {
  components: { FormItem },
  props: {
    labelWidth: [Number, String],
    type: {
      type: String,
      default: 'text'
    },
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
    placeholder: String,
    value: [Number, String],
    dataList: {
      type: Array,
      default: () => ([])
    },
    listName: String,
    listValue: [Number, String],
    required: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange (val) {
      this.$emit('change', val)
    }
  }
}
</script>

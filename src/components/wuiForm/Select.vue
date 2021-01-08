<template>
<FormItem :label="label" :prop="value">
  <el-select
    :placeholder="placeholder"
    @change="handleChange"
    v-model="searchForm[value]"
    :disabled="disabled"
    :clearable="clearable"
    :filterable="filterable"
    :multiple="multiple">
    <el-option
      v-for="(item,index) in dataList"
      :key="index"
      :label="item[listName]"
      :value="item[listValue]"
    />
  </el-select>
</FormItem>
</template>

<script>
import { FormItem } from '@/components/UI'
export default {
  components: { FormItem },
  props: {
    placeholder: String,
    label: String,
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    searchForm: {
      type: Object,
      default: () => ({})
    },
    dataList: {
      type: Array,
      default: () => ([])
    },
    listName: String,
    listValue: [Number, String],
    value: [Number, String],
    required: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange (val) {
      this.$emit('change', val)
    }
  },
  watch: {
    dataLis: {
      handler (vals) {
        console.log(vals)
      },
      immediate: true
    }
  }
}
</script>

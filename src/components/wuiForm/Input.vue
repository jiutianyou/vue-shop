<template>
  <FormItem :label="label" :labelWidth="labelWidth" :prop="value">
    <el-input
      v-model.trim="searchForm[value]"
      :disabled="disabled"
      :clearable="clearable"
      :type="type"
      :rows="rows"
      :maxlength="maxlength"
      :placeholder="placeholder"
      @change="handleChange">
    </el-input>
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
    rows: [Number],
    searchForm: {
      type: Object,
      default: () => ({})
    },
    placeholder: String,
    value: [Number, String],
    maxlength: Number,
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

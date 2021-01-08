<template>
  <el-tabs :value="value" type="border-card" class="margin-bottom-smaller" @tab-click="tabClick">
    <slot></slot>
  </el-tabs>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    tabClick (e) {
      this.$emit('tab-click', e)
    }
  }
}
</script>

<template>
  <el-form :model="model" :rules="rules" :label-width="labelWidth" label-position="left" :class="{ 'el-form--static': statical }">
    <el-row :gutter="20">
      <slot></slot>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: {
    model: Object,
    rules: Object,
    labelWidth: {
      type: String,
      default: '5em'
    },
    statical: Boolean
  }
}
</script>

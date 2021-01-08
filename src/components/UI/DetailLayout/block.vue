<template>
  <div class="ips-detail__block">
    <div v-if="title" class="ips-detail__title">
      <h3 class="ips-title ips-title--secondary">{{ title }}</h3>
      <span v-if="subTitle" :class="subClass">{{ subTitle }}</span>
      <el-tooltip placement="top-start" v-if="showOfficeBtn">
        <div slot="content">获取官方数据，请先点击“保存”申请号信息。</div>
        <el-button type="info" @click="officalDataFn($event)" style="float:right;">获取官方数据</el-button>
      </el-tooltip>
      <el-button v-if="showSaveBtn" type="primary" @click="save($event)" style="float:right;margin-right:10px;">保存</el-button>
    </div>
    <slot name="before"></slot>
    <FormLayout :model="model" :rules="rules" :labelWidth="labelWidth" :statical="statical" :disabled="disabled">
      <slot></slot>
    </FormLayout>
    <slot name="after"></slot>
  </div>
</template>

<script>
import FormLayout from '../FormLayout'
export default {
  components: { FormLayout },
  props: {
    title: String,
    subTitle: String,
    subClass: String,
    model: Object,
    rules: Object,
    labelWidth: String,
    statical: Boolean,
    disabled: Boolean,
    showSaveBtn: Boolean,
    showOfficeBtn: Boolean
  },
  methods: {
    save (e) {
      this.$emit('save', e)
    },
    officalDataFn (e) {
      this.$emit('offical', e)
    }
  }
}
</script>

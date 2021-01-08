<template>
  <article class="ips-content" :class="{'ips-content--aside': showAside, 'ips-content--fixed': fixed}">
    <section class="ips-detail" :class="{ 'ips-detail--list': list }">
      <div class="ips-detail__content">
        <div v-if="showHeader" class="ips-detail__header">
          <h2 v-if="pageTitle" class="ips-title ips-title--primary">{{ pageTitle }}</h2>
          <span class="ips-sub-title"><slot name="subTitle">{{ subTitle }}</slot></span>
          <div class="ips-title-actions">
            <slot name="actions"></slot>
            <el-button v-if="showBackBtn" type="info" @click="back($event)">返回列表</el-button>
          </div>
        </div>
        <div class="ips-detail__main">
          <DetailSummary :labelWidth="summaryLabelWidth" :title="summaryTitle" v-if="showSummary" :statical="staticSummary">
            <slot name="summary"></slot>
          </DetailSummary>
          <slot name="tabs"></slot>
          <slot></slot>
        </div>
      </div>
      <div v-if="showAside" class="ips-detail__aside">
        <slot name="aside"></slot>
      </div>
    </section>
  </article>
</template>

<script>
import DetailSummary from './summary'
export default {
  components: { DetailSummary },
  props: {
    list: Boolean,
    pageTitle: String,
    subTitle: String,
    fixed: Boolean,
    showHeader: {
      type: Boolean,
      default: true
    },
    showBackBtn: {
      type: Boolean,
      default: true
    },
    showSummary: {
      type: Boolean,
      default: true
    },
    showTabs: {
      type: Boolean,
      default: true
    },
    showAside: {
      type: Boolean,
      default: true
    },
    summaryLabelWidth: String,
    summaryTitle: String,
    staticSummary: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    back (e) {
      this.$emit('back', e)
    }
  }
}
</script>

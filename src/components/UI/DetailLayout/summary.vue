<template>
  <DetailBlock :labelWidth="labelWidth" :title="title" :showTitle="!!title" class="ips-detail__summary" :statical="statical">
    <slot></slot>
  </DetailBlock>
</template>

<script>
import DetailBlock from './block'
export default {
  components: { DetailBlock },
  props: {
    labelWidth: String,
    statical: Boolean,
    title: String
  }
}
</script>

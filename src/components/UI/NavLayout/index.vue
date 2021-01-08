<template>
  <section :span="24" class="ips-nav" :class="`ips-nav--${type}`">
    <el-tabs :value="value" :editable="editable" :closable="closable" @tab-click="tabClick" @edit="edit" @tab-add="tabAdd" @tab-remove="tabRemove">
      <slot></slot>
    </el-tabs>
  </section>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'secondary'
    },
    value: {
      type: String,
      default: ''
    },
    editable: Boolean,
    closable: Boolean
  },
  methods: {
    tabClick (e) {
      this.$emit('tab-click', e)
    },
    edit (e) {
      this.$emit('edit', e)
    },
    tabAdd (e) {
      this.$emit('tab-add', e)
    },
    tabRemove (e) {
      this.$emit('tab-remove', e)
    }
  }
}
</script>

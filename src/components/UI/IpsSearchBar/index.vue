<template>
  <section class="ips-search-bar ips-content--fixed__header">
    <FormLayout :labelWidth="labelWidth" @keyup.enter.native="search" :statical="statical">
      <slot></slot>
      <slot v-if="showAdvance" name="advance"></slot>
      <FormItem v-if="actions" :labelWidth="'0'">
        <el-button v-if="advance" type="info" @click="toggle">高级查询
          <i :class="showAdvance ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
        </el-button>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="clear">清空</el-button>
        <slot name="appendbtns"></slot>
      </FormItem>
      <slot name="formFooter"></slot>
      <FormItem v-if="multipleActions" :labelWidth="'0'" :type="btnsFormType" :custom="btnsFormCustom" class="multiple-actions">
        <slot name="btns"></slot>
      </FormItem>
    </FormLayout>
  </section>
</template>

<script>
import { emitResize } from '@/utils/autoHeight'
import * as utils from '@/utils'
import FormLayout from '../FormLayout'
import FormItem from '../FormLayout/Item'
export default {
  components: {
    FormLayout,
    FormItem
  },
  props: {
    model: {
      type: Object,
      default () {
        return null
      }
    },
    actions: {
      type: Boolean,
      default: true
    },
    advance: {
      type: Boolean,
      default: true
    },
    multipleActions: {
      type: Boolean,
      default: true
    },
    btnsFormType: {
      type: String,
      default: 'full'
    },
    btnsFormCustom: Array,
    labelWidth: String,
    statical: Boolean
  },
  data () {
    return {
      showAdvance: false
    }
  },
  methods: {
    toggle () {
      this.showAdvance = !this.showAdvance
      this.$nextTick(() => {
        emitResize(this.$parent)
      })
    },
    search () {
      this.$emit('search')
    },
    clear () {
      utils.resetObjectProp(this.model)
      this.$emit('clear', this.model)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-icon-arrow-down,
.el-icon-arrow-up {
  margin-left: 5px;
  line-height: 0;
}
</style>

<template>
  <el-col v-if="spanLayout" :span="spanLayout">
    <div v-if="before" class="before">
      <slot name="before"></slot>
    </div>
    <el-form-item :rules="rules" :label="label" :label-width="labelWidth" :prop="prop" :required="required" :class="{ 'limit-height': limitHeight }">
      <slot></slot>
    </el-form-item>
  </el-col>
  <el-col :offset="offset" :xs="xs" :sm="sm" :md="md" :lg="lg" :xl="xl" class="flex" v-else>
    <div v-if="before" class="before">
      <slot name="before"></slot>
    </div>
    <el-form-item :rules="rules" :label="label" :label-width="labelWidth" :prop="prop" :required="required" :class="{ 'limit-height': limitHeight }">
      <slot></slot>
    </el-form-item>
  </el-col>
</template>

<script>
export default {
  props: {
    type: String,
    custom: {
      type: Array,
      default () {
        return [12, 12, 8, 8, 6]
      }
    },
    spanLayout: [Number, String],
    offset: Number,
    prop: String,
    label: String,
    rules: Object,
    labelWidth: String,
    required: Boolean,
    limitHeight: Boolean,
    before: Boolean
  },
  data () {
    return {
      half: [12, 12, 12, 12, 12],
      quater: [24, 24, 24, 24, 18],
      full: [24, 24, 24, 24, 24]
    }
  },
  computed: {
    xs () {
      return this.type ? this[this.type][0] : this.custom[0]
    },
    sm () {
      return this.type ? this[this.type][1] : this.custom[1]
    },
    md () {
      return this.type ? this[this.type][2] : this.custom[2]
    },
    lg () {
      return this.type ? this[this.type][3] : this.custom[3]
    },
    xl () {
      return this.type ? this[this.type][4] : this.custom[4]
    }
  }
}
</script>

<style lang="scss">
.flex {
  display: flex;
  align-items: left;
  justify-content: center;
  & > .before {
    flex-basis: 24px;
    line-height: $form-item-height;
    height: $form-item-height;
    vertical-align: middle;
  }
}
</style>

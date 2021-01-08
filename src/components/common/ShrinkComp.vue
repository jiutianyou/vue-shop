<template>
  <div class="down_up_div" v-if="hasDownDir">
    <i @click="clickDownUpFun" style="font-size:20px;cursor:pointer;" :class="hasDownDir==='down' ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'"></i>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => ([])
    },
    refName: {
      type: String,
      default: 'tableRef'
    },
    maxRows: {
      type: Number,
      default: 8
    }
  },
  data () {
    return {
      hasDownDir: ''
    }
  },
  watch: {
    tableData: {
      handler (vals) {
        if (vals.length > this.maxRows && this.hasDownDir !== 'down') {
          this.$nextTick(function () {
            let ele = this.$parent.$refs.tableRef && this.$parent.$refs.tableRef.$el
            ele.style.height = '300px'
            this.hasDownDir = 'up'
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    clickDownUpFun () {
      let ele = this.$parent.$refs.tableRef && this.$parent.$refs.tableRef.$el
      if (ele.style.height === 'auto') {
        ele.style.height = '300px'
        this.hasDownDir = 'up'
      } else {
        this.hasDownDir = 'down'
        ele.style.height = 'auto'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .down_up_div{
    text-align: center;
    padding:5px;
    i {
      transform:rotate(90deg);
      -ms-transform:rotate(90deg);
      -moz-transform:rotate(90deg); /* Firefox */
      -webkit-transform:rotate(90deg);/* Safari 和 Chrome */
      -o-transform:rotate(90deg); /* Opera */
    }
  }
</style>

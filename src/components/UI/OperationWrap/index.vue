<template>
  <div class="handle_wrap" @click="showBtnMenu = false">
    <div
      class="handle_menu"
      :class="disable && 'disabled'"
      @mouseover="mouseOverMenu($event)"
      @mouseleave="hideBtnMenu($event)"
    >
      <div class="handle_menu_content" :style="showBtnMenu ? 'visibility: visible;' : 'visibility: hidden;'">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OperationBtn',
  data () {
    return {
      showBtnMenu: false
    }
  },
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    mouseOverMenu (even) {
      if (this.showBtnMenu || this.disable) {
        return
      }
      let { clientX, clientY } = even
      let handleMenuContent = this.$el.querySelector('.handle_menu_content')
      let a = clientY - even.offsetY // 元素顶部距离视图距离
      // let menuBtnGroupHeight = handleMenuContent.scrollHeight
      // let b = a + 10 - (menuBtnGroupHeight / 2) // 元素垂直中点
      let b = a - 10
      let eleHeight = handleMenuContent.clientHeight
      if (window.innerHeight - b < 105) {
        b = b - eleHeight + 20
      }
      handleMenuContent.style.top = b + 'px'

      let wa = clientX - even.offsetX
      let wb = wa + 8
      handleMenuContent.style.left = wb + 'px'

      this.showBtnMenu = true
    },
    hideBtnMenu () {
      this.showBtnMenu = false
    }
  }
}
</script>
<style lang="scss" scoped>
.handle_menu {
  display: inline-block;
  background-image: url(./svg/operation_btn.svg);
  background-size: contain;
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
  &.disabled {
    background-image: url(./svg/operation_disabled_btn.svg);
  }
  .handle_menu_content:not(:empty) {
    width: 90px;
    position: fixed;
    z-index: 999999;
    top: 0;
    z-index: 9999999;
    left: 38px;
    background: #fff;
    border-radius: 3px;
    border: 1px solid #b3caf5;
    line-height: 1;
  }
}
</style>
<style lang="scss">
.handle_wrap {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    .el-button + .el-button {
      margin-left: 0px;
    }
    .el-button {
      width: 100%;
      text-align: center;
      font-size: 12px;
      border: none;
      color: #457fe6;
      cursor: pointer;
      background: #fff !important;
      &:hover {
        background: #b3caf5 !important;
      }
    }
    .el-button[disabled] {
      cursor: not-allowed;
      color: #ddd;
    }
}
</style>

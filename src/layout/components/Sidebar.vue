<template>
  <el-menu
    :default-active="activeIndex"
    unique-opened
    router
    background-color="#224573"
    text-color="#D0DEF0"
    active-text-color="#fff"
    class="nav-menu"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
    style="border-right: 0px;"
    ref="menu"
    :collapse="isCollapse">
    <template v-for="item in router" >
      <el-submenu :key="item.id" v-if="item.childList !== undefined && !item.type" :index="item.pathUrl" >
        <template slot="title">
          <i :class="item.icon" class="iconfont" style="margin-right: 10px"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <template v-if="item.childList !== undefined">
          <el-menu-item :index="children.pathUrl" v-for="children in item.childList" :key="children.id">
            <i :class="children.icon"></i>
            <span slot="title">{{children.label}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item :key="item.id" v-else-if="!item.type" :index="item.pathUrl" class="singer-menu" style="padding: 0 30px">
        <i :class="item.icon" class="iconfont" style="margin-right: 10px"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import { menus } from '../../datas/menu.js'
export default {
  data () {
    return {
      activeIndex: null,
      activeOpeneds: null,
      isCollapse: false,
      router: []
    }
  },
  computed: {
  },
  mounted () {
    this.activeIndex = this.$route.path
    console.log(menus)
    this.router = [...menus.data]
  },
  methods: {

    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  watch: {
    '$route' (v) {
      console.log(v)
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-menu /deep/ {
  .el-submenu__title span{
    width:auto !important;
    height:auto !important;
    visibility: visible !important;

  }
}
</style>

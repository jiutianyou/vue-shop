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
    <!-- item.type指菜单类型  0或者空是菜单展示，1是页面内标签不展示仅用作权限命中提供菜单id，其它值未定义 -->
    <template v-for="item in router" >
      <el-submenu :key="item.id" v-if="item.nodeList !== undefined && !item.type" :index="item.url" >
        <template slot="title">
          <i :class="item.icon" class="iconfont" style="margin-right: 10px"></i>
          <span slot="title">{{item.displayText}}</span>
        </template>
        <template v-if="item.nodeList !== undefined">
          <el-menu-item :index="children.url" v-for="children in item.nodeList" :key="children.id">
            <i :class="children.icon"></i>
            <span slot="title">{{children.displayText}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item :key="item.id" v-else-if="!item.type" :index="item.url" class="singer-menu" style="padding: 0 30px">
        <i :class="item.icon" class="iconfont" style="margin-right: 10px"></i>
        <span slot="title">{{item.displayText}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import { menus } from '../../datas/menu.js'
// import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      activeIndex: null,
      activeOpeneds: null,
      isCollapse: true,
      router: []
    }
  },
  computed: {
    // ...mapState({
    //   isCollapse: state => state.Login.collapseStatus,
    //   temRoutePath: state => state.Login.temRoutePath,
    //   allUrl: state => Object.keys(state.Menu.allRouter || {})
    // })
  },
  mounted () {
    this.activeIndex = this.$route.path
    // await this.getMenuByUser()
    // this.setActiveRouter(this.$route.path)
    console.log(menus)
    this.router = [...menus.data]
  },
  methods: {
    // ...mapActions([
    //   'setTemRoutePath',
    //   'getMenuByUser',
    //   'setActiveRouter'
    // ]),
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      // this.setActiveRouter(key)
      // this.setTemRoutePath(key)
    }
  },
  watch: {
    '$route' (v) {
      console.log(v)
      // if (this.$refs.menu && this.allUrl.includes(v.path)) {
      //   this.$refs.menu.updateActiveIndex(v.path)
      // } else {
      //   this.activeIndex = v.path
      // }
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

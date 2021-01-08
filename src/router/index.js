import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
Vue.use(Router)
export default new Router({
  routes: [
    // { path: '/login', name: 'login', component: () => import('@/views/user/login/index'), hidden: true, meta: { title: '登录' } },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index'),
          name: 'dashboard',
          meta: { title: '首页', icon: 'home', affix: true }
        },
        {
          path: '/system/user/:type',
          component: () => import('@/views/system/user/index'),
          name: 'user',
          meta: { title: '用户', icon: 'user', affix: true }
        }
      ]
    }
  ]
})

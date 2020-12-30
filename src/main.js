import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini', zIndex: 3000 })
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

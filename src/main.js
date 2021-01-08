import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
import * as filters from '@/utils/filters'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/UI/element-variables.scss'
import '@/assets/UI/index.scss'
import '@/assets/css/index.scss'
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini', zIndex: 3000 })
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

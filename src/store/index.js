import Vue from 'vue'
import Vuex from 'vuex'
import Overall from './overall/index'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Overall
  }
})

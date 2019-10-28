import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入了 vuex
import store from './store'

// 自己封装的 插件对象
import AxiosPlugs from '@/utils/request.js'

// 导入字体图标
import '@/styles/index.css'

// 导入vant  按需导入{ Lazyload } 因为不导入应该用不了
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'

// options 为可选参数，无则不传
Vue.use(Lazyload)
Vue.use(Vant)

// 使用 将axios封装的插件
Vue.use(AxiosPlugs)

Vue.config.productionTip = false

// Vue.use(Cell).use(CellGroup)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

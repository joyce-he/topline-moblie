import Vue from 'vue'
import Vuex from 'vuex'
// 导入 userLoacl
import { setUserLocal, getUserLocal } from '@/utils/userlocal'

Vue.use(Vuex)

export default new Vuex.Store({
  // 统一管理项目中的公用数据
  state: {
    user: getUserLocal()
  },
  mutations: {
    setUser: function (state, obj) {
      // 赋值
      state.user = obj
      // 储存到 localstorage 中
      setUserLocal(obj)
    }
  }

})

// 封装所有的 与axios相关的逻辑
// 改造 为一个插件

// 导入axios
import axios from 'axios'

// 导入store
import store from '@/store'

// 创建一个 axios 实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/'
})

// 设置拦截器
// 设置请求拦截器
instance.interceptors.request.use(function (config) {
  // console.log(store.state.user)
  let user = store.state.user
  // 判断假如 已经登录 就是user存在,就把里面的token设置进去
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
// config 所以的请求信息
},
function (error) {
// 错误处理
  return Promise.reject(error)
})

// 设置响应拦截器
instance.interceptors.response.use(function (response) {
  return response.data.data
},
function (error) {
  return Promise.reject(error)
})

// 创建 另一个axios 实例
// 创建一个 axios 实例
const instance2 = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_1/'
})

// 设置拦截器
// 设置请求拦截器
instance2.interceptors.request.use(function (config) {
  console.log('保存到store里面的user--------------')
  console.log(store.state.user)
  let user = store.state.user
  // 判断假如 已经登录 就是user存在,就把里面的token设置进去
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
// config 所以的请求信息
},
function (error) {
// 错误处理
  return Promise.reject(error)
})

// 设置响应拦截器
instance2.interceptors.response.use(function (response) {
  return response.data.data
},
function (error) {
  return Promise.reject(error)
})

// 创建一个插件对象
const Myplugs = {}
// 添加一个 Install 方法
// Vue: 构造器
Myplugs.install = function (Vue) {
  // 添加逻辑
  // 将 axios 实例挂载到 Vue 的元素中
  Vue.prototype.$http = instance
  Vue.prototype.$http2 = instance2
}

// 暴露插件对象 (就是把这个js 变成一个插件)
export default Myplugs

// 每次调用 Install 方法 就会执行 Vue.prototype.$http = instance

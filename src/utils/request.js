// 封装所有的 与axios相关的逻辑
// 改造 为一个插件

// 导入axios
import axios from 'axios'

// 创建一个 axios 实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/'
})

// 设置拦截器
// 设置请求拦截器
// instance.transformRequest: [function (data, headers) {
//     // Do whatever you want to transform the data

//     return data;
//   }]
instance.interceptors.request.use(function (config) {
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

// 创建一个插件对象
const Myplugs = {}
// 添加一个 Install 方法
// Vue: 构造器
Myplugs.install = function (Vue) {
  // 添加逻辑
  // 将 axios 实例挂载到 Vue 的元素中
  Vue.prototype.$http = instance
}

// 暴露插件对象 (就是把这个js 变成一个插件)
export default Myplugs

// 每次调用 Install 方法 就会执行 Vue.prototype.$http = instance

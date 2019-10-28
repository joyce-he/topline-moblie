import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/home'

Vue.use(VueRouter)

const routes = [
  // 登录路由
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  // 布局路由
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../views/layout'),
    children: [
      // // 首页路由
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/ahome')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

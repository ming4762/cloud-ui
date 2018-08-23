import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/page/index/'
import systemRouter from '@/router/system/'

Vue.use(Router)
let routes = [
  {
    path: '/',
    name: '主页',
    redirect: '/login'
  },
  // 登录跳转
  {
    path: '/login',
    name: '登录',
    component: () =>
      import('@/page/login/index.vue')
  },
  // 主页
  {
    path: '/index',
    name: '主页',
    component: () =>
      import('@/page/index/Index.vue')
  }
]

routes = routes.concat(systemRouter)

export default new Router({
  routes: routes
})

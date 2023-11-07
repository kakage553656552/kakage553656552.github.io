import Vue from 'vue'
import Router from 'vue-router'
import websocket from '@/views/websocket'
import apiTest from '@/views/apiTest'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',     
      name: 'Home',
      component: () => import( /* webpackChunkName: 'Test' */ '@/views/home' ),   //实现路由懒加载,
      children: [
        {
          path: '/test',     // 测试vuex以及自定义的tag组件
          name: 'Test',
          component: () => import( /* webpackChunkName: 'Test' */ '@/views/test' )   //实现路由懒加载
        },
        {
          path: '/test111',     // 测试$attrs和$listeners
          name: 'Test111',
          component: () => import( /* webpackChunkName: 'Test' */ '@/views/test111' )   //实现路由懒加载
        },
        {
          path: '/test222',     // 递规组件
          name: 'Test222',
          component: () => import( /* webpackChunkName: 'Test' */ '@/views/test222' )   //实现路由懒加载
        },
        {
          path: '/vueHappyBus',
          name: 'vueHappyBus',
          component: () => import( /* webpackChunkName: 'Test111' */ '@/views/vue-happy-bus' )   //实现路由懒加载
        },
        {
          path: '/gridlayout',
          name: 'Gridlayout',
          component: () => import( /* webpackChunkName: 'Gridlayout' */ '@/views/gridlayout' )  //实现路由懒加载
        },
        {
          path: '/websocket',  // websocket
          name: 'websocket',
          component: websocket
        },
        {
          path: '/apiTest',
          name: 'apiTest',
          component: apiTest
        }
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( /* webpackChunkName: 'Gridlayout' */ '@/views/login' )  //实现路由懒加载
    },
    {
      path: '*',
      name: 'page404',
      component: () => import( /* webpackChunkName: 'Gridlayout' */ '@/views/page404' )  //实现路由懒加载
    },
  ]
})
router.beforeEach((to, from, next) => {
  if(hasToken()) {
    next()
  } else {
    if(to.path === '/login') {
      next()
    }else {
      next('/login')
    }
  }
});
export default router
export const hasToken = () =>{
  return localStorage.getItem('token')
}
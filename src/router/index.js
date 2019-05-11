import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Machine from '@/components/Machine'
import personal from '@/components/personalCenter'
import Order from '@/components/Order'
import Check from '@/components/Check'
import PutRecord from '@/components/PutRecord'
import Statistics from '@/components/Statistics'
import MySettings from '@/components/MySettings'
import Marketing from '@/components/Marketing'
import SubmitOrder from '@/components/SubmitOrder'

Vue.use(Router)

var router = new Router({
  routes: [
    { path: '/', component: Login },
    { path: '/machine', component: Machine },
    {
      path: '/submitOrder',
      meta: { requiresAuth: true },
      component: SubmitOrder
    },
    {
      path: '/personal',
      meta: { requiresAuth: true },
      component: personal,
      redirect: '/order',
      children: [
        { path: '/order', meta: { requiresAuth: true }, component: Order },
        { path: '/check', meta: { requiresAuth: true }, component: Check },
        {
          path: '/putRecord',
          meta: { requiresAuth: true },
          component: PutRecord
        },
        {
          path: '/statistics',
          meta: { requiresAuth: true },
          component: Statistics
        },
        {
          path: '/mySettings',
          meta: { requiresAuth: true },
          component: MySettings
        },
        {
          path: '/marketing',
          meta: { requiresAuth: true },
          component: Marketing
        }
      ]
    }
  ],
  mode: 'history' // mode 设置为history ，去掉地址栏上的 # 号
})
// 给路由设置“导航守卫”
// 在守卫中对token进行监听，有token就让执行，否则跳转到登录页去
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 请求"login"就直接通过
    if (to.path === '/') {
      return next()
    }
    // 请求"非login"，就判断token
    var token = window.sessionStorage.getItem('token')
    if (!token) {
      return next('/')
    }
  }

  next() // 请继续你的旅行
})
export default router

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

export default new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/machine', component: Machine },
    { path: '/submitOrder', component: SubmitOrder },
    {
      path: '/personal',
      component: personal,
      redirect: '/order',
      children: [
        { path: '/order', component: Order },
        { path: '/check', component: Check },
        { path: '/putRecord', component: PutRecord },
        { path: '/statistics', component: Statistics },
        { path: '/mySettings', component: MySettings },
        { path: '/marketing', component: Marketing }
      ]
    }
  ]
})

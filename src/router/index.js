import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout'
import home from './modules/home'
import Callback from '@/views/access-control/callback'

// 捕捉面包屑一级导航点击错误，在当前页面点击，地址不变
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const layout = {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [
    home,
  ]
}

const routes = [
  layout,
  {
    name: 'callback',
    path: '/oauth/callback',
    component: Callback,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // if (to.meta.title) {
  //   document.title = to.meta.title + ' - Grinder 数据挖掘分析平台'
  // }

  // if (process.env.VUE_APP_ENV !== 'development') {
  //   const userInfo = Vue.$cookies.get('User-Info')
  //   if (!userInfo || !userInfo.username) {
  //     if (to.path !== '/oauth/callback') {
  //       window.location.href = process.env.VUE_APP_SSO_AUTH_URL
  //         + '/oauth2/authorize?response_type=code&client_id=' + process.env.VUE_APP_SSO_CLIENT_ID
  //       // + '&state=' + encodeURIComponent(to.path)
  //     } else {
  //       next()
  //       return
  //     }
  //   }
  // }

  //
  next();
})

export default router


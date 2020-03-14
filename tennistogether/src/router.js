import Vue from 'vue'
import Router from 'vue-router'
import routes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'
import Cookies from 'js-cookie'

Vue.use(Router)
console.log(routes)
const RouterLayout = createRouterLayout(layout => {
  return import('@/layouts/' + layout + '.vue')
})

export default new Router({
  routes: [
    {
      path: '/',
      component: RouterLayout,
      children: routes
    }
  ]
})

const router = new Router({
  routes: [
    {
      path: '/',
      component: RouterLayout,
      children: routes,
      beforeEnter: (to, from, next) => {
        next()
      }
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const sId = Cookies.get('sessionId')
  const userInfo = Cookies.get('userInfo')

  console.log(sId)
  console.log(userInfo)
  if (sId) { // 새로고침시 state에 저장
    // store.state.isAuthenticated = true
    // store.state.sessionId = sId
    // store.state.userInfo = userInfo ? JSON.parse(userInfo) : null
  }
  if (!to.matched.length) { // 404 Error check
    next('/error/error404')
  }
  next('/login')
})

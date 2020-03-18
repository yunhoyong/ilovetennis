import Vue from 'vue'
import Router from 'vue-router'
import routes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'
import Cookies from 'js-cookie'
import store from './store'
Vue.use(Router)
console.log(routes)
const RouterLayout = createRouterLayout(layout => {
  return import('@/layouts/' + layout + '.vue')
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
  if (sId) { // 새로고침시 state에 저장
    store.state.isAuthenticated = true
    store.state.sessionId = sId
    store.state.userInfo = userInfo ? JSON.parse(userInfo) : null
  }
  if (!to.matched.length) { // 404 Error check
    next('/error/error404')
  } else {
    next()
  }
  // if (to.name === 'login') { // 로그인 페이지로 갈 경우
  //   if (!store.getters.isAuthenticated) { // 인증 정보가 없다면 로그인 페이지로
  //     next()
  //   } else {
  //     // <!-- GRANDOPEN  -->
  //     next('/main') // 인증 정보가 있다면 메인으로
  //     // next('/contract/release')
  //   }
  // } else { // 로그인 페이지외의 페이지로 갈 경우
  //   if (store.getters.isAuthenticated) { // 인증 정보가 있다면
  //     if (to && to.params && to.params.isNewTab === true) { // 새창 띄우기
  //       const route = router.resolve({ name: to.name })
  //       window.open(route.href, '_blank')
  //       next(false)
  //     } else {
  //       if (from && from.query && from.query.isNewTab) { // 새창으로 띄운화면에서
  //         next(false)
  //       } else {
  //         if (to.path === '/') {
  //           // <!-- GRANDOPEN  -->
  //           next('/main')
  //           // next('/contract/release')
  //         } else {
  //           next()
  //         }
  //       }
  //     }
  //   } else {
  //     // exception ssoLogin
  //     if (to.name === 'ssoLogin') {
  //       next()
  //     } else {
  //       next('/login')
  //     }
  //   }
  // }
})

export default router

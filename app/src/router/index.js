import Vue from 'vue'
import VueRouter from 'vue-router'
import TokenService from '../services/storage'

import AppBase from '@/views/AppBase'
import Page404 from '@/views/404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/account',
    name: 'account',
    component: () =>
      import(/* webpackChunkName: "account" */ '@/views/AccountBase.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "account" */ '@/views/AccountLogin.vue'),
        meta: {
          public: true,
          anonymousOnly: true
        }
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () =>
          import(
            /* webpackChunkName: "account" */ '@/views/AccountForgotPass.vue'
          ),
        meta: {
          public: true,
          anonymousOnly: true
        }
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () =>
          import(
            /* webpackChunkName: "account" */ '@/views/AccountResetPass.vue'
          ),
        meta: {
          public: true,
          anonymousOnly: true
        }
      }
    ]
  },
  {
    path: '/app',
    name: 'app',
    component: AppBase,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue')
      }
    ]
  },
  { path: '*', component: Page404 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const anonymousOnly = to.matched.some(record => record.meta.anonymousOnly)
  const isLoggedIn = !!TokenService.getToken()

  if (!isPublic && !isLoggedIn) {
    return next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  }

  if (isLoggedIn && anonymousOnly) {
    return next('/dashboard')
  }

  next()
})

export default router

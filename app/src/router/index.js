import Vue from 'vue'
import VueRouter from 'vue-router'
import TokenService from '../services/storage'

import Base from '@/views/Base'
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
    component: Base,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue')
      },
      {
        path: 'database-view',
        name: 'database-view',
        component: () =>
          import(/* webpackChunkName: "database" */ '@/views/DatabaseView.vue')
      },
      {
        path: 'edit-data',
        name: 'edit-data',
        component: () =>
          import(/* webpackChunkName: "database" */ '@/views/DatabaseView.vue')
      },
      {
        path: 'table-view/:idTable',
        name: 'table-view',
        component: () =>
          import(/* webpackChunkName: "table" */ '@/views/TableView.vue')
      },
      {
        path: 'table-add/',
        name: 'table-add',
        component: () =>
          import(/* webpackChunkName: "table" */ '@/views/TableAdd.vue')
      },
      {
        path: 'table-edit/:idTable?',
        name: 'table-edit',
        component: () =>
          import(/* webpackChunkName: "table" */ '@/views/TableEdit.vue')
      },
      {
        path: 'table-view/:idTable/entity-view/:idEntity',
        name: 'entity-view',
        component: () =>
          import(/* webpackChunkName: "table" */ '@/views/TableEntityView.vue')
      },
      {
        path: 'table-import',
        name: 'table-import',
        component: () =>
          import(/* webpackChunkName: "table" */ '@/views/TableImportForm.vue')
      },
      {
        path: 'table-import-result',
        name: 'table-import-result',
        component: () =>
          import(/* webpackChunkName: "table" */ '@/views/TableImportResult.vue')
      },
      {
        path: 'table-view/:idTable/entity-edit/:idEntity?',
        name: 'entity-edit',
        component: () =>
          import(/* webpackChunkName: "table" */ '@/views/TableEntityEdit.vue')
      },
      {
        path: 'filtered-view',
        name: 'filtered-view',
        component: () =>
          import(/* webpackChunkName: "table" */ '@/views/FilteredView.vue')
      },
      {
        path: 'filter-table-view/',
        name: 'filtered-table-view',
        component: () =>
          import(/* webpackChunkName: "table" */ '@/views/TableView.vue'),
        props: {
          filterViewMode: true
        }
      },
      {
        path: 'users',
        name: 'users',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/Users.vue')
      }
      // {
      //   path: 'users/profile/:username',
      //   name: 'user-profile',
      //   component: () =>
      //     import(/* webpackChunkName: "user" */ '@/views/UsersProfile.vue')
      // },
      // {
      //   path: 'edit/:username',
      //   name: 'user-edit',
      //   component: () =>
      //     import(/* webpackChunkName: "user" */ '@/views/UsersProfileEdit.vue')
      // },
      // {
      //   path: 'add',
      //   name: 'user-add',
      //   component: () =>
      //     import(/* webpackChunkName: "user" */ '@/views/UsersProfileEdit.vue')
      // }
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
    return next('/app/dashboard')
  }

  next()
})

export default router

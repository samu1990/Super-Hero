import Vue from 'vue'
import Router from 'vue-router'
import {
  auth
} from "@/firebase";
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ingreso',
      name: 'ingreso',
      component: () => import('./views/Ingreso.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/Admin.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/publisher',
      name: 'publisher',
      component: () => import('./views/Publisher.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/hero/:id',
      name: 'hero',
      component: () => import('./views/Hero.vue'),
      props: true
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue'),
    },
    {
      path: '/myHeros',
      name: 'myHeros',
      component: () => import('./views/myHeros.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('./views/Chat.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const user = auth.currentUser
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user) {
      next()
    } else {
      next({
        name: 'ingreso'
      })
    }
  } else {
    next()
  }
})

export default router
import { createRouter, createWebHashHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import TaskView from '../views/TaskView.vue'
import StatsView from '../views/StatsView.vue'
import store from '@/store'
import userService from '@/services/users'
import LoginView from '../views/LoginView.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/:accessToken/',
    name: 'login',
    component: LoginView,
    beforeEnter: async (to) => {
      try {
        const accessToken = to.params.accessToken
        await userService.getYomboNick(accessToken)
        return true
      } catch(err) {
        if (err.response.status === 404) {
          return({path: '/register'})
        } else {
          throw(err)
        }
      }
    }
  },
  {
    path: '/:accessToken/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:accessToken/task/:category',
    name: 'task',
    component: TaskView,
    meta: {
      requiresAuth: true,
      transition: 'fade'
    }
  },
  {
    path: '/:accessToken/stats',
    name: 'stats',
    component: StatsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/',
    redirect: '/register'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  if(to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters['isLoggedIn']) {
      next()
    } else if (to.params.accessToken && to.name !== 'login') {
      next({name: 'login', params: { accessToken: to.params.accessToken}})
    } else {
      next({ name: 'register' })
    }
  } else {
    next()
  }
})

export default router

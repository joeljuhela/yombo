import { createRouter, createWebHashHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
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
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
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

  console.log(store)
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    console.log(store)
    if (store.getters['isLoggedIn']) {
      next()
    } else {
      next({ name: 'register' })
    }
  } else {
    next()
  }
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'register',
    component: RegisterView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

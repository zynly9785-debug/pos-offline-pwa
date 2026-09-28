import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/Login.vue'
import POS from './pages/POS.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/pos', component: POS }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

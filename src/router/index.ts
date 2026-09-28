import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/Login.vue'
import POS from './pages/POS.vue'
import Products from './pages/Products.vue'
import Reports from './pages/Reports.vue'
import Settings from './pages/Settings.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/pos' }, { path: '/login', component: Login },
    { path: '/pos', component: POS }, { path: '/products', component: Products },
    { path: '/reports', component: Reports }, { path: '/settings', component: Settings }
  ]
})

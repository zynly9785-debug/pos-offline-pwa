import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/Login.vue'
import POS from './pages/POS.vue'
import Products from './pages/Products.vue'
import Reports from './pages/Reports.vue'
import Settings from './pages/Settings.vue'
import Customers from './pages/Customers.vue'
import Suppliers from './pages/Suppliers.vue'
import Expenses from './pages/Expenses.vue'
import Accounting from './pages/Accounting.vue'
import { isAuthenticated } from './services/auth'

const router = createRouter({ history: createWebHistory(), routes: [
  { path: '/', redirect: '/pos' }, { path: '/login', component: Login }, { path: '/pos', component: POS },
  { path: '/products', component: Products }, { path: '/reports', component: Reports }, { path: '/settings', component: Settings },
  { path: '/customers', component: Customers }, { path: '/suppliers', component: Suppliers }, { path: '/expenses', component: Expenses }, { path: '/accounting', component: Accounting }
] })
router.beforeEach((to) => { if (to.path !== '/login' && !isAuthenticated()) return '/login' })
export default router

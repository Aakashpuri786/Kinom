import { createRouter, createWebHistory } from 'vue-router'

// Views
import HomePage from '../views/HomePage.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

// Dashboard pages
import DashboardHome from '../views/dashboard/DashboardHome.vue'
import Products from '../views/dashboard/Products.vue'
import Carts from '../views/dashboard/Carts.vue'
import Orders from '../views/dashboard/Orders.vue'
import Insights from '../views/dashboard/Insights.vue'
import YourProducts from '../views/dashboard/YourProducts.vue'
import Chats from '../views/dashboard/Chats.vue'
import AIAssistant from '../views/dashboard/AIAssistant.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: DashboardHome,
      },
      {
        path: 'products',
        name: 'Products',
        component: Products,
      },
      {
        path: 'carts',
        name: 'Carts',
        component: Carts,
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
      },
      {
        path: 'insights',
        name: 'Insights',
        component: Insights,
      },
      {
        path: 'your-products',
        name: 'YourProducts',
        component: YourProducts,
      },
      {
        path: 'chats',
        name: 'Chats',
        component: Chats,
      },
      {
        path: 'ai-assistant',
        name: 'AIAssistant',
        component: AIAssistant,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

// Views
import HomePage from '../views/HomePage.vue'
import Auth from '../views/Auth.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

// Forms
import Login from '../form/Login.vue'
import Signup from '../form/Signup.vue'

// Dashboard pages
import DashboardHome from '../views/dashboard/DashboardHome.vue'
import Products from '../views/dashboard/Products.vue'
import Carts from '../views/dashboard/Carts.vue'
import Orders from '../views/dashboard/Orders.vue'
import Insights from '../views/dashboard/Insights.vue'
import YourProducts from '../views/dashboard/YourProducts.vue'
import Chats from '../views/dashboard/Chats.vue'
import KinomChatWidget from '../components/KinomChatWidget.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/kinom-chat-widget',
    name: 'KinomChatWidget',
    component: KinomChatWidget,
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

// Router guard to protect dashboard routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path.startsWith('/dashboard') && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 w-64 transform bg-gradient-to-b from-black via-neutral-900 to-neutral-800 text-white transition-transform duration-300 lg:relative lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex h-full flex-col">
        <!-- Logo -->
        <div class="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <router-link to="/" class="flex items-center gap-3">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-xs font-semibold uppercase tracking-[0.15em]">
              K
            </span>
            <span class="text-lg font-semibold tracking-wide">Kinom</span>
          </router-link>
          <button
            class="lg:hidden text-white/70 hover:text-white"
            @click="sidebarOpen = false"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.path"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
            :class="isActive(item.path) ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'"
          >
            <component :is="item.icon" class="h-5 w-5" />
            {{ item.name }}
          </router-link>
        </nav>

        <!-- User section -->
        <div class="border-t border-white/10 p-4">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold">
              {{ user.name.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="text-sm font-medium">{{ user.name }}</p>
              <p class="text-xs text-white/60">{{ user.email }}</p>
              
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Main content -->
    <div class="flex flex-1 flex-col">
      <!-- Top header -->
      <header class="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
        <button
          class="lg:hidden text-gray-600 hover:text-gray-900"
          @click="sidebarOpen = true"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h1 class="text-lg font-semibold text-gray-900">{{ currentPageTitle }}</h1>

        <div class="ml-auto flex items-center gap-4">
          <div class="text-sm text-gray-600">
            {{ user.name }}
          </div>
          <button class="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sidebarOpen = ref(false)
const user = ref({ name: 'User', email: 'support@kinom.com' })
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

const loadUserData = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        user.value = {
          name: data.name ,
          email: data.email
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      // Fallback to localStorage
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          user.value = {
            name: parsedUser.name,
            email: parsedUser.email
          }
        } catch (parseError) {
          console.error('Error parsing user data:', parseError)
        }
      }
    }
  } else {
    // No token, fallback to localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        user.value = {
          name: parsedUser.name,
          email: parsedUser.email
        }
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }
}

onMounted(() => {
  loadUserData()
})

// Icon components (inline SVGs as render functions)
const DashboardIcon = () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' })
])

const ProductsIcon = () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
])

const CartsIcon = () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' })
])

const OrdersIcon = () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' })
])

const InsightsIcon = () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })
])

const YourProductsIcon = () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' })
])

const ChatsIcon = () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' })
])

const AIAssistantIcon = () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' })
])

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { name: 'Products', path: '/dashboard/products', icon: ProductsIcon },
  { name: 'Carts', path: '/dashboard/carts', icon: CartsIcon },
  { name: 'Orders', path: '/dashboard/orders', icon: OrdersIcon },
  { name: 'Insights', path: '/dashboard/insights', icon: InsightsIcon },
  { name: 'Your Products', path: '/dashboard/your-products', icon: YourProductsIcon },
  { name: 'Chats', path: '/dashboard/chats', icon: ChatsIcon },
  { name: 'AI Assistant', path: '/dashboard/ai-assistant', icon: AIAssistantIcon },
]

const isActive = (path) => {
  if (path === '/dashboard') {
    return route.path === '/dashboard'
  }
  return route.path.startsWith(path)
}

const currentPageTitle = computed(() => {
  const current = navItems.find((item) => isActive(item.path))
  return current?.name || 'Dashboard'
})
</script>

<template>
  <div class="space-y-6">
    <!-- Stats cards -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-2xl bg-white p-6 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-gray-500">{{ stat.label }}</p>
          <span
            class="rounded-full px-2 py-1 text-xs font-medium"
            :class="stat.trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
          >
            {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
          </span>
        </div>
        <p class="mt-2 text-3xl font-semibold text-gray-900">{{ stat.value }}</p>
      </div>
    </div>

    <!-- Recent activity -->
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-2xl bg-white p-6 shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900">Recent Orders</h2>
        <div class="mt-4 space-y-4">
          <div
            v-for="order in recentOrders"
            :key="order.id"
            class="flex items-center justify-between rounded-xl bg-gray-50 p-4"
          >
            <div>
              <p class="font-medium text-gray-900">{{ order.product }}</p>
              <p class="text-sm text-gray-500">{{ order.date }}</p>
            </div>
            <span
              class="rounded-full px-3 py-1 text-xs font-medium"
              :class="{
                'bg-yellow-100 text-yellow-700': order.status === 'pending',
                'bg-green-100 text-green-700': order.status === 'completed',
                'bg-blue-100 text-blue-700': order.status === 'processing',
              }"
            >
              {{ order.status }}
            </span>
          </div>
        </div>
      </div>

      <div class="rounded-2xl bg-white p-6 shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <router-link
            to="/dashboard/products"
            class="flex items-center gap-3 rounded-xl bg-gray-50 p-4 transition hover:bg-gray-100"
          >
            <div class="rounded-lg bg-black p-2 text-white">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span class="font-medium text-gray-900">Add Product</span>
          </router-link>

          <router-link
            to="/dashboard/orders"
            class="flex items-center gap-3 rounded-xl bg-gray-50 p-4 transition hover:bg-gray-100"
          >
            <div class="rounded-lg bg-black p-2 text-white">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span class="font-medium text-gray-900">View Orders</span>
          </router-link>

          <router-link
            to="/dashboard/insights"
            class="flex items-center gap-3 rounded-xl bg-gray-50 p-4 transition hover:bg-gray-100"
          >
            <div class="rounded-lg bg-black p-2 text-white">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span class="font-medium text-gray-900">View Insights</span>
          </router-link>

          <router-link
            to="/dashboard/ai-assistant"
            class="flex items-center gap-3 rounded-xl bg-gray-50 p-4 transition hover:bg-gray-100"
          >
            <div class="rounded-lg bg-black p-2 text-white">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span class="font-medium text-gray-900">AI Assistant</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { label: 'Total Products', value: '124', trend: 12 },
  { label: 'Active Orders', value: '45', trend: 8 },
  { label: 'Total Revenue', value: 'Rs. 52,000', trend: 23 },
  { label: 'Total Customers', value: '89', trend: -3 },
]

const recentOrders = [
  { id: 1, product: 'Rs. 1000 Note - DOB 2047/1/14', date: 'Today, 2:30 PM', status: 'pending' },
  { id: 2, product: 'Rs. 500 Note - DOB 2046/9/21', date: 'Today, 11:00 AM', status: 'processing' },
  { id: 3, product: 'Rs. 100 Note - DOB 2055/7/20', date: 'Yesterday', status: 'completed' },
]
</script>

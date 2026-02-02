<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-gray-900">Insights & Analytics</h2>

    <!-- Stats overview -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-2xl bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-gray-500">Total Sales</p>
        <p class="mt-2 text-3xl font-semibold text-gray-900">Rs. 1,52,000</p>
        <p class="mt-2 text-sm text-green-600">+23% from last month</p>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-gray-500">Products Sold</p>
        <p class="mt-2 text-3xl font-semibold text-gray-900">89</p>
        <p class="mt-2 text-sm text-green-600">+12% from last month</p>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-gray-500">Active Listings</p>
        <p class="mt-2 text-3xl font-semibold text-gray-900">45</p>
        <p class="mt-2 text-sm text-blue-600">+5 new this week</p>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-gray-500">Avg. Order Value</p>
        <p class="mt-2 text-3xl font-semibold text-gray-900">Rs. 1,708</p>
        <p class="mt-2 text-sm text-green-600">+8% from last month</p>
      </div>
    </div>

    <!-- Chart placeholder -->
    <div class="rounded-2xl bg-white p-6 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-900">Sales Over Time</h3>
      <div class="mt-4 flex h-64 items-center justify-center rounded-xl bg-gray-50">
        <p class="text-gray-400">Chart visualization will appear here</p>
      </div>
    </div>

    <!-- Top products -->
    <div class="rounded-2xl bg-white p-6 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-900">Top Selling Products</h3>
      <div class="mt-4 space-y-4">
        <div v-for="product in topProducts" :key="product.name" class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="h-12 w-16 rounded bg-gray-200"></div>
            <div>
              <p class="font-medium text-gray-900">{{ product.name }}</p>
              <p class="text-sm text-gray-500">{{ product.sold }} sold</p>
            </div>
          </div>
          <p class="font-semibold text-gray-900">Rs. {{ product.revenue }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const topProducts = [
  { name: 'Rs. 1000 Note - Special DOB', sold: 34, revenue: '85,000' },
  { name: 'Rs. 500 Note - Rare Series', sold: 28, revenue: '33,600' },
  { name: 'Rs. 100 Note - Collector', sold: 27, revenue: '13,500' },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-900">Your Products</h2>
      <button class="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition">
        + List New Product
      </button>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="product in myProducts"
        :key="product.id"
        class="rounded-2xl bg-white p-6 shadow-sm"
      >
        <div class="aspect-[4/3] w-full rounded-xl bg-gray-100"></div>
        <div class="mt-4">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-semibold text-gray-900">{{ product.name }}</h3>
              <p class="text-sm text-gray-500">DOB: {{ product.dob }}</p>
            </div>
            <span
              class="rounded-full px-2 py-1 text-xs font-medium"
              :class="product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
            >
              {{ product.status }}
            </span>
          </div>
          <p class="mt-2 text-lg font-bold text-gray-900">Rs. {{ product.price }}</p>
          <div class="mt-4 flex gap-2">
            <button class="flex-1 rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition">
              Edit
            </button>
            <button class="flex-1 rounded-lg bg-red-50 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition">
              Remove
            </button>
          </div>
        </div>
      </div>

      <!-- Add new card -->
      <div class="flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-6 hover:border-gray-400 transition cursor-pointer">
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p class="mt-2 font-medium text-gray-600">Add New Product</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const myProducts = [
  { id: 1, name: 'Rs. 1000 Note', dob: '2047/1/14', price: '2,500', status: 'active' },
  { id: 2, name: 'Rs. 500 Note', dob: '2046/9/21', price: '1,200', status: 'active' },
  { id: 3, name: 'Rs. 100 Note', dob: '2055/7/20', price: '500', status: 'sold' },
]
</script>

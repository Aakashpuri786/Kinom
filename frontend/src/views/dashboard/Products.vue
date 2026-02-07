<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-900">All Products</h2>
      <button class="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition">
        + Add Product
      </button>
    </div>

    <div class="rounded-2xl bg-white shadow-sm overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Product</th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">DOB</th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Price</th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="h-12 w-16 rounded bg-gray-200"></div>
                <span class="font-medium text-gray-900">{{ product.name }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ product.dob }}</td>
            <td class="px-6 py-4 text-gray-900 font-medium">Rs. {{ product.price }}</td>
            <td class="px-6 py-4">
              <span
                class="rounded-full px-3 py-1 text-xs font-medium"
                :class="product.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
              >
                {{ product.status }}
              </span>
            </td>
            <td class="px-6 py-4">
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const products = [
  { id: 1, name: 'Rs. 1000 Note', dob: '2047/1/14', price: '2,500', status: 'available' },
  { id: 2, name: 'Rs. 500 Note', dob: '2046/9/21', price: '1,200', status: 'available' },
  { id: 3, name: 'Rs. 100 Note', dob: '2055/7/20', price: '500', status: 'sold' },
  { id: 4, name: 'Rs. 1000 Note', dob: '2050/3/15', price: '3,000', status: 'available' },
]
</script>

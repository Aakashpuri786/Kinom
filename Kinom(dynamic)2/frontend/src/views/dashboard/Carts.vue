<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-gray-900">Shopping Carts</h2>

    <div class="rounded-2xl bg-white p-6 shadow-sm">
      <div v-if="cartItems.length === 0" class="py-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No items in cart</h3>
        <p class="mt-2 text-gray-500">Start adding products to your cart.</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="flex items-center justify-between rounded-xl bg-gray-50 p-4"
        >
          <div class="flex items-center gap-4">
            <div class="h-16 w-20 rounded bg-gray-200"></div>
            <div>
              <p class="font-medium text-gray-900">{{ item.name }}</p>
              <p class="text-sm text-gray-500">DOB: {{ item.dob }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-semibold text-gray-900">Rs. {{ item.price }}</p>
            <button class="mt-1 text-sm text-red-600 hover:text-red-700">Remove</button>
          </div>
        </div>

        <div class="border-t pt-4">
          <div class="flex items-center justify-between">
            <span class="text-lg font-semibold text-gray-900">Total</span>
            <span class="text-xl font-bold text-gray-900">Rs. 3,700</span>
          </div>
          <button class="mt-4 w-full rounded-xl bg-black py-3 text-sm font-medium text-white hover:bg-gray-800 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cartItems = [
  { id: 1, name: 'Rs. 1000 Note', dob: '2047/1/14', price: '2,500' },
  { id: 2, name: 'Rs. 500 Note', dob: '2046/9/21', price: '1,200' },
]
</script>

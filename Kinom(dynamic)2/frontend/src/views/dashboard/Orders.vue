<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-900">Orders</h2>
      <div class="flex gap-2">
        <select class="rounded-xl border border-gray-200 px-4 py-2 text-sm">
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Completed</option>
        </select>
      </div>
    </div>

    <div class="rounded-2xl bg-white shadow-sm overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Order ID</th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Customer</th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Product</th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Amount</th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 font-medium text-gray-900">#{{ order.id }}</td>
            <td class="px-6 py-4 text-gray-600">{{ order.customer }}</td>
            <td class="px-6 py-4 text-gray-600">{{ order.product }}</td>
            <td class="px-6 py-4 font-medium text-gray-900">Rs. {{ order.amount }}</td>
            <td class="px-6 py-4">
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
            </td>
            <td class="px-6 py-4 text-gray-500">{{ order.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const orders = [
  { id: '001', customer: 'Sagar Dhakal', product: 'Rs. 1000 Note', amount: '2,500', status: 'pending', date: '2026-01-28' },
  { id: '002', customer: 'Balen Shah', product: 'Rs. 500 Note', amount: '1,200', status: 'processing', date: '2026-01-27' },
  { id: '003', customer: 'Kp Oli', product: 'Rs. 100 Note', amount: '500', status: 'completed', date: '2026-01-26' },
  { id: '004', customer: 'Ram Kumar', product: 'Rs. 1000 Note', amount: '3,000', status: 'completed', date: '2026-01-25' },
]
</script>

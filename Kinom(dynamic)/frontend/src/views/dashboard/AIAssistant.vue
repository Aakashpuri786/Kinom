<template>
  <div class="flex h-[calc(100vh-theme(spacing.32))] flex-col rounded-2xl bg-white shadow-sm">
    <!-- Header -->
    <div class="border-b p-4">
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <p class="font-medium text-gray-900">Kinom AI Assistant</p>
          <p class="text-sm text-gray-500">Ask me anything about your products or sales</p>
        </div>
      </div>
    </div>

    <!-- Chat messages -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div class="flex justify-start">
        <div class="max-w-[70%] rounded-2xl rounded-bl-none bg-gray-100 px-4 py-3">
          <p class="text-gray-900">Hello! I'm your Kinom AI Assistant. I can help you with:</p>
          <ul class="mt-2 ml-4 list-disc text-gray-700 text-sm space-y-1">
            <li>Product pricing suggestions</li>
            <li>Market trends analysis</li>
            <li>Customer inquiries</li>
            <li>Inventory management tips</li>
          </ul>
          <p class="mt-2 text-gray-900">How can I assist you today?</p>
        </div>
      </div>

      <div v-for="msg in messages" :key="msg.id" :class="msg.isUser ? 'flex justify-end' : 'flex justify-start'">
        <div
          class="max-w-[70%] rounded-2xl px-4 py-3"
          :class="msg.isUser ? 'rounded-br-none bg-black text-white' : 'rounded-bl-none bg-gray-100 text-gray-900'"
        >
          <p>{{ msg.text }}</p>
        </div>
      </div>

      <div v-if="loading" class="flex justify-start">
        <div class="rounded-2xl rounded-bl-none bg-gray-100 px-4 py-3">
          <div class="flex gap-1">
            <span class="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></span>
            <span class="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.1s"></span>
            <span class="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.2s"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="border-t p-4">
      <div class="flex gap-3">
        <input
          v-model="input"
          type="text"
          placeholder="Ask AI Assistant..."
          class="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-400 focus:outline-none"
          @keyup.enter="sendMessage"
        />
        <button
          class="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
          @click="sendMessage"
        >
          Send
        </button>
      </div>
      <div class="mt-3 flex flex-wrap gap-2">
        <button
          v-for="suggestion in suggestions"
          :key="suggestion"
          class="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 transition"
          @click="input = suggestion"
        >
          {{ suggestion }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
const loading = ref(false)
const messages = ref([])

const suggestions = [
  'What\'s the best price for Rs. 1000 note?',
  'Show me sales trends',
  'How to improve listings?',
  'Popular DOB combinations',
]

const sendMessage = async () => {
  if (!input.value.trim()) return

  messages.value.push({
    id: Date.now(),
    text: input.value,
    isUser: true,
  })

  const userInput = input.value
  input.value = ''
  loading.value = true

  // Simulate AI response
  await new Promise((r) => setTimeout(r, 1500))

  loading.value = false
  messages.value.push({
    id: Date.now(),
    text: `Thanks for your question about "${userInput}". Based on market analysis, I recommend reviewing your pricing strategy and comparing with similar listings. Would you like more specific advice?`,
    isUser: false,
  })
}
</script>

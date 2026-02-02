<template>
  <div class="flex h-[calc(100vh-theme(spacing.32))] gap-6">
    <!-- Chat list -->
    <div class="w-80 flex-shrink-0 rounded-2xl bg-white shadow-sm">
      <div class="border-b p-4">
        <input
          type="text"
          placeholder="Search chats..."
          class="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-gray-400 focus:outline-none"
        />
      </div>
      <div class="overflow-y-auto">
        <div
          v-for="chat in chats"
          :key="chat.id"
          class="flex cursor-pointer items-center gap-3 border-b p-4 hover:bg-gray-50"
          :class="selectedChat === chat.id ? 'bg-gray-50' : ''"
          @click="selectedChat = chat.id"
        >
          <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600">
            {{ chat.name.charAt(0) }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <p class="font-medium text-gray-900 truncate">{{ chat.name }}</p>
              <span class="text-xs text-gray-500">{{ chat.time }}</span>
            </div>
            <p class="text-sm text-gray-500 truncate">{{ chat.lastMessage }}</p>
          </div>
          <div v-if="chat.unread" class="h-5 w-5 rounded-full bg-black text-xs text-white flex items-center justify-center">
            {{ chat.unread }}
          </div>
        </div>
      </div>
    </div>

    <!-- Chat window -->
    <div class="flex flex-1 flex-col rounded-2xl bg-white shadow-sm">
      <div class="border-b p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600">
            S
          </div>
          <div>
            <p class="font-medium text-gray-900">Sagar Dhakal</p>
            <p class="text-sm text-green-600">Online</p>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div class="flex justify-start">
          <div class="max-w-[70%] rounded-2xl rounded-bl-none bg-gray-100 px-4 py-3">
            <p class="text-gray-900">Hi, I'm interested in the Rs. 1000 note with DOB 2047/1/14</p>
            <p class="mt-1 text-xs text-gray-500">10:30 AM</p>
          </div>
        </div>
        <div class="flex justify-end">
          <div class="max-w-[70%] rounded-2xl rounded-br-none bg-black px-4 py-3 text-white">
            <p>Yes, it's still available! Would you like to proceed with the purchase?</p>
            <p class="mt-1 text-xs text-white/70">10:32 AM</p>
          </div>
        </div>
        <div class="flex justify-start">
          <div class="max-w-[70%] rounded-2xl rounded-bl-none bg-gray-100 px-4 py-3">
            <p class="text-gray-900">Great! What's the final price?</p>
            <p class="mt-1 text-xs text-gray-500">10:35 AM</p>
          </div>
        </div>
      </div>

      <div class="border-t p-4">
        <div class="flex gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            class="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-400 focus:outline-none"
          />
          <button class="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition">
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedChat = ref(1)

const chats = [
  { id: 1, name: 'Sagar Dhakal', lastMessage: 'Great! What\'s the final price?', time: '10:35 AM', unread: 1 },
  { id: 2, name: 'Balen Shah', lastMessage: 'Thanks for the quick delivery!', time: 'Yesterday', unread: 0 },
  { id: 3, name: 'Kp Oli', lastMessage: 'Is this note still available?', time: 'Monday', unread: 2 },
]
</script>

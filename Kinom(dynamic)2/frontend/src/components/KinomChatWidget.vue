<template>
  <!-- Floating Chat Button -->
  <button
    @click="toggleChat"
    class="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-none cursor-pointer shadow-lg z-[9999] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
  >
    <!-- Chat Icon when closed -->
    <svg
      v-if="!isOpen"
      xmlns="http://www.w3.org/2000/svg"
      class="w-7 h-7 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"
      />
    </svg>
    <!-- Close Icon when open -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="w-7 h-7 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <!-- Chat Popup Window -->
  <Transition name="chat">
    <div
      v-if="isOpen"
      class="fixed bottom-24 right-5 w-[380px] h-[550px] rounded-2xl overflow-hidden shadow-2xl z-[9998] bg-white flex flex-col"
    >
      <!-- Chat Header -->
      <div class="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3 flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
            />
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-white font-semibold text-base m-0">Kinom Assistant</h3>
          <p class="text-white/80 text-xs m-0">Online • Ready to help</p>
        </div>
        <button
          @click="toggleChat"
          class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer border-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Chat Messages Area -->
      <div class="flex-1 overflow-y-auto p-4 bg-gray-50" ref="messagesContainer">
        <!-- Welcome Message -->
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center px-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"
              />
            </svg>
          </div>
          <h4 class="text-gray-800 font-semibold text-lg mb-2">Hello! 👋</h4>
          <p class="text-gray-500 text-sm mb-4">How can I assist you today?</p>
          
          <!-- Quick Action Buttons -->
          <div class="flex flex-col gap-2 w-full">
            <button
              v-for="starter in conversationStarters"
              :key="starter"
              @click="sendMessage(starter)"
              class="w-full px-3 py-2 text-sm text-left bg-white border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors cursor-pointer text-gray-700"
            >
              {{ starter }}
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div v-else class="flex flex-col gap-3">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="[
              'max-w-[85%] px-4 py-2 rounded-2xl text-sm',
              msg.type === 'user'
                ? 'self-end bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-md'
                : 'self-start bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-md'
            ]"
          >
            <p class="m-0 whitespace-pre-wrap">{{ msg.text }}</p>
          </div>
          
          <!-- Typing Indicator -->
          <div v-if="isTyping" class="self-start bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
            <div class="flex gap-1">
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Input Area -->
      <div class="p-3 bg-white border-t border-gray-200">
        <form @submit.prevent="handleSubmit" class="flex gap-2">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="Type your message..."
            class="flex-1 px-4 py-2 border border-gray-200 rounded-full text-gray-700 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            :disabled="isTyping"
          />
          <button
            type="submit"
            :disabled="!inputMessage.trim() || isTyping"
            class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'

// State
const isOpen = ref(false)
const inputMessage = ref('')
const messages = ref([])
const isTyping = ref(false)
const messagesContainer = ref(null)

// Conversation starters
const conversationStarters = [
  'How do I create an account?',
  'How can I buy products?',
  'Where can I manage my listings?',
  'How do I track my orders?'
]

// Knowledge base for responses
const knowledgeBase = {
  greeting: "Hello! 👋 How can I assist you today?",
  
  account: `To create an account on Kinom:

1. Visit the homepage
2. Click "Signup" in the navigation
3. Fill in your details (email, password, etc.)
4. Verify your email if required
5. Login to access your dashboard

Need help with anything else?`,

  buy: `To buy digital currency products:

1. Login to your account
2. Go to Dashboard → Products
3. Browse, search, or filter products
4. Click "Add to Cart" on items you want
5. Go to Dashboard → Carts to review
6. Complete your purchase in Orders

Any other questions?`,

  sell: `To sell products on Kinom:

1. Login to your dashboard
2. Go to Dashboard → Your Products
3. Click "Add New Product"
4. Fill in product details and pricing
5. Manage your inventory from this page
6. Track sales in Dashboard → Orders & Insights

Need more help?`,

  orders: `To track your orders:

1. Login to your dashboard
2. Go to Dashboard → Orders
3. View all your purchase and sale orders
4. Check order statuses and history
5. Manage order updates as needed

Is there anything specific about orders you need help with?`,

  cart: `To manage your shopping cart:

1. Go to Dashboard → Carts
2. View all items in your cart
3. Adjust quantities or remove items
4. Proceed to checkout when ready

Need assistance with something else?`,

  insights: `The Insights page provides:

• Transaction analytics
• Sales performance reports
• Market trends
• Revenue tracking

Access it at Dashboard → Insights after logging in.

Any other questions?`,

  chat: `To communicate with buyers, sellers, or support:

1. Go to Dashboard → Chats
2. View your conversations
3. Start new chats or continue existing ones

You can also use the Contact section on the homepage for support.

How else can I help?`,

  navigation: `Here's how to navigate Kinom:

**Public Pages:**
• Home (/) - Landing page
• Login (/login) - Sign in
• Signup (/signup) - Create account

**Dashboard (after login):**
• Products - Browse & buy
• Carts - Shopping cart
• Orders - Track orders
• Insights - Analytics
• Your Products - Sell items
• Chats - Messages

What would you like to explore?`,

  default: `I'm here to help you with the Kinom platform! I can assist with:

• Creating an account
• Buying products
• Selling products
• Tracking orders
• Navigating the website
• Understanding features

What would you like to know?`
}

// Toggle chat window
const toggleChat = () => {
  isOpen.value = !isOpen.value
}

// Scroll to bottom of messages
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Get bot response based on user message
const getBotResponse = (userMessage) => {
  const msg = userMessage.toLowerCase()
  
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return knowledgeBase.greeting
  }
  if (msg.includes('account') || msg.includes('signup') || msg.includes('sign up') || msg.includes('register') || msg.includes('create')) {
    return knowledgeBase.account
  }
  if (msg.includes('buy') || msg.includes('purchase') || msg.includes('products')) {
    return knowledgeBase.buy
  }
  if (msg.includes('sell') || msg.includes('listing') || msg.includes('your products')) {
    return knowledgeBase.sell
  }
  if (msg.includes('order') || msg.includes('track')) {
    return knowledgeBase.orders
  }
  if (msg.includes('cart') || msg.includes('checkout')) {
    return knowledgeBase.cart
  }
  if (msg.includes('insight') || msg.includes('analytics') || msg.includes('report')) {
    return knowledgeBase.insights
  }
  if (msg.includes('chat') || msg.includes('message') || msg.includes('contact') || msg.includes('support')) {
    return knowledgeBase.chat
  }
  if (msg.includes('navigate') || msg.includes('find') || msg.includes('where') || msg.includes('page')) {
    return knowledgeBase.navigation
  }
  
  return knowledgeBase.default
}

// Send message
const sendMessage = async (text) => {
  const messageText = text || inputMessage.value.trim()
  if (!messageText) return

  // Add user message
  messages.value.push({
    type: 'user',
    text: messageText
  })
  
  inputMessage.value = ''
  await scrollToBottom()

  // Show typing indicator
  isTyping.value = true
  await scrollToBottom()

  // Simulate response delay
  setTimeout(async () => {
    isTyping.value = false
    
    // Add bot response
    messages.value.push({
      type: 'bot',
      text: getBotResponse(messageText)
    })
    
    await scrollToBottom()
  }, 1000 + Math.random() * 500)
}

// Handle form submit
const handleSubmit = () => {
  sendMessage()
}

// Watch for messages changes to scroll
watch(messages, scrollToBottom, { deep: true })
</script>

<style scoped>
/* Chat transition animations */
.chat-enter-active,
.chat-leave-active {
  transition: all 0.3s ease;
}

.chat-enter-from,
.chat-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>

<template>
  <div class="min-h-screen bg-gradient-to-r from-black via-neutral-900 to-neutral-700 flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <!-- Toggle between Sign Up and Login -->
      <div class="mb-8 flex gap-2 rounded-xl bg-white/10 p-1">
        <button
          @click="isLogin = false"
          :class="!isLogin ? 'bg-white text-black' : 'text-white'"
          class="flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition"
        >
          Sign Up
        </button>
        <button
          @click="isLogin = true"
          :class="isLogin ? 'bg-white text-black' : 'text-white'"
          class="flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition"
        >
          Login
        </button>
      </div>

      <!-- Form Card -->
      <div class="rounded-2xl bg-white/10 backdrop-blur p-8 shadow-lg">
        <h2 class="mb-6 text-center text-2xl font-bold text-white">
          {{ isLogin ? 'Login to Kinom' : 'Create Account' }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Name field (only for signup) -->
          <div v-if="!isLogin">
            <label for="name" class="mb-2 block text-sm font-medium text-white">Name</label>
            <input
              id="name"
              v-model.trim="form.name"
              type="text"
              required
              class="w-full rounded-lg bg-white px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your name"
            />
          </div>

          <!-- Email field -->
          <div>
            <label for="email" class="mb-2 block text-sm font-medium text-white">Email</label>
            <input
              id="email"
              v-model.trim="form.email"
              type="email"
              required
              class="w-full rounded-lg bg-white px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your email"
            />
          </div>

          <!-- Password field -->
          <div>
            <label for="password" class="mb-2 block text-sm font-medium text-white">Password</label>
            <input
              id="password"
              v-model.trim="form.password"
              type="password"
              required
              minlength="6"
              class="w-full rounded-lg bg-white px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your password"
            />
          </div>

          <!-- Error/Success messages -->
          <div v-if="errorMsg" class="rounded-lg bg-red-500/20 p-3 text-sm text-red-200">
            {{ errorMsg }}
          </div>
          <div v-if="successMsg" class="rounded-lg bg-green-500/20 p-3 text-sm text-green-200">
            {{ successMsg }}
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-lg bg-white px-4 py-3 text-base font-semibold text-black transition hover:bg-gray-100 disabled:opacity-50"
          >
            {{ loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account' }}
          </button>
        </form>

        <!-- Link to home -->
        <div class="mt-6 text-center">
          <router-link to="/" class="text-sm text-white/70 hover:text-white transition">
            ← Back to Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// API Base URL
// In Docker dev, backend is exposed on http://localhost:5001
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

const isLogin = ref(false)
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const form = reactive({
  name: '',
  email: '',
  password: '',
})

const handleSubmit = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  loading.value = true

  try {
    const endpoint = isLogin.value ? '/api/auth/login' : '/api/auth/register'
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong')
    }

    if (isLogin.value) {
      // Login successful - redirect to dashboard
      successMsg.value = 'Login successful! Redirecting...'
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } else {
      // Registration successful - switch to login mode
      successMsg.value = 'Account created! Please login.'
      setTimeout(() => {
        isLogin.value = true
        form.name = ''
        form.password = ''
        successMsg.value = ''
      }, 2000)
    }
  } catch (error) {
    errorMsg.value = error.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>


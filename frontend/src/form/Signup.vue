<template>
  <div class="min-h-screen bg-gradient-to-r from-black via-neutral-900 to-neutral-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-white">Create your account</h2>
        <p class="mt-2 text-sm text-white/80">
          Or
          <router-link to="/login" class="font-medium text-yellow-400 hover:text-yellow-300">
            sign in to your account
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <div class="rounded-2xl bg-white/10 backdrop-blur-sm p-8 shadow-2xl border border-white/20">
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-semibold text-white mb-2">Full Name</label>
              <input
                id="name"
                v-model.trim="form.name"
                type="text"
                autocomplete="name"
                required
                class="w-full h-12 rounded-lg bg-white/20 border border-white/30 px-4 text-sm text-white placeholder-white/60 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-semibold text-white mb-2">Email address</label>
              <input
                id="email"
                v-model.trim="form.email"
                type="email"
                autocomplete="email"
                required
                class="w-full h-12 rounded-lg bg-white/20 border border-white/30 px-4 text-sm text-white placeholder-white/60 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-semibold text-white mb-2">Password</label>
              <input
                id="password"
                v-model.trim="form.password"
                type="password"
                autocomplete="new-password"
                required
                class="w-full h-12 rounded-lg bg-white/20 border border-white/30 px-4 text-sm text-white placeholder-white/60 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label for="confirmPassword" class="block text-sm font-semibold text-white mb-2">Confirm Password</label>
              <input
                id="confirmPassword"
                v-model.trim="form.confirmPassword"
                type="password"
                autocomplete="new-password"
                required
                class="w-full h-12 rounded-lg bg-white/20 border border-white/30 px-4 text-sm text-white placeholder-white/60 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                placeholder="Confirm your password"
              />
            </div>
          </div>
          <div class="mt-6">
            <button
              type="submit"
              class="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-3 text-sm font-semibold text-black shadow-lg transition hover:from-yellow-500 hover:to-yellow-700 hover:shadow-xl disabled:opacity-50"
              :disabled="submitting"
            >
              {{ submitting ? 'Creating account...' : 'Create account' }}
            </button>
          </div>
          <div class="mt-4 text-center">
            <p v-if="errorMsg" class="text-sm text-red-300">{{ errorMsg }}</p>
            <p v-if="success" class="text-sm text-emerald-300 font-semibold">Account created successfully!</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const submitting = ref(false)
const success = ref(false)
const errorMsg = ref('')

const onSubmit = async () => {
  success.value = false
  errorMsg.value = ''
  submitting.value = true

  if (form.password !== form.confirmPassword) {
    errorMsg.value = 'Passwords do not match'
    submitting.value = false
    return
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
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
      throw new Error(data.message || 'Registration failed')
    }

    success.value = true
    setTimeout(() => {
      router.push('/login')
    }, 1000)
  } catch (error) {
    errorMsg.value = error.message || 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

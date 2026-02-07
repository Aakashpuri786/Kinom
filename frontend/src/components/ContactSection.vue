<template>
  <section
    id="contact"
    class="bg-gradient-to-r from-black via-neutral-900 to-neutral-700 py-20 text-white"
  >
    <div class="container ml-30">
      <div class="mx-auto max-w-2xl">
        <div class="mt-8 grid place-items-center">
          <div class="w-full max-w-xl rounded-2xl bg-white/10 backdrop-blur-sm p-8 shadow-2xl border border-white/20">
            <h2 class="text-center text-2xl font-bold text-white mb-6">Contact Us</h2>
            <form @submit.prevent="onSubmit" novalidate class="space-y-6">
              <div class="flex justify-center">
                <button
                  type="submit"
                  class="rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 px-8 py-3 text-sm font-semibold text-black shadow-lg transition hover:from-yellow-500 hover:to-yellow-700 hover:shadow-xl disabled:opacity-50"
                  :disabled="submitting"
                >
                  {{ submitting ? 'Sending…' : 'Send Message' }}
                </button>
              </div>

              <div class="space-y-4">
                <div>
                  <label for="name" class="block text-sm font-semibold text-white mb-2">Name:</label>
                  <input
                    id="name"
                    v-model.trim="form.name"
                    type="text"
                    autocomplete="name"
                    class="w-full h-12 rounded-lg bg-white/20 border border-white/30 px-4 text-sm text-white placeholder-white/60 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter your name"
                    :aria-invalid="Boolean(errors.name)"
                    :aria-describedby="errors.name ? 'name-error' : undefined"
                  />
                  <p v-if="errors.name" id="name-error" class="mt-2 text-xs text-red-300">{{ errors.name }}</p>
                </div>

                <div>
                  <label for="email" class="block text-sm font-semibold text-white mb-2">Email:</label>
                  <input
                    id="email"
                    v-model.trim="form.email"
                    type="email"
                    autocomplete="email"
                    class="w-full h-12 rounded-lg bg-white/20 border border-white/30 px-4 text-sm text-white placeholder-white/60 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter your email"
                    :aria-invalid="Boolean(errors.email)"
                    :aria-describedby="errors.email ? 'email-error' : undefined"
                  />
                  <p v-if="errors.email" id="email-error" class="mt-2 text-xs text-red-300">{{ errors.email }}</p>
                </div>

                <div>
                  <label for="message" class="block text-sm font-semibold text-white mb-2">Message:</label>
                  <textarea
                    id="message"
                    v-model.trim="form.message"
                    rows="4"
                    class="w-full rounded-lg bg-white/20 border border-white/30 px-4 py-3 text-sm text-white placeholder-white/60 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm resize-none"
                    placeholder="Enter your message"
                    :aria-invalid="Boolean(errors.message)"
                    :aria-describedby="errors.message ? 'message-error' : undefined"
                  />
                  <p v-if="errors.message" id="message-error" class="mt-2 text-xs text-red-300">{{ errors.message }}</p>
                </div>
              </div>

              <div class="text-center">
                <p v-if="success" class="text-sm text-emerald-300 font-semibold">Message sent successfully!</p>
                <p v-if="errorMsg" class="text-sm text-red-300">{{ errorMsg }}</p>
              </div>
            </form>
          </div>

          <div class="mt-14 flex flex-col items-center gap-6 text-white/85">
            <div class="flex items-center gap-3">
              <span class="grid h-10 w-10 place-items-center rounded-full bg-black/40 shadow-md">
                ✉
              </span>
              <p class="text-base font-medium">aakash.puri.online@gmail.com</p>
            </div>

            <div class="flex items-center gap-3 mr-30">
              <span class="grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-black shadow-md">
                ☎
              </span>
              <p class="text-base font-medium">9748848620</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

// API Base URL - change this in production
// In Docker dev, backend is exposed on http://localhost:5001
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const errors = reactive({})
const submitting = ref(false)
const success = ref(false)
const errorMsg = ref('')

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const validate = () => {
  errors.name = undefined
  errors.email = undefined
  errors.message = undefined

  if (!form.name || form.name.length < 2) errors.name = 'Please enter your name.'
  if (!form.email || !isEmail(form.email)) errors.email = 'Please enter a valid email.'
  if (!form.message || form.message.length < 10) errors.message = 'Message must be at least 10 characters.'

  return !errors.name && !errors.email && !errors.message
}

const onSubmit = async () => {
  success.value = false
  errorMsg.value = ''
  if (!validate()) return

  submitting.value = true
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send message')
    }

    form.name = ''
    form.email = ''
    form.message = ''
    success.value = true
  } catch (error) {
    errorMsg.value = error.message || 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>


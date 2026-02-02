<template>
  <section
    id="contact"
    class="bg-gradient-to-r from-black via-neutral-900 to-neutral-700 py-20 text-white"
  >
    <div class="container">
      <div class="mx-auto max-w-2xl">
        <div class="mt-8 grid place-items-center">
          <form class="w-full max-w-xl" @submit.prevent="onSubmit" novalidate>
            <div class="flex justify-start">
              <button
                type="submit"
                class="rounded-xl bg-white px-10 py-3 text-sm font-semibold text-black shadow-md transition hover:bg-white/90"
                :disabled="submitting"
              >
                {{ submitting ? 'Sending…' : 'Send an email:' }}
              </button>
            </div>

            <div class="mt-8 space-y-6">
              <!-- Keeping Name (required) but styling like your design -->
              <div class="grid grid-cols-[110px_1fr] items-center gap-4">
                <label for="name" class="text-base font-semibold text-white">Name:</label>
                <div>
                  <input
                    id="name"
                    v-model.trim="form.name"
                    type="text"
                    autocomplete="name"
                    class="h-10 w-full max-w-[220px] rounded-lg bg-white px-3 text-sm text-black shadow-md focus:outline-none"
                    :aria-invalid="Boolean(errors.name)"
                    :aria-describedby="errors.name ? 'name-error' : undefined"
                  />
                  <p v-if="errors.name" id="name-error" class="mt-2 text-xs text-red-300">{{ errors.name }}</p>
                </div>
              </div>

              <div class="grid grid-cols-[110px_1fr] items-center gap-4">
                <label for="email" class="text-base font-semibold text-white">Email:</label>
                <div>
                  <input
                    id="email"
                    v-model.trim="form.email"
                    type="email"
                    autocomplete="email"
                    class="h-10 w-full max-w-[220px] rounded-lg bg-white px-3 text-sm text-black shadow-md focus:outline-none"
                    :aria-invalid="Boolean(errors.email)"
                    :aria-describedby="errors.email ? 'email-error' : undefined"
                  />
                  <p v-if="errors.email" id="email-error" class="mt-2 text-xs text-red-300">{{ errors.email }}</p>
                </div>
              </div>

              <div class="grid grid-cols-[110px_1fr] items-start gap-4">
                <label for="message" class="pt-2 text-base font-semibold text-white">Message:</label>
                <div>
                  <textarea
                    id="message"
                    v-model.trim="form.message"
                    rows="4"
                    class="w-full max-w-[220px] rounded-lg bg-white px-3 py-2 text-sm text-black shadow-md focus:outline-none"
                    :aria-invalid="Boolean(errors.message)"
                    :aria-describedby="errors.message ? 'message-error' : undefined"
                  />
                  <p v-if="errors.message" id="message-error" class="mt-2 text-xs text-red-300">{{ errors.message }}</p>
                </div>
              </div>

              <p v-if="success" class="text-center text-sm text-emerald-200">Message sent successfully!</p>
              <p v-if="errorMsg" class="text-center text-sm text-red-300">{{ errorMsg }}</p>
            </div>
          </form>

          <div class="mt-14 flex flex-col items-center gap-6 text-white/85">
            <div class="flex items-center gap-3">
              <span class="grid h-10 w-10 place-items-center rounded-full bg-black/40 shadow-md">
                ✉
              </span>
              <p class="text-base font-medium">aakash.puri.online@gmail.com</p>
            </div>

            <div class="flex items-center gap-3">
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
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

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


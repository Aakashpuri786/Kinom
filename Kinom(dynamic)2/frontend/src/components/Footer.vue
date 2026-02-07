<template>
  <footer class="bg-gradient-to-r from-black via-neutral-900 to-neutral-700 py-4 sm:py-6 md:py-10 lg:py-16 text-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid gap-4 sm:gap-6 md:gap-8 lg:gap-12 md:grid-cols-3 items-start">
        <!-- Brand Section -->
        <div class="flex flex-col items-center md:items-start space-y-1.5 sm:space-y-2 md:space-y-3">
          <a href="#hero" class="flex items-center gap-1.5 sm:gap-2 font-semibold tracking-tight hover:opacity-80 transition">
            <span class="inline-flex h-9 sm:h-11 md:h-12 w-9 sm:w-11 md:w-12 items-center justify-center rounded-full bg-slate-800 text-xs sm:text-sm md:text-lg font-bold uppercase tracking-wider text-white">
              K
            </span>
            <span class="hidden sm:inline text-sm md:text-lg lg:text-xl font-bold">Kinom</span>
          </a>
          <p class="text-xs sm:text-sm text-slate-400 leading-relaxed text-center md:text-left max-w-xs">
            Responsive landing page for Kinom, an online currency trading and buying platform.
          </p>
        </div>

        <!-- Navigation Section -->
        <div class="flex flex-col items-center md:items-start">
          <p class="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-1.5 sm:mb-2 md:mb-3">Navigation</p>
          <ul class="flex flex-wrap justify-center md:flex-col gap-1 text-xs sm:text-sm">
            <li v-for="item in nav" :key="item.href">
              <a class="text-slate-400 hover:text-white transition duration-200" :href="item.href">{{ item.label }}</a>
            </li>
          </ul>
        </div>

        <!-- Social Media Section -->
        <div class="flex flex-col items-center md:items-end">
          <p class="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-1.5 sm:mb-2 md:mb-3 lg:mb-4">Follow Us</p>
          <div class="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3">
            <a
              v-for="s in social"
              :key="s.label"
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600 bg-slate-800/50 text-white hover:bg-slate-700 hover:border-slate-500 transition"
              :href="s.href"
              target="_blank"
              rel="noreferrer"
              :aria-label="s.label"
              :title="s.label"
            >
              <span class="text-xs font-semibold">{{ s.icon }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="flex items-center justify-center mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 border-t border-slate-700">
        <p class="text-center text-xs text-slate-400">
          © {{ new Date().getFullYear() }} Kinom. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const nav = [
  { label: 'Home', href: '#hero' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About Us', href: '#about' },
  { label: 'Review', href: '#review' },
  { label: 'Contact Us', href: '#contact' },
]

const social = [
  { label: 'Twitter', href: 'https://example.com', icon: 'X' },
  { label: 'Instagram', href: 'https://example.com', icon: 'IG' },
  { label: 'LinkedIn', href: 'https://example.com', icon: 'in' },
]
</script>


<template>
  <footer class=" bg-gradient-to-r from-black via-neutral-900 to-neutral-700 py-20 text-white">
    <div class="container grid gap-10 md:grid-cols-3 md:items-start">
      <div class="space-y-3 mb-20">
        <a href="#hero" class="flex items-center  gap-2 font-semibold tracking-tight text-slate-900">
          <span class="inline-flex h-19 w-19 ml-10 items-center justify-center rounded-full bg-black text-xl font-semibold uppercase tracking-[0.2em] text-white">
            Kinom
          </span>
        </a>
        <p class="text-xl ml-7 text-slate-600 leading-relaxed">
          Responsive landing page for Kinom, an online money selling and buying platform.
        </p>
      </div>

      <div class="ml-50">
        <p class="text-xl font-semibold text-white-900">Navigation</p>
        <ul class="mt-3 space-y-2 text-sm">
          <li v-for="item in nav" :key="item.href">
            <a class="text-slate-500 hover:text-slate-200 transition" :href="item.href">{{ item.label }}</a>
          </li>
        </ul>
      </div>

      <div class="mb-23">
        <p class="text-xl ml-50 font-semibold text-white-900">Social Media</p>
        <div class="mt-5 flex ml-50 items-center gap-4">
          <a
            v-for="s in social"
            :key="s.label"
            class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
            :href="s.href"
            target="_blank"
            rel="noreferrer"
            :aria-label="s.label"
            
          >
            <span class="text-xs font-semibold">{{ s.icon }}</span>
          </a>
        </div>
      </div>
    </div>

   <div class="container flex items-center justify-center mt-10 ">
  <p class="text-center">
    © {{ new Date().getFullYear() }} Kinom. All rights reserved.
  </p>
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


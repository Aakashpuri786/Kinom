<template>
  <footer class="border-t border-slate-200 bg-white py-12">
    <div class="container grid gap-10 md:grid-cols-3 md:items-start">
      <div class="space-y-3">
        <a href="#hero" class="flex items-center gap-2 font-semibold tracking-tight text-slate-900">
          <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Kinom
          </span>
        </a>
        <p class="text-sm text-slate-600 leading-relaxed">
          Responsive landing page for Kinom, an online money selling and buying platform.
        </p>
      </div>

      <div>
        <p class="text-sm font-semibold text-slate-900">Navigation</p>
        <ul class="mt-3 space-y-2 text-sm">
          <li v-for="item in nav" :key="item.href">
            <a class="text-slate-600 hover:text-slate-900 transition" :href="item.href">{{ item.label }}</a>
          </li>
        </ul>
      </div>

      <div>
        <p class="text-sm font-semibold text-slate-900">Social</p>
        <div class="mt-3 flex items-center gap-3">
          <a
            v-for="s in social"
            :key="s.label"
            class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
            :href="s.href"
            target="_blank"
            rel="noreferrer"
            :aria-label="s.label"
            title="Replace with your real social links"
          >
            <span class="text-xs font-semibold">{{ s.icon }}</span>
          </a>
        </div>
      </div>
    </div>

    <div class="container mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <p>© {{ new Date().getFullYear() }} Kinom. All rights reserved.</p>
      <p>Built with Vue 3 + Tailwind</p>
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


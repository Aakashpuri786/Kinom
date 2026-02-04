<template>
  <header
    class="fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-black via-neutral-900 to-neutral-700 transition-shadow duration-300"
    :class="scrolled ? 'shadow-sm' : ''"
  >
    <nav class="container flex h-16 items-center justify-between text-white">
      <!-- Logo -->
      <a href="#hero" class="flex items-center gap-3">
        <span
          class="inline-flex font-serif font-bold text-white ml-5 items-center justify-center rounded-full  bg-black/60 text-2xl font-semibold uppercase tracking-[0.2em] hover:text-[#D4AF35] hover:scale-105 transition-transform duration-300"
        >
          Kinom
        </span>
      </a>

      <!-- Desktop Nav -->
      <div class="hidden items-center gap-10 md:flex">
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          class="nav-link text-base font-medium transition-all duration-300"
          :class="active === item.href
            ? 'nav-golden'
            : 'text-slate-300 hover:text-white'"
        >
          {{ item.label }}
        </a>
      </div>

      <!-- Mobile Button -->
      <button
        type="button"
        class="md:hidden inline-flex items-center justify-center rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-sm text-slate-50 shadow-sm backdrop-blur hover:bg-black/60 transition"
        @click="open = !open"
        :aria-expanded="open"
        aria-controls="mobile-menu"
      >
        <span class="sr-only">Open menu</span>
        <span v-if="!open">Menu</span>
        <span v-else>Close</span>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="md:hidden" v-show="open">
      <div class="border-t border-slate-200 bg-white/95 backdrop-blur">
        <div class="container py-4 space-y-2">
          <a
            v-for="item in nav"
            :key="item.href"
            :href="item.href"
            class="block rounded-lg px-3 py-2 text-base text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
            @click="open = false"
          >
            {{ item.label }}
          </a>

          <a
            href="#contact"
            class="block rounded-lg bg-slate-900 px-3 py-2 text-base font-medium text-white hover:bg-slate-800 transition"
            @click="open = false"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const nav = [
  { label: 'Home', href: '#hero' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About Us', href: '#about' },
  { label: 'Review', href: '#review' },
  { label: 'Contact Us', href: '#contact' },
]

const open = ref(false)
const scrolled = ref(false)
const active = ref('#hero')

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

let observer = null

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  const ids = ['hero', 'gallery', 'about', 'review', 'contact']

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort(
          (a, b) =>
            (b.intersectionRatio ?? 0) -
            (a.intersectionRatio ?? 0),
        )

      if (visible[0]?.target?.id) {
        active.value = `#${visible[0].target.id}`
      }
    },
    {
      threshold: [0.25, 0.4, 0.6],
      rootMargin: '-20% 0px -55% 0px',
    },
  )

  ids.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<style scoped>
/* Golden animated text */
.nav-golden {
  background: linear-gradient(
    90deg,
    #facc15,
    #fde68a,
    #f59e0b,
    #fde68a,
    #facc15
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gold-shimmer 2.5s linear infinite;
}

@keyframes gold-shimmer {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 300% 50%;
  }
}
</style>

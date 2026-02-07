<template>
  <section id="why" class="py-8 sm:py-12 md:py-20 lg:py-24 bg-gradient-to-r from-black via-neutral-900 to-neutral-700 text-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 grid items-start gap-4 md:items-start lg:items-center md:gap-6 lg:gap-12 lg:grid-cols-2">
      <div class="space-y-3 sm:space-y-4 md:space-y-6 order-2 lg:order-1">
        <div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold font-semibold tracking-tight text-white">Why choose us</h2>
          <p class="mt-1.5 sm:mt-2 md:mt-4 text-slate-300 leading-relaxed text-sm sm:text-base md:text-lg">
            Highlights / stats / bullet points section. Replace with your Canva numbers and key benefits.
          </p>
        </div>

        <div class="grid gap-2 sm:gap-3 md:gap-4 sm:grid-cols-2">
          <div v-for="s in stats" :key="s.label" class="rounded-2xl border border-slate-600 bg-slate-800 p-2.5 sm:p-3 md:p-4 lg:p-6 shadow-sm hover:bg-slate-700 transition">
            <p class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">{{ s.value }}</p>
            <p class="mt-1 text-xs text-slate-400">{{ s.label }}</p>
          </div>
        </div>

        <ul class="space-y-1.5 sm:space-y-2 md:space-y-3 pt-1 sm:pt-2 md:pt-4 text-sm sm:text-base md:text-lg text-slate-300">
          <li v-for="b in bullets" :key="b" class="flex gap-2 sm:gap-3 items-start">
            <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500 flex-shrink-0"></span>
            <span>{{ b }}</span>
          </li>
        </ul>
      </div>

      <div class="flex justify-center lg:justify-end w-full order-1 lg:order-2 mt-0 md:mt-6 lg:mt-0">
        <div class="rounded-2xl border border-slate-600 bg-slate-800/50 backdrop-blur p-3 sm:p-4 md:p-6 lg:p-8 text-white shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md">
          <h3 class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">Built for performance</h3>
          <p class="mt-1.5 sm:mt-2 md:mt-3 text-xs text-slate-300 leading-relaxed">
            Optimized structure, modern tooling, and clean Tailwind utilities. Swap colors/fonts to match Canva exactly.
          </p>
          <div class="mt-3 sm:mt-4 md:mt-6 grid gap-1.5 sm:gap-2 md:gap-3">
            <div class="rounded-xl bg-white/10 p-2.5 sm:p-3 md:p-4 hover:bg-white/20 transition">
              <p class="text-xs md:text-sm font-semibold text-white">SEO-friendly</p>
              <p class="text-xs text-slate-400 mt-1">Semantic headings and clean HTML structure.</p>
            </div>
            <div class="rounded-xl bg-white/10 p-2.5 sm:p-3 md:p-4 hover:bg-white/20 transition">
              <p class="text-xs md:text-sm font-semibold text-white">Accessible</p>
              <p class="text-xs text-slate-400 mt-1">Focus styles and readable sizing included.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '99%', label: 'Happy clients' },
  { value: '24/7', label: 'Support' },
  { value: '1 week', label: 'Delivery' },
  { value: 'A+', label: 'UX quality' },
]

const bullets = ['Modern design system', 'Easy to customize', 'Clean component structure', 'Ready for production']
</script>


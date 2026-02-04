<template>
  <section id="why" class="py-16 md:py-24 bg-gradient-to-r from-black via-neutral-900 to-neutral-700 py-20 text-white">
    <div class="container grid gap-10 lg:grid-cols-2 lg:items-center">
      <div class="space-y-4">
        <h2 class="text-[5vw] font-semibold tracking-tight text-white-900">Why choose us</h2>
        <p class="text-slate-500 leading-relaxed">
          Highlights / stats / bullet points section. Replace with your Canva numbers and key benefits.
        </p>

        <div class="grid gap-4 sm:grid-cols-2">
          <div v-for="s in stats" :key="s.label" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p class="text-3xl font-semibold tracking-tight text-slate-900">{{ s.value }}</p>
            <p class="mt-1 text-sm text-slate-600">{{ s.label }}</p>
          </div>
        </div>

        <ul class="space-y-2 pt-2 text-xl text-slate-400 ml-50">
          <li v-for="b in bullets" :key="b" class="flex gap-2">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500"></span>
            {{ b }}
          </li>
        </ul>
      </div>

      <div class="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
        <h3 class="text-xl font-semibold">Built for performance</h3>
        <p class="mt-2 text-sm text-white/80 leading-relaxed">
          Optimized structure, modern tooling, and clean Tailwind utilities. Swap colors/fonts to match Canva exactly.
        </p>
        <div class="mt-6 grid gap-3">
          <div class="rounded-2xl bg-white/10 p-4">
            <p class="text-sm font-semibold">SEO-friendly</p>
            <p class="text-xs text-white/80">Semantic headings and clean HTML structure.</p>
          </div>
          <div class="rounded-2xl bg-white/10 p-4">
            <p class="text-sm font-semibold">Accessible</p>
            <p class="text-xs text-white/80">Focus styles and readable sizing included.</p>
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


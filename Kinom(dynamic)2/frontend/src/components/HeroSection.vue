<template>
  <section
    id="hero"
    class="relative overflow-hidden bg-gradient-to-r from-black via-neutral-900 to-neutral-700 py-8 sm:py-12 md:py-20 lg:py-24 text-white"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 grid items-start gap-4 md:items-center md:gap-8 lg:gap-12 md:grid-cols-2">
      <div class="flex flex-col items-center md:items-start justify-center space-y-3 sm:space-y-4 md:space-y-6 text-center md:text-left order-2 md:order-1">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white hover:text-[#D4AF35] hover:scale-105 transition-transform duration-500">
          KINOM
        </h1>
        <p class="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 max-w-md leading-relaxed">
          Kinom is an exclusive online platform for buying and selling rare currency. Discover history through the lens of value.
        </p>

        <!-- Try it button -->
        <div class="pt-1 sm:pt-3 md:pt-4">
          <router-link
            to="/auth"
            class="inline-flex items-center gap-2 rounded-2xl bg-white px-5 sm:px-8 py-2.5 sm:py-4 text-xs sm:text-base font-semibold text-black shadow-lg transition hover:bg-gray-100 hover:scale-105"
          >
            Try it
            <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </router-link>
        </div>
      </div>

      <div class="flex justify-center items-start md:items-center w-full order-1 md:order-2">
        <div class="w-full max-w-xs sm:max-w-sm md:max-w-3xl lg:max-w-4xl flex justify-center">
          <div class="overflow-hidden rounded-lg border border-white/20 shadow-2xl w-full">
            <img
              src="/uploads/images/hero.PNG"
              alt="Kinom exclusive banknote collection"
              class="w-full h-auto object-cover hover:scale-110 transition-transform duration-500 block"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>


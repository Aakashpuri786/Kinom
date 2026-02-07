<template>
  <section
    id="hero"
    class="relative overflow-hidden bg-gradient-to-r from-black via-neutral-900 to-neutral-700 pt-24 text-white"
  >
    <div class="container grid items-center gap-10 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
      <div class="space-y-8 items-center text-center">
        <div class="flex flex-wrap items-end gap-3 justify-center text-center">
         <h1 class="text-[10vw] ml-80 align-center md:text-[180px] leading-none items-center  font-serif font-bold text-white opacity-100 hover:text-[#D4AF35] hover:scale-105 transition-transform duration-500">
          KINOM
        </h1>
          <p class="text-2xl md:text-base ml-80 text-slate-100">
          Kinom is an exclusive online platform for buying and selling rare currency. Discover history through the lens of value.


          </p>
        </div>

        <!-- Try it button -->
        <div class="pt-4 ml-70">
          <router-link
            to="/auth"
            class="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-black shadow-lg transition hover:bg-gray-100 hover:scale-105"
          >
            Try it
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </router-link>
        </div>
      </div>

      <div class="flex justify-center">
        <div class="inline-flex flex-col items-center gap-4">
          <div class="overflow-hidden rounded-md border border-white/20 bg-black/40 shadow-lg">
            <!--
              Replace the placeholder below with your actual note image:
              1. Add it to `src/assets/kinom-note.png`
              2. Import and use it here.
            -->
            <!-- <img
              src="https://via.placeholder.com/700x220?text=Banknote+Image"
              alt="Example banknote for Kinom platform"
              class="block max-w-full"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>


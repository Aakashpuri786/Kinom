<template>
  <section
    id="review"
    class="bg-gradient-to-r from-black via-neutral-900 to-neutral-700 py-20 text-white"
  >
    <div class="container">
      <div class="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-14">
        <article v-for="t in testimonials" :key="t.name" class="text-center">
          <div class="mx-auto h-24 w-24 overflow-hidden rounded-full bg-white/10 shadow-md">
            <img :src="t.avatar" :alt="t.name" class="h-full w-full object-cover" />
          </div>
          <p class="mt-5 text-2xl font-semibold text-white">{{ t.name }}</p>
          <p class="mt-4 text-lg leading-relaxed text-kinomGold">
            {{ t.quote }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: 'Kp. Oli',
    title: '',
    quote: 'I can buy money\nhaving own dob using\nthis platform.',
    avatar: '/uploads/images/kpoli(pic).jpg',
  },
  {
    name: 'Balen Shah',
    title: '',
    quote: 'I can even sell the\nmoney here in nice\nvalue',
    avatar: '/uploads/images/balen(pic).jpg',
  },
  {
    name: 'Sagar Dhakal',
    title: '',
    quote: 'using this platform i\neven get the money of\nmy own dob in symbol',
    avatar: '/uploads/images/sagar(pic).jpg',
  },
]
</script>


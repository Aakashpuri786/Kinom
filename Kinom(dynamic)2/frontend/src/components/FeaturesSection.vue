<template>
  <section
    id="gallery"
    class="bg-gradient-to-r from-black via-neutral-900 to-neutral-700 py-20 text-white"
  >
    <div class="container">
      <div class="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-14">
        <article v-for="item in items" :key="item.title" class="text-center">
          <div class="mx-auto w-[220px] overflow-hidden rounded-sm bg-white/10 shadow-md">
            <div class="aspect-[4/3] w-full bg-white/10">
              <img
                :src="item.img"
                :alt="item.title"
                class="h-full w-full object-fit"
              />
            </div>
          </div>

          <p class="mt-6 text-lg font-semibold text-white">
            {{ item.title }}
          </p>
          <p class="mt-1 text-lg font-semibold text-white">
            {{ item.date }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
// Replace these with your real currency images in `src/assets/`
const items = [
  {
    img: 'uploads/images/balen-money.PNG',
    title: 'D.O.B of Balen Shah',
    date: '2047/1/14',
  },
  {
    img: 'uploads/images/sagar-money.PNG',
    title: 'D.O.B of Sagar Dhakal',
    date: '2046/9/21',
  },
  {
    img: 'uploads/images/jhon-money.jpg',
    title: 'D.O.B of Jhon Rai',
    date: '2055/7/20',
  },
]
</script>


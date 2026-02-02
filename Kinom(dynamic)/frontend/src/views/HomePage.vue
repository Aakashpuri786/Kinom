<template>
  <div class="min-h-screen">
    <Navbar />

    <main>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
      <ContactSection />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import WhyChooseUs from '../components/WhyChooseUs.vue'
import Testimonials from '../components/Testimonials.vue'
import CTASection from '../components/CTASection.vue'
import ContactSection from '../components/ContactSection.vue'
import Footer from '../components/Footer.vue'
</script>

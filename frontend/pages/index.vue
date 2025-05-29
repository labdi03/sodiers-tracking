<script setup lang="ts">
import {
  CarIcon,
  ActivityIcon,
  BarChart3Icon,
  ShieldIcon,
  UsersIcon,
  MapIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from "lucide-vue-next";
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Protect } from "@clerk/vue";
gsap.registerPlugin(ScrollTrigger);

const carElement = ref(null);
const landingDiv = ref(null);
const landingTitle = ref(null);
const landingDescription = ref(null);
const landingButtons = ref(null);
const featuresSection = ref(null);
const statsSection = ref(null);

const menuItems = [
  { label: "Features", route: "#features" },
  { label: "Solutions", route: "#solutions" },
  { label: "Pricing", route: "#pricing" },
  { label: "About", route: "#about" },
];

const features = [
  {
    icon: ActivityIcon,
    title: "Real-time",
    description:
      "Track the location of soldiers in real-time.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: BarChart3Icon,
    title: "GPS Location",
    description:
      "Track the location of soldiers in real-time.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: ShieldIcon,
    title: "GPS Location",
    description:
      "Track the location of soldiers in real-time.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: MapIcon,
    title: "GPS Location",
    description:
      "Track the location of soldiers in real-time.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: UsersIcon,
    title: "GPS Location",
    description:
      "Track the location of soldiers in real-time.",
    color: "bg-rose-100 text-rose-600",
  },
  {
    icon: CarIcon,
    title: "GPS Location",
    description:
      "Track the location of soldiers in real-time.",
    color: "bg-cyan-100 text-cyan-600",
  },
];

const statistics = [
  { value: 1000, suffix: "+", label: "Active Users" },
  { value: 50, suffix: "K", label: "Simulations Run" },
  { value: 95, suffix: "%", label: "Accuracy Rate" },
  { value: 30, suffix: "+", label: "City Partners" },
];

onMounted(() => {
  gsap.fromTo(
    carElement.value,
    { x: "100vw" },
    {
      x: "0",
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: carElement.value,
        start: "top bottom",
        toggleActions: "play none none none",
      },
    }
  );

  gsap.fromTo(
    landingDiv.value,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: landingDiv.value,
        start: "top bottom",
        toggleActions: "play none none none",
      },
    }
  );

  gsap.fromTo(
    ".feature-card",
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: featuresSection.value,
        start: "top 70%",
      },
    }
  );

  gsap.fromTo(
    ".stat-item",
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: statsSection.value,
        start: "top 80%",
      },
    }
  );

  gsap.to(carElement.value, {
    y: 20,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
});

const scrollToNext = () => {
  const nextSection = document.getElementById("features");
  nextSection?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <div
    class="min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800"
  >
    <header
      class="fixed w-full px-20 z-50 backdrop-blur-sm bg-white/80 border-b border-gray-200 shadow-sm"
    >
      <nav class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-end">
          <div class="flex items-center space-x-4">
            <div class="hidden md:flex space-x-6">
              <Button
                v-for="item in menuItems"
                :key="item.label"
                variant="ghost"
                class="text-gray-600 hover:text-blue-500 transition-colors duration-300"
              >
                {{ item.label }}
              </Button>
            </div>
            <header>
              <Button
                class="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300 shadow-md"
              >
                Sign in
              </Button>
            </header>
          </div>
        </div>
      </nav>
    </header>

    <section class="min-h-screen flex flex-col justify-center relative pt-20">
      <!-- Add background elements -->
      <div class="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100">
        <!-- Map grid pattern -->
        <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px); background-size: 20px 20px;"></div>
        
        <!-- Military tracking elements -->
        <div class="absolute inset-0">
          <!-- Radar-like circles -->
          <div class="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-blue-500/20 rounded-full animate-pulse"></div>
          <div class="absolute top-1/4 left-1/4 w-48 h-48 border-2 border-blue-500/30 rounded-full animate-pulse" style="animation-delay: 0.5s"></div>
          <div class="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-blue-500/40 rounded-full animate-pulse" style="animation-delay: 1s"></div>
          
          <!-- Tracking dots -->
          <div class="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
          <div class="absolute bottom-1/3 left-1/3 w-3 h-3 bg-green-500 rounded-full animate-ping" style="animation-delay: 0.7s"></div>
          <div class="absolute top-2/3 right-1/3 w-3 h-3 bg-red-500 rounded-full animate-ping" style="animation-delay: 1.2s"></div>
          
          <!-- Connection lines -->
          <div class="absolute top-1/3 right-1/4 w-24 h-0.5 bg-blue-500/30 transform rotate-45"></div>
          <div class="absolute bottom-1/3 left-1/3 w-24 h-0.5 bg-green-500/30 transform -rotate-45"></div>
        </div>
      </div>

      <main
        class="container mx-auto px-6 flex flex-col items-center justify-center gap-12"
      >
        <div ref="landingDiv" class="text-center max-w-4xl z-10">
          <h1
            ref="landingTitle"
            class="text-5xl md:text-7xl flex items-center justify-center font-bold mb-6 leading-tight"
          >
            WhereSoldier
            <img src="/helmet.png" class="animate-[wiggle_1s_ease-in-out_infinite]" alt="">
          </h1> 
          <p
            ref="landingDescription"
            class="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">WhereSoldier</span> is a platform that allows you to track the location of
            soldiers in real-time.
          </p>
          <div ref="landingButtons" class="flex gap-4 justify-center">
            <NuxtLink href="/map">

              <Button
              class="bg-blue-500 hover:bg-blue-600 px-8 py-6 text-lg font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/30"
              >
              Get Started
            </Button>
          </NuxtLink>
          </div>
        </div>

        <button
          @click="scrollToNext"
          class="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-300 animate-bounce"
        >
          <ChevronDownIcon class="h-8 w-8" />
        </button>
      </main>
    </section>

    <!-- Features Section -->
    <section
      id="features"
      ref="featuresSection"
      class="py-24 px-20 relative bg-white"
    >
      <div class="container mx-auto px-6">
        <div class="text-center mb-20 max-w-3xl mx-auto">
          <span
            class="text-blue-500 font-medium uppercase tracking-wider text-sm"
            >Features</span
          >
          <h2 class="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Powerful Features for
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400"
              >Soldiers Tracking</span
            >
          </h2>
          <p class="text-xl text-gray-600">
            Our platform offers everything you need to track the location of
            soldiers in real-time.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="feature-card bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-2"
          >
            <div class="mb-6 p-4 rounded-lg w-max" :class="feature.color">
              <component :is="feature.icon" class="h-8 w-8" />
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-800">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600">{{ feature.description }}</p>
            <Button
              variant="link"
              class="mt-6 px-0 text-blue-500 hover:text-blue-400 flex items-center gap-2"
            >
              Learn more
              <ArrowRightIcon class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section
      ref="statsSection"
      class="py-20 px-20 bg-gray-50 border-y border-gray-200"
    >
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div
            v-for="(stat, index) in statistics"
            :key="index"
            class="stat-item p-6 bg-white rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-300 shadow-sm"
          >
            <div class="text-4xl md:text-5xl font-bold mb-2 text-blue-500">
              {{ stat.value
              }}<span class="text-cyan-400">{{ stat.suffix }}</span>
            </div>
            <div class="text-gray-600 uppercase text-sm tracking-wider">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    

    <!-- Footer -->
    <footer class="py-12 px-20 bg-white border-t border-gray-200">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center space-x-2 mb-6 md:mb-0">
            <img src="/helmet.png" class="h-8 w-8" alt="">
            <span
              class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400"
              >WhereSoldier</span
            >
          </div>
          <div class="flex space-x-6">
            <Button variant="ghost" class="text-gray-600 hover:text-blue-500"
              >Privacy</Button
            >
            <Button variant="ghost" class="text-gray-600 hover:text-blue-500"
              >Terms</Button
            >
            <Button variant="ghost" class="text-gray-600 hover:text-blue-500"
              >Contact</Button
            >
          </div>
        </div>
        <div
          class="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm"
        >
          © 2023 WhereSoldier. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>

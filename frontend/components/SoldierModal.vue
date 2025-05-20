<template>
  <div class="fixed top-10 right-10 bg-white dark:bg-black p-4 rounded-xl shadow-xl">
    <h2 class="text-xl font-bold mb-2">{{ soldier.name }}</h2>
    <p>Grade: {{ soldier.grade }}</p>
    <p>Blood Group: {{ soldier.bloodGroup }}</p>
    <p>Heart Rate: {{ soldier.heartRate }} bpm</p>
    <p>Ammo: {{ soldier.ammo }}</p>
    <button class="mt-4" @click="$emit('close')">Close</button>
  </div>
</template>

<script setup>
defineProps({ soldier: Object });
</script>

<script setup lang="ts">
defineProps<{
  banner: string
}>()
</script>

<template>
  <div
    class="w-full h-200px bg-gray-100 bg-no-repeat bg-cover bg-bottom relative"
    :style="{ 'background-image': `url(${banner})` }"
  >
    <h1 class="text-6xl font-bold text-white text-center py-16 text-shadow-lg">
      A1mer's Blog
    </h1>
  </div>
</template>

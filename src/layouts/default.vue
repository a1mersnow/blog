<template>
  <div class="dark:text-white text-black px-6 py-4 flex items-center justify-between gap-x-3">
    <router-link to="/" class="text-mono font-bold text-lg underline underline-dotted underline underline-offset-5">
      Back to A1mer
    </router-link>
    <TheToolbox />
  </div>
  <RouterView class="text-gray-600 dark:text-gray" />
</template>

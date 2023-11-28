<template>
  <div
    class="cursor-pointer opacity-70 hover:opacity-100" :class="isDark ? 'i-carbon:moon' : 'i-carbon:sun'"
    @click="toggleDark(!isDark)"
  />
</template>

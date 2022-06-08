import { acceptHMRUpdate, defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', () => {
  const count = ref(0)
  return {
    count,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBlogStore, import.meta.hot))

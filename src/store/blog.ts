import { acceptHMRUpdate, defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', () => {
  const blogList = ref([])

  const initBlogList = () => {
    // TODO
    blogList.value = []
  }

  return {
    blogList,
    initBlogList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))

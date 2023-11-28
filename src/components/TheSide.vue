<script setup lang="ts">
import sun from '~/assets/sun.jpeg'
import blogList from '~blogs'

defineProps<{
  tagCurr?: string
}>()

const router = useRouter()
function handleClickTag(tag = '') {
  router.push(`/?tag=${tag}`)
}

const tags = computed<string[]>(() => {
  const set = new Set<string>()
  for (const blog of blogList) {
    if (blog.tags.length) {
      for (const tag of blog.tags) {
        if (!set.has(tag))
          set.add(tag)
      }
    }
  }
  return [...set]
})

const EMAIL = 'onlylovesnow14@gmail.com'
const GITHUB = 'https://github.com/a1mersnow'
</script>

<template>
  <aside class="relative">
    <div
      class="bg-gray text-white p-4 -mx-4 mt-4 lg:(rounded mx-0 mt-0) bg-no-repeat bg-center bg-cover bg-blend-multiply"
      :style="{
        backgroundImage: `url(${sun})`,
      }"
    >
      <h2 class="text-xl flex items-center">
        标签
        <button
          v-if="tagCurr" class="i-carbon-ai-status-failed text-sm ml-1 hover:text-gray-300 transition"
          @click="handleClickTag()"
        />
      </h2>
      <div class="flex items-start flex-wrap content-start pt-3 min-h-80">
        <div
          v-for="tag in tags" :key="tag"
          class="cursor-pointer text-sm px-1 transition mr-3 mb-2"
          :class="tag === tagCurr ? 'bg-white text-gray rounded-sm' : 'underline'"
          @click="handleClickTag(tag)"
        >
          {{ tag }}
        </div>
      </div>

      <footer class="text-xs text-gray-200 pt-6 leading-6">
        <a class="block">Email: {{ EMAIL }}</a>
        <a class="block" :href="GITHUB" target="_blank">Github: {{ GITHUB }}</a>
      </footer>

      <div class="text-white absolute bottom-4 right-4">
        <TheToolbox />
      </div>
    </div>
  </aside>
</template>

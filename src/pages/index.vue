<script setup lang="ts">
import banner from '~/assets/banner.png'
import sun from '~/assets/sun.jpeg'
import blogList from '~blogs'

const route = useRoute()
const tagCurr = $computed(() => route.query.tag as string)

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

const list = computed(() => {
  if (tagCurr)
    return blogList.filter(x => x.tags.includes(tagCurr))

  else
    return blogList
})

const router = useRouter()
function handleClickPost(blog: Blog) {
  router.push(`/blogs/${blog.id}`)
}

function handleClickTag(tag = '') {
  router.push(`/?tag=${tag}`)
}

const EMAIL = 'onlylovesnow14@gmail.com'
const GITHUB = 'https://github.com/a1mersnow'
</script>

<template>
  <div>
    <div
      class="w-full h-200px bg-gray-100 mix-blend-multiply bg-no-repeat bg-cover bg-bottom"
      :style="{ 'background-image': `url(${banner})` }"
    >
      <h1 class="text-6xl font-bold text-white text-center py-16 text-shadow-lg">
        A1mer's Blog
      </h1>
    </div>

    <div class="max-w-1200px mx-auto p-4 lg:(grid grid-cols-[2fr_1fr] gap-8)">
      <ul class="prose text-base prose-stone">
        <li
          v-for="blog in list" :key="blog.id" class="p-2 flex items-center cursor-pointer transition duration-300 rounded hover:(text-blue-700 bg-blue-100)"
          @click="handleClickPost(blog)"
        >
          <div class="flex-1 min-w-0 text-ellipsis overflow-hidden whitespace-nowrap pr-4">
            {{ blog.title }}
          </div>
          <div class="text-gray flex-shrink-0 tabular-nums">
            {{ blog.date }}
          </div>
        </li>
      </ul>
      <aside>
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
        </div>
      </aside>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

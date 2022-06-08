<template>
  <div>
    <div class="w-full h-200px bg-gray-100 mix-blend-multiply bg-no-repeat bg-cover bg-bottom"
      :style="{ 'background-image': `url(${banner})` }"
    >
      <h1 class="text-6xl font-bold text-white text-center py-16 text-shadow-lg">A1mer's Blog</h1>
    </div>

    <div class="max-w-1200px mx-auto p-4 lg:(grid grid-cols-[2fr_1fr] gap-8)">
      <ul class="prose text-base prose-stone">
        <li v-for="blog in list" :key="blog.id" class="p-2 flex items-center cursor-pointer transition duration-300 rounded hover:(text-blue-700 bg-blue-100)"
          @click="handleClickPost(blog)"
        >
          <div class="flex-1 min-w-0 text-ellipsis overflow-hidden whitespace-nowrap pr-4">{{blog.title}}</div>
          <div class="text-gray flex-shrink-0">{{blog.date}}</div>
        </li>
      </ul>
      <div class="bg-gray text-white p-4 -mx-4 mt-4 lg:(rounded mx-0 mt-0)">
        <h2 class="text-xl">标签</h2>
        <div class="flex space-x-3 pt-3">
          <div v-for="tag in tags" class="cursor-pointer underline text-sm"
            :key="tag"
            @click="handleClickTag(tag)"
          >{{tag}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import banner from '~/assets/banner.png'
import blogList from '~blogs'

const route = useRoute()
const tag = $computed(() => route.params.tag as string)

const tags = computed<string[]>(() => {
  const set = new Set<string>()
  for(const blog of blogList) {
    if (blog.tags.length) {
      for (const tag of blog.tags) {
        if (!set.has(tag)) {
          set.add(tag)
        }
      }
    }
  }
  return [...set]
})

const list = computed(() => {
  if (tag) {
    return blogList.filter(x => x.tags.includes(tag))
  } else {
    return blogList
  }
})

const router = useRouter()
function handleClickPost(blog: Blog) {
  router.push('/blogs/' + blog.id)
}

function handleClickTag(tag: string) {
  router.push('/?tag=' + tag)
}
</script>

<route lang="yaml">
meta:
  layout: home
</route>

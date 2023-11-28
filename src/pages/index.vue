<script setup lang="ts">
import banner from '~/assets/banner.png'
import blogList from '~blogs'

const route = useRoute()
const tagCurr = computed(() => route.query.tag as string)

const list = computed(() => {
  if (tagCurr.value)
    return blogList.filter(x => x.tags.includes(tagCurr.value))

  else
    return blogList
})

const router = useRouter()
function handleClickPost(blog: Blog) {
  router.push(`/blogs/${blog.id}`)
}
</script>

<template>
  <div>
    <TheNav :banner="banner" />

    <div class="max-w-1200px mx-auto p-4 lg:(grid grid-cols-[2fr_1fr] gap-8)">
      <ul class="prose text-base prose-stone">
        <li
          v-for="blog in list" :key="blog.id" class="p-2 flex items-center cursor-pointer transition duration-300 rounded text-gray hover:(text-blue-700 bg-blue-100)"
          @click="handleClickPost(blog)"
        >
          <div class="flex-1 min-w-0 text-ellipsis overflow-hidden whitespace-nowrap pr-4">
            {{ blog.title }}
          </div>
          <div class="flex-shrink-0 tabular-nums">
            {{ blog.date }}
          </div>
        </li>
      </ul>

      <TheSide :tag-curr="tagCurr" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

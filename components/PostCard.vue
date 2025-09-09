<template>
  <article class="card group hover:shadow-xl transition-all duration-300">
    <!-- Cover Image -->
    <div class="relative overflow-hidden aspect-video">
      <NuxtImg
        :src="post.cover"
        :alt="post.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="sm:100vw md:50vw lg:33vw"
        quality="80"
        loading="lazy"
      />
      
      <!-- Category Badge -->
      <div class="absolute top-4 left-4">
        <NuxtLink
          :to="`/categoria/${post.category}`"
          class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
        >
          {{ getCategoryName(post.category) }}
        </NuxtLink>
      </div>

      <!-- Reading Time Badge -->
      <div class="absolute top-4 right-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
          <Icon name="heroicons:clock" class="w-3 h-3 mr-1" />
          {{ readingTime }} min
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Title -->
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
        <NuxtLink :to="post._path" class="hover:underline">
          {{ post.title }}
        </NuxtLink>
      </h2>

      <!-- Description -->
      <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
        {{ post.description }}
      </p>

      <!-- Post Meta -->
      <PostMeta 
        :date="post.date" 
        :author="post.author" 
        :reading-time="readingTime"
        class="mb-4"
      />

      <!-- Tags -->
      <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in post.tags.slice(0, 3)" 
          :key="tag"
          class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- Read More Button -->
      <div class="flex items-center justify-between">
        <NuxtLink 
          :to="post._path"
          class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm group-hover:translate-x-1 transition-all duration-200"
        >
          Ler mais
          <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-1" />
        </NuxtLink>
        
        <!-- Share Button -->
        <button 
          @click="sharePost"
          class="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Compartilhar"
        >
          <Icon name="heroicons:share" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Props {
  post: {
    _path: string
    title: string
    description: string
    cover: string
    category: string
    tags?: string[]
    date: string
    author?: string
    readingTime?: {
      minutes: number
    }
  }
}

const props = defineProps<Props>()
const config = useRuntimeConfig()

// Calculate reading time (fallback if not provided)
const readingTime = computed(() => {
  if (props.post.readingTime?.minutes) {
    return Math.ceil(props.post.readingTime.minutes)
  }
  // Estimate reading time based on description length (rough estimation)
  const words = props.post.description.split(' ').length
  return Math.max(1, Math.ceil(words / 200)) // Assuming 200 words per minute
})

// Category name mapping
const getCategoryName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'celebridades': 'Celebridades',
    'internet': 'Internet',
    'kpop': 'K-Pop',
    'viral': 'Viral'
  }
  return categoryMap[category] || category
}

// Share functionality
const sharePost = () => {
  const url = `${config.public.siteUrl}${props.post._path}`
  const title = props.post.title
  
  if (process.client && navigator.share) {
    // Use native share API if available
    navigator.share({
      title,
      url
    }).catch(() => {
      // Fallback to clipboard
      copyToClipboard(url)
    })
  } else {
    // Fallback to clipboard
    copyToClipboard(url)
  }
}

const copyToClipboard = (text: string) => {
  if (process.client && navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      // You could show a toast notification here
      console.log('Link copiado para a área de transferência!')
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      console.log('Link copiado para a área de transferência!')
    })
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
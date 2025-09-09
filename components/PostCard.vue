<template>
  <article class="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
    <!-- Cover Image Placeholder -->
    <div class="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
      <span class="text-gray-500 text-lg">📰</span>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Category Badge -->
      <div class="mb-3">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
          {{ getCategoryName(post.category) }}
        </span>
      </div>

      <!-- Title -->
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
        <NuxtLink :to="post._path" class="hover:text-pink-600">
          {{ post.title }}
        </NuxtLink>
      </h2>

      <!-- Description -->
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        {{ post.description }}
      </p>

      <!-- Meta info -->
      <div class="flex items-center justify-between text-sm text-gray-500">
        <span>{{ formatDate(post.date) }}</span>
        <NuxtLink
          :to="post._path"
          class="text-pink-600 hover:text-pink-700 font-medium"
        >
          Ler mais →
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  post: Object
})

// Category name mapping
const getCategoryName = (category) => {
  const categoryMap = {
    'celebridades': 'Celebridades',
    'internet': 'Internet',
    'kpop': 'K-Pop',
    'viral': 'Viral'
  }
  return categoryMap[category] || category
}

// Date formatting
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}
</script>
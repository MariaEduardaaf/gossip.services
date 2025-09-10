<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="pending" class="text-center py-12">
      <p class="text-gray-600">Carregando...</p>
    </div>

    <!-- Article Content -->
    <article v-else-if="data" class="max-w-4xl mx-auto">
      <!-- Category Badge -->
      <div class="mb-4">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
          {{ getCategoryName(data.category) }}
        </span>
      </div>

      <!-- Title -->
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ data.title }}
      </h1>

      <!-- Meta Info -->
      <div class="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-8">
        <span>{{ formatDate(data.date) }}</span>
        <span v-if="data.author" class="ml-4">Por {{ data.author }}</span>
      </div>

      <!-- Description -->
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
        {{ data.description }}
      </p>

      <!-- Cover placeholder -->
      <div class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-8">
        <span class="text-gray-500 text-lg">📰 Imagem do Post</span>
      </div>

      <!-- Article Body -->
      <div class="prose prose-lg dark:prose-dark max-w-none">
        <ContentRenderer :value="data" />
      </div>

      <!-- Back to Home -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
        >
          ← Voltar para home
        </NuxtLink>
      </div>
    </article>

    <!-- 404 Error -->
    <div v-else class="text-center py-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Post não encontrado
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        O post que você está procurando não existe ou foi removido.
      </p>
      <NuxtLink 
        to="/" 
        class="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
      >
        Voltar para home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

// Get post data
const { data, pending } = await useAsyncData(`post-${route.path}`, () => 
  queryContent(route.path).findOne()
)

// Utility functions
const getCategoryName = (category) => {
  const categoryMap = {
    'celebridades': 'Celebridades',
    'internet': 'Internet',
    'kpop': 'K-Pop',
    'viral': 'Viral'
  }
  return categoryMap[category] || category
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

// SEO
useHead({
  title: data.value?.title || 'Post',
  meta: [
    { name: 'description', content: data.value?.description || '' }
  ]
})
</script>

<style>
/* Custom prose styles */
.prose {
  @apply text-gray-700 dark:text-gray-300;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply text-gray-900 dark:text-white;
}

.prose strong {
  @apply text-gray-900 dark:text-white;
}

.prose a {
  @apply text-pink-600 dark:text-pink-400;
}
</style>
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-2xl p-8 mb-12">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">
          Fofoquêra
        </h1>
        <p class="text-xl text-pink-100 mb-8 max-w-3xl mx-auto">
          Portal de notícias sobre celebridades, internet, K-pop e tendências virais
        </p>
      </div>
    </section>

    <!-- Categories -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold text-center mb-8">Categorias</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <NuxtLink
          v-for="category in categories"
          :key="category.slug"
          :to="`/categoria/${category.slug}`"
          class="group bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <div class="text-4xl mb-3">{{ category.icon }}</div>
          <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-pink-600">
            {{ category.name }}
          </h3>
        </NuxtLink>
      </div>
    </section>

    <!-- Latest Posts -->
    <section>
      <h2 class="text-3xl font-bold mb-8">Últimas Fofocas</h2>
      
      <div v-if="posts?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="post in posts"
          :key="post._path"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
        >
          <div class="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span class="text-gray-500">📰 Imagem</span>
          </div>
          <div class="p-6">
            <div class="mb-3">
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                {{ getCategoryName(post.category) }}
              </span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
              {{ post.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {{ post.description }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">{{ formatDate(post.date) }}</span>
              <NuxtLink
                :to="post._path"
                class="text-pink-600 hover:text-pink-700 font-medium text-sm"
              >
                Ler mais →
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="text-center py-12">
        <p class="text-gray-600 dark:text-gray-400">
          Carregando fofocas...
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO
useHead({
  title: 'Início',
})

// Categories data
const categories = ref([
  { name: 'Celebridades', slug: 'celebridades', icon: '⭐' },
  { name: 'Internet', slug: 'internet', icon: '💻' },
  { name: 'K-Pop', slug: 'kpop', icon: '🎤' },
  { name: 'Viral', slug: 'viral', icon: '🔥' }
])

// Fetch posts
const { data: posts } = await useAsyncData('posts', () => 
  queryContent('posts')
    .only(['_path', 'title', 'description', 'category', 'date', 'author'])
    .sort({ date: -1 })
    .find()
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
    month: '2-digit',
    year: 'numeric'
  })
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
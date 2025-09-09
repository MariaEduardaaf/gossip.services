<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Buscar Fofocas
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        Encontre as fofocas que você está procurando
      </p>
      
      <!-- Search Form -->
      <div class="relative mb-8">
        <input
          v-model="searchQuery"
          @input="performSearch"
          type="text"
          placeholder="Digite sua busca aqui..."
          class="w-full px-6 py-4 text-lg bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-pink-500 transition-colors shadow-lg"
        >
      </div>

      <!-- Search Results -->
      <div v-if="searchQuery && results?.length" class="text-left">
        <h2 class="text-2xl font-bold mb-6">
          {{ results.length }} resultado{{ results.length !== 1 ? 's' : '' }} encontrado{{ results.length !== 1 ? 's' : '' }}
        </h2>
        
        <div class="space-y-6">
          <article
            v-for="post in results"
            :key="post._path"
            class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div class="mb-3">
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                {{ getCategoryName(post.category) }}
              </span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              <NuxtLink :to="post._path" class="hover:text-pink-600">
                {{ post.title }}
              </NuxtLink>
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
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
          </article>
        </div>
      </div>

      <!-- No Results -->
      <div v-else-if="searchQuery && !results?.length" class="text-center py-8">
        <p class="text-gray-600 dark:text-gray-400 text-lg">
          Nenhum resultado encontrado para "<strong>{{ searchQuery }}</strong>"
        </p>
      </div>

      <!-- Popular Categories -->
      <div v-else class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Categorias Populares
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
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
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Buscar'
})

// Reactive data
const searchQuery = ref('')
const results = ref([])

// Categories
const categories = ref([
  { name: 'Celebridades', slug: 'celebridades', icon: '⭐' },
  { name: 'Internet', slug: 'internet', icon: '💻' },
  { name: 'K-Pop', slug: 'kpop', icon: '🎤' },
  { name: 'Viral', slug: 'viral', icon: '🔥' }
])

// Fetch all posts for search
const { data: allPosts } = await useAsyncData('all-posts', () => 
  queryContent('posts')
    .only(['_path', 'title', 'description', 'category', 'date', 'author'])
    .find()
)

// Search function
const performSearch = () => {
  if (!searchQuery.value.trim() || !allPosts.value) {
    results.value = []
    return
  }

  const query = searchQuery.value.toLowerCase()
  results.value = allPosts.value.filter(post => 
    post.title.toLowerCase().includes(query) ||
    post.description.toLowerCase().includes(query) ||
    post.category.toLowerCase().includes(query)
  )
}

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
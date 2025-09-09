<template>
  <div>
    <!-- Category Header -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <div class="mb-4">
          <span class="text-6xl">{{ categoryIcon }}</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          {{ categoryName }}
        </h1>
        <p class="text-xl text-primary-100 mb-6">
          {{ categoryDescription }}
        </p>
        <div class="inline-flex items-center bg-white/20 rounded-lg px-4 py-2">
          <Icon name="heroicons:document-text" class="w-5 h-5 mr-2" />
          <span>{{ totalPosts }} {{ totalPosts === 1 ? 'post' : 'posts' }} encontrado{{ totalPosts === 1 ? '' : 's' }}</span>
        </div>
      </div>
    </section>

    <!-- Top Ad -->
    <section class="container mx-auto px-4 py-8">
      <AdSlot 
        slot-id="1234567890"
        ad-type="leaderboard"
        format="fluid"
        layout-key="-6t+ed+2i-1n-4w"
      />
    </section>

    <!-- Posts Section -->
    <section class="container mx-auto px-4 py-8">
      <!-- Filter and Sort Controls -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Posts em {{ categoryName }}
        </h2>
        
        <!-- Sort Options -->
        <div class="flex items-center space-x-4">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Ordenar por:
          </label>
          <select
            v-model="sortBy"
            class="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            <option value="date">Data (Mais recente)</option>
            <option value="date_asc">Data (Mais antigo)</option>
            <option value="title">Título (A-Z)</option>
            <option value="title_desc">Título (Z-A)</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 9" :key="n" class="card animate-pulse">
          <div class="aspect-video bg-gray-200 dark:bg-gray-700"></div>
          <div class="p-6 space-y-3">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Posts Grid -->
      <div v-else-if="displayedPosts?.length" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <template v-for="(post, index) in displayedPosts" :key="post._path">
            <PostCard :post="post" />
            
            <!-- Insert ad every 6 posts -->
            <div v-if="(index + 1) % 6 === 0" class="md:col-span-2 lg:col-span-3">
              <AdSlot 
                slot-id="9876543210"
                ad-type="banner"
                format="fluid"
              />
            </div>
          </template>
        </div>

        <!-- Pagination -->
        <Pagination 
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="handlePageChange"
        />
      </div>

      <!-- No Posts Found -->
      <div v-else class="text-center py-16">
        <Icon name="heroicons:document-magnifying-glass" class="w-20 h-20 text-gray-400 mx-auto mb-6" />
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Nenhum post encontrado
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Não há posts disponíveis nesta categoria no momento.
        </p>
        <NuxtLink 
          to="/" 
          class="btn-primary"
        >
          Voltar ao Início
        </NuxtLink>
      </div>
    </section>

    <!-- Other Categories -->
    <section v-if="displayedPosts?.length" class="bg-gray-50 dark:bg-gray-800 py-12">
      <div class="container mx-auto px-4">
        <h3 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Explore Outras Categorias
        </h3>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <NuxtLink
            v-for="category in otherCategories"
            :key="category.slug"
            :to="`/categoria/${category.slug}`"
            class="group bg-white dark:bg-gray-700 rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div class="text-3xl mb-2">{{ category.icon }}</div>
            <h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {{ category.name }}
            </h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ category.count }} posts
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Bottom Ad -->
    <section class="container mx-auto px-4 py-8">
      <AdSlot 
        slot-id="2468135790"
        ad-type="leaderboard"
        format="fluid"
        layout-key="-6t+ed+2i-1n-4w"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const categorySlug = route.params.slug as string

// Category configurations
const categories: Record<string, {
  name: string
  description: string
  icon: string
}> = {
  'celebridades': {
    name: 'Celebridades',
    description: 'Últimas fofocas e novidades sobre seus famosos favoritos',
    icon: '⭐'
  },
  'internet': {
    name: 'Internet',
    description: 'Trends, memes e polêmicas que bombaram na web',
    icon: '💻'
  },
  'kpop': {
    name: 'K-Pop',
    description: 'Tudo sobre seus ídolos coreanos favoritos',
    icon: '🎤'
  },
  'viral': {
    name: 'Viral',
    description: 'Conteúdos que estão dominando as redes sociais',
    icon: '🔥'
  }
}

// Validate category
const currentCategory = categories[categorySlug]
if (!currentCategory) {
  throw createError({ statusCode: 404, statusMessage: 'Categoria não encontrada' })
}

const categoryName = currentCategory.name
const categoryDescription = currentCategory.description
const categoryIcon = currentCategory.icon

// Reactive data
const sortBy = ref('date')
const currentPage = ref(1)
const postsPerPage = 12

// Fetch posts for this category
const { data: posts, pending } = await useLazyAsyncData(`category-${categorySlug}`, () => 
  queryContent('posts')
    .where({ category: categorySlug })
    .only(['_path', 'title', 'description', 'cover', 'category', 'tags', 'date', 'author'])
    .find()
)

// Computed properties
const totalPosts = computed(() => posts.value?.length || 0)

const sortedPosts = computed(() => {
  if (!posts.value) return []
  
  const sorted = [...posts.value]
  
  switch (sortBy.value) {
    case 'date':
      return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    case 'date_asc':
      return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'title_desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title))
    default:
      return sorted
  }
})

const totalPages = computed(() => Math.ceil((sortedPosts.value?.length || 0) / postsPerPage))

const displayedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return sortedPosts.value?.slice(start, end) || []
})

// Other categories (excluding current)
const otherCategories = computed(() => {
  return Object.entries(categories)
    .filter(([slug]) => slug !== categorySlug)
    .map(([slug, category]) => ({
      slug,
      ...category,
      count: Math.floor(Math.random() * 30) + 5 // Mock count
    }))
})

// Handlers
const handlePageChange = (page: number) => {
  currentPage.value = page
  
  // Scroll to top of posts section
  const postsSection = document.querySelector('h2')
  if (postsSection) {
    postsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// Reset page when sort changes
watch(sortBy, () => {
  currentPage.value = 1
})

// SEO
useHead({
  title: categoryName,
  meta: [
    { name: 'description', content: `${categoryDescription}. Confira os últimos posts sobre ${categoryName.toLowerCase()}.` },
    { property: 'og:title', content: `${categoryName} - Fofoquêra` },
    { property: 'og:description', content: categoryDescription }
  ]
})
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>
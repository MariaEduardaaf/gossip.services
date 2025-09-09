<template>
  <header class="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2 group">
          <div class="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">F</span>
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {{ config.public.siteName }}
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            to="/" 
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            :class="{ 'text-primary-600 dark:text-primary-400': $route.path === '/' }"
          >
            Início
          </NuxtLink>
          
          <!-- Categories dropdown -->
          <div class="relative group">
            <button class="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
              <span>Categorias</span>
              <Icon name="heroicons:chevron-down" class="w-4 h-4" />
            </button>
            <div class="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div class="py-2">
                <NuxtLink 
                  to="/categoria/celebridades" 
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Celebridades
                </NuxtLink>
                <NuxtLink 
                  to="/categoria/internet" 
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Internet
                </NuxtLink>
                <NuxtLink 
                  to="/categoria/kpop" 
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  K-Pop
                </NuxtLink>
                <NuxtLink 
                  to="/categoria/viral" 
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Viral
                </NuxtLink>
              </div>
            </div>
          </div>
          
          <NuxtLink 
            to="/buscar" 
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            :class="{ 'text-primary-600 dark:text-primary-400': $route.path === '/buscar' }"
          >
            Buscar
          </NuxtLink>
          
          <NuxtLink 
            to="/sobre" 
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            :class="{ 'text-primary-600 dark:text-primary-400': $route.path === '/sobre' }"
          >
            Sobre
          </NuxtLink>
        </nav>

        <!-- Search and Theme Toggle -->
        <div class="flex items-center space-x-4">
          <!-- Quick Search (Desktop) -->
          <div class="hidden lg:block">
            <div class="relative">
              <input
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Buscar fofocas..."
                class="w-64 px-4 py-2 pl-10 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
              <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          <!-- Theme Toggle -->
          <ThemeToggle />

          <!-- Mobile Menu Button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
          >
            <Icon :name="mobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div 
        v-if="mobileMenuOpen" 
        class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
      >
        <div class="space-y-4">
          <!-- Mobile Search -->
          <div class="px-2">
            <div class="relative">
              <input
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Buscar fofocas..."
                class="w-full px-4 py-2 pl-10 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
              <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          <!-- Mobile Menu Links -->
          <nav class="space-y-2">
            <NuxtLink 
              to="/" 
              class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              @click="mobileMenuOpen = false"
            >
              Início
            </NuxtLink>
            
            <div class="px-4">
              <div class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Categorias</div>
              <div class="space-y-1 ml-2">
                <NuxtLink 
                  to="/categoria/celebridades" 
                  class="block py-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  @click="mobileMenuOpen = false"
                >
                  Celebridades
                </NuxtLink>
                <NuxtLink 
                  to="/categoria/internet" 
                  class="block py-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  @click="mobileMenuOpen = false"
                >
                  Internet
                </NuxtLink>
                <NuxtLink 
                  to="/categoria/kpop" 
                  class="block py-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  @click="mobileMenuOpen = false"
                >
                  K-Pop
                </NuxtLink>
                <NuxtLink 
                  to="/categoria/viral" 
                  class="block py-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  @click="mobileMenuOpen = false"
                >
                  Viral
                </NuxtLink>
              </div>
            </div>
            
            <NuxtLink 
              to="/buscar" 
              class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              @click="mobileMenuOpen = false"
            >
              Buscar
            </NuxtLink>
            
            <NuxtLink 
              to="/sobre" 
              class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              @click="mobileMenuOpen = false"
            >
              Sobre
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const router = useRouter()

const mobileMenuOpen = ref(false)
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/buscar?q=${encodeURIComponent(searchQuery.value.trim())}`)
    searchQuery.value = ''
    mobileMenuOpen.value = false
  }
}

// Close mobile menu when clicking outside or on route change
watchEffect(() => {
  if (process.client && mobileMenuOpen.value) {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Element
      if (!target.closest('header')) {
        mobileMenuOpen.value = false
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }
})

// Close mobile menu on route change
watch(() => router.currentRoute.value.path, () => {
  mobileMenuOpen.value = false
})
</script>

<style scoped>
/* Ensure dropdowns appear above other content */
.group:hover .group-hover\:opacity-100 {
  z-index: 50;
}
</style>
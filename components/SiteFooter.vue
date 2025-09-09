<template>
  <footer class="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Logo and Description -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">F</span>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">
              {{ config.public.siteName }}
            </span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            {{ config.public.siteDescription }}
          </p>
          
          <!-- Social Links -->
          <div class="flex space-x-4">
            <a 
              href="#" 
              class="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              title="Facebook"
            >
              <Icon name="mdi:facebook" class="w-6 h-6" />
            </a>
            <a 
              href="#" 
              class="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              title="Twitter"
            >
              <Icon name="mdi:twitter" class="w-6 h-6" />
            </a>
            <a 
              href="#" 
              class="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              title="Instagram"
            >
              <Icon name="mdi:instagram" class="w-6 h-6" />
            </a>
            <a 
              href="#" 
              class="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              title="YouTube"
            >
              <Icon name="mdi:youtube" class="w-6 h-6" />
            </a>
            <a 
              href="/rss.xml" 
              class="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              title="RSS Feed"
            >
              <Icon name="mdi:rss" class="w-6 h-6" />
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Navegação</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink 
                to="/" 
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Início
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/buscar" 
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Buscar
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/sobre" 
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Sobre
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/contato" 
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Contato
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Categories and Legal -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Categorias</h3>
          <ul class="space-y-2 mb-6">
            <li>
              <NuxtLink 
                to="/categoria/celebridades" 
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Celebridades
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/categoria/internet" 
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Internet
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/categoria/kpop" 
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                K-Pop
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/categoria/viral" 
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Viral
              </NuxtLink>
            </li>
          </ul>

          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink 
                to="/privacidade" 
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Privacidade
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            © {{ currentYear }} {{ config.public.siteName }}. Todos os direitos reservados.
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-2 md:mt-0">
            Feito com ❤️ usando Nuxt 3
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const currentYear = new Date().getFullYear()
</script>
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Sobre o Fofoquêra
      </h1>
      
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          📍 Nossa Missão
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          O Fofoquêra é seu portal de referência para as últimas fofocas, tendências e novidades 
          do mundo das celebridades, internet, K-Pop e muito mais!
        </p>

        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🎯 O Que Cobrimos
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="flex items-start space-x-3">
            <span class="text-2xl">⭐</span>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">Celebridades</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Últimas sobre artistas nacionais e internacionais
              </p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <span class="text-2xl">💻</span>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">Internet</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Influenciadores, memes e polêmicas da web
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <span class="text-2xl">🎤</span>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">K-Pop</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Novidades dos seus grupos coreanos favoritos
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <span class="text-2xl">🔥</span>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">Viral</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Trends que estão dominando as redes sociais
              </p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <NuxtLink 
            to="/" 
            class="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Voltar para home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Sobre Nós'
})
</script>
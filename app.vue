<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Simple Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center justify-between">
          <NuxtLink to="/" class="text-2xl font-bold text-pink-600">
            🔥 Fofoquêra
          </NuxtLink>
          <div class="flex items-center space-x-6">
            <NuxtLink to="/" class="text-gray-700 dark:text-gray-300 hover:text-pink-600">Início</NuxtLink>
            <NuxtLink to="/buscar" class="text-gray-700 dark:text-gray-300 hover:text-pink-600">Buscar</NuxtLink>
            <NuxtLink to="/sobre" class="text-gray-700 dark:text-gray-300 hover:text-pink-600">Sobre</NuxtLink>
          </div>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <NuxtPage />
    </main>

    <!-- Simple Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div class="container mx-auto px-4 py-8 text-center">
        <p class="text-gray-600 dark:text-gray-400">
          © 2025 Fofoquêra. Portal de fofocas e entretenimento.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Runtime config for AdSense
const config = useRuntimeConfig()

// SEO defaults
useHead({
  titleTemplate: (title) => title ? `${title} - ${config.public.siteName}` : config.public.siteName,
  meta: [
    { name: 'description', content: config.public.siteDescription },
    { property: 'og:site_name', content: config.public.siteName },
    { property: 'og:url', content: config.public.siteUrl },
    { name: 'twitter:site', content: '@fofoquera' }
  ]
})

// AdSense script injection (production only)
if (process.env.NODE_ENV === 'production' && config.public.adsenseClient) {
  useHead({
    script: [
      {
        async: true,
        src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.public.adsenseClient}`,
        crossorigin: 'anonymous',
        'data-ad-client': config.public.adsenseClient,
        'data-ad-frequency-hint': '30s'
      }
    ]
  })
}
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
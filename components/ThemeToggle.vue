<template>
  <button
    @click="toggleTheme"
    class="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg transition-colors"
    :title="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
  >
    <Icon 
      :name="isDark ? 'heroicons:sun' : 'heroicons:moon'" 
      class="w-5 h-5 transition-transform duration-300"
      :class="{ 'rotate-180': isDark }"
    />
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
  
  // Store preference in localStorage
  if (process.client) {
    localStorage.setItem('color-mode', colorMode.preference)
    
    // Apply theme class immediately for smooth transition
    document.documentElement.classList.toggle('dark', colorMode.preference === 'dark')
  }
}

// Initialize theme on mount
onMounted(() => {
  // Ensure the theme is applied correctly on initial load
  const storedTheme = localStorage.getItem('color-mode')
  if (storedTheme) {
    colorMode.preference = storedTheme as 'light' | 'dark'
  }
  
  document.documentElement.classList.toggle('dark', colorMode.value === 'dark')
})
</script>
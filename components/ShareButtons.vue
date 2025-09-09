<template>
  <div class="flex flex-wrap items-center gap-3">
    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
      Compartilhar:
    </span>
    
    <div class="flex items-center space-x-2">
      <!-- Twitter/X -->
      <a
        :href="twitterUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center w-10 h-10 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        title="Compartilhar no X (Twitter)"
      >
        <Icon name="mdi:twitter" class="w-5 h-5" />
      </a>

      <!-- Facebook -->
      <a
        :href="facebookUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        title="Compartilhar no Facebook"
      >
        <Icon name="mdi:facebook" class="w-5 h-5" />
      </a>

      <!-- WhatsApp -->
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        title="Compartilhar no WhatsApp"
      >
        <Icon name="mdi:whatsapp" class="w-5 h-5" />
      </a>

      <!-- Telegram -->
      <a
        :href="telegramUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        title="Compartilhar no Telegram"
      >
        <Icon name="mdi:telegram" class="w-5 h-5" />
      </a>

      <!-- Copy Link -->
      <button
        @click="copyLink"
        class="flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        title="Copiar link"
      >
        <Icon :name="copied ? 'heroicons:check' : 'heroicons:link'" class="w-5 h-5" />
      </button>
    </div>

    <!-- Success message -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="copied"
        class="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-lg"
      >
        <Icon name="heroicons:check" class="w-4 h-4 mr-1" />
        Link copiado!
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  url?: string
}

const props = defineProps<Props>()
const config = useRuntimeConfig()
const route = useRoute()

const copied = ref(false)

// Get current URL or use provided URL
const currentUrl = computed(() => {
  return props.url || `${config.public.siteUrl}${route.path}`
})

// Encoded text for sharing
const encodedTitle = computed(() => encodeURIComponent(props.title))
const encodedUrl = computed(() => encodeURIComponent(currentUrl.value))

// Social media URLs
const twitterUrl = computed(() => 
  `https://twitter.com/intent/tweet?text=${encodedTitle.value}&url=${encodedUrl.value}`
)

const facebookUrl = computed(() => 
  `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl.value}`
)

const whatsappUrl = computed(() => 
  `https://wa.me/?text=${encodedTitle.value}%20${encodedUrl.value}`
)

const telegramUrl = computed(() => 
  `https://t.me/share/url?url=${encodedUrl.value}&text=${encodedTitle.value}`
)

// Copy link functionality
const copyLink = async () => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(currentUrl.value)
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = currentUrl.value
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    
    copied.value = true
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy link:', error)
  }
}
</script>
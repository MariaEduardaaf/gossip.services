<template>
  <div :class="containerClass">
    <ins
      class="adsbygoogle"
      :style="adStyle"
      :data-ad-client="config.public.adsenseClient"
      :data-ad-slot="slotId"
      :data-ad-format="format"
      :data-ad-layout-key="layoutKey"
      :data-full-width-responsive="fullWidthResponsive"
    ></ins>
  </div>
</template>

<script setup lang="ts">
interface Props {
  slotId: string
  format?: string
  layoutKey?: string
  fullWidthResponsive?: string
  adType?: 'banner' | 'square' | 'leaderboard' | 'responsive'
}

const props = withDefaults(defineProps<Props>(), {
  format: 'auto',
  fullWidthResponsive: 'true',
  adType: 'responsive'
})

const config = useRuntimeConfig()

// Compute container class based on ad type
const containerClass = computed(() => {
  const baseClasses = 'ad-slot'
  
  switch (props.adType) {
    case 'banner':
      return `${baseClasses} ad-slot-banner`
    case 'square':
      return `${baseClasses} ad-slot-square`
    case 'leaderboard':
      return `${baseClasses} ad-slot-leaderboard`
    default:
      return baseClasses
  }
})

// Compute ad style based on ad type
const adStyle = computed(() => {
  switch (props.adType) {
    case 'banner':
      return 'display: inline-block; width: 100%; height: 90px;'
    case 'square':
      return 'display: inline-block; width: 250px; height: 250px;'
    case 'leaderboard':
      return 'display: inline-block; width: 728px; height: 90px;'
    default:
      return 'display: block;'
  }
})

// Initialize AdSense after component is mounted
onMounted(() => {
  try {
    // Only push ads in production with valid client ID
    if (process.env.NODE_ENV === 'production' && config.public.adsenseClient) {
      // Ensure adsbygoogle array exists
      if (typeof window !== 'undefined') {
        (window as any).adsbygoogle = (window as any).adsbygoogle || []
        
        // Push the ad configuration
        ;(window as any).adsbygoogle.push({})
      }
    }
  } catch (error) {
    console.warn('AdSense initialization failed:', error)
  }
})
</script>

<style scoped>
.ad-slot {
  @apply flex items-center justify-center;
  
  /* Fallback styling when ads don't load */
  &::before {
    content: '';
    @apply absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg;
    z-index: -1;
  }
}

/* Hide fallback styling when ad is loaded */
.ad-slot .adsbygoogle[data-adsbygoogle-status="filled"]::before {
  display: none;
}
</style>
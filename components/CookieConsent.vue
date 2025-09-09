<template>
  <Transition
    enter-active-class="transition-all duration-500"
    enter-from-class="opacity-0 translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-500"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-full"
  >
    <div
      v-if="!hasConsent"
      class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl"
    >
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <!-- Cookie info -->
          <div class="flex-1">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <Icon name="heroicons:information-circle" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 class="font-medium text-gray-900 dark:text-white mb-1">
                  🍪 Este site usa cookies
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Utilizamos cookies essenciais para o funcionamento do site e cookies de terceiros 
                  para análise de tráfego e publicidade. Ao continuar navegando, você concorda com o uso de cookies. 
                  <NuxtLink 
                    to="/privacidade" 
                    class="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                  >
                    Saiba mais
                  </NuxtLink>
                </p>
              </div>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              @click="acceptCookies"
              class="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors w-full sm:w-auto"
            >
              Aceitar todos
            </button>
            
            <button
              @click="acceptEssentialOnly"
              class="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors w-full sm:w-auto"
            >
              Apenas essenciais
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const hasConsent = ref(false)
const COOKIE_CONSENT_KEY = 'cookie-consent'

// Check for existing consent on mount
onMounted(() => {
  if (process.client) {
    const existingConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    hasConsent.value = !!existingConsent
  }
})

// Accept all cookies (including tracking/advertising)
const acceptCookies = () => {
  if (process.client) {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      essential: true,
      analytics: true,
      advertising: true,
      timestamp: Date.now()
    }))
    
    hasConsent.value = true
    
    // Initialize third-party services if needed
    initializeTrackingServices()
  }
}

// Accept only essential cookies
const acceptEssentialOnly = () => {
  if (process.client) {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      essential: true,
      analytics: false,
      advertising: false,
      timestamp: Date.now()
    }))
    
    hasConsent.value = true
  }
}

// Initialize tracking services (AdSense, Analytics, etc.)
const initializeTrackingServices = () => {
  if (process.client) {
    // Re-initialize AdSense if consent given
    const config = useRuntimeConfig()
    if (config.public.adsenseClient) {
      // Trigger ad refresh or initialization
      if ((window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({})
      }
    }
    
    // Initialize Google Analytics if configured
    // You can add GA4 initialization here
  }
}

// Utility function to check if user has consented to specific cookie type
const hasConsentFor = (type: 'essential' | 'analytics' | 'advertising'): boolean => {
  if (process.client) {
    const consentData = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (consentData) {
      try {
        const consent = JSON.parse(consentData)
        return consent[type] === true
      } catch {
        return false
      }
    }
  }
  return false
}

// Provide the utility function for use in other components
provide('hasConsentFor', hasConsentFor)
</script>

<style scoped>
/* Ensure the consent banner appears above all other content */
.z-50 {
  z-index: 50;
}
</style>
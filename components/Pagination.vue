<template>
  <nav 
    v-if="totalPages > 1" 
    class="flex items-center justify-center space-x-2 mt-12 mb-8"
    role="navigation" 
    aria-label="Paginação"
  >
    <!-- Previous Button -->
    <button
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
      class="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      :class="{ 'cursor-not-allowed opacity-50': currentPage === 1 }"
    >
      <Icon name="heroicons:chevron-left" class="w-4 h-4 mr-1" />
      Anterior
    </button>

    <!-- Page Numbers -->
    <div class="flex items-center space-x-1">
      <!-- First page (always visible if not in first group) -->
      <button
        v-if="showFirstPage"
        @click="goToPage(1)"
        class="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
        :class="currentPage === 1 
          ? 'bg-primary-600 text-white' 
          : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'"
      >
        1
      </button>

      <!-- First ellipsis -->
      <span v-if="showFirstEllipsis" class="px-2 py-2 text-gray-500">...</span>

      <!-- Visible page numbers -->
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        class="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
        :class="currentPage === page 
          ? 'bg-primary-600 text-white' 
          : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'"
        :aria-current="currentPage === page ? 'page' : undefined"
      >
        {{ page }}
      </button>

      <!-- Last ellipsis -->
      <span v-if="showLastEllipsis" class="px-2 py-2 text-gray-500">...</span>

      <!-- Last page (always visible if not in last group) -->
      <button
        v-if="showLastPage"
        @click="goToPage(totalPages)"
        class="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
        :class="currentPage === totalPages 
          ? 'bg-primary-600 text-white' 
          : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'"
      >
        {{ totalPages }}
      </button>
    </div>

    <!-- Next Button -->
    <button
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
      class="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      :class="{ 'cursor-not-allowed opacity-50': currentPage === totalPages }"
    >
      Próxima
      <Icon name="heroicons:chevron-right" class="w-4 h-4 ml-1" />
    </button>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
  maxVisiblePages?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 5
})

const emit = defineEmits<{
  'page-change': [page: number]
}>()

// Calculate which pages to show
const visiblePages = computed(() => {
  const { currentPage, totalPages, maxVisiblePages } = props
  const pages: number[] = []
  
  if (totalPages <= maxVisiblePages) {
    // Show all pages if total is less than max
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Calculate range around current page
    const sidePages = Math.floor((maxVisiblePages - 1) / 2)
    let startPage = Math.max(currentPage - sidePages, 1)
    let endPage = Math.min(currentPage + sidePages, totalPages)
    
    // Adjust range if we're near the beginning or end
    if (currentPage <= sidePages) {
      endPage = Math.min(maxVisiblePages, totalPages)
    }
    if (currentPage >= totalPages - sidePages) {
      startPage = Math.max(totalPages - maxVisiblePages + 1, 1)
    }
    
    // Don't include first/last page in the range if they'll be shown separately
    if (startPage <= 2) startPage = 2
    if (endPage >= totalPages - 1) endPage = totalPages - 1
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
  }
  
  return pages
})

// Show first page separately if not in visible range
const showFirstPage = computed(() => {
  return props.totalPages > props.maxVisiblePages && !visiblePages.value.includes(1) && visiblePages.value[0] > 2
})

// Show last page separately if not in visible range
const showLastPage = computed(() => {
  return props.totalPages > props.maxVisiblePages && 
         !visiblePages.value.includes(props.totalPages) && 
         visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1
})

// Show ellipsis indicators
const showFirstEllipsis = computed(() => {
  return showFirstPage.value && visiblePages.value[0] > 3
})

const showLastEllipsis = computed(() => {
  return showLastPage.value && visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 2
})

// Navigate to specific page
const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>
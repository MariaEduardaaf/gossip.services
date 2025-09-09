<template>
  <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
    <!-- Date -->
    <div class="flex items-center">
      <Icon name="heroicons:calendar-days" class="w-4 h-4 mr-1" />
      <time :datetime="date" :title="fullDate">
        {{ formattedDate }}
      </time>
    </div>

    <!-- Author (if provided) -->
    <div v-if="author" class="flex items-center">
      <Icon name="heroicons:user" class="w-4 h-4 mr-1" />
      <span>{{ author }}</span>
    </div>

    <!-- Reading Time (if provided) -->
    <div v-if="readingTime" class="flex items-center">
      <Icon name="heroicons:clock" class="w-4 h-4 mr-1" />
      <span>{{ readingTime }} min de leitura</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

// Configure dayjs
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Props {
  date: string
  author?: string
  readingTime?: number
  showRelativeTime?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showRelativeTime: true
})

// Computed properties for date formatting
const formattedDate = computed(() => {
  const dateObj = dayjs(props.date)
  
  if (props.showRelativeTime) {
    const now = dayjs()
    const diffInDays = now.diff(dateObj, 'day')
    
    // Show relative time for recent posts (last 7 days)
    if (diffInDays <= 7) {
      return dateObj.fromNow()
    }
  }
  
  // Show formatted date for older posts
  return dateObj.format('DD/MM/YYYY')
})

const fullDate = computed(() => {
  return dayjs(props.date).format('DD/MM/YYYY [às] HH:mm')
})
</script>
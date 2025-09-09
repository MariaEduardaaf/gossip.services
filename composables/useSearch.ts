interface SearchResult {
  _path: string
  title: string
  description: string
  cover: string
  category: string
  tags?: string[]
  date: string
  author?: string
  relevanceScore?: number
}

interface SearchState {
  query: string
  results: SearchResult[]
  loading: boolean
  hasSearched: boolean
  currentQuery: string
}

// Global search state
const searchState = reactive<SearchState>({
  query: '',
  results: [],
  loading: false,
  hasSearched: false,
  currentQuery: ''
})

export const useSearch = () => {
  // Reactive refs
  const searchQuery = toRef(searchState, 'query')
  const searchResults = toRef(searchState, 'results')
  const searching = toRef(searchState, 'loading')
  const hasSearched = toRef(searchState, 'hasSearched')
  const currentSearchQuery = toRef(searchState, 'currentQuery')

  // Search function
  const performSearch = async () => {
    const query = searchState.query.trim()
    
    if (!query) {
      resetSearch()
      return
    }

    searchState.loading = true
    searchState.currentQuery = query
    
    try {
      // Get all posts for client-side search
      const allPosts = await queryContent('posts')
        .only(['_path', 'title', 'description', 'cover', 'category', 'tags', 'date', 'author'])
        .find() as SearchResult[]

      // Perform search with scoring
      const results = searchPosts(allPosts, query)
      
      // Sort by relevance score (descending)
      searchState.results = results.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
      searchState.hasSearched = true

    } catch (error) {
      console.error('Search error:', error)
      searchState.results = []
    } finally {
      searchState.loading = false
    }
  }

  // Client-side search with relevance scoring
  const searchPosts = (posts: SearchResult[], query: string): SearchResult[] => {
    const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0)
    const results: SearchResult[] = []

    for (const post of posts) {
      let relevanceScore = 0
      
      // Create searchable text
      const titleText = post.title.toLowerCase()
      const descText = post.description.toLowerCase()
      const categoryText = post.category.toLowerCase()
      const tagsText = post.tags ? post.tags.join(' ').toLowerCase() : ''
      const authorText = post.author ? post.author.toLowerCase() : ''
      
      // Check each query term
      for (const term of queryTerms) {
        // Title matches (highest weight)
        if (titleText.includes(term)) {
          relevanceScore += 10
          // Exact title match gets bonus
          if (titleText === term) relevanceScore += 15
          // Title starts with term gets bonus
          if (titleText.startsWith(term)) relevanceScore += 8
        }
        
        // Description matches (medium weight)
        if (descText.includes(term)) {
          relevanceScore += 5
          // Multiple occurrences in description
          const matches = (descText.match(new RegExp(term, 'g')) || []).length
          relevanceScore += Math.min(matches * 2, 10) // Cap bonus at 10
        }
        
        // Category matches (medium weight)
        if (categoryText.includes(term)) {
          relevanceScore += 7
        }
        
        // Tags matches (low-medium weight)
        if (tagsText.includes(term)) {
          relevanceScore += 3
        }
        
        // Author matches (low weight)
        if (authorText.includes(term)) {
          relevanceScore += 2
        }
        
        // Partial matches (very low weight)
        if (titleText.includes(term.substring(0, Math.max(3, term.length - 1)))) {
          relevanceScore += 1
        }
      }

      // Date recency bonus (newer posts get slight boost)
      const postDate = new Date(post.date)
      const daysSincePost = Math.floor((Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24))
      if (daysSincePost < 30) relevanceScore += 3 // Posts from last 30 days
      else if (daysSincePost < 90) relevanceScore += 2 // Posts from last 90 days
      else if (daysSincePost < 180) relevanceScore += 1 // Posts from last 180 days

      // Only include results with some relevance
      if (relevanceScore > 0) {
        results.push({
          ...post,
          relevanceScore
        })
      }
    }

    return results
  }

  // Advanced search with filters
  const searchWithFilters = async (options: {
    query: string
    category?: string
    dateRange?: { from?: Date; to?: Date }
    tags?: string[]
    author?: string
  }) => {
    searchState.loading = true
    searchState.currentQuery = options.query
    
    try {
      let queryBuilder = queryContent('posts')
        .only(['_path', 'title', 'description', 'cover', 'category', 'tags', 'date', 'author'])

      // Apply category filter
      if (options.category) {
        queryBuilder = queryBuilder.where({ category: options.category })
      }

      // Apply date range filter
      if (options.dateRange?.from || options.dateRange?.to) {
        const dateFilter: any = {}
        if (options.dateRange.from) dateFilter.$gte = options.dateRange.from.toISOString()
        if (options.dateRange.to) dateFilter.$lte = options.dateRange.to.toISOString()
        queryBuilder = queryBuilder.where({ date: dateFilter })
      }

      // Apply author filter
      if (options.author) {
        queryBuilder = queryBuilder.where({ author: { $icontains: options.author } })
      }

      const filteredPosts = await queryBuilder.find() as SearchResult[]
      
      // Apply text search on filtered results
      if (options.query.trim()) {
        const results = searchPosts(filteredPosts, options.query)
        searchState.results = results.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
      } else {
        searchState.results = filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      }
      
      // Apply tags filter (client-side)
      if (options.tags && options.tags.length > 0) {
        searchState.results = searchState.results.filter(post => 
          post.tags && options.tags!.some(tag => 
            post.tags!.some(postTag => 
              postTag.toLowerCase().includes(tag.toLowerCase())
            )
          )
        )
      }

      searchState.hasSearched = true

    } catch (error) {
      console.error('Advanced search error:', error)
      searchState.results = []
    } finally {
      searchState.loading = false
    }
  }

  // Get search suggestions based on existing content
  const getSearchSuggestions = async (partial: string): Promise<string[]> => {
    if (!partial || partial.length < 2) return []

    try {
      const posts = await queryContent('posts')
        .only(['title', 'tags', 'category'])
        .find()

      const suggestions = new Set<string>()
      const partialLower = partial.toLowerCase()

      // Add matching titles
      posts.forEach(post => {
        const words = post.title.toLowerCase().split(/\s+/)
        words.forEach(word => {
          if (word.startsWith(partialLower) && word.length > partialLower.length) {
            suggestions.add(word)
          }
        })
      })

      // Add matching tags
      posts.forEach(post => {
        if (post.tags) {
          post.tags.forEach(tag => {
            if (tag.toLowerCase().startsWith(partialLower)) {
              suggestions.add(tag.toLowerCase())
            }
          })
        }
      })

      // Add matching categories
      const categories = ['celebridades', 'internet', 'kpop', 'viral']
      categories.forEach(category => {
        if (category.startsWith(partialLower)) {
          suggestions.add(category)
        }
      })

      return Array.from(suggestions).slice(0, 8) // Limit to 8 suggestions
    } catch (error) {
      console.error('Error getting search suggestions:', error)
      return []
    }
  }

  // Reset search state
  const resetSearch = () => {
    searchState.query = ''
    searchState.results = []
    searchState.loading = false
    searchState.hasSearched = false
    searchState.currentQuery = ''
  }

  // Clear search results but keep query
  const clearResults = () => {
    searchState.results = []
    searchState.hasSearched = false
  }

  // Get popular search terms (mock implementation)
  const getPopularSearches = (): string[] => {
    return [
      'celebridades',
      'kpop',
      'bts',
      'taylor swift',
      'viral',
      'tiktok',
      'instagram',
      'memes',
      'polêmica',
      'namoro'
    ]
  }

  return {
    // Reactive state
    searchQuery,
    searchResults,
    searching,
    hasSearched,
    currentSearchQuery,
    
    // Methods
    performSearch,
    searchWithFilters,
    getSearchSuggestions,
    resetSearch,
    clearResults,
    getPopularSearches
  }
}
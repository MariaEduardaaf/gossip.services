// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org'
  ],

  // TypeScript configuration
  typescript: {
    typeCheck: false
  },

  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      adsenseClient: process.env.ADSENSE_CLIENT || '',
      siteName: process.env.SITE_NAME || 'Fofoquêra',
      siteUrl: process.env.SITE_URL || 'https://seu-dominio.com',
      siteDescription: process.env.SITE_DESCRIPTION || 'Portal de notícias sobre celebridades, internet, K-pop e tendências virais'
    }
  },

  // App configuration
  app: {
    head: {
      titleTemplate: '%s - Fofoquêra',
      htmlAttrs: {
        lang: 'pt-BR'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Fofoquêra' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@fofoquera' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'RSS Feed', href: '/rss.xml' }
      ]
    }
  },

  // Content module configuration
  content: {
    highlight: {
      theme: 'github-light'
    }
  },

  // Image optimization
  image: {
    quality: 80,
    format: ['webp', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  // Sitemap configuration
  sitemap: {
    hostname: process.env.SITE_URL || 'https://seu-dominio.com',
    gzip: true
  },

  // Robots configuration
  robots: {
    groups: [
      {
        userAgent: '*',
        allow: '/',
        sitemap: `${process.env.SITE_URL || 'https://seu-dominio.com'}/sitemap.xml`
      }
    ]
  },

  // CSS configuration
  css: ['~/assets/css/main.css'],

  // Build configuration
  build: {
    transpile: ['dayjs']
  },

  // Nitro configuration for static generation
  nitro: {
    prerender: {
      routes: ['/rss.xml']
    }
  }
})
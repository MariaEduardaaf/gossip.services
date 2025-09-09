export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    // Get all posts sorted by date
    const posts = await queryContent('posts')
      .only(['_path', 'title', 'description', 'cover', 'category', 'date', 'author'])
      .sort({ date: -1 })
      .limit(20) // Limit to latest 20 posts
      .find()

    // Site information
    const siteUrl = config.public.siteUrl || 'https://seu-dominio.com'
    const siteName = config.public.siteName || 'Fofoquêra'
    const siteDescription = config.public.siteDescription || 'Portal de notícias sobre celebridades, internet, K-pop e tendências virais'

    // Build RSS feed XML
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteName}]]></title>
    <description><![CDATA[${siteDescription}]]></description>
    <link>${siteUrl}</link>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <generator>Nuxt Content RSS</generator>
    <copyright>© ${new Date().getFullYear()} ${siteName}. Todos os direitos reservados.</copyright>
    <category>Entretenimento</category>
    <managingEditor>contato@fofoquera.com (${siteName})</managingEditor>
    <webMaster>contato@fofoquera.com (${siteName})</webMaster>
    <image>
      <url>${siteUrl}/favicon.ico</url>
      <title>${siteName}</title>
      <link>${siteUrl}</link>
      <width>32</width>
      <height>32</height>
    </image>
${posts.map(post => {
  const postUrl = `${siteUrl}${post._path}`
  const postDate = new Date(post.date).toUTCString()
  const categoryName = getCategoryName(post.category)
  const coverImage = post.cover ? (post.cover.startsWith('http') ? post.cover : `${siteUrl}${post.cover}`) : ''
  
  return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${postDate}</pubDate>
      <category><![CDATA[${categoryName}]]></category>
      <dc:creator><![CDATA[${post.author || 'Equipe Fofoquêra'}]]></dc:creator>
      ${coverImage ? `<media:content url="${coverImage}" type="image/jpeg" medium="image">
        <media:title type="plain"><![CDATA[${post.title}]]></media:title>
        <media:description type="plain"><![CDATA[${post.description}]]></media:description>
      </media:content>` : ''}
      <content:encoded><![CDATA[
        ${coverImage ? `<img src="${coverImage}" alt="${post.title}" style="max-width: 100%; height: auto;" />` : ''}
        <p>${post.description}</p>
        <p><a href="${postUrl}">Leia mais no ${siteName} →</a></p>
      ]]></content:encoded>
    </item>`
}).join('\n')}
  </channel>
</rss>`

    // Set appropriate headers
    setHeader(event, 'Content-Type', 'application/rss+xml; charset=UTF-8')
    setHeader(event, 'Cache-Control', 'public, max-age=3600') // Cache for 1 hour
    
    return rssXml

  } catch (error) {
    console.error('Error generating RSS feed:', error)
    
    // Return error response
    setResponseStatus(event, 500)
    setHeader(event, 'Content-Type', 'application/xml; charset=UTF-8')
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>RSS Feed Error</title>
    <description>Error generating RSS feed</description>
    <link>${config.public.siteUrl || 'https://seu-dominio.com'}</link>
  </channel>
</rss>`
  }
})

// Helper function to get category display name
function getCategoryName(category: string): string {
  const categoryMap: Record<string, string> = {
    'celebridades': 'Celebridades',
    'internet': 'Internet',
    'kpop': 'K-Pop',
    'viral': 'Viral'
  }
  return categoryMap[category] || category
}
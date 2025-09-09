# 🔥 Fofoquêra - Portal de Notícias e Fofocas

Um portal moderno de notícias sobre celebridades, internet, K-Pop e tendências virais, construído com **Nuxt 3**, **TypeScript** e **Tailwind CSS**.

![Fofoquêra Banner](https://via.placeholder.com/1200x400/F43F5E/FFFFFF?text=Fofoquêra+-+Portal+de+Fofocas)

## ✨ Características

- 🚀 **SSR com Nuxt 3** - Performance otimizada e SEO-first
- 📱 **Design Responsivo** - Funciona perfeitamente em todos os dispositivos  
- 🌙 **Modo Escuro** - Tema claro/escuro com persistência
- 📰 **Sistema de Conteúdo** - Posts em Markdown com frontmatter
- 🔍 **Busca Avançada** - Sistema de busca com relevância e filtros
- 📊 **SEO Otimizado** - Meta tags, sitemap, RSS feed e structured data
- 💰 **Google AdSense** - Integração completa com anúncios
- 🍪 **GDPR Compliant** - Cookie consent e política de privacidade
- ⚡ **Performance** - Otimizado para Lighthouse score 90+

## 🛠️ Stack Tecnológica

- **Framework**: Nuxt 3
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS + @tailwindcss/typography
- **Conteúdo**: @nuxt/content
- **Imagens**: @nuxt/image
- **SEO**: @nuxtjs/sitemap, @nuxtjs/robots, nuxt-schema-org
- **Utilitários**: @vueuse/core, dayjs, zod

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ 
- npm, yarn ou pnpm

### Instalação

1. **Clone o projeto**
   ```bash
   git clone <seu-repositorio>
   cd fofocas
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` com suas configurações:
   ```env
   # AdSense Configuration
   ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXX
   
   # Site Configuration
   SITE_NAME="Fofoquêra"
   SITE_URL=https://seu-dominio.com
   SITE_DESCRIPTION="Portal de notícias sobre celebridades, internet, K-pop e tendências virais"
   ```

4. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📝 Criando Conteúdo

### Estrutura dos Posts

Os posts devem ser criados em `/content/posts/` como arquivos `.md` com o seguinte frontmatter:

```yaml
---
title: "Título do seu post"
description: "Descrição que aparecerá nas listagens e SEO"
cover: "/images/capa-do-post.jpg"
category: "celebridades" # celebridades | internet | kpop | viral
tags: ["tag1", "tag2", "tag3"]
date: "2025-09-10"
author: "Seu Nome"
---

# Conteúdo do Post

Escreva seu conteúdo em Markdown aqui...
```

### Categorias Disponíveis

- **celebridades** - Fofocas sobre famosos nacionais e internacionais
- **internet** - Influenciadores, memes e polêmicas da web
- **kpop** - Novidades sobre grupos e ídolos coreanos
- **viral** - Conteúdos que estão bombando nas redes sociais

### Adicionando Imagens

1. Coloque as imagens em `/public/images/`
2. Referencie no post: `cover: "/images/minha-imagem.jpg"`
3. Use tamanhos otimizados (1200x630px recomendado)

## 💰 Configuração do AdSense

### 1. Obtenha seu ID do AdSense
Cadastre-se no [Google AdSense](https://www.google.com/adsense/) e obtenha seu Client ID (formato: `ca-pub-xxxxxxxxxxxxxxxx`).

### 2. Configure a variável de ambiente
```env
ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
```

### 3. Configure os Slots de Anúncio

Edite os componentes `AdSlot` nas páginas para usar seus verdadeiros Slot IDs:

```vue
<AdSlot 
  slot-id="SEU_SLOT_ID_AQUI"
  ad-type="leaderboard"
  format="fluid"
  layout-key="-6t+ed+2i-1n-4w"
/>
```

### 4. Tipos de Anúncios Disponíveis

- `leaderboard` - Anúncios 728x90 (topo/rodapé)
- `banner` - Anúncios responsivos (meio do conteúdo)  
- `square` - Anúncios 250x250 (sidebar)
- `responsive` - Anúncios que se adaptam ao espaço

### 5. Posicionamento Recomendado

- **Topo**: Leaderboard após header
- **Meio do conteúdo**: Banner a cada 4-6 posts
- **Sidebar**: Square em páginas de post
- **Rodapé**: Leaderboard antes do footer

## 🔍 Sistema de Busca

O site inclui um sistema de busca avançada que permite:

- Busca por título, descrição, tags e autor
- Filtros por categoria
- Ordenação por relevância ou data
- Sugestões de busca automáticas
- Resultados paginados

## 📊 SEO e Performance

### Sitemap Automático
O sitemap é gerado automaticamente em `/sitemap.xml` incluindo todas as páginas e posts.

### Feed RSS
Feed RSS disponível em `/rss.xml` com os 20 posts mais recentes.

### Meta Tags
Cada página tem meta tags otimizadas para:
- Open Graph (Facebook)
- Twitter Cards
- Structured Data (Schema.org)

### Performance
- Lazy loading de imagens
- Code splitting automático
- Otimização de CSS
- Cache de conteúdo

## 🚀 Deploy na Vercel

### Deploy Automático

1. **Conecte ao GitHub**
   - Push seu código para um repositório GitHub
   - Conecte o repositório à Vercel

2. **Configure as Variáveis de Ambiente**
   Na Vercel, vá em Settings → Environment Variables e adicione:
   ```
   ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
   SITE_NAME=Fofoquêra
   SITE_URL=https://seu-dominio.vercel.app
   SITE_DESCRIPTION=Seu texto de descrição
   ```

3. **Deploy**
   ```bash
   git push origin main
   ```
   A Vercel fará o deploy automaticamente.

### Deploy Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy para produção
vercel --prod
```

## 🎨 Customização

### Cores e Tema

Edite `tailwind.config.ts` para personalizar as cores:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#fff1f2',
        500: '#f43f5e',
        600: '#e11d48',
        // ... outras variações
      }
    }
  }
}
```

### Fontes

Adicione fontes personalizadas em `nuxt.config.ts`:

```typescript
app: {
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
      }
    ]
  }
}
```

## 📱 PWA (Opcional)

Para transformar em PWA, instale e configure:

```bash
npm install @vite-pwa/nuxt
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Gerar site estático
npm run generate

# Lint
npm run lint

# Lint com correção automática
npm run lint:fix
```

## 📚 Estrutura do Projeto

```
fofocas/
├── assets/css/           # Estilos globais
├── components/          # Componentes Vue
├── composables/         # Composables (useSearch, etc)
├── content/posts/       # Posts em Markdown
├── pages/              # Páginas da aplicação
├── public/             # Arquivos estáticos
├── server/routes/      # API routes (RSS, etc)
├── app.vue             # Componente raiz
├── nuxt.config.ts      # Configuração do Nuxt
└── tailwind.config.ts  # Configuração do Tailwind
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se você encontrar problemas ou tiver dúvidas:

1. Verifique as [Issues abertas](../../issues)
2. Abra uma nova issue com detalhes do problema
3. Consulte a documentação do [Nuxt 3](https://nuxt.com/)

## 🎯 Roadmap

- [ ] Sistema de comentários
- [ ] Newsletter/Email marketing
- [ ] Painel administrativo
- [ ] Sistema de notificações push
- [ ] App mobile (React Native/Flutter)
- [ ] Integração com redes sociais
- [ ] Sistema de usuários e favoritos

## ⚖️ Considerações Legais

### AdSense
- Certifique-se de ter conteúdo original e de qualidade
- Siga as [Políticas do AdSense](https://support.google.com/adsense/answer/48182)
- Tenha tráfego real antes de aplicar

### LGPD/GDPR
- O site já inclui aviso de cookies e política de privacidade
- Revise e adapte conforme suas necessidades específicas
- Consulte um advogado se necessário

### Conteúdo
- Use apenas imagens com licença adequada
- Verifique informações antes de publicar
- Respeite direitos autorais e de imagem

---

**Feito com ❤️ e Nuxt 3**

*Se este projeto foi útil para você, considere deixar uma ⭐ no repositório!*# gossip.services

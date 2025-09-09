<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <section class="text-center mb-12">
      <div class="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="heroicons:shield-check" class="w-8 h-8 text-white" />
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Política de Privacidade
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        Última atualização: {{ lastUpdated }}
      </p>
    </section>

    <div class="max-w-4xl mx-auto">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-8">
        
        <!-- Introduction -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            1. Introdução
          </h2>
          <div class="prose prose-lg dark:prose-dark max-w-none">
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Esta Política de Privacidade descreve como o <strong>{{ config.public.siteName }}</strong> 
              coleta, usa e protege suas informações quando você visita nosso site 
              <strong>{{ config.public.siteUrl }}</strong>. Ao usar nosso site, você concorda com a 
              coleta e uso de informações de acordo com esta política.
            </p>
          </div>
        </section>

        <!-- Information We Collect -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            2. Informações que Coletamos
          </h2>
          
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            2.1 Informações Pessoais
          </h3>
          <div class="prose prose-lg dark:prose-dark max-w-none mb-6">
            <p class="text-gray-600 dark:text-gray-400">
              Podemos coletar informações pessoais que você nos fornece voluntariamente quando:
            </p>
            <ul class="text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Preenche formulários de contato</li>
              <li>• Se inscreve em newsletters</li>
              <li>• Interage com nosso conteúdo</li>
              <li>• Envia comentários ou sugestões</li>
            </ul>
          </div>

          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            2.2 Informações Automáticas
          </h3>
          <div class="prose prose-lg dark:prose-dark max-w-none">
            <p class="text-gray-600 dark:text-gray-400">
              Coletamos automaticamente certas informações quando você visita nosso site:
            </p>
            <ul class="text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Endereço IP</li>
              <li>• Tipo de navegador</li>
              <li>• Sistema operacional</li>
              <li>• Páginas visitadas</li>
              <li>• Tempo gasto no site</li>
              <li>• Dados de referência</li>
            </ul>
          </div>
        </section>

        <!-- Cookies -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            3. Cookies e Tecnologias Similares
          </h2>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
            <div class="flex items-start space-x-3">
              <Icon name="heroicons:information-circle" class="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  O que são Cookies?
                </h4>
                <p class="text-blue-800 dark:text-blue-200 text-sm">
                  Cookies são pequenos arquivos de texto armazenados no seu dispositivo que nos ajudam 
                  a melhorar sua experiência e entender como você usa nosso site.
                </p>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            3.1 Tipos de Cookies que Usamos
          </h3>
          <div class="space-y-4">
            <div class="border-l-4 border-green-500 pl-4">
              <h4 class="font-semibold text-gray-900 dark:text-white">Cookies Essenciais</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Necessários para o funcionamento básico do site. Não podem ser desabilitados.
              </p>
            </div>
            <div class="border-l-4 border-yellow-500 pl-4">
              <h4 class="font-semibold text-gray-900 dark:text-white">Cookies de Análise</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Nos ajudam a entender como os visitantes interagem com o site.
              </p>
            </div>
            <div class="border-l-4 border-red-500 pl-4">
              <h4 class="font-semibold text-gray-900 dark:text-white">Cookies de Publicidade</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Usados para exibir anúncios relevantes através do Google AdSense.
              </p>
            </div>
          </div>
        </section>

        <!-- Google AdSense -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            4. Google AdSense
          </h2>
          <div class="prose prose-lg dark:prose-dark max-w-none">
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Utilizamos o Google AdSense para exibir anúncios em nosso site. O Google pode usar 
              informações sobre suas visitas a este e outros sites para fornecer anúncios sobre 
              bens e serviços do seu interesse.
            </p>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Você pode optar por não receber anúncios personalizados visitando as 
              <a 
                href="https://www.google.com/settings/ads" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Configurações de Anúncios do Google
              </a>.
            </p>
          </div>
        </section>

        <!-- Data Usage -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            5. Como Usamos Suas Informações
          </h2>
          <div class="prose prose-lg dark:prose-dark max-w-none">
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Utilizamos as informações coletadas para:
            </p>
            <ul class="text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Fornecer e manter nosso serviço</li>
              <li>• Melhorar a experiência do usuário</li>
              <li>• Analisar como nosso site é usado</li>
              <li>• Responder a suas solicitações</li>
              <li>• Enviar comunicações importantes</li>
              <li>• Personalizar conteúdo e anúncios</li>
            </ul>
          </div>
        </section>

        <!-- Data Sharing -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            6. Compartilhamento de Informações
          </h2>
          <div class="prose prose-lg dark:prose-dark max-w-none">
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
              exceto nas seguintes situações:
            </p>
            <ul class="text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Com seu consentimento explícito</li>
              <li>• Para cumprir obrigações legais</li>
              <li>• Com provedores de serviços confiáveis (Google AdSense, Analytics)</li>
              <li>• Para proteger nossos direitos e segurança</li>
            </ul>
          </div>
        </section>

        <!-- Data Security -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            7. Segurança dos Dados
          </h2>
          <div class="prose prose-lg dark:prose-dark max-w-none">
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Implementamos medidas de segurança adequadas para proteger suas informações contra 
              acesso, alteração, divulgação ou destruição não autorizados. No entanto, nenhum 
              método de transmissão pela internet é 100% seguro.
            </p>
          </div>
        </section>

        <!-- Your Rights -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            8. Seus Direitos
          </h2>
          <div class="prose prose-lg dark:prose-dark max-w-none">
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Você tem os seguintes direitos em relação aos seus dados pessoais:
            </p>
            <ul class="text-gray-600 dark:text-gray-400 space-y-2">
              <li>• <strong>Acesso:</strong> Solicitar cópias de seus dados pessoais</li>
              <li>• <strong>Retificação:</strong> Corrigir dados incorretos ou incompletos</li>
              <li>• <strong>Exclusão:</strong> Solicitar a exclusão de seus dados</li>
              <li>• <strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
              <li>• <strong>Oposição:</strong> Opor-se ao processamento de seus dados</li>
            </ul>
            <p class="text-gray-600 dark:text-gray-400 mt-4">
              Para exercer esses direitos, entre em contato conosco através do e-mail 
              <a 
                href="mailto:privacidade@fofoquera.com" 
                class="text-primary-600 dark:text-primary-400 hover:underline"
              >
                privacidade@fofoquera.com
              </a>.
            </p>
          </div>
        </section>

        <!-- Children's Privacy -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            9. Privacidade de Menores
          </h2>
          <div class="prose prose-lg dark:prose-dark max-w-none">
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Nosso site não é direcionado a menores de 16 anos. Não coletamos conscientemente 
              informações pessoais de menores de 16 anos. Se você é pai/mãe ou responsável e 
              acredita que seu filho nos forneceu informações pessoais, entre em contato conosco.
            </p>
          </div>
        </section>

        <!-- Changes to Policy -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            10. Alterações nesta Política
          </h2>
          <div class="prose prose-lg dark:prose-dark max-w-none">
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre 
              alterações significativas publicando a nova política nesta página com uma nova 
              data de "Última atualização".
            </p>
          </div>
        </section>

        <!-- Contact -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            11. Contato
          </h2>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco:
            </p>
            <div class="space-y-2 text-sm">
              <div class="flex items-center space-x-2">
                <Icon name="heroicons:envelope" class="w-4 h-4 text-gray-500" />
                <span class="text-gray-600 dark:text-gray-400">privacidade@fofoquera.com</span>
              </div>
              <div class="flex items-center space-x-2">
                <Icon name="heroicons:globe-alt" class="w-4 h-4 text-gray-500" />
                <span class="text-gray-600 dark:text-gray-400">{{ config.public.siteUrl }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Last Updated Info -->
        <section class="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Esta Política de Privacidade foi atualizada pela última vez em {{ lastUpdated }}.
            </p>
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Versão 1.2 - Compatível com LGPD e GDPR
            </p>
          </div>
        </section>
      </div>
    </div>

    <!-- Bottom Ad -->
    <section class="mt-12">
      <AdSlot 
        slot-id="2468135790"
        ad-type="leaderboard"
        format="fluid"
        layout-key="-6t+ed+2i-1n-4w"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

// Last updated date
const lastUpdated = '09 de setembro de 2025'

// SEO
useHead({
  title: 'Política de Privacidade',
  meta: [
    { 
      name: 'description', 
      content: `Política de Privacidade do ${config.public.siteName}. Saiba como coletamos, usamos e protegemos suas informações pessoais.` 
    },
    { property: 'og:title', content: `Política de Privacidade - ${config.public.siteName}` },
    { property: 'og:description', content: 'Saiba como protegemos sua privacidade e tratamos seus dados pessoais.' },
    { name: 'robots', content: 'index, follow' }
  ]
})
</script>
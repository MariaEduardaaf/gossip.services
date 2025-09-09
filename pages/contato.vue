<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <section class="text-center mb-12">
      <div class="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="heroicons:chat-bubble-left-right" class="w-8 h-8 text-white" />
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Entre em Contato
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Tem uma fofoca quente? Quer sugerir um tópico? Ou precisa falar conosco sobre algo específico? 
        Estamos aqui para ouvir você!
      </p>
    </section>

    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📝 Envie uma Mensagem
          </h2>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome *
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Seu nome completo"
              >
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                E-mail *
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="seu@email.com"
              >
            </div>

            <!-- Subject -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Assunto *
              </label>
              <select
                v-model="form.subject"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Selecione um assunto</option>
                <option value="fofoca">🔥 Tenho uma fofoca!</option>
                <option value="sugestao">💡 Sugestão de conteúdo</option>
                <option value="parceria">🤝 Parceria/Colaboração</option>
                <option value="imprensa">📰 Imprensa</option>
                <option value="suporte">❓ Suporte técnico</option>
                <option value="outros">📧 Outros assuntos</option>
              </select>
            </div>

            <!-- Message -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mensagem *
              </label>
              <textarea
                v-model="form.message"
                rows="6"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                placeholder="Conte-nos mais detalhes..."
              ></textarea>
            </div>

            <!-- Privacy Notice -->
            <div class="flex items-start space-x-3">
              <input
                v-model="form.privacy"
                type="checkbox"
                id="privacy"
                required
                class="mt-1 w-4 h-4 text-primary-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500"
              >
              <label for="privacy" class="text-sm text-gray-600 dark:text-gray-400">
                Concordo com a 
                <NuxtLink to="/privacidade" class="text-primary-600 dark:text-primary-400 hover:underline">
                  política de privacidade
                </NuxtLink> 
                e autorizo o uso dos meus dados para responder a esta mensagem. *
              </label>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="submitting"
              class="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="submitting" class="flex items-center justify-center">
                <Icon name="heroicons:arrow-path" class="w-5 h-5 mr-2 animate-spin" />
                Enviando...
              </span>
              <span v-else>Enviar Mensagem</span>
            </button>
          </form>

          <!-- Success Message -->
          <div
            v-if="submitted"
            class="mt-6 p-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg"
          >
            <div class="flex items-center">
              <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <span class="text-green-800 dark:text-green-200 font-medium">
                Mensagem enviada com sucesso! Responderemos em breve.
              </span>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Quick Contact -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📞 Contato Rápido
            </h2>
            
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:envelope" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">E-mail</h3>
                  <p class="text-gray-600 dark:text-gray-400">contato@fofoquera.com</p>
                  <p class="text-sm text-gray-500 dark:text-gray-500">Respondemos em até 24h</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:clock" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">Horário de Atendimento</h3>
                  <p class="text-gray-600 dark:text-gray-400">Segunda a Sexta: 9h às 18h</p>
                  <p class="text-sm text-gray-500 dark:text-gray-500">Fuso horário: GMT-3 (Brasília)</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🌟 Redes Sociais
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Siga-nos para ficar por dentro das últimas fofocas e novidades!
            </p>
            
            <div class="space-y-4">
              <a 
                href="#" 
                class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
              >
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Icon name="mdi:facebook" class="w-5 h-5 text-white" />
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    Facebook
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-500">@fofoquera</p>
                </div>
                <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4 text-gray-400" />
              </a>
              
              <a 
                href="#" 
                class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
              >
                <div class="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <Icon name="mdi:twitter" class="w-5 h-5 text-white" />
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    Twitter/X
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-500">@fofoquera</p>
                </div>
                <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4 text-gray-400" />
              </a>
              
              <a 
                href="#" 
                class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
              >
                <div class="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon name="mdi:instagram" class="w-5 h-5 text-white" />
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    Instagram
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-500">@fofoquera</p>
                </div>
                <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>

          <!-- FAQ Quick Links -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              ❓ Perguntas Frequentes
            </h2>
            
            <div class="space-y-3">
              <details class="group">
                <summary class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                  <span class="font-medium text-gray-900 dark:text-white">Como posso enviar uma dica?</span>
                  <Icon name="heroicons:chevron-down" class="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div class="mt-2 px-3 text-sm text-gray-600 dark:text-gray-400">
                  Use o formulário acima selecionando "Tenho uma fofoca!" como assunto.
                </div>
              </details>
              
              <details class="group">
                <summary class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                  <span class="font-medium text-gray-900 dark:text-white">Vocês verificam as informações?</span>
                  <Icon name="heroicons:chevron-down" class="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div class="mt-2 px-3 text-sm text-gray-600 dark:text-gray-400">
                  Sim! Verificamos nossas fontes antes de publicar qualquer conteúdo.
                </div>
              </details>
              
              <details class="group">
                <summary class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                  <span class="font-medium text-gray-900 dark:text-white">Posso sugerir celebridades para cobertura?</span>
                  <Icon name="heroicons:chevron-down" class="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div class="mt-2 px-3 text-sm text-gray-600 dark:text-gray-400">
                  Claro! Use "Sugestão de conteúdo" no formulário e nos conte sobre quem você gostaria de ver mais.
                </div>
              </details>
            </div>
          </div>

          <!-- Ad Slot -->
          <div>
            <AdSlot 
              slot-id="1357924680"
              ad-type="square"
              format="fixed"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Ad -->
    <section class="mt-16">
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

// Form data
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
  privacy: false
})

const submitting = ref(false)
const submitted = ref(false)

// Form submission
const submitForm = async () => {
  submitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real app, you would send the form data to your API
    console.log('Form submitted:', form.value)
    
    submitted.value = true
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
      privacy: false
    }
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      submitted.value = false
    }, 5000)
    
  } catch (error) {
    console.error('Error submitting form:', error)
    // Handle error (show error message)
  } finally {
    submitting.value = false
  }
}

// SEO
useHead({
  title: 'Contato',
  meta: [
    { 
      name: 'description', 
      content: `Entre em contato com o ${config.public.siteName}. Envie suas fofocas, sugestões ou dúvidas através do nosso formulário de contato.` 
    },
    { property: 'og:title', content: `Contato - ${config.public.siteName}` },
    { property: 'og:description', content: 'Entre em contato conosco para enviar fofocas, sugestões ou esclarecer dúvidas.' }
  ]
})
</script>
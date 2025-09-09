import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Customize ESLint rules here
    '@typescript-eslint/no-unused-vars': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off'
  }
})
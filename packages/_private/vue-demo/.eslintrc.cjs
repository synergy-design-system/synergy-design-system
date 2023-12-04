/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // @see https://github.com/vuejs/eslint-plugin-vue/pull/2314
    // @see https://github.com/vuejs/eslint-plugin-vue/issues/2313
    'vue/no-deprecated-slot-attribute': 0
  }
}

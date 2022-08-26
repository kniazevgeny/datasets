module.exports = {
  root: true,
  env: {
    node: true, 
  },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module",
        project: "./tsconfig.json",
        extraFileExtentions: [ ".vue" ]
    },
    plugins: [
        'vue',
        '@typescript-eslint',
        'prettier'
    ],
    extends: [
      // add more generic rulesets here, such as:
      // 'eslint:recommended',
      'plugin:vue/vue3-recommended',
      '@vue/airbnb',
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
      // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    ],
    rules: {
      'prettier/prettier': ['error', { singleQuote: true }]
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
      // 'vue/no-unused-vars': 'error'
    }
  }
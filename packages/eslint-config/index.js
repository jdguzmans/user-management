module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: [
      'standard'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: [
      '@typescript-eslint'
    ],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      "@typescript-eslint/no-explicit-any": "warn",
      quotes: [`error`, `backtick`],
      camelcase: `off`
    }
  }
  
// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-var': 'warn',
    'no-unused-vars': 'warn',
    'prettier/prettier': 'error',
  },
};

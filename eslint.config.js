const { defineConfig } = require('eslint-define-config');

const expoConfig = {
  extends: [
    'plugin:expo/recommended', // config oficial Expo
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', 'react-native', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'react/no-unknown-property': ['error', { ignore: ['className'] }],
  },
  settings: {
    react: { version: 'detect' },
  },
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },
};

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
]);

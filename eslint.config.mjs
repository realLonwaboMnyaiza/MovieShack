import { js, jest } from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, jest },
    extends: ['js/recommended'],
    languageOptions: { globals: [globals.node, globals.jest, globals.es2021] },
    rules: {
      'no-unused-vars': 'warn',
      'prefer-const': 'warn',
      'space-before-function-paren': 'off',
      indent: ['error', 2],
      semi: ['error', 'always'],
    },
  },
]);

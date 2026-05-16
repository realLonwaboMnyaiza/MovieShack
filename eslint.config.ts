import js from '@eslint/js';
import tseslint from "typescript-eslint";
import globals from 'globals';

export default tseslint.config({
  files: ['**/*.{ts}'],
  extends: [js.configs.recommended],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.es2021,
    },
  },
  rules: {
    'no-unused-vars': 'warn',
    'prefer-const': 'warn',
    'space-before-function-paren': 'off',
    indent: ['error', 2],
    semi: ['error', 'always'],
  },
});
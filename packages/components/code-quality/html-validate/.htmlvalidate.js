// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'html-validate';
import { createElements } from './scripts/createElements.js';

export default defineConfig({
  elements: [
    'html5',
    createElements(),
  ],
  extends: ['html-validate:recommended'],
  root: true,
  rules: {
    'no-deprecated-attr': 'warn',
    'no-inline-style': 'off',
    'wcag/h32': 'off',
  },
});

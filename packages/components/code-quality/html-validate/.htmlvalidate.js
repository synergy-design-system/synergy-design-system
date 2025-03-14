import { defineConfig } from "html-validate";
import { createElements } from "./scripts/createElements.js";

export default defineConfig({
  extends: ["html-validate:recommended"],
  elements: [
    "html5",
    createElements(),
  ],
  root: true,
  rules: {
    'wcag/h32': 'off',
    'no-deprecated-attr': 'warn',
    'no-inline-style': 'off'
  },
});

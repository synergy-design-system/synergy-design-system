import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../../../', import.meta.url));
const linters = new Map();

const lint = async (directory, filePath, code) => {
  const cwd = path.join(root, directory);
  if (!linters.has(cwd)) {
    const require = createRequire(path.join(cwd, 'package.json'));
    const { ESLint } = require('eslint');
    assert.match(ESLint.version, /^10\./u);
    linters.set(cwd, new ESLint({ cwd }));
  }
  const results = await linters.get(cwd).lintText(code, { filePath });
  assert.equal(results.length, 1);
  assert.equal(results[0].fatalErrorCount, 0, JSON.stringify(results[0].messages));
  assert.ok(!results[0].messages.some(message => message.ruleId === null), JSON.stringify(results[0].messages));
  return results[0];
};

const cases = [
  {
    directory: 'packages/_private/eslint-config-syn',
    filePath: 'js.js',
    invalid: "import lit from 'lit';\n// Builtins belong first.\nimport path from 'node:path';\n",
    name: 'Airbnb import ordering with comments',
    rule: 'import/order',
    valid: "import path from 'node:path';\nimport lit from 'lit';\n",
  },
  {
    directory: 'packages/components',
    filePath: 'src/components/button/button.component.ts',
    invalid: 'Promise.resolve(1);\n',
    name: 'type-aware floating promises',
    rule: '@typescript-eslint/no-floating-promises',
    valid: 'void Promise.resolve(1);\n',
  },
  {
    directory: 'packages/components',
    filePath: 'src/components/button/button.component.ts',
    invalid: 'declare const value: any;\nexport const result: string = value;\n',
    name: 'type-aware unsafe assignments',
    rule: '@typescript-eslint/no-unsafe-assignment',
    valid: "export const result: string = 'value';\n",
  },
  {
    directory: 'packages/components',
    filePath: 'src/components/button/button.component.ts',
    invalid: 'export const value = (unused: string) => 1;\n',
    name: 'unused argument underscore exception',
    rule: '@typescript-eslint/no-unused-vars',
    valid: 'export const value = (_unused: string) => 1;\n',
  },
  {
    directory: 'packages/components',
    filePath: 'src/components/button/button.component.ts',
    invalid: "import { html } from 'lit';\nexport const view = html`<div id=\"one\" id=\"two\"></div>`;\n",
    name: 'Lit duplicate template bindings',
    rule: 'lit/no-duplicate-template-bindings',
    valid: "import { html } from 'lit';\nexport const view = html`<div id=\"one\"></div>`;\n",
  },
  {
    directory: 'packages/components',
    filePath: 'src/components/button/button.component.ts',
    invalid: "import { html } from 'lit';\nexport const view = html`<img src=\"image.png\">`;\n",
    name: 'Lit image accessibility',
    rule: 'lit-a11y/alt-text',
    valid: "import { html } from 'lit';\nexport const view = html`<img src=\"image.png\" alt=\"Description\">`;\n",
  },
  {
    directory: 'packages/components',
    filePath: 'src/components/button/button.component.ts',
    invalid: "customElements.define('invalid', class extends HTMLElement {});\n",
    name: 'Web Component registration names',
    rule: 'wc/no-invalid-element-name',
    valid: "customElements.define('valid-element', class extends HTMLElement {});\n",
  },
  {
    directory: 'packages/_private/react-demo',
    filePath: 'src/App.tsx',
    invalid: 'export function Component() { return <div />; }\n',
    name: 'React function component convention',
    rule: 'react/function-component-definition',
    valid: 'export const Component = () => <div />;\n',
  },
  {
    directory: 'packages/_private/react-demo',
    filePath: 'src/App.tsx',
    invalid: "import { useState } from 'react';\nexport const Component = ({ enabled }: { enabled: boolean }) => { if (enabled) { useState(0); } return <div />; };\n",
    name: 'React conditional hooks',
    rule: 'react-hooks/rules-of-hooks',
    valid: "import { useState } from 'react';\nexport const Component = () => { useState(0); return <div />; };\n",
  },
  {
    directory: 'packages/_private/react-demo',
    filePath: 'src/App.tsx',
    invalid: "import { useEffect } from 'react';\nexport const Component = ({ value }: { value: string }) => { useEffect(() => { console.log(value); }, []); return <div />; };\n",
    name: 'React exhaustive dependencies',
    rule: 'react-hooks/exhaustive-deps',
    valid: "import { useEffect } from 'react';\nexport const Component = ({ value }: { value: string }) => { useEffect(() => { console.log(value); }, [value]); return <div />; };\n",
  },
  {
    directory: 'packages/_private/vue-demo',
    filePath: 'src/App.vue',
    invalid: '<script setup lang="ts">const items = [1];</script>\n<template><div v-for="item in items">{{ item }}</div></template>\n',
    name: 'Vue template keys',
    rule: 'vue/require-v-for-key',
    valid: '<script setup lang="ts">const items = [1];</script>\n<template><div v-for="item in items" :key="item">{{ item }}</div></template>\n',
  },
  {
    directory: 'packages/components',
    filePath: 'src/components/chart/chart.test.ts',
    invalid: "import { test } from '@playwright/test';\ntest.only('example', async () => {});\n",
    name: 'Playwright focused tests',
    rule: 'playwright/no-focused-test',
    valid: "import { test } from '@playwright/test';\ntest('example', async () => {});\n",
  },
];

cases.forEach(({
  name, directory, filePath, rule, invalid, valid,
}) => {
  test(name, async () => {
    const invalidResult = await lint(directory, filePath, invalid);
    assert.ok(invalidResult.messages.some(message => message.ruleId === rule), JSON.stringify(invalidResult.messages));
    const validResult = await lint(directory, filePath, valid);
    assert.ok(!validResult.messages.some(message => message.ruleId === rule), JSON.stringify(validResult.messages));
  });
});

test('stylistic autofixes preserve single quotes and semicolons and are idempotent', async () => {
  const cwd = path.join(root, 'packages/components');
  const require = createRequire(path.join(cwd, 'package.json'));
  const { ESLint } = require('eslint');
  const eslint = new ESLint({ cwd, fix: true });
  const filePath = 'src/components/button/button.component.ts';
  const expected = "export const value = 'value';\n";
  const [result] = await eslint.lintText('export const value = "value"\n', { filePath });
  assert.equal(result.output, expected);
  assert.equal(result.errorCount, 0, JSON.stringify(result.messages));
  const [secondResult] = await eslint.lintText(expected, { filePath });
  assert.equal(secondResult.output, undefined);
  assert.equal(secondResult.errorCount, 0, JSON.stringify(secondResult.messages));
});

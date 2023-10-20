/* eslint-disable complexity */
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { deleteSync } from 'del';
import esbuild from 'esbuild';
import { globby } from 'globby';
import ora from 'ora';
import { lintFiles } from './format.js';
import { getAllComponents } from './shared.js';

const outDir = path.join('./src');
const distDir = path.join('./dist');
const manifest = path.join('../components/dist/custom-elements.json');

const spinner = ora({ hideCursor: false }).start();

spinner.text = 'Doing something';
spinner.start();
console.log(`${chalk.green('✔')} Starting build`);

// Clear build directory
deleteSync(outDir);
fs.mkdirSync(outDir, { recursive: true });

const metadata = JSON.parse(fs.readFileSync(manifest, 'utf8'));

// List of components
const components = getAllComponents(metadata);

// Index exports file
const index = [];

components.forEach(component => {
  const tagWithoutPrefix = component.tagName.replace(/^sl-/, '');
  const componentDir = path.join(outDir, tagWithoutPrefix);
  const componentFile = path.join(componentDir, 'index.ts');
  const importPath = `@synergy-design-system/components/${component.path.replace(/\.js$/, '.component.js')}`;

  const eventImports = (component.events || [])
    .map(event => `import type { ${event.eventName} } from '@synergy-design-system/components';`)
    .join('\n');

  const eventExports = (component.events || [])
    .map(event => `export type { ${event.eventName} } from '@synergy-design-system/components';`)
    .join('\n');

  const eventNameImport = (component.events || []).length > 0 ? `import { type EventName } from '@lit/react';` : '';

  const events = (component.events || [])
    .map(event => `${event.reactName}: '${event.name}' as EventName<${event.eventName}>`)
    .join(',\n');

  fs.mkdirSync(componentDir, { recursive: true });

  const jsDoc = component.jsDoc || '';

  const source = `
    import * as React from 'react';
    import { createComponent } from '@lit/react';
    import Component from '${importPath}';

    ${eventNameImport}
    ${eventImports}

    const tagName = '${component.tagName}'
    Component.define('${component.tagName}')

    ${jsDoc}
    export const ${component.name} = createComponent({
      displayName: "${component.name}",
      elementClass: Component,
      events: {
        ${events}
      },
      react: React,
      tagName,
    });

    ${eventExports}
  `;

  index.push(`export { ${component.name} } from './${tagWithoutPrefix}/index.js';`);

  fs.writeFileSync(componentFile, source, 'utf8');
});

// Generate the index file
fs.writeFileSync(path.join(outDir, 'index.ts'), index.join('\n'), 'utf8');

await lintFiles(`${outDir}/**/*.ts`);

// Go go runner, go!
const esbuildConfig = {
  bundle: false,
  // chunkNames: 'chunks/[name].[hash]',
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  entryPoints: [
    './src/index.ts',
      // Components
      ...(await globby('./src/**/!(*.(style|test)).ts')),
  ],
  external: undefined,
  format: 'esm',
  minify: false,
  outdir: distDir,
  packages: 'external',
  splitting: true,
  target: 'es2017',
};

await esbuild.build(esbuildConfig);

spinner.stop();

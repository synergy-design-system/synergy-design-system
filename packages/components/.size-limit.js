/**
 * @typedef {import('size-limit').Check} Check
 * @typedef {import('size-limit').SizeLimitConfig} SizeLimitConfig
 */
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Get the dependency list so we can exclude all deps
const packageJSON = import.meta.resolve('./package.json');

const { dependencies } = JSON.parse(
  readFileSync(
    fileURLToPath(packageJSON),
    'utf-8'
  )
);

const customElements = import.meta.resolve('./dist/custom-elements.json');
const metadata = JSON.parse(
  readFileSync(
    fileURLToPath(customElements),
    'utf-8'
  )
);

/**
 * @type {Partial<Check>}
 * Default size options for all checks.
 */
const defaultSizeOptions = {
  brotli: false,
  gzip: false,
  ignore: Object.keys(dependencies),
};

// Get a list of all custom elements and create outputs for them
/**
 * @type {Check[]}
 * This will create a list of checks for each custom element
 */
const elements = metadata?.modules
  // Only allow modules that have custom elements declared
  ?.filter(module => module.declarations.some(
    d => d.customElement),
  )
  // Make sure to only include custom elements that have a path.
  // This strips out stuff we only use internally, like syn-resize-observer
  .filter(m => existsSync(`dist/${m.path}`))
  .flatMap(m => m.path)
  .sort()
  // Finally map the paths to the expected output format
  .map(p => ({
    ...defaultSizeOptions,
    name: `syn-${p.split('/').at(-2)}`,
    path: `dist/${p}`,
  }));

/**
 * @type {SizeLimitConfig}
 */
export default [
  {
    ...defaultSizeOptions,
    name: 'synergy (bundle)',
    path: 'dist/synergy.js',
  },
  ...elements,
];

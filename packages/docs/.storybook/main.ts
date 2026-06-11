import type { StorybookConfig } from '@storybook/web-components-vite';

// @ts-expect-error - This is a local plugin, not published to npm, so TypeScript can't find types for it.
import StorybookEnvPackageVersions from '../src/storybook-env-package-versions/index.ts';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@chromatic-com/storybook',
    {
      name: '@storybook/addon-designs',
      options: {
        renderTarget: 'tab',
      },
    },
    '@storybook/addon-docs',
  ],

  core: {
    disableTelemetry: true,
  },

  env: StorybookEnvPackageVersions({
    packagePaths: ['../components', '../assets', '../styles', '../tokens', '../fonts'],
  }),

  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },

  staticDirs: [
    '../public',
    // 2018 icons are available at /assets/sick2018/wallpaper.svg
    {
      from: '../../assets/src/sick2018/icons',
      to: '/assets/sick2018',
    },
    // 2025 icons are available at /assets/sick2025/wallpaper.svg
    // Only outline is recognized!
    {
      from: '../../assets/src/sick2025/icons/outline',
      to: '/assets/sick2025',
    },
  ],

  stories: [
    '../stories/Welcome.mdx',
    '../stories/Prerequisites.mdx',
    '../stories/ComponentOverview.mdx',
    '../stories/IconSearch.mdx',
    '../stories/GoalsAndGuidelines.mdx',
    '../stories/Presentation.mdx',
    '../stories/Accessibility.mdx',
    '../stories/Contributing.mdx',
    '../stories/Charting.mdx',
    '../stories/migration/**/*.mdx',
    '../stories/Migration2025.mdx',
    '../stories/limitations/**/*.mdx',
    '../stories/packages/**/*.mdx',
    '../stories/tokens/**/*.@(mdx|stories.*)',
    '../stories/overview/**/*.mdx',
    '../stories/components/**/*.@(mdx|stories.*)',
    '../stories/charts/**/*.@(mdx|stories.*)',
    '../stories/styles/**/*.@(mdx|stories.*)',
    '../stories/templates/**/*.@(mdx|stories.*)',
    // "../src/**/*.mdx",
    // "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  viteFinal: (cfg) => ({
    ...cfg,
    build: {
      ...cfg.build,
      // This prevents an error with top level await statements
      // that prevents bundling via `pnpm build`.
      // @see https://github.com/vitejs/vite/issues/6985
      target: 'esnext',
    },
    server: {
      ...cfg.server,
      fs: {
        ...cfg.server?.fs,
        // This fixes a problem we have since vite 8.0.16, as they no longer allow fetching files with colon in the file path see: https://github.com/vitejs/vite/pull/22572
        // But we need this for our metadata files, which are named e.g. "component:syn-button.js". This is only a problem for the local development server, as the production build does not have this issue.
        strict: process.env.NODE_ENV === 'production',
      },
    },
  }),
};

export default config;

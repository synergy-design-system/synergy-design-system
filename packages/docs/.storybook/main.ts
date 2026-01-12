import type { StorybookConfig } from "@storybook/web-components-vite";
import StorybookEnvPackageVersions from '../src/storybook-env-package-versions/index.ts';

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    '@chromatic-com/storybook',
    { name: "@storybook/addon-designs", options: { renderTarget: "tab" }, },
    "@storybook/addon-docs",
  ],

  core: {
    disableTelemetry: true,
  },

  env: StorybookEnvPackageVersions({
    packagePaths: ['../components', '../assets', '../styles', '../tokens', '../fonts'],
  }),

  framework: {
    name: "@storybook/web-components-vite",
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
    "../stories/Welcome.mdx",
    "../stories/Prerequisites.mdx",
    "../stories/ComponentOverview.mdx",
    "../stories/IconSearch.mdx",
    "../stories/GoalsAndGuidelines.mdx",
    "../stories/Presentation.mdx",
    "../stories/Accessibility.mdx",
    "../stories/Contributing.mdx",
    "../stories/Migration2025.mdx",
    "../stories/limitations/**/*.mdx",
    "../stories/packages/**/*.mdx",
    "../stories/tokens/**/*.@(mdx|stories.*)",
    "../stories/components/**/*.@(mdx|stories.*)",
    "../stories/styles/**/*.@(mdx|stories.*)",
    "../stories/templates/**/*.@(mdx|stories.*)",
    // "../src/**/*.mdx",
    // "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],

  viteFinal: async (config) => {
    return {
      ...config,
      build: {
        ...config.build,
        // This prevents an error with top level await statements
        // that prevents bundling via `pnpm build`.
        // @see https://github.com/vitejs/vite/issues/6985
        target: 'esnext',
      }
    };
  }
};

export default config;

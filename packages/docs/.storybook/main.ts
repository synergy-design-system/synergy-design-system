import type { StorybookConfig } from "@storybook/web-components-vite";
import StorybookEnvPackageVersions from '../src/storybook-env-package-versions/index';

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    "@storybook/addon-mdx-gfm",
    '@chromatic-com/storybook',
    { name: "@storybook/addon-designs", options: { renderTarget: "tab" }, },
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: true,
  },
  env: StorybookEnvPackageVersions({
    packagePaths: ['../components', '../assets', '../styles', '../tokens'],
  }),
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  staticDirs: ['../public', {
    from: '../../assets/src',
    to: '/assets'
  }],
  stories: [
    "../stories/Welcome.mdx",
    "../stories/Prerequisites.mdx",
    "../stories/ComponentOverview.mdx",
    "../stories/IconSearch.mdx",
    "../stories/GoalsAndGuidelines.mdx",
    "../stories/Presentation.mdx",
    "../stories/Accessibility.mdx",
    "../stories/Contributing.mdx",
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

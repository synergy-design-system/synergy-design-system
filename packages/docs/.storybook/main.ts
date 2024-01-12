import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    '@geometricpanda/storybook-addon-badges',
    "@storybook/addon-mdx-gfm"
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: true,
  },
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  staticDirs: [
    '../public',
    {
      from: '../../assets/src',
      to: '/assets'
    }
  ],
  stories: [
    "../stories/Index.mdx",
    "../stories/Introduction.mdx",
    "../stories/Contributing.mdx",
    "../stories/packages/**/*.mdx",
    "../stories/tokens/**/*.stories.*",
    "../stories/components/**/*.stories.*",
    "../stories/templates/**/*.stories.*",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
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

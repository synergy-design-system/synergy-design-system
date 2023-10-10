import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    '@geometricpanda/storybook-addon-badges',
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
  ],
  stories: [
    "../stories/index.mdx",
    "../stories/components/**/*.stories.*",
    // "../stories/**/*.mdx",
    // "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
};

export default config;

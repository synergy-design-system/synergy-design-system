export type AvailableFrameworks = 'angular' | 'react' | 'vanilla' | 'vue';

export type Framework = {
  customCommand?: string;
  distDir: string;
  name: AvailableFrameworks;
  port: number,
};

export const frameworks: Framework[] = [
  {
    distDir: '../angular-demo/dist/angular-demo/browser',
    name: 'angular',
    port: 5176,
  },
  {
    // Uncomment the custom command if the react demo crashes in the tests again.
    // This seemed to be an issue with vite bundling and pnpm as the exact same config runs fine with npm.
    // customCommand: 'pnpm run -C ../react-demo start',
    distDir: '../react-demo/dist',
    name: 'react',
    port: 5175,
  },
  {
    distDir: '../vanilla-demo/dist',
    name: 'vanilla',
    port: 5173
  },
  {
    name: 'vue',
    distDir: '../vue-demo/dist',
    port: 5174,
  },
];

/**
 * Get the enabled frameworks based on the TEST_FRAMEWORK env variable.
 * @returns List of enabled frameworks
 */
export const getEnabledFrameworks = () => {
  const framework = process.env.TEST_FRAMEWORK;

  if (!framework) {
    return frameworks;
  }

  const foundFramework = frameworks.find(f => f.name === framework);

  if (!foundFramework) {
    throw new Error(`Unknown framework: ${framework}. Available frameworks: ${frameworks.map(f => f.name).join(', ')}`);
  }

  return [foundFramework];
};

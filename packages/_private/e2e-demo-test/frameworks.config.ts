export type Framework = {
  customCommand?: string;
  distDir: string;
  name: string;
  port: number,
};

export const frameworks: Framework[] = [
  {
    distDir: '../angular-demo/dist/angular-demo/browser',
    name: 'angular',
    port: 5176,
  },
  {
    // @todo: React does not run in production mode.
    // Seems to be an issue with vite bundling and pnpm as the exact same config runs fine with npm.
    customCommand: 'pnpm run -C ../react-demo start',
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

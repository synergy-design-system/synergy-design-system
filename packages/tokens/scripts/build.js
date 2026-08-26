import { styleText } from 'node:util';
import * as builders from './builders/index.js';

/** @param {() => Promise<void>} builder */
const build = async (builder) => {
  try {
    await builder();
  } catch (error) {
    console.error(styleText('red', `Error running builder ${builder.name}: ${error}`));
    process.exit(1);
  }
};

await build(builders.buildComponents);
// Wait for components to finish building before building charts, as charts depend on components being built first (for the resolved.js file)
await build(builders.buildCharts);

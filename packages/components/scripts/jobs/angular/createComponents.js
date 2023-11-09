import { job } from '../shared.js';

export const runCreateComponents = job('Angular: Creating components', async (metadata, outDir) => {
  console.log(outDir, metadata);
});

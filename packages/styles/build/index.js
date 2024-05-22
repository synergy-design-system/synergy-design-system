import * as jobs from './jobs/index.js';

await jobs.runCleanup();
await jobs.createComments();
await jobs.runPostCSS();

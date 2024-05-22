import { runCleanup } from './shared.js';
import { runPostCSS } from './postcss.js';

await runCleanup();
await runPostCSS();

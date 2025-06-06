import { rimrafSync } from 'rimraf';
import { DYNAMIC_OUTPUT_PATHS } from './config.js';

rimrafSync(DYNAMIC_OUTPUT_PATHS);

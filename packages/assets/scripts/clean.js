import { rmSync } from 'node:fs';
import { DYNAMIC_OUTPUT_PATHS } from './config.js';

DYNAMIC_OUTPUT_PATHS.forEach((path) => rmSync(path, { force: true, recursive: true }));

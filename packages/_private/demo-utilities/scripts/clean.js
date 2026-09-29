import { rmSync } from 'node:fs';

rmSync('dist', { force: true, recursive: true });

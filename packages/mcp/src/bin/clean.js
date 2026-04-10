#!/usr/bin/env node
import { rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);
const distPath = join(currentDirname, '../../dist');

rmSync(distPath, { force: true, recursive: true });
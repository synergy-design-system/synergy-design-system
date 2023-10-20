import fs from 'fs';
import path from 'path';
import * as jobs from './jobs/index.js';

const outDir = path.join('./src');
const distDir = path.join('./dist');
const manifest = path.join('../components/dist/custom-elements.json');
const metadata = JSON.parse(fs.readFileSync(manifest, 'utf8'));

// await jobs.runAdjustPackageVersion();
await jobs.runPrepare(outDir, distDir);
await jobs.createWrappers(metadata, outDir);
await jobs.runFormat(outDir);
await jobs.runEsBuild(distDir);
await jobs.runTypeScript(distDir);

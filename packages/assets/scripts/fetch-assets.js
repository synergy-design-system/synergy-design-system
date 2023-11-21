import fs from 'fs';
import { config as dotenvConfig } from 'dotenv';
import {
  intro,
  outro,
  spinner,
} from '@clack/prompts';
import { rimraf } from 'rimraf';
import { FigmaExporter } from 'figma-export-assets';
import { optimizeSVGs } from './optimize-svg.js';
import { bundleIcons } from './bundle-icons.js';
import { updateSystemIcons } from './update-system-icons.js';

intro('Fetch Assets');

const s = spinner();

function loadEnvironmentVariables() {
  // Load environment variables from .env file
  if (fs.existsSync('.env')) {
    dotenvConfig();
  } else {
    throw new Error('Missing .env file.');
  }

  if (!process.env.FIGMA_PERSONAL_ACCESS_TOKEN) {
    throw new Error('Missing FIGMA_PERSONAL_ACCESS_TOKEN in .env file.');
  }
}

async function fetchAssets() {
  loadEnvironmentVariables();

  const config = {
    assetsPath: './src',
    axiosConfig: {
      proxy: false,
    },
    figmaPersonalToken: process.env.FIGMA_PERSONAL_ACCESS_TOKEN,
    fileId: 'bZFqk9urD3NlghGUKrkKCR',
    page: 'Assets',
  };

  // if folder in assetsPath does not exist, create it
  if (!fs.existsSync(config.assetsPath)) {
    fs.mkdirSync(config.assetsPath, { recursive: true });
  }

  const figma = new FigmaExporter(config);

  const optimizePath = (path) => path.replace('assets/', '').replace('name=', '').replace('.png', '');

  // Step 1: Get Assets
  s.start('⏳ Find assets');
  let assets = await figma.getAssets();
  s.stop(`${assets.length} assets found`);

  assets = assets.filter(asset => !asset.name.startsWith('_'));

  // Step 2: Create PNGs
  let pngs = assets.filter(asset => asset.name.includes('.png'));
  if (pngs.length !== 0) {
    s.start('⏳ Prepare & download PNG assets');
    pngs = await figma.exportAssets(pngs, 'png', 4);

    const pngDownloads = pngs.map(async asset => {
      await figma.saveAsset(asset, {
        name: optimizePath(asset.name),
      });
    });

    await Promise.all(pngDownloads);
    s.stop(`${pngs.length} PNGs downloaded`);
  }

  // Step 3: Create SVGs
  let svgs = assets.filter(asset => !asset.name.includes('.png'));

  if (svgs.length !== 0) {
    s.start('⏳ Prepare & download SVG assets');
    svgs = await figma.exportAssets(svgs, 'svg');
    const svgDownloads = svgs.map(async asset => {
      await figma.saveAsset(asset, {
        name: optimizePath(asset.name),
      });
    });
    await Promise.all(svgDownloads);
    s.stop(`${svgs.length} SVGs downloaded`);
  }
}

await rimraf('./src');
await fetchAssets();
if (fs.existsSync('./src/icons')) {
  await optimizeSVGs('./src/icons');
  await bundleIcons('./src/icons', './src/default-icons.js');
}

if (fs.existsSync('./src/system-icons')) {
  await optimizeSVGs('./src/system-icons');
  await updateSystemIcons('./src/system-icons', '../components/src/components/icon/library.system.ts');
}
outro('Assets fetched!');

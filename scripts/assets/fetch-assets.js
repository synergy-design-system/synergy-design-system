import 'dotenv/config';
import {
  spinner
} from '@clack/prompts';
import fs from 'fs';


const s = spinner();

import { FigmaExporter } from 'figma-export-assets';
import { optimizeSVGs } from './optimize-svg.js';

export async function fetchAssets(customConfig) {
  const config = {
    figmaPersonalToken: process.env.FIGMA_PERSONAL_ACCESS_TOKEN,
    fileId: process.env.FIGMA_FILE_ID,
    "page": "Assets",
    "assetsPath": "./packages/assets/src",
    ...customConfig
  }

  // if folder in assetsPath does not exist, create it
  if (!fs.existsSync(config.assetsPath)) {
    fs.mkdirSync(config.assetsPath, { recursive: true });
  }

  const figma = new FigmaExporter(config);

  const optimizePath = (path) => path.replace('assets/', '').replace('name=', '').replace('.png', '')

  // Step 1: Get Assets
  s.start('⏳ Find assets');
  let assets = await figma.getAssets();
  s.stop(`${assets.length} assets found`);

  // Step 2: Create PNGs

  let pngs = assets.filter(asset => asset.name.includes('.png'));
  if (pngs.length !== 0) {

    s.start('⏳ Prepare & download PNG assets');
    pngs = await figma.exportAssets(pngs, 'png', 4);

    const pngDownloads = pngs.map(async asset => {
      await figma.saveAsset(asset, {
        name: optimizePath(asset.name)
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
        name: optimizePath(asset.name)
      });
    });
    await Promise.all(svgDownloads);
    s.stop(`${svgs.length} SVGs downloaded`);
  }

  if (fs.existsSync('./packages/assets/src/icons')) {
    await optimizeSVGs();
  }
}

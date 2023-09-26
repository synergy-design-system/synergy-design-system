import { spinner } from '@clack/prompts';
import fs from 'fs';
const s = spinner();
import path from 'path';
import download from 'download-git-repo';
import { changeShoelaceBranding } from './change-shoelace-branding.js';
import { generateStorybookFiles } from '../basics/create-storybook-files.js';


function deleteFolderRecursive(directory) {
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach(file => {
      const curPath = path.join(directory, file);
      fs.lstatSync(curPath).isDirectory() ? deleteFolderRecursive(curPath) : fs.unlinkSync(curPath);
    });
    fs.rmdirSync(directory);
  }
}

export const downloadShoelace = async (config) => {
  s.start(`⏳ Downloading Shoelace ${config.shoelaceVersion}`);
  await deleteFolderRecursive(config.vendorPath);
  await fs.mkdirSync(config.vendorPath, { recursive: true });
  await new Promise((resolve, reject) => {
    download(`shoelace-style/shoelace#${config.shoelaceVersion}`, config.vendorPath, err => {
      if (err) reject(`Error downloading repo: ${err}`);
      else resolve();
    });
  });
  s.stop(`✅ Download completed`);

  s.start(`⏳ Optimize library + create Storybook docs`);
  await changeShoelaceBranding(config.vendorPath, config.libraryName, config.libraryPrefix);
  await generateStorybookFiles(config);
  s.stop(`✅ Optimize library + Storybook docs created`);
}

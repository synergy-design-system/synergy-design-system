import { copyFile, readdir } from 'fs/promises';
import { job } from '../shared.js';

export const runCopyToDist = job('Styles: Copying styles to dist directory', async (stylesDir, componentDistDir) => {
  const allCustomFiles = await readdir(stylesDir);
  const availableStyles = allCustomFiles
    .filter(file => file.endsWith('.css'))
    .map(file => [`${stylesDir}/${file}`, `${componentDistDir}/styles/${file}`]);

  await Promise.all(
    availableStyles.map(([src, dest]) => copyFile(src, dest)),
  );
});

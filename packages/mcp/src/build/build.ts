import ora from 'ora';
import { buildAssets } from './assets.js';
import { buildComponents } from './components.js';
import { buildFonts } from './fonts.js';
import { buildFrameworkFiles } from './frameworks.js';
import { buildStaticFiles } from './static.js';
import { buildTokens } from './tokens.js';
import { buildStyles } from './styles.js';

const spinner = ora({
  prefixText: 'MCP:',
  text: 'Generating static metadata...',
});

const build = async () => {
  spinner.start();
  await buildAssets();
  await buildComponents();
  await buildFrameworkFiles();
  await buildFonts();
  await buildTokens();
  await buildStyles();

  // Should be run last as we will copy files where we see fit and paths must exist
  await buildStaticFiles();
};

build()
  .then(() => {
    spinner.succeed('Static metadata generated successfully.');
    process.exit(0);
  })
  .catch((error) => {
    spinner.fail(`Failed to generate static metadata. Error: ${error}`);
    process.exit(1);
  })
  .finally(() => {
    spinner.stop();
  });

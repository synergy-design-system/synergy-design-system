import ora from 'ora';
import { buildAssets } from './assets.js';
import { buildTokens } from './tokens.js';

const spinner = ora({
  prefixText: 'MCP:',
  text: 'Generating static metadata...',
});

const build = async () => {
  spinner.start();
  await buildAssets();
  await buildTokens();
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

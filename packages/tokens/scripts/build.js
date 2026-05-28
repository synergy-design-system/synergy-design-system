import { styleText } from 'node:util';
import * as builders from './builders/index.js';

const build = async () => {
  const calls = Object.values(builders).map(b => b().catch(error => {
    console.error(styleText('red', `Error running builder ${b.name}: ${error}`));
    process.exit(1);
  }));
  await Promise.all(calls);
};

build();

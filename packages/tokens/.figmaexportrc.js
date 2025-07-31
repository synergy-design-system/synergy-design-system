
import { FIGMA_STYLES_PATH } from './scripts/config.js';
import { styleDictionaryOutputter } from './scripts/figma/style-dict-outputter.js';

/** @type { import('@figma-export/types').StylesCommandOptions } */
const styleOptions = {
  // Use FIGMA_FILE_ID from environment variables or default from main branch
  fileId: process.env.FIGMA_FILE_ID || 'bZFqk9urD3NlghGUKrkKCR',
  // Filter the styles by ID of the Tokens page, as otherwise the fetching errors out because of too large size
  ids: ['104-235'],
  outputters: [
    // The style fetching should be done after the variables are fetched, so the variable_alias can be used
    styleDictionaryOutputter({ output: FIGMA_STYLES_PATH }),
  ],
}

export default {
  commands: [
    ['styles', styleOptions],
  ]
}

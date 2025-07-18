
import { styleDictionaryOutputter } from './scripts/figma/style-dict-outputter.js';

/** @type { import('@figma-export/types').StylesCommandOptions } */
const styleOptions = {
  fileId: 'nWOB1s3ilW7ZA7scXQCWqa',
  // Limit the api calls to the tokens page and its node id, to speed up the fetching and not run into limit errors
  ids: ['104-235'],
  outputters: [
    // The style fetching should be done after the variables are fetched, so the variable_alias can be used
    styleDictionaryOutputter({output: './src/figma-variables/output/styles.json'}),
  ],
}

export default {
  commands: [
    ['styles', styleOptions],
  ]
}

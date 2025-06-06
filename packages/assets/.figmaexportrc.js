import {
  DEFAULT_CONFIG,
} from './scripts/figma-config.js';

const commands = DEFAULT_CONFIG.map(config => [
  'components',
  config,
]);

export default {
  commands,
};

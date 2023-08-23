const defaultCfg = require('./js');

module.exports = {
  ...defaultCfg,
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended-type-checked',
  ],
};

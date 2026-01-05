import jsConfig from './js.js';

export default [
  ...jsConfig,
  // Override for config files in this package only
  {
    files: ['*.js', 'js.js', 'ts.js'],
    rules: {
      // Config files may have unresolved imports during development
      'import/no-unresolved': 'off',
    },
  },
];

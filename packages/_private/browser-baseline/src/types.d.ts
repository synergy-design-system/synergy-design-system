/**
 * Options for creating a new baseline.
 */
export type CreateBaselineOptions = {
  /**
   * The name of the baseline to use as the basis for the new baseline.
   * Defaults to the usedBaseline settings from config.js
   */
  baseline?: string;
  /**
   * The synergy version number for the new baseline.
   */
  version?: string;

  /**
   * The path to save the new baseline to. Defaults to the baselines path from config.js
   */
  path?: string;
};

/**
 * Command line arguments for the syn-create-baseline utility.
 */
export type CommandLineArgs = CreateBaselineOptions & {
  /**
   * Whether to allow replacing an existing baseline with the same name and version.
   */
  allowReplace?: boolean;
  /**
   * Whether to show help information.
   */
  help?: boolean;
};

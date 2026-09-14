/**
 * A list of changes to be applied to output variables
 */
export type OutputVariableChangeList = Record<string, string>;

/**
 * Shared types for output creator functions.
 */
export type CreateFileOutputFn = (
  header: string[],
  themesDir: string,
  buildPath: string,
) => void;

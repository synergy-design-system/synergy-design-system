/**
 * Plugin configuration options
 */
export type Config = {
  /**
   * The endpoint to use for the middleware
   */
  endPoint: string;

  /**
   * The filename used when building storybook
   */
  outputFileName: string;

  /**
   * The source directory to obtain data from
   */
  srcDir: string;
};

/**
 * The given tag in the structure
 */
export type Tag = {
  description: string;
  fileName: string;
  name: string;
  tag: string;
  type: string;
};

/**
 * A structure as parsed with the getStructure function
 */
export type Structure = {
  comments: {
    description: string;
    tags: Tag[];
  }[];
  module: string;
};

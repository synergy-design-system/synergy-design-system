/**
 * List of supported frameworks.
 */
export type Framework = 'react' | 'vue' | 'angular' | 'vanilla';

/**
 * List of projects and their configurations.
 * Used to define the structure of the resources available in the MCP server.
 */
export const Projects = {
  components: {
    enabled: true,
    path: '../../data/components',
  },
};

/**
 * Path where metadata is stored, relative to the project root.
 */
export const metaDataPath = '../../metadata';

/**
 * Path to the components directory, relative to the metadata path.
 */
export const componentPath = `${metaDataPath}/components`;

/**
 * Path to the davinci migration directory, relative to the metadata path.
 */
export const davinciMigrationPath = `${metaDataPath}/davinci-migration`;

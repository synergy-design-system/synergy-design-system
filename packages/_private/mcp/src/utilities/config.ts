/**
 * List of supported frameworks.
 */
export type Framework = 'react' | 'vue' | 'angular' | 'vanilla';

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

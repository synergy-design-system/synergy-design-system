/**
 * @typedef {import('../types.js').OutputVariableChangeList} OutputVariableChangeList
 */
import chalk from 'chalk';

/**
 * Get the changed value for a specific variable token.
 * Returns null if no change is defined.
 * @param {string} tokenName The name of the token
 * @param {OutputVariableChangeList} changes The list of changes
 * @returns {string|null} The changed value or null if no change is defined
 */
const getChangedVariableValue = (tokenName, changes) => changes?.[tokenName] || null;

/**
 * Changes the output values of specific tokens.
 * Before: --syn-button-outline-color-text: rgba(255, 255, 255, 0);
 * After: --syn-button-outline-color-text: currentColor;
 *
 * You may provide a key value map with token names as keys and desired output values as values.
 * @type import('style-dictionary/types').ValueTransform
 */
export const changeOutputValues = {
  /**
   * Makes sure the transform is only applied to tokens that are in our changes map
   */
  filter: (token, config) => {
    /**
     * @type {OutputVariableChangeList}
     */
    const appliedConfig = config.platforms?.css?.options?.changeOutputValues || {};

    return getChangedVariableValue(token.name, appliedConfig) !== null;
  },
  name: 'syn/change-output-values',
  /**
   * @returns {unknown}
   */
  transform: (token, config) => {
    /**
     * @type {OutputVariableChangeList}
     */
    const changes = config.options?.changeOutputValues;
    const nextValue = getChangedVariableValue(token.name, changes);

    if (nextValue !== null) {
      if (config.log?.verbosity === 'verbose') {
        // eslint-disable-next-line max-len
        const message = `⚠️ Changing value of ${token.name} from ${token.value} to ${nextValue}. Have a look at the OUTPUT_VARIABLE_CHANGES map in config.js for more information.`;
        console.log(chalk.yellow(message));
      }
      return nextValue;
    }

    return token.value;
  },
  type: 'value',
};

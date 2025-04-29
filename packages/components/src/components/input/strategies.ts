/**
 * Defines the strategy that should be used for a numeric input.
 */
export type NumericStrategy = {
  /**
   * Clamp the inputs value to its min and max values when reaching it.
   *
   * When set to false, this will follow the HTML5 spec:
   * - Allows overflow of min and max via user input, but not spinners
   * - Will emit an invalid event
   * - Will emit an input event
   * - Will emit a change event
   *
   * When set to true, this will follow synergy specs:
   * - Do not allow overflow of min and max via user input or spinners
   * - Will not emit an invalid event
   * - Will emit an input event
   * - Will emit a syn-clamp custom event
   * - Will emit a change event
   */
  autoClamp: boolean;

  /**
   * Controls if the stepper should use the **current value** as base.
   * This is useful when the -/+ step buttons are used to change a value.
   * Also includes handling of keyboard interactions.
   *
   * This works in the following way:
   * - **value**: 1.2
   * - **min**: 1
   * - **step**: 0.3
   *
   * 1. noStepAlign = true -> **1.5**
   * 2. noStepAlign = false -> **1.6**
   *
   * Note that this does not alter validation of the input!
   * A native html input will flag all values that are not aligned to the step as invalid!
   * See noStepValidation for more information.
   */
  noStepAlign: boolean;

  /**
   * Determines if an invalid event should be emitted when the stepping is invalid.
   * This is the default behavior of a native input.
   * Set to false to disable this behavior.
   */
  noStepValidation: boolean;
};

/**
 * Defines Synergies Version 2 default settings
 * inherited from Shoelace, which mimics the HTML5 standard
 */
export const nativeNumericStrategy: NumericStrategy = {
  autoClamp: false,
  noStepAlign: false,
  noStepValidation: false,
};

/**
 * Defines Synergies Version 3 default settings,
 * based on the feedback from the community.
 */
export const modernNumericStrategy: NumericStrategy = {
  autoClamp: true,
  noStepAlign: true,
  noStepValidation: true,
};

/**
 * Creates a new strategy object that can be used to override the default.
 * Will merge the default strategy with the provided settings.
 */
export const createNumericStrategy = (
  settings: Partial<NumericStrategy> = {},
): NumericStrategy => ({
  ...nativeNumericStrategy,
  ...settings,
});

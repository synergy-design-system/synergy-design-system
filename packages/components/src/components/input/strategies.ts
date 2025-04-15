/**
 * Internal type of all strategies.
 */
export type NumericStrategy = {
  /**
   * Clamp the inputs value to its min and max values when reaching it.
   *
   * When set to false, this will follow the HTML5 spec:
   * - Allows overflow of min and max via user input or spinners
   * - Will emit an invalid event
   * - Will emit an input event
   * - Will emit a change event
   *
   * When set to true, this will follow synergy specs:
   * - Do not allow overflow of min and max via user input or spinners
   * - Will not emit an invalid event
   * - Will not emit an input event
   * - Will not emit a change event
   * - Will emit a syn-clamped custom event
   */
  autoClamp: boolean;

  /**
   * Handles stepper so it uses current value as base always
   * (e.g. min = 1, 1.2 + step 0.3 = 1.5 instead of 1.6).
   * @todo #818
   * noStepAlign: boolean;
   */

  /**
   * If stepping is invalid, do not fire invalid event at all
   * @todo #818
   * noStepValidation: boolean;
   */

  /**
   * Minimal amount of digits to show
   * @todo #838
   * minFractionDigits?: number;
   */

  /**
   * Maximal amount of digits to show
   * @todo #838
   * maxFractionDigits?: number;
   */
};

/**
 * Defines Synergies Version 2 default settings
 * inherited from Shoelace, which mimics the HTML5 standard
 */
export const nativeNumericStrategy: NumericStrategy = {
  autoClamp: false,
};

/**
 * Defines Synergies Version 3 default settings,
 * based on the feedback from the community.
 */
export const modernNumericStrategy: NumericStrategy = {
  autoClamp: true,
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

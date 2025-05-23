import { Locator } from '@playwright/test';
import type {
  SynCheckbox,
  SynInput,
  SynSelect,
  SynSwitch,
  SynTextarea,
} from '@synergy-design-system/components';
import { type AvailableFrameworks, frameworks } from '../frameworks.config.js';

type FrameworkCallback = (framework: { name: AvailableFrameworks, port: number }) => void;

export const getInputValue = async (locator: Locator) => locator
  .evaluate((el: SynInput | SynTextarea | SynSelect) => el.value);

export const getCheckedValue = async (locator: Locator) => locator
  .evaluate((el: SynCheckbox | SynSwitch) => el.checked);

/**
 * Set the locators inner field value.
 * If the element is blurred after the value is set, the syn-change event is triggered.
 * If the element is not blurred, only the syn-input event is triggered.
 *
 * @param locator The original form locator
 * @param value The value to set
 * @param selector The selector to use in the shadow root (default is 'input')
 * @param blur Whether to blur the element after setting the value
 */
export const fillField = async (locator: Locator, value: string, selector = 'input', blur = true) => {
  await locator.focus();
  await locator.locator(selector).fill(value);
  if (blur) {
    await locator.blur();
  }
};

/**
 * Set the locators inner value for input elements
 *
 * @param locator The original form locator
 * @param value The value to set
 * @param blur Whether to blur the element after setting the value
 */
export const fillInput = async (locator: Locator, value: string, blur = true) => fillField(locator, value, 'input', blur);

/**
 * Set the locators inner value for textarea elements
 * @param locator The original form locator
 * @param value The value to set
 * @param blur Whether to blur the element after setting the value
 */
export const fillTextArea = async (locator: Locator, value: string, blur = true) => fillField(locator, value, 'textarea', blur);

export const createTestCases = (callback: FrameworkCallback) => {
  frameworks.forEach(framework => {
    const { name, port } = framework;
    callback({
      name,
      port,
    });
  });
};

export const getFrameworkPort = (frameworkName: AvailableFrameworks) => {
  const framework = frameworks.find(fw => fw.name === frameworkName);
  if (!framework) {
    throw new Error(`Framework ${frameworkName} not found`);
  }
  return framework.port;
};

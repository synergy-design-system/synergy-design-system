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
 * Set the locators inner inputs value.
 * The elements is blurred after the value is set, so the syn-change event is triggered.
 *
 * @param locator The original form locator
 * @param value The value to set
 * @param selector The selector to use in the shadow root
 */
export const fillField = async (locator: Locator, value: string, selector = 'input') => {
  await locator.focus();
  await locator.locator(selector).fill(value);
  await locator.blur();
};

export const fillInput = async (locator: Locator, value: string) => fillField(locator, value, 'input');

/**
 * Set the locators inner inputs value.
 * The elements is NOT blurred after the value is set, so only a syn-input is triggered.
 *
 * @param locator The original form locator
 * @param value The value to set
 * @param selector The selector to use in the shadow root
 */
export const fillFieldWithoutBlur = async (locator: Locator, value: string, selector = 'input') => {
  await locator.focus();
  await locator.locator(selector).fill(value);
};

export const fillInputWithoutBlur = async (locator: Locator, value: string) => fillFieldWithoutBlur(locator, value, 'input');

/**
 * Set the locators inner inputs value
 * @param locator The original form locator
 * @param value The value to set
 */
export const fillTextArea = async (locator: Locator, value: string) => fillField(locator, value, 'textarea');

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

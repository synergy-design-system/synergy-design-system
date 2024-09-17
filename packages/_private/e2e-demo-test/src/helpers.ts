import { Locator } from '@playwright/test';
import type {
  SynCheckbox,
  SynInput,
  SynSelect,
  SynSwitch,
  SynTextarea,
} from '@synergy-design-system/components';

export const getInputValue = async (locator: Locator) => locator
  .evaluate((el: SynInput | SynTextarea | SynSelect) => el.value);

export const getCheckedValue = async (locator: Locator) => locator
  .evaluate((el: SynCheckbox | SynSwitch) => el.checked);

/**
 * Set the locators inner inputs value
 * @param locator The original form locator
 * @param value The value to set
 */
export const fillField = async (locator: Locator, value: string) => {
  await locator.focus();
  await locator.locator('input').fill(value);
  await locator.blur();
};

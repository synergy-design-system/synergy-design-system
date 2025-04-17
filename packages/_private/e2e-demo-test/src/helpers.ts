import { Locator, Page } from '@playwright/test';
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
 * Set the locators inner inputs value
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

/**
 * Wait for an event to be fired on the page
 * @param page The page the event should be bound to
 * @param event The event to use
 * @returns The page evaluation object for playwright
 */
export const waitForEvent = (
  page: Page,
  event: string,
) => page.evaluate((playwrightEvent) => new Promise<Event>((resolve) => {
  document.addEventListener(playwrightEvent, e => resolve(e));
}), event);

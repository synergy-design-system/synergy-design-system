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
    // This is needed for firefox to recognize that the shadow root input has been left
    // Otherwise, it will not trigger the syn-change event
    await locator.locator(selector).blur();
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

/**
 * Wait for an event to be fired on the page
 * @param page The page the event should be bound to
 * @param event The event to use
 * @param timeout The timeout to use
 * @param eventOptions The event options to use
 * @returns The page evaluation object for playwright
 */
export const waitForEvent = <T extends Event>(
  page: Page,
  event: keyof DocumentEventMap,
  timeout = 500,
  eventOptions: AddEventListenerOptions = { once: true },
) => page.evaluate(({
  event: playwrightEvent,
  eventOptions: playwrightEventOptions,
  timeout: playwrightTimeout,
}) => new Promise<T>((resolve, reject) => {
  const listener = ((e: T) => resolve(e)) as EventListener;
  document.addEventListener(playwrightEvent, listener, playwrightEventOptions);

  setTimeout(() => {
    document.removeEventListener(playwrightEvent, listener, playwrightEventOptions);
    reject(new Error(`Timeout waiting for event: ${playwrightEvent}`));
  }, playwrightTimeout);
}), {
  event,
  eventOptions,
  timeout,
});

/**
 * Do wait for an event to be fired on the page
 * @param page The page the event should be bound to
 * @param event The event to use
 * @param timeout The timeout to use
 * @param eventOptions The event options to use
 * @returns The page evaluation object for playwright
 */
export const hasEvent = <T extends Event>(
  page: Page,
  event: keyof DocumentEventMap,
  timeout = 500,
  eventOptions: AddEventListenerOptions = { once: true },
) => waitForEvent<T>(page, event, timeout, eventOptions)
  .then(() => true)
  .catch(() => false);

/**
 * Do NOT wait for an event to be fired on the page
 * @param page The page the event should be bound to
 * @param event The event to use
 * @param timeout The timeout to use
 * @param eventOptions The event options to use
 * @returns The page evaluation object for playwright
 */
export const hasNoEvent = <T extends Event>(
  page: Page,
  event: keyof DocumentEventMap,
  timeout = 500,
  eventOptions: AddEventListenerOptions = { once: true },
) => waitForEvent<T>(page, event, timeout, eventOptions)
  .then(() => false)
  .catch(() => true);

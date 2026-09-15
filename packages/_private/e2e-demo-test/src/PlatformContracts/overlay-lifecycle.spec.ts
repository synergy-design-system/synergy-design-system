import {
  expect,
  test,
} from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { getFrameworkPort } from '../helpers.js';
import { PlatformContractsPage } from '../PageObjects/PlatformContracts.js';

const openOverlayContractsFixture = async (page: Page) => {
  const port = getFrameworkPort('platform');
  const platformContracts = new PlatformContractsPage(page, port);
  await platformContracts.loadInitialPage();

  return platformContracts.openOverlayContracts();
};

const loadPlatformContractsFixture = async (page: Page) => {
  const port = getFrameworkPort('platform');
  const platformContracts = new PlatformContractsPage(page, port);
  await platformContracts.loadInitialPage();
  return platformContracts;
};

const expectFocusWithin = async (locator: Locator) => {
  await expect.poll(() => locator.evaluate(element => element.matches(':focus-within'))).toBe(true);
};

test.describe('Platform contracts: overlay lifecycle', () => {
  /**
   * What: Focus moves into an option of a select nested inside an open drawer.
   * Why: Browser changes around focus, shadow DOM, and positioned overlays must not immediately close nested overlays.
   */
  test('should keep a select inside a positioned drawer open after focus moves into the overlay', async ({ page }) => {
    const { select } = await openOverlayContractsFixture(page);

    await select.click();
    const firstOption = select.locator('syn-option').first();
    await expect(firstOption).toBeVisible();

    await firstOption.focus();
    await expect(firstOption).toBeFocused();
    await expect(select).toHaveAttribute('open');
    await expect(firstOption).toBeVisible();

    const snapshot = await page.evaluate(() => {
      const drawerElement = document.querySelector('[data-testid="overlay-contract-drawer"]');
      const selectElement = document.querySelector('[data-testid="overlay-contract-select"]');

      return {
        drawerOpen: drawerElement?.hasAttribute('open') ?? false,
        selectOpen: selectElement?.hasAttribute('open') ?? false,
      };
    });

    expect(snapshot).toMatchObject({
      drawerOpen: true,
      selectOpen: true,
    });
    await expect(firstOption).toBeVisible();
  });

  /**
   * What: Selecting an item inside a nested select closes that select but keeps the parent drawer open.
   * Why: Overlay stack coordination must distinguish interaction inside a child overlay from dismissal of its parent.
   */
  test('should keep the parent overlay open when clicking inside a nested overlay', async ({ page }) => {
    const { drawer, select } = await openOverlayContractsFixture(page);

    await select.click();
    await expect(select).toHaveAttribute('open');

    await select.locator('syn-option').first().click();

    await expect(drawer).toHaveAttribute('open');
    await expect(select).not.toHaveAttribute('open');
  });

  /**
   * What: Clicking blank content inside the drawer closes only the nested select.
   * Why: Inside/outside detection must preserve the host overlay while dismissing the currently open nested overlay.
   */
  test('should close only the nested overlay when clicking inside its parent overlay', async ({ page }) => {
    const { drawer, drawerInsideTarget, select } = await openOverlayContractsFixture(page);

    await select.click();
    await expect(select).toHaveAttribute('open');

    await drawerInsideTarget.click();

    await expect(select).not.toHaveAttribute('open');
    await expect(drawer).toHaveAttribute('open');
  });

  /**
   * What: Clicking the drawer overlay closes both the nested select and the drawer.
   * Why: Browser pointer targeting and overlay retargeting must still dismiss the whole modal stack from the outside surface.
   */
  test('should close all overlays when clicking outside their host overlay', async ({ page }) => {
    const { drawer, select } = await openOverlayContractsFixture(page);

    await select.click();
    await expect(select).toHaveAttribute('open');

    await drawer.locator('[part~="overlay"]').click();

    await expect(select).not.toHaveAttribute('open');
    await expect(drawer).not.toHaveAttribute('open');
  });

  /**
   * What: Escape closes the nested select first and the parent drawer second.
   * Why: Keyboard events must be routed to the topmost overlay without collapsing the full stack at once.
   */
  test('should close nested overlays in order when pressing Escape', async ({ page }) => {
    const { drawer, select } = await openOverlayContractsFixture(page);

    await select.click();
    await expect(select).toHaveAttribute('open');

    await page.keyboard.press('Escape');

    await expect(select).not.toHaveAttribute('open');
    await expect(drawer).toHaveAttribute('open');

    await page.keyboard.press('Escape');

    await expect(drawer).not.toHaveAttribute('open');
  });

  /**
   * What: Tab navigation reaches custom button, input, and select controls in document order.
   * Why: Browser focus traversal through custom elements and their shadow roots is a baseline keyboard accessibility contract.
   */
  test('should move keyboard focus through custom controls in document order', async ({ page }) => {
    const platformContracts = await loadPlatformContractsFixture(page);

    await platformContracts.focusStart.focus();
    await expect(platformContracts.focusStart).toBeFocused();

    await page.keyboard.press('Tab');
    await expectFocusWithin(platformContracts.focusButton);

    await page.keyboard.press('Tab');
    await expectFocusWithin(platformContracts.focusInput);

    await page.keyboard.press('Tab');
    await expectFocusWithin(platformContracts.focusSelect);
  });

  /**
   * What: A button reports active and hover state while pointer input is applied and releases active state on mouseup.
   * Why: Synergy relies on browser pointer state propagation for interactive styling without forcing exact visual snapshots.
   */
  test('should expose pointer hover and active states on interactive controls', async ({ page }) => {
    const platformContracts = await loadPlatformContractsFixture(page);

    await platformContracts.pointerButton.hover();
    await expect(platformContracts.pointerButton).toHaveJSProperty('disabled', false);

    const hoverSnapshot = await platformContracts.pointerButton.evaluate(element => ({
      active: element.matches(':active'),
      hover: element.matches(':hover'),
    }));
    expect(hoverSnapshot).toMatchObject({
      active: false,
      hover: true,
    });

    await page.mouse.down();
    const activeSnapshot = await platformContracts.pointerButton.evaluate(element => ({
      active: element.matches(':active'),
      hover: element.matches(':hover'),
    }));
    expect(activeSnapshot).toMatchObject({
      active: true,
      hover: true,
    });

    await page.mouse.up();
    const releasedSnapshot = await platformContracts.pointerButton.evaluate(element => ({
      active: element.matches(':active'),
      hover: element.matches(':hover'),
    }));
    expect(releasedSnapshot).toMatchObject({
      active: false,
      hover: true,
    });
  });

  /**
   * What: Disabled controls are skipped during keyboard focus traversal and cannot open overlays.
   * Why: Browser disabled semantics must remain stable for custom controls that wrap native interactive behavior.
   */
  test('should prevent disabled controls from focusing, clicking, or opening overlays', async ({ page }) => {
    const platformContracts = await loadPlatformContractsFixture(page);

    await platformContracts.disabledButton.focus();
    await platformContracts.disabledSelect.focus();
    await platformContracts.disabledSelect.evaluate(element => {
      (element as HTMLElement).click();
    });

    await expect(platformContracts.disabledButton).not.toBeFocused();
    await expect(platformContracts.disabledSelect).not.toBeFocused();
    await expect(platformContracts.disabledSelect).not.toHaveAttribute('open');
  });

  /**
   * What: A select inside a scrollable overflow container remains visible and usable after the container scrolls.
   * Why: Browser layout, overflow, and positioning changes commonly affect popup placement and interaction surfaces.
   */
  test('should keep overlays usable inside scroll containers', async ({ page }) => {
    const platformContracts = await loadPlatformContractsFixture(page);

    await platformContracts.scrollSelect.scrollIntoViewIfNeeded();
    await platformContracts.scrollSelect.click();
    const firstOption = platformContracts.scrollSelect.locator('syn-option').first();
    await expect(firstOption).toBeVisible();

    await platformContracts.scrollContainer.evaluate(element => {
      element.scrollTop += 40;
    });

    const geometry = await platformContracts.scrollSelect.evaluate(element => {
      const trigger = element.getBoundingClientRect();
      const option = element.querySelector('syn-option')?.getBoundingClientRect();

      return {
        optionHeight: option?.height ?? 0,
        optionWidth: option?.width ?? 0,
        triggerHeight: trigger.height,
        triggerWidth: trigger.width,
      };
    });

    expect(geometry.triggerHeight).toBeGreaterThan(0);
    expect(geometry.triggerWidth).toBeGreaterThan(0);
    expect(geometry.optionHeight).toBeGreaterThan(0);
    expect(geometry.optionWidth).toBeGreaterThan(0);
    await expect(firstOption).toBeVisible();
  });

  /**
   * What: An open select remains visible and usable after the viewport size changes.
   * Why: Browser resize and layout invalidation must not leave overlay positioning stale or non-interactive.
   */
  test('should keep overlays usable after viewport resize', async ({ page }) => {
    const platformContracts = await loadPlatformContractsFixture(page);

    await platformContracts.focusSelect.click();
    const firstOption = platformContracts.focusSelect.locator('syn-option').first();
    await expect(firstOption).toBeVisible();

    await page.setViewportSize({ height: 720, width: 900 });

    await expect(platformContracts.focusSelect).toHaveAttribute('open');
    await expect(firstOption).toBeVisible();
  });

  /**
   * What: Basic text editing can select and replace text inside a custom input.
   * Why: Browser editing primitives must continue to work through custom element focus delegation and shadow DOM input controls.
   */
  test('should support native text editing behavior in custom inputs', async ({ page }) => {
    const platformContracts = await loadPlatformContractsFixture(page);

    const input = platformContracts.textEditInput.locator('input');

    await input.fill('first value');
    await expect(platformContracts.textEditInput).toHaveJSProperty('value', 'first value');

    await input.evaluate(element => {
      (element as HTMLInputElement).select();
    });
    await input.pressSequentially('second value');

    await expect(platformContracts.textEditInput).toHaveJSProperty('value', 'second value');
  });
});

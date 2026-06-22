/* eslint-disable no-underscore-dangle */
import {
  type Locator,
  expect,
  test,
} from '@playwright/test';
import {
  type SynRange,
} from '@synergy-design-system/components';
import { AllComponentsPage } from '../PageObjects/index.js';
import { createTestCases } from '../helpers.js';

type SynRangeWithCounter = SynRange & { __synChangeCount?: number };

const getSynChangeCount = async (range: Locator) => range.evaluate((el) => {
  const elementWithCounter = el as SynRangeWithCounter;
  return elementWithCounter.__synChangeCount ?? 0;
});

const dragRangeToRatio = async (range: Locator, ratio: number) => {
  const box = await range.boundingBox();
  if (!box) {
    throw new Error('Could not determine range dimensions for drag action.');
  }
  const thumb = range.locator('.thumb');

  const clampedRatio = Math.max(0, Math.min(1, ratio));
  const targetX = Math.max(1, Math.min(box.width - 1, box.width * clampedRatio));
  const targetY = box.height / 2;

  await thumb.dragTo(range, {
    targetPosition: {
      x: targetX,
      y: targetY,
    },
  });
};

test.describe('<SynRange />', () => {
  createTestCases(({ name, port }) => {
    test.describe(`Regression#1272: ${name}`, () => {
      test('should emit syn-change for programmatic updates and when dragging back to the baseline value', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);

        // 1. Load and fully open the range section in All Components.
        await AllComponents.loadInitialPage();
        await page.locator('#tab-Range').click();
        await expect(page.locator('#tab-content-Range')).toBeVisible();

        const range = AllComponents.getLocator('range1272ProgramaticValueChange');
        const button = AllComponents.getLocator('range1272ChangeValueButton');

        // 2. Create a listener that counts syn-change emissions.
        await range.evaluate((el) => {
          const elementWithCounter = el as SynRangeWithCounter;
          elementWithCounter.__synChangeCount = 0;
          elementWithCounter.addEventListener('syn-change', () => {
            elementWithCounter.__synChangeCount = (elementWithCounter.__synChangeCount ?? 0) + 1;
          });
        });

        // 3. Drag thumb to a new value.
        await dragRangeToRatio(range, 0.15);
        await expect(range).toHaveJSProperty('value', '14');
        const synChangeCountAfterFirstDrag = await getSynChangeCount(range);
        expect(synChangeCountAfterFirstDrag, 'Drag should fire syn-change').toBe(1);

        // 4. Click the button to programmatically change the value.
        await button.click();
        const synChangeCountAfterProgrammatic = await getSynChangeCount(range);

        // 5. Ensure syn-change does not fire for programmatic value changes.
        expect(synChangeCountAfterProgrammatic, 'Programmatic value change should not fire syn-change').toBe(synChangeCountAfterFirstDrag);

        // 6. Drag back to the first dragged value and ensure syn-change fires again.
        await dragRangeToRatio(range, 0.15);
        const valueAfterSecondDrag = await range.evaluate((el: SynRange) => Number(el.value));
        const synChangeCountAfterSecondDrag = await getSynChangeCount(range);
        expect(valueAfterSecondDrag).toBe(14);
        expect(synChangeCountAfterSecondDrag).toBe(2);
        expect(synChangeCountAfterSecondDrag).toBeGreaterThan(synChangeCountAfterFirstDrag);
      }); // Test syn-change emission
    }); // Regression#1272
  }); // End of test cases
});

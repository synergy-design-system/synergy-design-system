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

  const clampedRatio = Math.max(0, Math.min(1, ratio));
  const targetX = Math.max(1, Math.min(box.width - 1, box.width * clampedRatio));
  const targetY = box.height / 2;

  await range.dragTo(range, {
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

        // 3. Trigger a programmatic value change via the demo button and use it as baseline.
        await button.click();
        await expect(range).toHaveJSProperty('value', '80');

        const baselineValue = await range.evaluate((el: SynRange) => Number(el.value));
        const synChangeCountAfterProgrammaticSet = await getSynChangeCount(range);

        expect(baselineValue, 'Baseline value should be 80').toEqual(80);
        expect(synChangeCountAfterProgrammaticSet, 'Programmatic changes should not fire syn-change').toBe(0);

        // 4. Drag to a different value.
        await dragRangeToRatio(range, 0.15);

        const valueAfterFirstDrag = await range.evaluate((el: SynRange) => Number(el.value));
        const synChangeCountAfterFirstDrag = await getSynChangeCount(range);

        expect(valueAfterFirstDrag).not.toEqual(baselineValue);

        // 5. Ensure syn-change fired for the drag interaction.
        expect(synChangeCountAfterFirstDrag).toBeGreaterThan(synChangeCountAfterProgrammaticSet);

        // 6. Drag back to the original baseline location and ensure syn-change fires again.
        const baselineRatio = await range.evaluate((el: SynRange, baseline: number) => {
          const { max, min } = el;

          if (max <= min) return 0;
          return (baseline - min) / (max - min);
        }, baselineValue);

        await dragRangeToRatio(range, baselineRatio);

        const valueAfterSecondDrag = await range.evaluate((el: SynRange) => Number(el.value));
        const synChangeCountAfterSecondDrag = await getSynChangeCount(range);

        expect(Math.abs(valueAfterSecondDrag - baselineValue)).toBeLessThanOrEqual(1);
        expect(synChangeCountAfterSecondDrag).toBeGreaterThan(synChangeCountAfterFirstDrag);
      }); // Test syn-change emission
    }); // Regression#1272
  }); // End of test cases
});

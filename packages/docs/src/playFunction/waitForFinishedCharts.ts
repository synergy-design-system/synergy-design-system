import isChromatic from 'chromatic';
import { PlayFunction } from 'storybook/internal/csf';

/**
 * A Storybook play function that waits for all `syn-chart` elements within the story's canvas
 * to emit their `finished` event before resolving. This ensures that charts have completed
 * rendering before Chromatic takes a snapshot.
 *
 * This function is intended to be used as a **per story file global** play function (in the meta definition of a story file).
 * When a story defines its own local `play` function, this play function will be
 * **overwritten** — it will **not** run automatically alongside the local one.
 *
 * If the behaviour of this function should be **preserved in addition** to a local play function,
 * the local `play` function must call it explicitly.
 *
 * @example
 * ```ts
 * // Story with a local play function that also waits for charts to finish:
 * export const MyStory: Story = {
 *   play: async (context) => {
 *     // Explicitly call the global chart wait function first
 *     await waitForFinishedChartPlayFunction(context);
 *
 *     // Then run story-specific interactions
 *     const canvas = within(context.canvasElement);
 *     await userEvent.click(canvas.getByRole('button'));
 *   },
 * };
 * ```
 */
export const waitForFinishedChartPlayFunction: PlayFunction = async ({ canvasElement }) => {
  if(isChromatic()) {
    const charts = (canvasElement as HTMLElement).querySelectorAll('syn-chart');
    const finishedPromises: Promise<void>[] = [];
    charts.forEach((chart) => {
      const instance = chart.getInstance()!;

      const finishedPromise = new Promise<void>((resolve) => {
        instance.on('finished', () => {
          resolve();
        });
      });
      finishedPromises.push(finishedPromise);
    });
    await Promise.all(finishedPromises);
  }
};

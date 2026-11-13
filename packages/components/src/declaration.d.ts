/* eslint-disable */
declare module '*.css' {
  const styles: string;
  export default styles;
}

declare module 'echarts/lib/visual/LegendVisualProvider.js' {
  import type { List, SeriesModel } from 'echarts/core';
  const LegendVisualProvider: new (
    getDataWithEncodedVisual: () => List,
    getRawData: () => List,
  ) => SeriesModel['legendVisualProvider'];
  export default LegendVisualProvider;
}
declare module 'echarts/lib/processor/dataFilter.js' {
  import type { StageHandler } from 'echarts/types/src/util/types.js';
  export default function filter(seriesType: string): StageHandler;
}

declare module 'echarts/lib/component/tooltip/tooltipMarkup.js' {
  export {
    TooltipMarkupStyleCreator,
    buildTooltipMarkup,
    createTooltipMarkup,
  } from 'echarts/types/src/component/tooltip/tooltipMarkup.js';

  import type { SeriesModel } from 'echarts/core.js';

  export function retrieveVisualColorForTooltipMarker(series: SeriesModel, dataIndex: number): string;
}

declare module 'echarts/lib/util/format.js' {
  export {
    convertToColorString,
    makeValueReadable,
  } from 'echarts/types/src/util/format.js';
}

declare module 'echarts/lib/coord/axisBand.js' {
  import type { Axis } from 'echarts/core.js';

  export function calcBandWidth(
    axis: Axis,
    options?: { min?: number },
  ): { w: number; w2: number };
}

declare module 'echarts/lib/util/states.js' {
  import type { Model, graphic } from 'echarts/core.js';

  export function setStatesStylesFromModel(
    element: InstanceType<typeof graphic.Rect>,
    model: Model,
  ): void;

  export function toggleHoverEmphasis(
    element: InstanceType<typeof graphic.Group>,
    highlightMode: 'none',
    coordinateScope: 'coordinateSystem',
    disabled: boolean,
  ): void;
}

declare namespace Chai {
  interface Assertion {
    // chai-a11y-axe returns a promise-like object and should be awaited but the types are incorrect
    // eslint-disable-next-line @typescript-eslint/ban-types
    accessible: (options?: Object) => PromiseLike<Assertion>;
  }
}

interface HTMLInputElement {
  showPicker: () => void;
}

/* eslint-disable */
interface CloseWatcher extends EventTarget {
  new (options?: CloseWatcherOptions): CloseWatcher;
  requestClose(): void;
  close(): void;
  destroy(): void;

  oncancel: (event: Event) => void | null;
  onclose: (event: Event) => void | null;
}

declare const CloseWatcher: CloseWatcher;

interface CloseWatcherOptions {
  signal: AbortSignal;
}

declare interface Window {
  CloseWatcher?: CloseWatcher;
}


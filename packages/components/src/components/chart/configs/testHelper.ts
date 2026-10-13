import type { ChartView, graphic } from 'echarts';
import type { ExtensionAPI } from './types.js';

export const createApiStub = (width = 280, height = 280): ExtensionAPI => ({
  getHeight: () => height,
  getWidth: () => width,
}) as ExtensionAPI;

export const CURRENT_COLOR_SVG_DATA_URL = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==';

export const decodeBase64DataUrl = (dataUrl: string): string => {
  const [, base64 = ''] = dataUrl.split(',');
  return atob(base64);
};

export const isGraphicElementOfType = <TElement>(
  element: unknown,
  type: string,
): element is TElement => (
  typeof element === 'object'
  && element !== null
  && 'type' in element
  && (element as { type?: unknown }).type === type
);

export const collectByType = <TElement>(
  view: ChartView,
  type: string,
): TElement[] => {
  const collected: TElement[] = [];

  view.group.traverse((element: unknown) => {
    if (isGraphicElementOfType<TElement>(element, type)) {
      collected.push(element);
    }
  });

  return collected;
};

export const getSectors = (view: ChartView): graphic.Sector[] => collectByType<graphic.Sector>(view, 'sector');
export const getTextElements = (view: ChartView): graphic.Text[] => collectByType<graphic.Text>(view, 'text');
export const getImages = (view: ChartView): graphic.Image[] => collectByType<graphic.Image>(view, 'image');
export const getRects = (view: ChartView): graphic.Rect[] => collectByType<graphic.Rect>(view, 'rect');

export const getTextValues = (view: ChartView): string[] => (
  getTextElements(view)
    .map((element) => element.style.text)
    .filter((text): text is string => typeof text === 'string')
);

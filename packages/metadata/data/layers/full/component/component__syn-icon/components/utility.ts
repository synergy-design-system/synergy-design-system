/* eslint-disable symbol-description */
import type { HTMLTemplateResult } from 'lit';
import { getIconLibrary } from './library.js';

/** Marks an icon failure that should remain cached, such as an invalid SVG or HTTP 410 response. */
export const CACHEABLE_ERROR = Symbol();
/** Marks an icon failure that should be retried on the next request, such as a network error. */
export const RETRYABLE_ERROR = Symbol();

/** A parsed SVG or a marker for a retryable or cacheable load failure. */
type SVGRequestResult = SVGSVGElement | typeof RETRYABLE_ERROR | typeof CACHEABLE_ERROR;

/** An icon request result or the Lit template used to render a spritesheet icon. */
export type SVGResult = HTMLTemplateResult | SVGRequestResult;

/** Reusable parser that parses SVG markup as an HTML document. */
let parser: DOMParser;

/** Holds the shared SVG request and most recently encoded result for an icon source. */
type IconCacheEntry = {
  /** Shared request for the parsed SVG or a load-failure marker. */
  svgPromise?: Promise<SVGRequestResult>;
  /** Serialized markup for the most recently encoded, mutated SVG. */
  serializedSVG?: string;
  /** Data URL encoded from `serializedSVG`. */
  dataURL?: string;
};

/** Caches SVG requests and encoded results by source string. */
const iconCache = new Map<string, IconCacheEntry>();

/**
 * Parses a response body as HTML, then adopts its first SVG element and adds the `svg` part.
 * @param fileData Response containing the icon markup.
 * @returns The parsed SVG, or a cacheable error if parsing fails or the first element is not SVG.
 */
const parseIcon = async (fileData: Response): Promise<SVGRequestResult> => {
  try {
    const div = document.createElement('div');
    div.innerHTML = await fileData.text();

    const svg = div.firstElementChild;
    if (svg?.tagName?.toLowerCase() !== 'svg') return CACHEABLE_ERROR;

    if (!parser) parser = new DOMParser();
    const doc = parser.parseFromString(svg.outerHTML, 'text/html');
    const svgEl = doc.body.querySelector('svg');
    if (!svgEl) return CACHEABLE_ERROR;

    svgEl.part.add('svg');
    return document.adoptNode(svgEl);
  } catch {
    return CACHEABLE_ERROR;
  }
};

/**
 * Resolves bundled system icon markup or fetches an SVG before parsing it.
 * @param url SVG URL, or bundled SVG markup when `isSystemIcon` is true.
 * @param isSystemIcon Whether `url` contains bundled system icon markup rather than a URL to fetch.
 * @returns The parsed SVG, or a marker for a cacheable or retryable load failure.
 */
const resolveIcon = async (url: string, isSystemIcon: boolean): Promise<SVGRequestResult> => {
  let fileData: Response;

  // #806: System icons are bundled as markup, so fetching them is unnecessary.
  if (isSystemIcon) {
    if (!url) return CACHEABLE_ERROR;
    fileData = new Response(url, { status: 200 });
  } else {
    try {
      fileData = await fetch(url, { mode: 'cors' });
      if (!fileData.ok) return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
    } catch {
      return RETRYABLE_ERROR;
    }
  }
  return parseIcon(fileData);
};

/**
 * Shares icon requests and cached results, evicting retryable failures.
 * @param url SVG URL, or SVG markup when `isSystemIcon` is true. The source string is also the cache key.
 * @param isSystemIcon Whether the source is bundled system icon markup.
 * @returns A shared promise for the parsed SVG or a load-failure marker. Clone the SVG before applying mutators.
 */
export const requestIcon = (url: string, isSystemIcon = false): Promise<SVGRequestResult> => {
  let entry = iconCache.get(url);
  let svgPromise = entry?.svgPromise;
  if (!svgPromise) {
    if (!entry) {
      entry = {};
      iconCache.set(url, entry);
    }
    const cacheEntry = entry;
    svgPromise = resolveIcon(url, isSystemIcon).then((result) => {
      if (result === RETRYABLE_ERROR) {
        delete cacheEntry.svgPromise;
        if (!cacheEntry.dataURL) iconCache.delete(url);
      }
      return result;
    });
    entry.svgPromise = svgPromise;
  }
  return svgPromise;
};

/**
 * Loads or reuses a spritesheet and copies the symbol named by its URL fragment into a new SVG.
 * @param url Spritesheet URL whose fragment names the symbol ID, such as `sprite.svg#settings`.
 * @returns The extracted SVG or an icon loading error marker.
 * @throws If the fragment is missing or does not identify an SVG symbol.
 */
const requestSpriteIcon = async (url: string): Promise<SVGRequestResult> => {
  const fragmentStart = url.indexOf('#');
  const encodedId = fragmentStart >= 0 ? url.slice(fragmentStart + 1) : '';
  if (!encodedId) throw new Error('A spritesheet icon source must include a symbol fragment, such as sprite.svg#settings.');
  const id = decodeURIComponent(encodedId);

  const sheet = await requestIcon(url.slice(0, fragmentStart));
  if (sheet === CACHEABLE_ERROR || sheet === RETRYABLE_ERROR) return sheet;

  const symbol = sheet.getElementById(id);
  if (!symbol || symbol.localName !== 'symbol' || symbol.namespaceURI !== 'http://www.w3.org/2000/svg') {
    throw new Error(`SVG symbol "${id}" was not found in the spritesheet.`);
  }

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  Array.from(symbol.attributes).forEach((attribute) => {
    if (attribute.name !== 'id') {
      svg.setAttributeNS(attribute.namespaceURI, attribute.name, attribute.value);
    }
  });
  svg.append(...Array.from(symbol.childNodes, node => node.cloneNode(true)));

  return svg;
};

/**
 * Serializes an SVG as a base64 data URL, reusing the cached data URL when its markup is unchanged.
 * @param svg SVG element to serialize.
 * @param url Source string used as the cache key for this icon's serialized output.
 * @returns A base64 SVG data URL.
 */
const serializeIcon = (svg: SVGSVGElement, url: string): string => {
  const serialized = new XMLSerializer().serializeToString(svg);
  let entry = iconCache.get(url);
  if (entry?.serializedSVG === serialized && entry.dataURL !== undefined) return entry.dataURL;

  const bytes = new TextEncoder().encode(serialized);
  const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
  const dataURL = `data:image/svg+xml;base64,${btoa(binary)}`;
  if (!entry) {
    entry = {};
    iconCache.set(url, entry);
  }
  entry.serializedSVG = serialized;
  entry.dataURL = dataURL;
  return dataURL;
};

/**
 * Returns an icon as a base64 SVG data URL using the registered library's resolver and mutator.
 * For spritesheet libraries, the resolver must return a URL whose fragment names the symbol ID,
 * such as `/sprite.svg#settings`. Only that symbol and its descendants are copied, definitions
 * elsewhere in the spritesheet are not included.
 * @param icon Icon name passed to the registered library resolver.
 * @param libraryName Registered library name. Defaults to `default`.
 * @returns A base64 SVG data URL.
 * @throws If the library or source is missing, loading or extraction fails, or the resolver or mutator throws.
 */
export async function getIconDataURL(icon: string, libraryName = 'default'): Promise<string> {
  const library = getIconLibrary(libraryName);
  if (!library) {
    throw new Error(`Icon library "${libraryName}" is not registered.`);
  }
  const url = library.resolver(icon);
  if (!url) {
    throw new Error(`Icon library "${libraryName}" returned no source for "${icon}".`);
  }

  const result = library.spriteSheet
    ? await requestSpriteIcon(url)
    : await requestIcon(url, libraryName === 'system');
  if (result === RETRYABLE_ERROR || result === CACHEABLE_ERROR) {
    throw new Error(`Failed to load SVG icon "${icon}" from library "${libraryName}".`);
  }

  const svg = result.cloneNode(true) as SVGSVGElement;
  library.mutator?.(svg);
  if (!svg.hasAttribute('xmlns')) svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  return serializeIcon(svg, url);
}

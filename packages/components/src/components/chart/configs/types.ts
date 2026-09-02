import type { ChartView, use } from 'echarts/types/dist/shared.js';

/**
 * Makes selected keys required while preserving the remaining type shape.
 */
export type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Overrides properties of a type with another type, while preserving the remaining type shape.
 */
export type Override<T, R> = Omit<T, keyof R> & R;

/**
 * Represents a point in 2D space with x and y coordinates.
 */
export type Point = {
  x: number;
  y: number;
};

/** Numeric pixel value or percentage string (e.g. '50%'). */
export type LayoutValue = number | string;

export type GlobalModel = Parameters<ChartView['render']>[1];
export type ExtensionAPI = Parameters<ChartView['render']>[2];
export type EChartsExtensionInstaller = Exclude<Parameters<typeof use>[0], readonly unknown[] | { install: unknown }>;
export type EChartsExtensionInstallRegisters = Parameters<EChartsExtensionInstaller>[0];

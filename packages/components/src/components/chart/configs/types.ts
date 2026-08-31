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

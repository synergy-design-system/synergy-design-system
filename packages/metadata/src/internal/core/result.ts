/**
 * Result type for functional error handling.
 * Either a success with value T or a failure with error E.
 */
export type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

/**
 * Create a successful result.
 */
export const ok = <T>(value: T): Result<T, never> => ({
  ok: true,
  value,
});

/**
 * Create a failed result.
 */
export const err = <E>(error: E): Result<never, E> => ({
  error,
  ok: false,
});

/**
 * Helper to map over a successful result.
 */
export const resultMap = <T, E, U>(
  result: Result<T, E>,
  f: (value: T) => U,
): Result<U, E> => (result.ok ? ok(f(result.value)) : result);

/**
 * Helper to flat-map (bind) over a successful result.
 */
export const resultFlatMap = <T, E, U>(
  result: Result<T, E>,
  f: (value: T) => Result<U, E>,
): Result<U, E> => (result.ok ? f(result.value) : result);

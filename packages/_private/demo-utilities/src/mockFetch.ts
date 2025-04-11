import * as stubs from './stubs/index.js';

/**
 * A list of valid stub keys
 */
type StubKeys = keyof typeof stubs;

/**
 * Generic type that returns the type of the stub data for the given key
 */
type StubValue<T extends StubKeys> = typeof stubs[T];

/**
 * Returns the stub data for the given key
 * @param data - The key of the stub data to be returned
 */
export const mockData = <T extends StubKeys>(data: T): typeof stubs[T] => stubs[data];

/**
 * Returns the stub data for the given key after a defined timeout
 * @param data - The key of the stub data to be returned
 */
export const mockAsyncData = async <T extends StubKeys>(
  data: T,
  timeout: number = 0,
) => new Promise<StubValue<T>>((resolve) => {
  setTimeout(() => {
    resolve(mockData(data));
  }, timeout);
});

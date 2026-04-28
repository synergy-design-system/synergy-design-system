import { AsyncLocalStorage } from 'node:async_hooks';
import type { LoggingTransport } from './logging-types.js';

type LoggingContext = {
  sessionId: string;
  transport: LoggingTransport;
};

const loggingContextStore = new AsyncLocalStorage<LoggingContext>();

export const runWithLoggingContext = async <T>(
  context: LoggingContext,
  fn: () => Promise<T>,
): Promise<T> => loggingContextStore.run(context, fn);

export const getLoggingContext = (): LoggingContext => (
  loggingContextStore.getStore() ?? {
    sessionId: 'stdio',
    transport: 'stdio',
  }
);

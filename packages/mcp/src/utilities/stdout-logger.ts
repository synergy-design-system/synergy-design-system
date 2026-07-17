import type { LogEvent, LoggerProvider } from './logging-types.js';

export const createStdoutLoggerProvider = (): LoggerProvider => ({
  log: (event: LogEvent) => {
    process.stdout.write(`${JSON.stringify(event)}\n`);
    return Promise.resolve();
  },
});

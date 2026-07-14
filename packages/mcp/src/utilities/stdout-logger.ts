import type { LoggerProvider, ToolLogEvent } from './logging-types.js';

export const createStdoutLoggerProvider = (): LoggerProvider => ({
  log: (event: ToolLogEvent) => {
    process.stdout.write(`${JSON.stringify(event)}\n`);
    return Promise.resolve();
  },
});

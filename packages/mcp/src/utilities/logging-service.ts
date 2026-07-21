import type { LoggerProvider, LoggerService, ToolLogEvent } from './logging-types.js';

const providerError = (index: number, error: unknown) => {
  process.stderr.write(
    `[synergy-mcp] Warning: logger provider #${index + 1} failed: ${error instanceof Error ? error.message : String(error)}\n`,
  );
};

export const createLoggerService = (providers: LoggerProvider[]): LoggerService => {
  if (providers.length === 0) {
    return {
      enabled: false,
      log: async () => {
        // No-op logger keeps call sites simple.
      },
    };
  }

  return {
    enabled: true,
    log: async (event: ToolLogEvent) => {
      const results = await Promise.allSettled(providers.map(provider => provider.log(event)));
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          providerError(index, result.reason);
        }
      });
    },
  };
};

/**
 * Execution context passed through the ETL pipeline.
 * Carries workspace information and optional logger.
 */
export interface Logger {
  info(message: string, data?: Record<string, unknown>): void;
  warn(message: string, data?: Record<string, unknown>): void;
  error(message: string, data?: Record<string, unknown>): void;
  debug(message: string, data?: Record<string, unknown>): void;
}

export interface Context {
  /**
   * Root of the workspace (e.g. repo root).
   */
  workspaceRoot: string;

  /**
   * Optional logger for pipeline progress and diagnostics.
   */
  logger?: Logger;

  /**
   * Optional abort signal for cancellation.
   */
  signal?: AbortSignal;

  /**
   * Arbitrary context data passed through pipeline stages.
   */
  metadata?: Record<string, unknown>;
}

/**
 * Create a default no-op logger.
 */
export const createNoOpLogger = (): Logger => ({
  debug: () => {},
  error: () => {},
  info: () => {},
  warn: () => {},
});

/**
 * Create a simple console logger.
 */
export const createConsoleLogger = (prefix = 'metadata'): Logger => ({
  /* eslint-disable no-console */
  debug: (msg, data) => console.debug(`[${prefix}] DEBUG ${msg}`, data),
  error: (msg, data) => console.error(`[${prefix}] ERR ${msg}`, data),
  info: (msg, data) => console.log(`[${prefix}] ${msg}`, data),
  warn: (msg, data) => console.warn(`[${prefix}] WARN ${msg}`, data),
  /* eslint-enable no-console */
});

import { type ConfigContext } from '../../config/types.js';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/* eslint-disable sort-keys */
/**
 * Order of log levels for filtering. Higher number means more severe.
 * This is used to determine if a message should be logged based on the configured minimum log level.
 */
const LOG_LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};
/* eslint-enable sort-keys */

function parseBooleanEnv(value: string | undefined): boolean {
  if (!value) {
    return false;
  }

  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
}

function parseLogLevelEnv(value: string | undefined): LogLevel {
  const normalized = value?.trim().toLowerCase();
  if (normalized === 'debug' || normalized === 'info' || normalized === 'warn' || normalized === 'error') {
    return normalized;
  }
  return 'info';
}

function parseScopesEnv(value: string | undefined): Set<string> | null {
  if (!value) {
    return null;
  }

  const scopes = value
    .split(',')
    .map((scope) => scope.trim())
    .filter(Boolean);

  return scopes.length > 0 ? new Set(scopes) : null;
}

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

  /**
   * Loaded configuration (overrides, clustering, artifacts).
   */
  config?: ConfigContext;
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
 * Supports log levels and scope filtering via environment variables:
 * - METADATA_LOG_SILENT: If set to a truthy value, disables all logging.
 * - METADATA_LOG_LEVEL: Minimum log level to output (debug, info, warn, error). Default is 'info'.
 * - METADATA_LOG_SCOPES: Comma-separated list of scopes to enable logging for. If set, only logs with matching prefixes will be shown.
 *
 * @param prefix Optional prefix for log messages to indicate the source or scope of the log.
 * @returns A Logger instance that logs to the console based on the configured settings.
 */
export const createConsoleLogger = (prefix = 'metadata'): Logger => {
  const isSilent = parseBooleanEnv(process.env.METADATA_LOG_SILENT);
  const minLevel = parseLogLevelEnv(process.env.METADATA_LOG_LEVEL);
  const allowedScopes = parseScopesEnv(process.env.METADATA_LOG_SCOPES);

  if (isSilent) {
    return createNoOpLogger();
  }

  if (allowedScopes && !allowedScopes.has(prefix)) {
    return createNoOpLogger();
  }

  const shouldLog = (level: LogLevel): boolean => LOG_LEVEL_ORDER[level] >= LOG_LEVEL_ORDER[minLevel];

  const emit = (method: 'debug' | 'log' | 'warn' | 'error', message: string, data?: Record<string, unknown>): void => {
    if (data === undefined) {
      console[method](message);
      return;
    }

    console[method](message, data);
  };

  return {
    debug: (msg, data) => {
      if (shouldLog('debug')) {
        emit('debug', `[${prefix}] DEBUG ${msg}`, data);
      }
    },
    error: (msg, data) => {
      if (shouldLog('error')) {
        emit('error', `[${prefix}] ERR ${msg}`, data);
      }
    },
    info: (msg, data) => {
      if (shouldLog('info')) {
        emit('log', `[${prefix}] ${msg}`, data);
      }
    },
    warn: (msg, data) => {
      if (shouldLog('warn')) {
        emit('warn', `[${prefix}] WARN ${msg}`, data);
      }
    },
  };
};

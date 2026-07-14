import { createLocalFileLoggerProvider } from './local-file-logger.js';
import { createStdoutLoggerProvider } from './stdout-logger.js';
import { createLoggerService } from './logging-service.js';
import { getLoggingContext } from './logging-context.js';
import type { McpRuntimeConfig } from './config.js';
import type {
  LogEvent,
  LogOperationKind,
  LoggerProvider,
  LoggerService,
} from './logging-types.js';

let loggerService: LoggerService = createLoggerService([]);

export const initializeLogger = (config: McpRuntimeConfig): void => {
  const providerFactories: LoggerProvider[] = [];

  const localPath = config.logging.localFile.path;
  if (localPath) {
    providerFactories.push(createLocalFileLoggerProvider(localPath));
  }

  // Enable stdout logging if configured and the interface is not stdio to avoid duplicate logs in stdio mode.
  if (config.logging.stdout.enabled && config.interface !== 'stdio') {
    providerFactories.push(createStdoutLoggerProvider());
  }

  loggerService = createLoggerService(providerFactories);
};

type LogOperationInput = {
  durationMs: number;
  errorMessage?: string;
  kind: LogOperationKind;
  name: string;
  parameters: Record<string, unknown>;
  success: boolean;
  tokenCount?: number;
};

export const logOperation: (input: LogOperationInput) => Promise<void> = async (input) => {
  if (!loggerService.enabled) {
    return;
  }

  const context = getLoggingContext();
  const event: LogEvent = {
    durationMs: input.durationMs,
    errorMessage: input.errorMessage,
    kind: input.kind,
    name: input.name,
    parameters: input.parameters,
    sessionId: context.sessionId,
    success: input.success,
    timestamp: new Date().toISOString(),
    tokenCount: input.tokenCount,
    transport: context.transport,
  };

  await loggerService.log(event);
};

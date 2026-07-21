import { createLocalFileLoggerProvider } from './local-file-logger.js';
import { createLoggerService } from './logging-service.js';
import { getLoggingContext } from './logging-context.js';
import type { McpRuntimeConfig } from './config.js';
import type { LoggerProvider, LoggerService, ToolLogEvent } from './logging-types.js';

let loggerService: LoggerService = createLoggerService([]);

export const initializeLogger = (config: McpRuntimeConfig): void => {
  const providerFactories: LoggerProvider[] = [];

  const localPath = config.logging.localFile.path;
  if (localPath) {
    providerFactories.push(createLocalFileLoggerProvider(localPath));
  }

  loggerService = createLoggerService(providerFactories);
};

type LogToolCallInput = {
  durationMs: number;
  errorMessage?: string;
  parameters: Record<string, unknown>;
  success: boolean;
  tokenCount?: number;
  toolName: string;
};

export const logToolCall = async (input: LogToolCallInput): Promise<void> => {
  if (!loggerService.enabled) {
    return;
  }

  const context = getLoggingContext();
  const event: ToolLogEvent = {
    durationMs: input.durationMs,
    errorMessage: input.errorMessage,
    parameters: input.parameters,
    sessionId: context.sessionId,
    success: input.success,
    timestamp: new Date().toISOString(),
    tokenCount: input.tokenCount,
    toolName: input.toolName,
    transport: context.transport,
  };

  await loggerService.log(event);
};

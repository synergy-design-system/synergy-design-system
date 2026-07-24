export type LoggingTransport = 'http' | 'stdio';

export type LogOperationKind = 'tool' | 'prompt' | 'resource';

export type LogEvent = {
  durationMs: number;
  errorMessage?: string;
  kind: LogOperationKind;
  name: string;
  parameters: Record<string, unknown>;
  sessionId: string;
  success: boolean;
  timestamp: string;
  tokenCount?: number;
  transport: LoggingTransport;
};

export interface LoggerProvider {
  log: (event: LogEvent) => Promise<void>;
}

export interface LoggerService {
  enabled: boolean;
  log: (event: LogEvent) => Promise<void>;
}

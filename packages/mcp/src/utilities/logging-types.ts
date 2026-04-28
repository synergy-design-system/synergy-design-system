export type LoggingTransport = 'http' | 'stdio';

export type ToolLogEvent = {
  durationMs: number;
  errorMessage?: string;
  parameters: Record<string, unknown>;
  sessionId: string;
  success: boolean;
  timestamp: string;
  tokenCount?: number;
  toolName: string;
  transport: LoggingTransport;
};

export interface LoggerProvider {
  log: (event: ToolLogEvent) => Promise<void>;
}

export interface LoggerService {
  enabled: boolean;
  log: (event: ToolLogEvent) => Promise<void>;
}

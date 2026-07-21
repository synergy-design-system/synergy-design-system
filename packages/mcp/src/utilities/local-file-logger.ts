import { appendFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { LoggerProvider, ToolLogEvent } from './logging-types.js';

const sanitizeSessionId = (sessionId: string): string => sessionId
  .trim()
  .replace(/[^a-zA-Z0-9_.-]/g, '_') || 'unknown-session';

const toDateFolder = (isoTimestamp: string): string => {
  const date = new Date(isoTimestamp);
  const year = String(date.getUTCFullYear()).slice(-2);
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const createLocalFileLoggerProvider = (baseDirectory: string): LoggerProvider => ({
  log: async (event: ToolLogEvent) => {
    const dateFolder = toDateFolder(event.timestamp);
    const filename = `${sanitizeSessionId(event.sessionId)}.json`;
    const directory = join(baseDirectory, dateFolder);
    const filePath = join(directory, filename);

    await mkdir(directory, { recursive: true });
    await appendFile(filePath, `${JSON.stringify(event)}\n`, 'utf8');
  },
});

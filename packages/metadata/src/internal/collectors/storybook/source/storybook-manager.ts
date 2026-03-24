/* eslint-disable @typescript-eslint/no-misused-promises */
import { access } from 'node:fs/promises';
import { type Server, createServer } from 'http';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import handler from 'serve-handler';
import { type Logger, createConsoleLogger } from '../../../core/context.js';
import { StorybookServer } from './types.js';

const defaultLogger = createConsoleLogger('storybook');

const execAsync = promisify(exec);

// Get current directory for resolving the Storybook build path
const filename = fileURLToPath(import.meta.url);
const currentDir = dirname(filename);

const getStorybookDistCandidates = (): string[] => [
  resolve(process.cwd(), '..', 'docs', 'dist'),
  resolve(currentDir, '../../../../../../docs/dist'),
  resolve(currentDir, '../../../../../docs/dist'),
];

const resolveStorybookDistPath = async (): Promise<string> => {
  for (const candidate of getStorybookDistCandidates()) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try next candidate path.
    }
  }

  throw new Error(`Could not locate Storybook dist directory. Tried: ${getStorybookDistCandidates().join(', ')}`);
};

export class StaticServerManager {
  private server: Server | null = null;

  private serverInfo: StorybookServer | null = null;

  private logger: Logger;

  constructor(logger?: Logger) {
    this.logger = logger ?? defaultLogger;
  }

  /**
   * Check if a port is available
   */
  private static async isPortAvailable(port: number): Promise<boolean> {
    try {
      const { stdout } = await execAsync(`lsof -ti:${port}`);
      return stdout.trim() === '';
    } catch {
      return true;
    }
  }

  /**
   * Find an available port starting from the default port
   */
  private static async findAvailablePort(startPort: number = 6006): Promise<number> {
    let port = startPort;

    while (!(await StaticServerManager.isPortAvailable(port))) {
      port += 1;
      if (port > startPort + 100) {
        throw new Error('Could not find available port for static server');
      }
    }
    return port;
  }

  /**
   * Start the static file server for Storybook
   */
  async start(port: number = 6006): Promise<StorybookServer> {
    if (this.serverInfo?.isRunning) {
      this.logger.info('Static server is already running');
      return this.serverInfo;
    }

    const availablePort = await StaticServerManager.findAvailablePort(port);
    const url = `http://localhost:${availablePort}`;
    const storybookDistPath = await resolveStorybookDistPath();

    this.logger.info(`Starting static server on port ${availablePort}...`);
    this.logger.info(`Serving files from: ${storybookDistPath}`);

    this.server = createServer((request, response) => {
      // Add custom URL rewriting before serve-handler
      const originalUrl = request.url || '';

      // Handle iframe.html -> iframe rewrite manually
      if (originalUrl.startsWith('/iframe.html')) {
        const rewrittenUrl = originalUrl.replace('/iframe.html', '/iframe');
        request.url = rewrittenUrl;
      }

      return handler(request, response, {
        headers: [
          {
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=3600',
              },
            ],
            source: '**',
          },
        ],
        public: storybookDistPath,
      });
    });

    // Start listening and wait for the server to be ready
    await new Promise<void>((resolvePromise, reject) => {
      if (!this.server) {
        reject(new Error('Server instance not created'));
        return;
      }

      // Handle server errors
      this.server.on('error', (error) => {
        this.logger.error('Static server error', { error: String(error) });
        reject(error);
      });

      // Server is ready when listening event fires
      this.server.on('listening', () => {
        this.logger.info(`✓ Static server started successfully at ${url}`);
        resolvePromise();
      });

      // Start the server
      this.server.listen(availablePort);
    });

    this.serverInfo = {
      isRunning: true,
      port: availablePort,
      url,
    };

    this.logger.info(`Static server ready at ${url}`);
    return this.serverInfo;
  }

  /**
   * Stop the static server
   */
  async stop(): Promise<void> {
    if (!this.server || !this.serverInfo) {
      this.logger.info('No static server to stop');
      return;
    }

    this.logger.info('Stopping static server...');

    await new Promise<void>((resolvePromise) => {
      if (!this.server) {
        resolvePromise();
        return;
      }

      this.server.close(() => {
        this.serverInfo = null;
        this.server = null;
        this.logger.info('Static server stopped successfully');
        resolvePromise();
      });
    });
  }

  /**
   * Get the current server information
   */
  getServer(): StorybookServer | null {
    return this.serverInfo;
  }

  /**
   * Check if static server is currently running
   */
  isRunning(): boolean {
    return this.serverInfo?.isRunning ?? false;
  }
}

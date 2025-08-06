/* eslint-disable no-console */
import { type Server, createServer } from 'http';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
// eslint-disable-next-line import/no-extraneous-dependencies
import handler from 'serve-handler';
import { StorybookServer } from './types.js';

const execAsync = promisify(exec);

// Get current directory for resolving the Storybook build path
const filename = fileURLToPath(import.meta.url);
const currentDir = dirname(filename);

export class StaticServerManager {
  private server: Server | null = null;

  private serverInfo: StorybookServer | null = null;

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
    // eslint-disable-next-line no-await-in-loop
    while (!(await StaticServerManager.isPortAvailable(port))) {
      port += 1;
      if (port > startPort + 100) {
        throw new Error('Could not find available port for static server');
      }
    }
    return port;
  }

  /**
   * Wait for server to be ready by checking if the port is responding
   */
  private static async waitForServer(port: number, timeout: number = 30000): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const response = await fetch(`http://localhost:${port}`);
        if (response.ok) {
          return;
        }
      } catch {
        // Continue waiting
      }

      // eslint-disable-next-line no-await-in-loop
      await new Promise(promiseResolve => {
        setTimeout(promiseResolve, 1000);
      });
    }

    throw new Error(`Static server did not start within ${timeout}ms`);
  }

  /**
   * Start the static file server for Storybook
   */
  async start(port: number = 6006): Promise<StorybookServer> {
    if (this.serverInfo?.isRunning) {
      console.log('Static server is already running');
      return this.serverInfo;
    }

    const availablePort = await StaticServerManager.findAvailablePort(port);
    const url = `http://localhost:${availablePort}`;
    const storybookDistPath = resolve(currentDir, '../../../../docs/dist');

    console.log(`Starting static server on port ${availablePort}...`);
    console.log(`Serving files from: ${storybookDistPath}`);

    this.server = createServer((request, response) => handler(request, response, {
      // cleanUrls: true,
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
      rewrites: [
        // SPA fallback - redirect all non-asset requests to index.html
        // { destination: '/index.html', source: '**' },
      ],
    }));

    // Handle server errors
    this.server.on('error', (error) => {
      console.error('Static server error:', error);
    });

    // Start listening
    await new Promise<void>((resolvePromise, reject) => {
      if (!this.server) {
        reject(new Error('Server instance not created'));
        return;
      }

      this.server.listen(availablePort, () => {
        console.log(`✓ Static server started successfully at ${url}`);
        resolvePromise();
      });

      this.server.on('error', reject);
    });

    // Wait for server to be ready
    await StaticServerManager.waitForServer(availablePort);

    this.serverInfo = {
      isRunning: true,
      port: availablePort,
      url,
    };

    console.log(`Static server ready at ${url}`);
    return this.serverInfo;
  }

  /**
   * Stop the static server
   */
  async stop(): Promise<void> {
    if (!this.server || !this.serverInfo) {
      console.log('No static server to stop');
      return;
    }

    console.log('Stopping static server...');

    await new Promise<void>((resolvePromise) => {
      if (!this.server) {
        resolvePromise();
        return;
      }

      this.server.close(() => {
        this.serverInfo = null;
        this.server = null;
        console.log('Static server stopped successfully');
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

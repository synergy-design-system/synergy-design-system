/* eslint-disable no-console */
import { ChildProcess, exec, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import { StorybookServer } from './types.js';

const execAsync = promisify(exec);

export class StorybookManager {
  private process: ChildProcess | null = null;

  private server: StorybookServer | null = null;

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
   * Find an available port starting from the default Storybook port
   */
  private static async findAvailablePort(startPort: number = 6006): Promise<number> {
    let port = startPort;
    // eslint-disable-next-line no-await-in-loop
    while (!(await StorybookManager.isPortAvailable(port))) {
      port += 1;
      if (port > startPort + 100) {
        throw new Error('Could not find available port for Storybook');
      }
    }
    return port;
  }

  /**
   * Wait for Storybook to be ready by checking if the port is responding
   */
  private static async waitForStorybook(port: number, timeout: number = 60000): Promise<void> {
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
      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      });
    }

    throw new Error(`Storybook did not start within ${timeout}ms`);
  }

  /**
   * Start the Storybook server
   */
  async start(workingDirectory: string = process.cwd()): Promise<StorybookServer> {
    if (this.server?.isRunning) {
      console.log('Storybook is already running');
      return this.server;
    }

    const port = await StorybookManager.findAvailablePort();
    const url = `http://localhost:${port}`;

    console.log(`Starting Storybook on port ${port}...`);

    const docsPath = '../../docs';
    this.process = spawn('pnpm', [
      '-C',
      docsPath,
      'start',
      `--port=${port}`,
    ], {
      cwd: workingDirectory,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    if (!this.process.stdout || !this.process.stderr) {
      throw new Error('Failed to create Storybook process');
    }

    // Handle process output
    this.process.stdout.on('data', (data: Buffer) => {
      console.log(`Storybook stdout: ${data.toString()}`);
    });

    this.process.stderr.on('data', (data: Buffer) => {
      console.error(`Storybook stderr: ${data.toString()}`);
    });

    this.process.on('error', (error) => {
      console.error('Storybook process error:', error);
    });

    this.process.on('exit', (code) => {
      console.log(`Storybook process exited with code ${code}`);
      this.server = null;
    });

    // Wait for Storybook to be ready
    await StorybookManager.waitForStorybook(port);

    this.server = {
      isRunning: true,
      port,
      url,
    };

    console.log(`Storybook started successfully at ${url}`);
    return this.server;
  }

  /**
   * Stop the Storybook server
   */
  async stop(): Promise<void> {
    if (!this.process || !this.server) {
      console.log('No Storybook process to stop');
      return;
    }

    console.log('Stopping Storybook...');

    await new Promise<void>((resolve) => {
      if (!this.process) {
        resolve();
        return;
      }

      this.process.on('exit', () => {
        this.server = null;
        this.process = null;
        console.log('Storybook stopped successfully');
        resolve();
      });

      // Try graceful shutdown first
      this.process.kill('SIGTERM');

      // Force kill after 10 seconds if not stopped
      setTimeout(() => {
        if (this.process) {
          this.process.kill('SIGKILL');
        }
      }, 10000);
    });
  }

  /**
   * Get the current server information
   */
  getServer(): StorybookServer | null {
    return this.server;
  }

  /**
   * Check if Storybook is currently running
   */
  isRunning(): boolean {
    return this.server?.isRunning ?? false;
  }
}

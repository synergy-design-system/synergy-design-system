import { parseCommandLineArgs } from '../../src/server.js';

describe('when using parseCommandLineArgs', () => {
  describe('version handling', () => {
    it('should return version action for --version flag', () => {
      const result = parseCommandLineArgs(['--version']);
      expect(result).toEqual({ action: 'version' });
    });

    it('should return version action for -v flag', () => {
      const result = parseCommandLineArgs(['-v']);
      expect(result).toEqual({ action: 'version' });
    });

    it('should prioritize version over help', () => {
      const result = parseCommandLineArgs(['--version', '--help']);
      expect(result).toEqual({ action: 'version' });
    });
  });

  describe('help handling', () => {
    it('should return help action for --help flag', () => {
      const result = parseCommandLineArgs(['--help']);
      expect(result).toEqual({ action: 'help' });
    });

    it('should return help action for -h flag', () => {
      const result = parseCommandLineArgs(['-h']);
      expect(result).toEqual({ action: 'help' });
    });
  });

  describe('no arguments handling', () => {
    it('should return continue action when no arguments are provided', () => {
      const result = parseCommandLineArgs([]);
      expect(result).toEqual({ action: 'continue' });
    });

    it('should return continue action when unknown arguments are provided', () => {
      const result = parseCommandLineArgs(['--unknown', 'argument']);
      expect(result).toEqual({ action: 'continue' });
    });

    it('should use process.argv by default when no args provided', () => {
      // Mock process.argv temporarily
      const originalArgv = process.argv;
      process.argv = ['node', 'script.js', '--version'];
      
      const result = parseCommandLineArgs();
      expect(result).toEqual({ action: 'version' });
      
      // Restore original
      process.argv = originalArgv;
    });
  });

  describe('mixed arguments', () => {
    it('should handle mixed short and long flags', () => {
      const result = parseCommandLineArgs(['-v', '--help']);
      expect(result).toEqual({ action: 'version' });
    });

    it('should handle arguments with other parameters', () => {
      const result = parseCommandLineArgs(['--some-flag', '--version', '--other']);
      expect(result).toEqual({ action: 'version' });
    });
  });
});

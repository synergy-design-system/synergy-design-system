import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { parseCommandLineArgs } from '../../src/utilities/cli.js';

describe('parseCommandLineArgs', () => {
  describe('version/help/continue actions', () => {
    it('returns version action for --version', () => {
      const result = parseCommandLineArgs(['--version']);
      assert.equal(result.action, 'version');
    });

    it('returns version action for -v', () => {
      const result = parseCommandLineArgs(['-v']);
      assert.equal(result.action, 'version');
    });

    it('returns help action for --help', () => {
      const result = parseCommandLineArgs(['--help']);
      assert.equal(result.action, 'help');
    });

    it('returns help action for -h', () => {
      const result = parseCommandLineArgs(['-h']);
      assert.equal(result.action, 'help');
    });

    it('returns continue action when no help/version flag provided', () => {
      const result = parseCommandLineArgs([]);
      assert.equal(result.action, 'continue');
    });
  });

  describe('config flag', () => {
    it('parses --config flag', () => {
      const result = parseCommandLineArgs(['--config', './synergy-mcp.json']);
      assert.equal(result.action, 'continue');
      assert.equal(result.configPath, './synergy-mcp.json');
    });

    it('ignores --config flag when no path provided', () => {
      const result = parseCommandLineArgs(['--config']);
      assert.equal(result.configPath, undefined);
    });
  });

  describe('interface flag', () => {
    it('parses --interface stdio', () => {
      const result = parseCommandLineArgs(['--interface', 'stdio']);
      assert.equal(result.interface, 'stdio');
    });

    it('parses --interface http', () => {
      const result = parseCommandLineArgs(['--interface', 'http']);
      assert.equal(result.interface, 'http');
    });

    it('throws error for invalid interface value', () => {
      assert.throws(
        () => parseCommandLineArgs(['--interface', 'websocket']),
        /Invalid --interface value/,
      );
    });

    it('ignores --interface flag when no value provided', () => {
      const result = parseCommandLineArgs(['--interface']);
      assert.equal(result.interface, undefined);
    });
  });

  describe('port flag', () => {
    it('parses valid --port', () => {
      const result = parseCommandLineArgs(['--port', '3000']);
      assert.equal(result.port, 3000);
    });

    it('parses --port with minimum valid value', () => {
      const result = parseCommandLineArgs(['--port', '1']);
      assert.equal(result.port, 1);
    });

    it('parses --port with maximum valid value', () => {
      const result = parseCommandLineArgs(['--port', '65535']);
      assert.equal(result.port, 65535);
    });

    it('throws error for non-numeric port', () => {
      assert.throws(
        () => parseCommandLineArgs(['--port', 'abc']),
        /Invalid --port value/,
      );
    });

    it('throws error for port below valid range', () => {
      assert.throws(
        () => parseCommandLineArgs(['--port', '0']),
        /Invalid --port value/,
      );
    });

    it('throws error for port above valid range', () => {
      assert.throws(
        () => parseCommandLineArgs(['--port', '65536']),
        /Invalid --port value/,
      );
    });

    it('ignores --port flag when no value provided', () => {
      const result = parseCommandLineArgs(['--port']);
      assert.equal(result.port, undefined);
    });
  });

  describe('TLS flags', () => {
    it('parses --tls-key flag', () => {
      const result = parseCommandLineArgs(['--tls-key', './server.key']);
      assert.equal(result.tlsKeyPath, './server.key');
    });

    it('parses --tls-cert flag', () => {
      const result = parseCommandLineArgs(['--tls-cert', './server.crt']);
      assert.equal(result.tlsCertPath, './server.crt');
    });

    it('parses both TLS flags together', () => {
      const result = parseCommandLineArgs(['--tls-key', './server.key', '--tls-cert', './server.crt']);
      assert.equal(result.tlsKeyPath, './server.key');
      assert.equal(result.tlsCertPath, './server.crt');
    });

    it('ignores --tls-key flag when no value provided', () => {
      const result = parseCommandLineArgs(['--tls-key']);
      assert.equal(result.tlsKeyPath, undefined);
    });

    it('ignores --tls-cert flag when no value provided', () => {
      const result = parseCommandLineArgs(['--tls-cert']);
      assert.equal(result.tlsCertPath, undefined);
    });
  });

  describe('combined flags', () => {
    it('parses all flags together', () => {
      const result = parseCommandLineArgs([
        '--config', './synergy-mcp.json',
        '--interface', 'http',
        '--port', '8080',
        '--tls-key', './server.key',
        '--tls-cert', './server.crt',
      ]);
      assert.equal(result.action, 'continue');
      assert.equal(result.configPath, './synergy-mcp.json');
      assert.equal(result.interface, 'http');
      assert.equal(result.port, 8080);
      assert.equal(result.tlsKeyPath, './server.key');
      assert.equal(result.tlsCertPath, './server.crt');
    });

    it('returns empty result for empty args', () => {
      const result = parseCommandLineArgs([]);
      assert.equal(result.action, 'continue');
      assert.equal(result.configPath, undefined);
      assert.equal(result.interface, undefined);
      assert.equal(result.port, undefined);
      assert.equal(result.tlsKeyPath, undefined);
      assert.equal(result.tlsCertPath, undefined);
    });
  });
});

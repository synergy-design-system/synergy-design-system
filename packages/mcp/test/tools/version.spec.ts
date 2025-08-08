import { versionTool } from '../../src/tools/version.js';

interface ToolDefinition {
  description: string;
  title: string;
}

interface ToolResult {
  content: Array<{ text: string; type: string }>;
}

describe('when using version tool', () => {
  let mockServer: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerTool: (name: string, definition: any, handler: () => Promise<ToolResult>) => void;
  };
  let registeredTools: Array<{
    definition: ToolDefinition;
    handler: () => Promise<ToolResult>;
    name: string;
  }>;

  beforeEach(() => {
    registeredTools = [];
    
    // Create a mock server that captures tool registrations
    mockServer = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      registerTool: (name: string, definition: any, handler: () => Promise<ToolResult>) => {
        registeredTools.push({ definition, handler, name });
      },
    };
    
    // Register the version tool
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    versionTool(mockServer as any);
  });

  it('should register a tool named "version"', () => {
    expect(registeredTools).toHaveLength(1);
    expect(registeredTools[0].name).toBe('version');
  });

  it('should have appropriate tool definition', () => {
    const tool = registeredTools[0];
    
    expect(tool.definition).toHaveProperty('description');
    expect(tool.definition.description).toContain('version');
    expect(tool.definition).toHaveProperty('title');
    expect(tool.definition.title).toContain('Synergy MCP Version Information');
  });

  it('should have a handler function', () => {
    const tool = registeredTools[0];
    expect(typeof tool.handler).toBe('function');
  });

  it('should return version information when called', async () => {
    const tool = registeredTools[0];
    const result = await tool.handler();

    expect(result).toHaveProperty('content');
    expect(Array.isArray(result.content)).toBe(true);
    expect(result.content).toHaveLength(1);
    
    const content = result.content[0];
    expect(content).toHaveProperty('type', 'text');
    expect(content).toHaveProperty('text');
    expect(content.text).toContain('Synergy Design System MCP Server');
    expect(content.text).toContain('Version:');
  });

  it('should include version number in response', async () => {
    const tool = registeredTools[0];
    const result = await tool.handler();
    
    const content = result.content[0];
    expect(content.text).toMatch(/\*\*Version:\*\* \d+\.\d+\.\d+/);
  });

  it('should format response as structured text', async () => {
    const tool = registeredTools[0];
    const result = await tool.handler();
    
    const content = result.content[0];
    const lines = content.text.split('\n');
    
    // Should have multiple lines with proper structure
    expect(lines.length).toBeGreaterThan(1);
    expect(lines[0]).toContain('Synergy Design System MCP Server');
  });
});

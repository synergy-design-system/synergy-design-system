import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  type IntentPhase,
  type IntentPresetValue,
  type IntentStructureNode,
  validateComponent,
} from '@synergy-design-system/metadata';
import {
  INTENT_DEFAULT_FRAMEWORK,
  INTENT_DEFAULT_PHASES,
  createToolAnnotations,
  getRuntimeConfig,
  getToolRule,
  intentFrameworkSchema,
  intentPhaseSchema,
  toolHandler,
} from '../utilities/index.js';

const frameworkSchema = intentFrameworkSchema;

const parsePrimitiveValue = (rawValue: string | undefined, isBinding: boolean): IntentPresetValue => {
  if (rawValue === undefined) {
    return true;
  }

  const value = rawValue.trim();
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  if (value === 'null') {
    return null;
  }

  if (isBinding && /^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  }

  return value;
};

type ParsedAttribute = {
  isBinding: boolean;
  name: string;
  rawValue: string | undefined;
  shouldSkip: boolean;
};

const parseAttribute = (match: RegExpMatchArray): ParsedAttribute => {
  const rawName = match[1] ?? '';
  const rawValue = match[2] ?? match[3] ?? match[4];
  const shouldSkip = rawName.startsWith('(')
    || rawName.startsWith('#')
    || rawName.startsWith('*')
    || rawName.startsWith('@');

  const bracketBinding = rawName.startsWith('[') && rawName.endsWith(']');
  const withoutBrackets = bracketBinding ? rawName.slice(1, -1) : rawName;
  const normalizedName = withoutBrackets.startsWith('attr.')
    ? withoutBrackets.slice(5)
    : withoutBrackets;

  return {
    isBinding: bracketBinding,
    name: normalizedName,
    rawValue,
    shouldSkip,
  };
};

const parseAttributes = (source: string): Omit<IntentStructureNode, 'component' | 'children' | 'text'> => {
  const attrPattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  const matches = Array.from(source.matchAll(attrPattern));

  const reduced = matches.reduce<{
    classes: string[];
    props: Record<string, IntentPresetValue>;
    role?: string;
    slot?: string;
  }>((acc, match) => {
    const parsed = parseAttribute(match);
    if (parsed.shouldSkip) {
      return acc;
    }

    if (parsed.name === 'class') {
      if (parsed.rawValue) {
        acc.classes.push(...parsed.rawValue.split(/\s+/).filter(Boolean));
      }
      return acc;
    }

    if (parsed.name === 'role') {
      acc.role = parsed.rawValue ?? 'true';
      return acc;
    }

    if (parsed.name === 'slot') {
      acc.slot = parsed.rawValue ?? 'true';
      return acc;
    }

    acc.props[parsed.name] = parsePrimitiveValue(parsed.rawValue, parsed.isBinding);
    return acc;
  }, {
    classes: [],
    props: {},
  });

  return {
    ...(reduced.classes.length > 0 ? { classes: Array.from(new Set(reduced.classes)) } : {}),
    ...(Object.keys(reduced.props).length > 0 ? { props: reduced.props } : {}),
    ...(reduced.role ? { role: reduced.role } : {}),
    ...(reduced.slot ? { slot: reduced.slot } : {}),
  };
};

const findFirstNodeByComponent = (
  nodes: IntentStructureNode[],
  component: string,
): IntentStructureNode | undefined => {
  const directMatch = nodes.find((node) => node.component === component);
  if (directMatch) {
    return directMatch;
  }

  return nodes
    .map((node) => (node.children && node.children.length > 0 ? findFirstNodeByComponent(node.children, component) : undefined))
    .find((node): node is IntentStructureNode => Boolean(node));
};

const parseMarkupToStructure = (markup: string): IntentStructureNode[] => {
  const tokenPattern = /<!--[\s\S]*?-->|<\/?[a-zA-Z][\w:-]*\b[^>]*\/?>|[^<]+/g;
  const root: IntentStructureNode = { children: [], component: '__root__' };
  const stack: IntentStructureNode[] = [root];

  const tokens = markup.match(tokenPattern) ?? [];
  tokens.forEach((token) => {
    const currentParent = stack[stack.length - 1];

    if (token && !token.startsWith('<!--') && token.startsWith('</')) {
      const closeName = token.slice(2, -1).trim().toLowerCase();
      while (stack.length > 1) {
        const top = stack.pop();
        if (top?.component.toLowerCase() === closeName) {
          break;
        }
      }
    } else if (token && !token.startsWith('<!--') && token.startsWith('<')) {
      const openMatch = token.match(/^<([a-zA-Z][\w:-]*)([^>]*)\/?>(?:\s*)$/);
      if (openMatch) {
        const tagName = (openMatch[1] ?? '').toLowerCase();
        const attrSource = openMatch[2] ?? '';
        const isSelfClosing = token.endsWith('/>');
        const node: IntentStructureNode = {
          component: tagName,
          ...parseAttributes(attrSource),
        };

        currentParent.children = currentParent.children ?? [];
        currentParent.children.push(node);

        if (!isSelfClosing) {
          stack.push(node);
        }
      }
    } else if (token && !token.startsWith('<!--')) {
      const normalizedText = token.replace(/\s+/g, ' ').trim();
      if (!normalizedText) {
        return;
      }

      currentParent.children = currentParent.children ?? [];
      currentParent.children.push({ component: 'text', text: normalizedText });
    }
  });

  return root.children ?? [];
};

/**
 * Validates whether a component usage matches intent rules.
 * @param server The MCP server instance used for tool registration.
 */
export const intentComponentValidateTool = (server: McpServer) => {
  server.registerTool(
    'intent-component-validate',
    {
      annotations: createToolAnnotations(),
      description: 'Answer the question: Do I use a component correctly for a specific intent?',
      inputSchema: {
        component: z.string().startsWith('syn-').describe('Component tag name, for example syn-button.'),
        framework: frameworkSchema.optional().describe('Target framework profile. Defaults to vanilla.'),
        includePhases: z.array(intentPhaseSchema).optional().describe('Optional phase filter. Defaults to ["experimental"].'),
        intent: z.string().min(1).describe('Intent ID, for example action.submit.'),
        markup: z.string().min(1).describe('Template or markup source. The tool auto-derives structure for validation from this content.'),
      },
      title: 'Intent component validate',
    },
    toolHandler('intent-component-validate', async ({
      component,
      framework,
      includePhases,
      intent,
      markup,
    }: {
      component: string;
      framework?: z.infer<typeof frameworkSchema>;
      includePhases?: IntentPhase[];
      intent: string;
      markup: string;
    }) => {
      const { tools } = getRuntimeConfig();
      const aiRules = await getToolRule('intent-component-validate');

      const parsedNodes = parseMarkupToStructure(markup);
      const normalizedStructure = findFirstNodeByComponent(parsedNodes, component)
        ?? {
          children: parsedNodes,
          component,
        };

      const response = await validateComponent({
        component,
        framework: framework ?? tools.intentComponentValidate.framework ?? INTENT_DEFAULT_FRAMEWORK,
        includePhases: includePhases ?? tools.intentComponentValidate.includePhases ?? [...INTENT_DEFAULT_PHASES],
        intent,
        structure: normalizedStructure,
      });

      if (!response.data) {
        const message = response.errors?.[0]?.message ?? `No validation result available for component ${component}.`;
        return [aiRules, message];
      }

      return [aiRules, response.data];
    }),
  );
};

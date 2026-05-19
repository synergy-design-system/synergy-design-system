import type { IntentPresetValue, IntentStructureNode, IntentUsagePattern } from '../types.js';
import type { FrameworkProfile } from '../intermediate-representation/types.js';
import { resolveFrameworkComponentName } from '../mappings/framework-targets.js';

const escapeAttribute = (value: string): string => value.replace(/"/g, '&quot;');

const renderPropValue = (
  key: string,
  value: IntentPresetValue,
  framework: FrameworkProfile,
): string => {
  if (typeof value === 'boolean') {
    if (!value) {
      return '';
    }

    if (framework === 'react-wrapper') {
      return ` ${key}={true}`;
    }

    return ` ${key}`;
  }

  if (value === null) {
    return '';
  }

  return ` ${key}="${escapeAttribute(String(value))}"`;
};

const renderProps = (
  props: Record<string, IntentPresetValue> | undefined,
  framework: FrameworkProfile,
): string => {
  if (!props) {
    return '';
  }

  return Object.entries(props)
    .map(([key, value]) => renderPropValue(key, value, framework))
    .join('');
};

const extractRenderableNodeProps = (
  node: IntentStructureNode,
): Record<string, IntentPresetValue> | undefined => {
  const requiredRuleProps = (node.config?.propRules ?? [])
    .filter((rule) => rule.kind === 'requiredEquals')
    .reduce<Record<string, IntentPresetValue>>((acc, rule) => {
      acc[rule.prop] = rule.value;
      return acc;
    }, {});

  const mergedProps = {
    ...requiredRuleProps,
    ...(node.props ?? {}),
  };

  return Object.keys(mergedProps).length > 0 ? mergedProps : undefined;
};

const renderStructureNode = (
  node: IntentStructureNode,
  framework: FrameworkProfile,
  fallbackContent = '',
): string => {
  if (node.component === 'text') {
    return node.text ?? '';
  }

  const component = resolveFrameworkComponentName(node.component, framework);
  const slotAttribute = node.slot ? ` slot="${escapeAttribute(node.slot)}"` : '';
  const hasStructuredChildren = !!node.children && node.children.length > 0;

  const childrenParts: string[] = [];

  if (node.text) {
    childrenParts.push(node.text);
  } else if (!hasStructuredChildren) {
    childrenParts.push(fallbackContent);
  }

  if (hasStructuredChildren) {
    childrenParts.push(...node.children!.map((child) => renderStructureNode(child, framework)));
  }

  const children = childrenParts.join('');

  return `<${component}${slotAttribute}${renderProps(extractRenderableNodeProps(node), framework)}>${children}</${component}>`;
};

const inferPatternComponent = (pattern: IntentUsagePattern): string => {
  if (pattern.target.name) {
    return pattern.target.name;
  }

  if (pattern.target.id?.includes(':')) {
    return pattern.target.id.split(':')[1] ?? pattern.target.id;
  }

  return 'div';
};

/**
 * Extract renderable props from a pattern structure root config.propRules (requiredEquals rules)
 * or fall back to the legacy preset.props field.
 */
const extractRenderableProps = (pattern: IntentUsagePattern): Record<string, IntentPresetValue> | undefined => {
  const propRules = pattern.structure?.config?.propRules;
  if (propRules && propRules.length > 0) {
    const props: Record<string, IntentPresetValue> = {};
    for (const rule of propRules) {
      if (rule.kind === 'requiredEquals') {
        props[rule.prop] = rule.value;
      }
    }
    return Object.keys(props).length > 0 ? props : undefined;
  }

  return pattern.preset?.props;
};

/**
 * Render one usage pattern into framework-specific component markup.
 */
export const renderIntentUsagePattern = (
  pattern: IntentUsagePattern,
  framework: FrameworkProfile,
  content: string,
): string => {
  if (pattern.structure) {
    return renderStructureNode(pattern.structure, framework, content);
  }

  const component = resolveFrameworkComponentName(inferPatternComponent(pattern), framework);
  const props = renderProps(extractRenderableProps(pattern), framework);
  return `<${component}${props}>${content}</${component}>`;
};

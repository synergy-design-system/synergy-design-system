import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getIntentPolicyDocuments } from '../domains/intent-policy-document.js';
import type {
  IntentCategory,
  IntentContentRule,
  IntentContentSource,
  IntentDefinition,
  IntentPhase,
  IntentPropRule,
  IntentStructureNode,
  IntentUsagePattern,
  MetadataStoreOptions,
} from '../types.js';
import { buildSkillRootMarkdown, readSkillBody } from './shared.js';
import type { SkillGenerationMetadata } from './types.js';

const ALL_PHASES: IntentPhase[] = ['stable', 'preview', 'experimental', 'deprecated'];
const VANILLA_FRAMEWORKS = ['vanilla'] as const;

type MarkdownVariant = {
  isDefault: boolean;
  label: string;
  pattern: IntentUsagePattern | null;
  previews: Array<{ code: string; framework: string }>;
  reason: string;
};

const formatValue = (value: boolean | null | number | string): string => {
  if (typeof value === 'string') return `\`${value}\``;
  if (value === null) return '`null`';
  return `\`${String(value)}\``;
};

const formatSource = (source: IntentContentSource): string => {
  switch (source.kind) {
    case 'children': return 'children';
    case 'prop': return `prop \`${source.prop}\``;
    case 'slot': return `slot \`${source.slot}\``;
    case 'text': return 'text';
    default: throw new Error(`Unsupported intent content source: ${String(source)}`);
  }
};

const renderRuleDetails = (rule: { rationale?: string; suggestedFix?: string }): string => {
  const details: string[] = [];
  if (rule.rationale) details.push(`Rationale: ${rule.rationale}`);
  if (rule.suggestedFix) details.push(`Suggested fix: ${rule.suggestedFix}`);
  return details.length > 0 ? `\n  ${details.join('\n  ')}` : '';
};

const getTargetAnchor = (targetId: string): string => `target-${targetId}`;

const assertNever = (value: never): never => {
  throw new Error(`Unsupported intent prop rule: ${String(value)}`);
};

export const renderPropRulesChecklist = (rules: IntentPropRule[] = []): string => rules.map((rule) => {
  const label = (() => {
    switch (rule.kind) {
      case 'required': return `**Required**: provide \`${rule.prop}\`.`;
      case 'requiredEquals': return `**Required**: \`${rule.prop}\` must equal ${formatValue(rule.value)}.`;
      case 'forbidden': return `**Forbidden**: do not provide \`${rule.prop}\`.`;
      case 'recommendedEquals': return `**Recommended**: set \`${rule.prop}\` to ${formatValue(rule.value)}.`;
      case 'warnWhenEquals': return `**Warning**: review \`${rule.prop}\` when it equals ${formatValue(rule.value)}.`;
      default: return assertNever(rule);
    }
  })();
  return `- ${label} ${rule.message}${renderRuleDetails(rule)}`;
}).join('\n');

export const renderContentRulesChecklist = (rules: IntentContentRule[] = []): string => rules.map((rule) => {
  const label = rule.kind === 'requiredContent'
    ? '**Required**: provide visible content.'
    : `**Required**: provide content through one of: ${rule.sources.map(formatSource).join(', ')}.`;
  return `- ${label} ${rule.message}${renderRuleDetails(rule)}`;
}).join('\n');

export const renderStructureChecklist = (node?: IntentStructureNode, depth = 0): string => {
  if (!node) return '';
  const indent = '  '.repeat(depth);
  const details = [node.role ? `role \`${node.role}\`` : '', node.slot ? `slot \`${node.slot}\`` : '', node.text ? `text "${node.text}"` : ''].filter(Boolean).join(', ');
  const lines = [`${indent}- Use \`${node.component}\`${details ? ` (${details})` : ''}.`];
  if (node.requiredClasses?.length) lines.push(`${indent}  - Required classes: ${node.requiredClasses.map((value) => `\`${value}\``).join(', ')}.`);
  if (node.forbiddenClasses?.length) lines.push(`${indent}  - Forbidden classes: ${node.forbiddenClasses.map((value) => `\`${value}\``).join(', ')}.`);
  if (node.props) lines.push(`${indent}  - Recommended props: ${Object.entries(node.props).map(([key, value]) => `\`${key}\`=${formatValue(value)}`).join(', ')}.`);
  if (node.config?.propRules) lines.push(renderPropRulesChecklist(node.config.propRules).split('\n').map((line) => `${indent}  ${line}`).join('\n'));
  if (node.config?.contentRules) lines.push(renderContentRulesChecklist(node.config.contentRules).split('\n').map((line) => `${indent}  ${line}`).join('\n'));
  for (const child of node.children ?? []) lines.push(renderStructureChecklist(child, depth + 1));
  return lines.join('\n');
};

const renderInterface = (intent: IntentDefinition, targetLabels: string[]): string => [
  `# ${intent.id}`, '', `- **Category:** \`${intent.category}\``, `- **Phase:** ${intent.phase ?? 'unspecified'}`, '',
  '## Description', '', intent.description, '', '## User Goal', '', intent.userGoal, '', '## Supported Targets', '',
  ...targetLabels.map((target) => `- [\`${target}\`](./rules.md#${getTargetAnchor(target)})`),
].join('\n');

const renderPatternRules = (pattern: IntentUsagePattern): string[] => {
  const sections: string[] = [];
  if (pattern.preset?.props && Object.keys(pattern.preset.props).length > 0) sections.push('### Recommended Props', '', ...Object.entries(pattern.preset.props).map(([key, value]) => `- **Recommended**: set \`${key}\` to ${formatValue(value)}.`), '');
  if (pattern.preset?.forbiddenProps?.length) sections.push('### Forbidden Props', '', ...pattern.preset.forbiddenProps.map((prop) => `- **Forbidden**: do not provide \`${prop}\`.`), '');
  if (pattern.preset?.advisoryRules?.length) sections.push('### Advisory Checks', '', ...pattern.preset.advisoryRules.map((rule) => `- **${rule.severity ?? 'warning'}**: ${rule.message}${renderRuleDetails(rule)}`), '');
  if (pattern.structure) sections.push('### Structure Checks', '', renderStructureChecklist(pattern.structure), '');
  return sections;
};

const renderRules = (intentId: string, variants: MarkdownVariant[]): string => {
  const sections: string[] = [`# Rules for ${intentId}`, '', 'Use this checklist to review code implementing the intent.', ''];
  for (const variant of variants) {
    if (!variant.pattern) continue;
    sections.push(`<a id="${getTargetAnchor(variant.label)}"></a>`);
    sections.push(`## ${variant.label}`, '', `- **Role:** ${variant.pattern.targetRole ?? 'standalone'}`, `- **Priority:** ${variant.pattern.priority ?? 0}`, '', variant.pattern.description, '');
    if (variant.pattern.notes?.length) sections.push(...variant.pattern.notes.map((note) => `> ${note}`), '');
    sections.push(...renderPatternRules(variant.pattern));
  }
  return sections.join('\n').trim();
};

const renderExamples = (intentId: string, variants: MarkdownVariant[]): string => [
  `# Examples for ${intentId}`, '',
  ...variants.flatMap((variant) => [`## ${variant.label}${variant.isDefault ? ' (Default)' : ''}`, '', variant.reason, '', ...variant.previews.flatMap((preview) => [`### ${preview.framework}`, '', '```html', preview.code, '```', ''])]),
].join('\n').trim();

const getIntentDirectoryName = (category: IntentCategory, intent: IntentDefinition): string => {
  const prefix = `${category.id}.`;
  return intent.id.startsWith(prefix) ? intent.id.slice(prefix.length) : intent.id;
};

const renderRootIndex = (categories: IntentCategory[]): string => [
  '# Synergy Intent Policy', '',
  'Use the category indexes to find the intent that matches a user goal.', '',
  ...categories.map((category) => `- [${category.id}](./${category.id}/README.md)${category.phase ? ` (${category.phase})` : ''}`),
].join('\n');

const renderCategoryIndex = (category: IntentCategory, intents: IntentDefinition[]): string => [
  `# ${category.id} intents`, '', category.description, '',
  ...intents
    .toSorted((left, right) => left.id.localeCompare(right.id))
    .map((intent) => `- [${intent.id}](./${getIntentDirectoryName(category, intent)}/interface.md)${intent.phase ? ` (${intent.phase})` : ''}`),
].join('\n');

export const generateIntentSkill = async (
  outputPath: string,
  metadata: SkillGenerationMetadata,
  storeOptions: MetadataStoreOptions = {},
): Promise<void> => {
  const skillPath = join(outputPath, 'synergy-intent-policy');
  const intentsPath = join(skillPath, 'intents');
  await mkdir(intentsPath, { recursive: true });
  await writeFile(join(skillPath, 'SKILL.md'), buildSkillRootMarkdown('synergy-intent-policy', 'Local Synergy Design System intent reference without MCP. Use to choose suitable UI patterns, generate starting points, and review code against user goals, supported targets, implementation rules, and examples.', { ...metadata, contentLayer: 'interface,rules,examples', skillType: 'intent-reference' }, await readSkillBody('intents')), 'utf-8');

  const documents = await getIntentPolicyDocuments({ frameworks: VANILLA_FRAMEWORKS, includePhases: ALL_PHASES }, storeOptions);
  const categories = documents.map(({ category }) => category);
  await writeFile(join(intentsPath, 'README.md'), renderRootIndex(categories), 'utf-8');

  for (const document of documents) {
    const categoryPath = join(intentsPath, document.category.id);
    await mkdir(categoryPath, { recursive: true });
    await writeFile(join(categoryPath, 'README.md'), renderCategoryIndex(document.category, document.intents.map(({ intent }) => intent)), 'utf-8');

    for (const { intent, variants } of document.intents) {
      const markdownVariants = variants.map((variant) => ({
        isDefault: variant.isDefault,
        label: variant.target.id ?? variant.target.kind,
        pattern: variant.pattern,
        previews: variant.previews.map(({ code, framework }) => ({ code, framework })),
        reason: variant.reason,
      }));
      const intentPath = join(categoryPath, getIntentDirectoryName(document.category, intent));
      await mkdir(intentPath, { recursive: true });
      await writeFile(join(intentPath, 'interface.md'), renderInterface(intent, markdownVariants.map(({ label }) => label)), 'utf-8');
      await writeFile(join(intentPath, 'rules.md'), renderRules(intent.id, markdownVariants), 'utf-8');
      await writeFile(join(intentPath, 'examples.md'), renderExamples(intent.id, markdownVariants), 'utf-8');
    }
  }
};

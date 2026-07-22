import * as meta from '@synergy-design-system/metadata';

import { metadataStoreOptions } from './metadataStoreOptions';

const CHANGELOG_PACKAGES = [
  { id: 'assets', name: 'Assets' },
  { id: 'components', name: 'Components' },
  { id: 'fonts', name: 'Fonts' },
  { id: 'mcp', name: 'MCP' },
  { id: 'metadata', name: 'Metadata' },
  { id: 'styles', name: 'Styles' },
  { id: 'tokens', name: 'Tokens' },
] as const;

const ADDITIONAL_LINKS = [
  { href: '/accessibility', id: 'accessibility', name: 'Accessibility' },
  { href: '/brand-support', id: 'brand-support', name: 'Brand Support' },
  { href: '/goals', id: 'goals', name: 'Goals and Guidelines' },
  { href: '/misconceptions', id: 'misconceptions', name: 'Misconceptions' },
  { href: '/out-of-scope', id: 'out-of-scope', name: 'Out of Scope' },
] as const;

export type DocsEntryKind =
  | 'component'
  | 'template'
  | 'style'
  | 'intent-policy'
  | 'changelog'
  | 'additional';

export type DocsIndexEntry = {
  aiPath?: string;
  id: string;
  kind: DocsEntryKind;
  name: string;
  path: string;
  sectionId: string;
  sectionName: string;
};

export type DocsIndexSection = {
  entries: DocsIndexEntry[];
  iconName: string;
  id: string;
  name: string;
  rootPath: string;
  showIntentBadge?: boolean;
  slot?: 'footer';
};

const capitalizeFirst = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

const toAiPath = (path: string): string => `${path}/ai.md`;

export const buildDocsIndex = async (): Promise<DocsIndexSection[]> => {
  const [
    components,
    templates,
    styles,
    intentCategories,
  ] = await Promise.all([
    meta.listComponents({}, metadataStoreOptions),
    meta.listTemplates({}, metadataStoreOptions),
    meta.listStyles({}, metadataStoreOptions),
    meta.listIntentCategories(metadataStoreOptions, {
      includePhases: ['experimental'],
    }),
  ]);

  const sections: DocsIndexSection[] = [
    {
      entries: components.data.map(component => {
        const path = `/component/${component.id.replace(/^component:/, '')}`;
        return {
          aiPath: toAiPath(path),
          id: component.id,
          kind: 'component',
          name: component.name,
          path,
          sectionId: 'components',
          sectionName: 'Components',
        };
      }),
      iconName: 'brick',
      id: 'components',
      name: 'Components',
      rootPath: '/component',
    },
    {
      entries: templates.data.map(template => {
        const path = `/template/${template.id.replace(/^template:/, '')}`;
        return {
          aiPath: toAiPath(path),
          id: template.id,
          kind: 'template',
          name: template.name,
          path,
          sectionId: 'templates',
          sectionName: 'Templates',
        };
      }),
      iconName: 'pattern',
      id: 'templates',
      name: 'Templates',
      rootPath: '/template',
    },
    {
      entries: styles.data.map(style => {
        const path = `/style/${style.id.replace(/^style:/, '')}`;
        return {
          aiPath: toAiPath(path),
          id: style.id,
          kind: 'style',
          name: style.name,
          path,
          sectionId: 'styles',
          sectionName: 'Styles',
        };
      }),
      iconName: 'css',
      id: 'styles',
      name: 'Styles',
      rootPath: '/style',
    },
  ];

  if (intentCategories.data.length > 0) {
    sections.push({
      entries: intentCategories.data.map(category => {
        const path = `/intent-policy/${category.id}`;
        return {
          aiPath: toAiPath(path),
          id: category.id,
          kind: 'intent-policy',
          name: capitalizeFirst(category.id),
          path,
          sectionId: 'intent-policies',
          sectionName: 'Intent Policies',
        };
      }),
      iconName: 'more',
      id: 'intent-policies',
      name: 'Intent Policies',
      rootPath: '/intent-policy',
      showIntentBadge: true,
    });
  }

  sections.push(
    {
      entries: CHANGELOG_PACKAGES.map(pkg => {
        const path = `/changelog/${pkg.id}`;
        return {
          aiPath: toAiPath(path),
          id: pkg.id,
          kind: 'changelog',
          name: pkg.name,
          path,
          sectionId: 'changelog',
          sectionName: 'Package Changelogs',
        };
      }),
      iconName: 'receipt_long',
      id: 'changelog',
      name: 'Package Changelogs',
      rootPath: '/changelog',
    },
    {
      entries: ADDITIONAL_LINKS.map(link => ({
        aiPath: toAiPath(link.href),
        id: link.id,
        kind: 'additional',
        name: link.name,
        path: link.href,
        sectionId: 'additional-information',
        sectionName: 'Additional Information',
      })),
      iconName: 'tips_and_updates',
      id: 'additional-information',
      name: 'Additional Information',
      rootPath: '/additional-information',
      slot: 'footer',
    },
  );

  return sections;
};

export const flattenDocsIndex = (sections: DocsIndexSection[]): DocsIndexEntry[] => (
  sections.flatMap(section => section.entries)
);

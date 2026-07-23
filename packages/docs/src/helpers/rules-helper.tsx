import React, { useEffect, useState } from 'react';
import { Markdown } from '@storybook/addon-docs/blocks';
import {
  type Component as ComponentHelperType,
  generateStoryDescription,
} from './component.js';
import '../../../components/src/components/alert/alert.js';
import '../../../components/src/components/badge/badge.js';
import '../../../components/src/components/card/card.js';
import '../../../components/src/components/divider/divider.js';
import '../../../components/src/components/icon-button/icon-button.js';
import '../../../components/src/components/spinner/spinner.js';
import '../../../components/src/components/tooltip/tooltip.js';

type UsageGuideline = {
  content: string[];
  id: string;
  name: string;
};

type ComponentRules = {
  accessibility?: string[];
  component: string;
  related?: {
    components?: string[];
    templates?: string[];
  };
  usageGuidelines?: UsageGuideline[];
  useCases?: string[];
};

type RuleModule = { default?: ComponentRules };
type RuleModuleLoader = () => Promise<RuleModule>;
type CoreComponentMetadata = {
  custom?: {
    override?: {
      figmaComponentId?: string;
      figmaDocsId?: string;
    };
  };
  since?: string;
  status?: string;
};
type CoreComponentModule = { default?: CoreComponentMetadata };
type CoreComponentModuleLoader = () => Promise<CoreComponentModule>;

const ruleModules = import.meta.glob<RuleModule>('../../../metadata/config/rules/*.js');
const coreComponentModules = import.meta.glob<CoreComponentModule>('../../../metadata/data/core/component/*.json');

const ruleModulesByItem = Object.entries(ruleModules).reduce(
  (acc, [fullPath, loader]) => {
    const fileName = fullPath.split('/').pop();
    const itemKey = fileName?.replace(/\.js$/, '');

    if (itemKey) {
      acc[itemKey] = loader;
    }

    return acc;
  },
  {} as Record<string, RuleModuleLoader>,
);

const coreComponentModulesByItem = Object.entries(coreComponentModules).reduce(
  (acc, [fullPath, loader]) => {
    const fileName = fullPath.split('/').pop();
    const itemKey = fileName?.replace(/\.json$/, '');

    if (itemKey) {
      acc[itemKey] = loader;
    }

    return acc;
  },
  {} as Record<string, CoreComponentModuleLoader>,
);

type RulesState = {
  content: ComponentRules | null;
  coreMetadata: CoreComponentMetadata | null;
  status: 'loading' | 'loaded' | 'error';
};

type RulesHelperProps = {
  children?: React.ReactNode;
  forItem: string;
};

type RulesBlockProps = {
  heading: string;
  headlineType?: 'h2' | 'h3';
  rules: string[];
};

/**
 * Helper css for the rules helper component. This is kept separate from the component itself for easier maintenance and to avoid issues with dynamic content rendering.
 */
const styles = `
.rules-helper {
  width: 100%;
  max-width: 100%; /* Needed for custom overrides in stories like syn-card -> footer */
}

.rules-helper-content {
  font: var(--syn-font-sans);
  font-size: var(--syn-font-size-medium);

  h2 {
    border: none;
    font: var(--syn-heading-2x-large);
    padding: 0;
  }

  h3 {
    border: none;
    font: var(--syn-heading-x-large);
    margin: 0 0 var(--syn-spacing-medium) 0;
    padding: 0;
  }

  ul {
    margin: 0 0 var(--syn-spacing-medium) !important;
  }

  li {
    margin-bottom: var(--syn-spacing-2x-small) !important;
  }
}

.rules-helper-header {
  align-items: center;
  display: flex;
  justify-content: space-between;

  h1 {
    margin: 0 !important;
  }

  nav {
    align-items: center;
    display: flex;
    gap: var(--syn-spacing-small);
    justify-content: center;
  }
}
`;

const RulesBlock: React.FC<RulesBlockProps> = ({
  heading,
  headlineType = 'h2',
  rules,
}) => (
  <section className="rules-helper-section">
    {headlineType === 'h2' ? (
      <Markdown>{`## ${heading}`}</Markdown>
    ) : (
      <Markdown>{`### ${heading}`}</Markdown>
    )}
    <Markdown>{`${rules.map(rule => `- ${rule}`).join('\n')}`}</Markdown>
    {headlineType === 'h2' && <syn-divider />}
  </section>
);

/**
 * Component that renders rules for components or styles.
 * Draws data dynamically from the metadata package source.
 */
// eslint-disable-next-line complexity
export const RulesHelper: React.FC<RulesHelperProps> = ({ children, forItem }) => {
  const [{
    content,
    coreMetadata,
    status,
  }, setRuleData] = useState<RulesState>({
    content: null,
    coreMetadata: null,
    status: 'loading',
  });

  useEffect(() => {
    // #1334: Breaking Change: We now use "__" as a separator in the file system for entity IDs instead of ":"
    // to avoid issues with file paths on some operating systems.
    // This means that the entity ID "component:syn-button" is now stored as "component__syn-button" in the file system.
    // The rules helper will automatically handle this change when loading rules for components or styles.
    const moduleId = forItem.replace(':', '__');
    const loadRule = ruleModulesByItem[moduleId];
    const loadCoreComponent = coreComponentModulesByItem[moduleId];

    if (!loadRule) {
      setRuleData({ content: null, coreMetadata: null, status: 'error' });
      return;
    }

    Promise.all([
      loadRule(),
      loadCoreComponent ? loadCoreComponent().catch(() => null) : Promise.resolve(null),
    ])
      .then(([ruleModule, coreComponentModule]) => {
        setRuleData({
          content: ruleModule.default || null,
          coreMetadata: coreComponentModule?.default || null,
          status: 'loaded',
        });
      })
      .catch(() => setRuleData({ content: null, coreMetadata: null, status: 'error' }));
  }, [forItem]);

  if (status === 'loading') {
    return (
      <syn-spinner style={{ fontSize: 'var(--syn-spacing-large)' }} />
    );
  }

  if (status === 'error') {
    return (
      <syn-alert variant="danger" open>Error loading rules for "{forItem}".</syn-alert>
    );
  }

  if (!content) {
    return (
      <syn-alert variant="danger" open>No content available for "{forItem}".</syn-alert>
    );
  }

  const componentWithoutPrefix = content.component.replace('syn-', '');
  const description = generateStoryDescription(componentWithoutPrefix as ComponentHelperType<'components'>, 'default');
  const figmaDocsId = coreMetadata?.custom?.override?.figmaDocsId;
  // Check if it is a full URL (starts with http or https), otherwise treat it as a node id
  const figmaDocsUrl = figmaDocsId && (figmaDocsId.startsWith('http') ? figmaDocsId : `https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=${figmaDocsId}`);

  const component = content.component.toLowerCase();
  const subPath = component === 'syn-chart' ? 'charts' : 'components';
  const storybookPath = `/?path=/docs/${subPath}-${component}--docs`;

  // Final output
  return (
    <>
      <syn-card
        className="rules-helper sbdocs syn-sick2025-light"
        shadow
        sharp
      >
        <div className="rules-helper-header" slot="header">
          <Markdown>{`# ${content.component}`}</Markdown>

          <nav>
            {coreMetadata?.status && (
              <syn-tooltip>
                <div slot="content">
                  <strong>Current development status.</strong>
                  <ul>
                    <li style={{ color: 'var(--syn-color-neutral-0)' }}><strong>Stable:</strong> fully released and ready for production use.</li>
                    <li style={{ color: 'var(--syn-color-neutral-0)' }}><strong>Deprecated:</strong> use with caution as this component will be removed in the future.</li>
                    <li style={{ color: 'var(--syn-color-neutral-0)' }}><strong>Experimental:</strong> use with caution as it is in early access and potentially gets changes in the future.</li>
                  </ul>
                </div>
                <syn-badge variant={coreMetadata.status === 'stable' ? 'success' : 'warning'}>
                  {coreMetadata.status}
                </syn-badge>
              </syn-tooltip>
            )}
            {coreMetadata?.since && (
              <syn-tooltip content={`Available since version ${coreMetadata.since}.`}>
                <syn-badge variant="neutral">
                  {coreMetadata.since}
                </syn-badge>
              </syn-tooltip>
            )}
            <syn-tooltip content="View Storybook documentation">
              <syn-icon-button
                href={storybookPath}
                label="Storybook Documentation"
                size="large"
                src="/storybook-logo.svg"
              />
            </syn-tooltip>

            {figmaDocsUrl && (
              <syn-tooltip content="View Figma documentation">
                <syn-icon-button
                  href={figmaDocsUrl}
                  label="Figma"
                  size="large"
                  src="/figma-logo.svg"
                  target="_blank"
                />
              </syn-tooltip>
            )}
          </nav>
        </div>

        <div className="rules-helper-content">
          <Markdown>## Description</Markdown>
          <Markdown>{description}</Markdown>

          <syn-divider />

          {children && (
            <>
              <Markdown>## Demo</Markdown>
              {children}
              <syn-divider />
            </>
          )}

          {content?.related?.components && content?.related?.components.length > 0 && (
            <>
              <Markdown>## Related components</Markdown>
              <ul>
                {content.related.components.map((comp) => (
                  <li key={comp}>
                    <a className="syn-link" href={`/?path=/docs/components-${comp.toLowerCase()}-overview--docs`}>{comp}</a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {content?.related?.templates && content?.related?.templates.length > 0 && (
            <>
              <Markdown>## Related templates</Markdown>
              <ul>
                {content.related.templates.map((template) => (
                  <li key={template}>
                    <a className="syn-link" href={`/?path=/docs/templates-${template.toLowerCase()}--docs`}>{template}</a>
                  </li>
                ))}
              </ul>
              <syn-divider />
            </>
          )}

          {content.useCases && content.useCases.length > 0 && (
            <RulesBlock
              heading="Common use cases"
              rules={content.useCases}
            />
          )}

          <Markdown>## Usage guidelines</Markdown>

          {(content.usageGuidelines || []).map(({
            content: rules,
            id,
            name,
          }) => (
            <RulesBlock
              key={id}
              heading={name}
              headlineType='h3'
              rules={rules}
            />
          ))}

          {content.accessibility && content.accessibility.length > 0 && (
            <>
              <syn-divider />
              <RulesBlock
                heading="Accessibility"
                rules={content.accessibility}
              />
            </>
          )}
        </div>
      </syn-card>
      <style>{styles}</style>
    </>
  );
};

import React, { useEffect, useState } from 'react';
import { Markdown } from '@storybook/addon-docs/blocks';
import {
  type Component as ComponentHelperType,
  generateStoryDescription,
} from './component.js';
import '../../../components/src/components/alert/alert.js';
import '../../../components/src/components/card/card.js';
import '../../../components/src/components/divider/divider.js';
import '../../../components/src/components/icon-button/icon-button.js';
import '../../../components/src/components/spinner/spinner.js';
import '../../../components/src/components/tooltip/tooltip.js';
import {
  type ComponentOverride,
  type ComponentRules,
} from '../../../metadata/src/config/types.js';

type RuleModule = { default?: ComponentRules };
type RuleModuleLoader = () => Promise<RuleModule>;
type OverrideModule = { default?: ComponentOverride };
type OverrideModuleLoader = () => Promise<OverrideModule>;

const ruleModules = import.meta.glob<RuleModule>('../../../metadata/config/rules/*.js');
const overrideModules = import.meta.glob<OverrideModule>('../../../metadata/config/overrides/*.json');

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

const overrideModulesByItem = Object.entries(overrideModules).reduce(
  (acc, [fullPath, loader]) => {
    const fileName = fullPath.split('/').pop();
    const itemKey = fileName?.replace(/\.json$/, '');

    if (itemKey) {
      acc[itemKey] = loader;
    }

    return acc;
  },
  {} as Record<string, OverrideModuleLoader>,
);

type RulesState = {
  content: ComponentRules | null;
  override: ComponentOverride | null;
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
.rules-helper-content {
  font: var(--syn-font-sans);
  font-size: var(--syn-font-size-medium);

  h2 {
    border: none;
    margin: 0 0 var(--syn-spacing-medium);
    padding: 0;
  }

  h3 {
    border: none;
    margin: 0 0 var(--syn-spacing-small);
    padding: 0;
  }

  ul {
    margin: 0 0 var(--syn-spacing-medium);
  }

  li {
    margin-bottom: var(--syn-spacing-2x-small);
  }
}

.rules-helper-header {
  align-items: center;
  display: flex;
  justify-content: space-between;

  h1 {
    margin: 0 !important;
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
    override,
    status,
  }, setRuleData] = useState<RulesState>({
    content: null,
    override: null,
    status: 'loading',
  });

  useEffect(() => {
    const loadRule = ruleModulesByItem[forItem];
    const loadOverride = overrideModulesByItem[forItem];

    if (!loadRule) {
      setRuleData({ content: null, override: null, status: 'error' });
      return;
    }

    Promise.all([
      loadRule(),
      loadOverride ? loadOverride().catch(() => null) : Promise.resolve(null),
    ])
      .then(([ruleModule, overrideModule]) => {
        setRuleData({
          content: ruleModule.default || null,
          override: overrideModule?.default || null,
          status: 'loaded',
        });
      })
      .catch(() => setRuleData({ content: null, override: null, status: 'error' }));
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
  const description = generateStoryDescription(componentWithoutPrefix as ComponentHelperType, 'default');

  // Final output
  return (
    <>
      <syn-card
        className="rules-helper"
        shadow
        sharp
      >
        <div className="rules-helper-header" slot="header">
          <Markdown>{`# ${content.component}`}</Markdown>

          <nav>
            <syn-tooltip content="View Storybook documentation">
              <syn-icon-button
                href={`/?path=/docs/components-${content.component.toLowerCase()}--docs`}
                src="/storybook-logo.svg"
                label="Storybook Documentation"
                size="large"
              />
            </syn-tooltip>

            {override?.figmaDocsId && (
              <syn-tooltip content="View Figma documentation">
                <syn-icon-button
                  href={`https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=${override.figmaDocsId}`}
                  src="/figma-logo.svg"
                  label="Figma"
                  size="large"
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

          {content?.related?.components && (
            <>
              <Markdown>## Related components</Markdown>
              <ul>
                {content.related.components.map((comp) => (
                  <li key={comp}>
                    <a className="syn-link" href={`/?path=/docs/components--${comp.toLowerCase()}-overview--docs`}>{comp}</a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {content?.related?.templates && (
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

          {content.accessibility && content.accessibility.length > 0 && (
            <RulesBlock
              heading="Accessibility"
              rules={content.accessibility}
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
        </div>
      </syn-card>
      <style>{styles}</style>
    </>
  );
};

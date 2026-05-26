import * as meta from '@synergy-design-system/metadata';
import { withBasePath } from '../utils/basePath';
import { metadataStoreOptions } from '../utils/metadataStoreOptions';

const components = await meta.listComponents({}, metadataStoreOptions);
const templates = await meta.listTemplates({}, metadataStoreOptions);
const styles = await meta.listStyles({}, metadataStoreOptions);
const intentCategories = await meta.experimental_listIntentCategories(metadataStoreOptions, {
  includePhases: [
    process.env.NODE_ENV === 'production' ? 'stable' : 'experimental',
  ],
});

const CHANGELOG_PACKAGES = [
	{ id: 'assets', name: 'Assets' },
	{ id: 'components', name: 'Components' },
	{ id: 'fonts', name: 'Fonts' },
	{ id: 'mcp', name: 'MCP' },
	{ id: 'metadata', name: 'Metadata' },
	{ id: 'styles', name: 'Styles' },
	{ id: 'tokens', name: 'Tokens' },
];

const additionalLinks = [
  { href: '/accessibility', id: 'accessibility', name: 'Accessibility' },
  { href: '/brand-support', id: 'brand-support', name: 'Brand Support' },
  { href: '/goals', id: 'goals', name: 'Goals and Guidelines' },
  { href: '/misconceptions', id: 'misconceptions', name: 'Misconceptions' },
  { href: '/out-of-scope', id: 'out-of-scope', name: 'Out of Scope' },
  { href: '/brand-support', id: 'brand-support', name: 'Brand Support' }
];

type NavigationProps = {
	basePath: string;
	currentPath: string;
};

export default function Navigation({ basePath, currentPath }: NavigationProps) {
	const normalizedCurrentPath = currentPath !== '/' && currentPath.endsWith('/')
		? currentPath.slice(0, -1)
		: currentPath;

	return (
		<syn-side-nav
      variant="sticky"
      open
    >
			<syn-nav-item open={normalizedCurrentPath.includes('/component/')}>
        <syn-icon slot="prefix" name="brick" library="sidenav" />
				Components
				{components.data.map(c => {
					const relativePath = `/component/${c.id.replace(/^component:/, '')}`;
					const href = withBasePath(relativePath, basePath);
					const isCurrent = normalizedCurrentPath === relativePath;

					return (
						<syn-nav-item
							current={isCurrent}
							href={href}
							slot="children"
							key={c.id}
						>
							{c.name}
						</syn-nav-item>
					);
				})}
			</syn-nav-item>
			<syn-nav-item open={normalizedCurrentPath.includes('/template/')}>
        <syn-icon slot="prefix" name="pattern" library="sidenav" />
				Templates
				{templates.data.map(t => {
					const relativePath = `/template/${t.id.replace(/^template:/, '')}`;
					const href = withBasePath(relativePath, basePath);
					const isCurrent = normalizedCurrentPath === relativePath;

					return (
						<syn-nav-item
							current={isCurrent}
							href={href}
							slot="children"
							key={t.id}
						>
							{t.name}
						</syn-nav-item>
					);
				})}
			</syn-nav-item>
			<syn-nav-item open={normalizedCurrentPath.includes('/style/')}>
        <syn-icon slot="prefix" name="css" library="sidenav" />
				Styles
				{styles.data.map(s => {
					const relativePath = `/style/${s.id.replace(/^style:/, '')}`;
					const href = withBasePath(relativePath, basePath);
					const isCurrent = normalizedCurrentPath === relativePath;

					return (
						<syn-nav-item
							current={isCurrent}
							href={href}
							slot="children"
							key={s.id}
						>
							{s.name}
						</syn-nav-item>
					);
				})}
			</syn-nav-item>
			<syn-nav-item open={normalizedCurrentPath.startsWith('/changelog')}>
        <syn-icon slot="prefix" name="receipt_long" library="sidenav" />
				Package Changelogs
				{CHANGELOG_PACKAGES.map(pkg => {
					const relativePath = `/changelog/${pkg.id}`;
					const href = withBasePath(relativePath, basePath);
					const isCurrent = normalizedCurrentPath === relativePath;

					return (
						<syn-nav-item
							current={isCurrent}
							href={href}
							slot="children"
							key={pkg.id}
						>
							{pkg.name}
						</syn-nav-item>
					);
				})}
			</syn-nav-item>

      {intentCategories.data.length > 0 && (
        <syn-nav-item open={normalizedCurrentPath.startsWith('/intent-policy')}>
          <syn-icon name="more" library="sidenav" slot="prefix" />
          Intent Policies
          <syn-tooltip slot="suffix" content="Intent policies are currently in development and subject to change.">
            <syn-badge variant="warning">!</syn-badge>
          </syn-tooltip>

          {intentCategories.data.map(category => {
            const relativePath = `/intent-policy/${category.id}`;
						const href = withBasePath(relativePath, basePath);
            const isCurrent = normalizedCurrentPath === relativePath;

            return (
              <syn-nav-item
                current={isCurrent}
                href={href}
                slot="children"
                key={category.id}
              >
                {category.id.charAt(0).toUpperCase() + category.id.slice(1)}
              </syn-nav-item>
            );
          })}
        </syn-nav-item>
      )}

      <syn-nav-item
        slot="footer"
        open={additionalLinks
					.map(link => link.href)
          .some(path => normalizedCurrentPath.includes(path))
        }
      >
        <syn-icon slot="prefix" name="tips_and_updates" library="sidenav" />
        Additional Information
        {additionalLinks.map(link => (
          <syn-nav-item
            current={normalizedCurrentPath === link.href}
						href={withBasePath(link.href, basePath)}
            slot="children"
            key={link.id}
          >
            {link.name}
          </syn-nav-item>
        ))}
      </syn-nav-item>
		</syn-side-nav>
	);
}

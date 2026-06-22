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
];

type NavigationProps = {
	basePath: string;
	currentPath: string;
};

type NavigationEntry = {
	id: string;
	name: string;
	relativePath: string;
};

type NavigationSection = {
	id: string;
	name: string;
	rootPath: string;
	iconName: string;
	entries: NavigationEntry[];
	slot?: 'footer';
	showIntentBadge?: boolean;
};

function isCurrentPathWithinRoot(path: string, rootPath: string): boolean {
	return path === rootPath || path.startsWith(`${rootPath}/`);
}

function capitalizeFirst(value: string): string {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function Navigation({ basePath, currentPath }: NavigationProps) {
	const normalizedCurrentPath = currentPath !== '/' && currentPath.endsWith('/')
		? currentPath.slice(0, -1)
		: currentPath;

	const navigationSections: NavigationSection[] = [
		{
			id: 'components',
			name: 'Components',
			rootPath: '/component',
			iconName: 'brick',
			entries: components.data.map(component => ({
				id: component.id,
				name: component.name,
				relativePath: `/component/${component.id.replace(/^component:/, '')}`,
			})),
		},
		{
			id: 'templates',
			name: 'Templates',
			rootPath: '/template',
			iconName: 'pattern',
			entries: templates.data.map(template => ({
				id: template.id,
				name: template.name,
				relativePath: `/template/${template.id.replace(/^template:/, '')}`,
			})),
		},
		{
			id: 'styles',
			name: 'Styles',
			rootPath: '/style',
			iconName: 'css',
			entries: styles.data.map(style => ({
				id: style.id,
				name: style.name,
				relativePath: `/style/${style.id.replace(/^style:/, '')}`,
			})),
		},
		...(intentCategories.data.length > 0
			? [{
				id: 'intent-policies',
				name: 'Intent Policies',
				rootPath: '/intent-policy',
				iconName: 'more',
				showIntentBadge: true,
				entries: intentCategories.data.map(category => ({
					id: category.id,
					name: capitalizeFirst(category.id),
					relativePath: `/intent-policy/${category.id}`,
				})),
			} satisfies NavigationSection]
			: []),
		{
			id: 'changelog',
			name: 'Package Changelogs',
			rootPath: '/changelog',
			iconName: 'receipt_long',
			entries: CHANGELOG_PACKAGES.map(pkg => ({
				id: pkg.id,
				name: pkg.name,
				relativePath: `/changelog/${pkg.id}`,
			})),
		},
		{
			id: 'additional-information',
			name: 'Additional Information',
			rootPath: '/additional-information',
			iconName: 'tips_and_updates',
			slot: 'footer',
			entries: additionalLinks.map(link => ({
				id: link.id,
				name: link.name,
				relativePath: link.href,
			})),
		},
	];

	const renderSynSection = (section: NavigationSection) => (
		<syn-nav-item
			key={section.id}
			slot={section.slot}
			open={
				isCurrentPathWithinRoot(normalizedCurrentPath, section.rootPath)
				|| section.entries.some(entry => isCurrentPathWithinRoot(normalizedCurrentPath, entry.relativePath))
			}
		>
			<syn-icon slot="prefix" name={section.iconName} library="sidenav" />
			{section.name}
			{section.showIntentBadge && (
				<syn-tooltip slot="suffix" content="Intent policies are currently in development and subject to change.">
					<syn-badge variant="warning">!</syn-badge>
				</syn-tooltip>
			)}

			{section.entries.map(entry => (
				<syn-nav-item
					current={normalizedCurrentPath === entry.relativePath}
					href={withBasePath(entry.relativePath, basePath)}
					slot="children"
					key={entry.id}
				>
					{entry.name}
				</syn-nav-item>
			))}
		</syn-nav-item>
	);

	return (
		<>
			<syn-side-nav
				variant="sticky"
				open
			>
				{navigationSections.map(section => renderSynSection(section))}
			</syn-side-nav>
			<noscript>
				<nav aria-label="Documentation navigation">
					<ul>
						{navigationSections.map(section => (
							<li key={`noscript-${section.id}`}>
								<span>{section.name}</span>
								<ul>
									{section.entries.map(entry => (
										<li key={`noscript-${entry.id}`}>
											<a href={withBasePath(entry.relativePath, basePath)}>{entry.name}</a>
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</nav>
			</noscript>
		</>
	);
}

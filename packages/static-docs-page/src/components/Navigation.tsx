import * as meta from '@synergy-design-system/metadata';
import { metadataStoreOptions } from '../utils/metadataStoreOptions';

const components = await meta.listComponents({}, metadataStoreOptions);
const templates = await meta.listTemplates({}, metadataStoreOptions);
const styles = await meta.listStyles({}, metadataStoreOptions);

const CHANGELOG_PACKAGES = [
	{ id: 'assets', name: 'Assets' },
	{ id: 'components', name: 'Components' },
	{ id: 'fonts', name: 'Fonts' },
	{ id: 'mcp', name: 'MCP' },
	{ id: 'metadata', name: 'Metadata' },
	{ id: 'styles', name: 'Styles' },
	{ id: 'tokens', name: 'Tokens' },
];

type NavigationProps = {
	basePath: string;
	currentPath: string;
};

export default function Navigation({ basePath, currentPath }: NavigationProps) {
	const toAppHref = (path: string) => `${basePath}${path.replace(/^\//, '')}`;
	const normalizedCurrentPath = currentPath !== '/' && currentPath.endsWith('/')
		? currentPath.slice(0, -1)
		: currentPath;

	return (
		<syn-side-nav variant="sticky" open>
			<syn-nav-item open={normalizedCurrentPath.includes('/component/')}>
				Components
				{components.data.map(c => {
					const relativePath = `/component/${c.id.replace(/^component:/, '')}`;
					const href = toAppHref(relativePath);
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
				Templates
				{templates.data.map(t => {
					const relativePath = `/template/${t.id.replace(/^template:/, '')}`;
					const href = toAppHref(relativePath);
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
				Styles
				{styles.data.map(s => {
					const relativePath = `/style/${s.id.replace(/^style:/, '')}`;
					const href = toAppHref(relativePath);
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
				Package Changelogs
				{CHANGELOG_PACKAGES.map(pkg => {
					const relativePath = `/changelog/${pkg.id}`;
					const href = toAppHref(relativePath);
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
		</syn-side-nav>
	);
}

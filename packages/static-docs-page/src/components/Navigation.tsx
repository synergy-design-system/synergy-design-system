import { withBasePath } from '../utils/basePath';
import { buildDocsIndex } from '../utils/docsIndex';

const navigationSections = await buildDocsIndex();

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

export default function Navigation({ basePath, currentPath }: NavigationProps) {
	const normalizedCurrentPath = currentPath !== '/' && currentPath.endsWith('/')
		? currentPath.slice(0, -1)
		: currentPath;

	const resolvedNavigationSections: NavigationSection[] = navigationSections.map(section => ({
		entries: section.entries.map(entry => ({
			id: entry.id,
			name: entry.name,
			relativePath: entry.path,
		})),
		iconName: section.iconName,
		id: section.id,
		name: section.name,
		rootPath: section.rootPath,
		showIntentBadge: section.showIntentBadge,
		slot: section.slot,
	}));

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
				{resolvedNavigationSections.map(section => renderSynSection(section))}
			</syn-side-nav>
			<noscript>
				<nav aria-label="Documentation navigation">
					<ul>
						{resolvedNavigationSections.map(section => (
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

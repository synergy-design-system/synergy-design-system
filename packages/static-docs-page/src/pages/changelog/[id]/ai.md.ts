import { withBasePath } from '../../../utils/basePath';

const PACKAGE_LABELS: Record<string, string> = {
	angular: '@synergy-design-system/angular',
	assets: '@synergy-design-system/assets',
	components: '@synergy-design-system/components',
	fonts: '@synergy-design-system/fonts',
	metadata: '@synergy-design-system/metadata',
	mcp: '@synergy-design-system/mcp',
	react: '@synergy-design-system/react',
	styles: '@synergy-design-system/styles',
	tokens: '@synergy-design-system/tokens',
	vue: '@synergy-design-system/vue',
};

const basePath = import.meta.env.BASE_URL;

const toAppHref = (path: string): string => withBasePath(path, basePath);

const changelogFiles = import.meta.glob('../../../../../*/CHANGELOG.md', {
	eager: true,
	query: '?raw',
	import: 'default',
}) as Record<string, string>;

export async function getStaticPaths() {
	return Object.keys(changelogFiles).map(path => ({
		params: { id: path.split('/').at(-2)! },
	}));
}

export const GET = async ({ params }: { params: { id?: string } }): Promise<Response> => {
	const { id } = params;

	if (!id) {
		throw new Error('Missing changelog route parameter.');
	}

	const rawChangelog = changelogFiles[`../../../../../${id}/CHANGELOG.md`];
	const label = PACKAGE_LABELS[id] ?? id;
	const htmlUrl = toAppHref(`/changelog/${id}`);

	const content = rawChangelog
		? `# ${label}\n\nHuman-facing HTML page: ${htmlUrl}\n\n${rawChangelog}`
		: `# ${label}\n\nHuman-facing HTML page: ${htmlUrl}\n\nChangelog for package "${id}" not found.`;

	return new Response(content, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
		},
	});
};

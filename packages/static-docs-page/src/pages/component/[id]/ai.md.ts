import {
	getComponentMetadata,
	getDataForComponent,
	listComponents,
} from '@synergy-design-system/metadata';
import { withBasePath } from '../../../utils/basePath';
import { metadataStoreOptions } from '../../../utils/metadataStoreOptions';

const basePath = import.meta.env.BASE_URL;

const toAppHref = (path: string): string => withBasePath(path, basePath);

const formatSection = (title: string, content: string | undefined): string | null => {
	if (!content || content.trim().length === 0) {
		return null;
	}

	return `## ${title}\n\n${content.trim()}`;
};

export async function getStaticPaths() {
	const result = await listComponents({}, metadataStoreOptions);

	return result.data.map(component => ({
		params: { id: component.id.replace(/^component:/, '') },
		props: { componentId: component.id },
	}));
}

export const GET = async ({ params, props }: {
	params: { id?: string };
	props: { componentId?: string };
}): Promise<Response> => {
	const routeId = params.id;
	const { componentId } = props;

	if (!routeId) {
		throw new Error('Missing component route parameter.');
	}

	if (!componentId) {
		throw new Error('Missing component metadata id for route.');
	}

	const [componentMetadata, rulesData, examplesData, interfaceData] = await Promise.all([
		getComponentMetadata(componentId, {
			includeInterfaceSnapshot: true,
			includeLayerRefs: true,
			includeSources: false,
		}, metadataStoreOptions),
		getDataForComponent(componentId, { layer: 'rules' }, metadataStoreOptions),
		getDataForComponent(componentId, { layer: 'examples' }, metadataStoreOptions),
		getDataForComponent(componentId, { layer: 'interface' }, metadataStoreOptions),
	]);

	if (!componentMetadata.data) {
		return new Response(`Component not found: ${routeId}`, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
			},
			status: 404,
		});
	}

	const component = componentMetadata.data;
	const htmlUrl = toAppHref(`/component/${routeId}`);

	const sections = [
		`# ${component.name}`,
		'',
		'This page is assembled from the component metadata package layer files.',
		`Human-facing HTML page: ${htmlUrl}`,
		'',
		formatSection('Rules', rulesData.data?.rules?.map(rule => rule.content.trimEnd()).join('\n\n')),
		formatSection('Interface', interfaceData.data?.interface?.map(entry => entry.content.trimEnd()).join('\n\n')),
		formatSection('Examples', examplesData.data?.examples?.map(example => example.content.trimEnd()).join('\n\n')),
	].filter((section): section is string => !!section);

	return new Response(sections.join('\n\n'), {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
		},
	});
};

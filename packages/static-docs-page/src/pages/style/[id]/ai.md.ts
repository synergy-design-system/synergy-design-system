import {
	getDataForStyle,
	getStyleMetadata,
	listStyles,
} from '@synergy-design-system/metadata';
import { withBasePath } from '../../../utils/basePath';
import { metadataStoreOptions } from '../../../utils/metadataStoreOptions';

const basePath = import.meta.env.BASE_URL;

const toAppHref = (path: string): string => withBasePath(path, basePath);

export async function getStaticPaths() {
	const result = await listStyles({}, metadataStoreOptions);

	return result.data.map(style => ({
		params: { id: style.id.replace(/^style:/, '') },
		props: { styleId: style.id },
	}));
}

export const GET = async ({ params, props }: {
	params: { id?: string };
	props: { styleId?: string };
}): Promise<Response> => {
	const routeId = params.id;
	const { styleId } = props;

	if (!routeId) {
		throw new Error('Missing style route parameter.');
	}

	if (!styleId) {
		throw new Error('Missing style metadata id for route.');
	}

	const [styleMetadata, styleData] = await Promise.all([
		getStyleMetadata(styleId, {}, metadataStoreOptions),
		getDataForStyle(styleId, {}, metadataStoreOptions),
	]);

	if (!styleMetadata.data) {
		return new Response(`Style not found: ${routeId}`, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
			},
			status: 404,
		});
	}

	const style = styleMetadata.data;
	const htmlUrl = toAppHref(`/style/${routeId}`);
	const examples = styleData.data?.examples?.map(example => example.content.trimEnd()).join('\n\n') ?? '';

	const lines = [
		`# ${style.name}`,
		'',
		'This page forwards the style examples markdown from the metadata package.',
		`Human-facing HTML page: ${htmlUrl}`,
		'',
		'## Examples',
		examples || '- No examples available.',
	].join('\n\n');

	return new Response(lines, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
		},
	});
};

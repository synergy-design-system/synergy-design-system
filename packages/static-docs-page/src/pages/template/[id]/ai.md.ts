import {
	getDataForTemplate,
	getTemplateMetadata,
	listTemplates,
} from '@synergy-design-system/metadata';
import { withBasePath } from '../../../utils/basePath';
import { metadataStoreOptions } from '../../../utils/metadataStoreOptions';

const basePath = import.meta.env.BASE_URL;

const toAppHref = (path: string): string => withBasePath(path, basePath);

export async function getStaticPaths() {
	const result = await listTemplates({}, metadataStoreOptions);

	return result.data.map(template => ({
		params: { id: template.id.replace(/^template:/, '') },
		props: { templateId: template.id },
	}));
}

export const GET = async ({ params, props }: {
	params: { id?: string };
	props: { templateId?: string };
}): Promise<Response> => {
	const routeId = params.id;
	const { templateId } = props;

	if (!routeId) {
		throw new Error('Missing template route parameter.');
	}

	if (!templateId) {
		throw new Error('Missing template metadata id for route.');
	}

	const [templateMetadata, templateData] = await Promise.all([
		getTemplateMetadata(templateId, {}, metadataStoreOptions),
		getDataForTemplate(templateId, {}, metadataStoreOptions),
	]);

	if (!templateMetadata.data) {
		return new Response(`Template not found: ${routeId}`, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
			},
			status: 404,
		});
	}

	const template = templateMetadata.data;
	const htmlUrl = toAppHref(`/template/${routeId}`);
	const examples = templateData.data?.examples?.map(example => example.content.trimEnd()).join('\n\n') ?? '';

	const lines = [
		`# ${template.name}`,
		'',
		'This page forwards the template examples markdown from the metadata package.',
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

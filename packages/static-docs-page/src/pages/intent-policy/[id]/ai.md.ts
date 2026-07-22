import {
	getIntentCategory,
	getIntentOptions,
	listIntentCategories,
	listIntents,
	type IntentTargetRef,
} from '@synergy-design-system/metadata';
import { withBasePath } from '../../../utils/basePath';
import { getIntentTargetPath } from '../../../utils/intentTargetPath';
import { metadataStoreOptions } from '../../../utils/metadataStoreOptions';

const basePath = import.meta.env.BASE_URL;

const toAppHref = (path: string): string => withBasePath(path, basePath);

const renderTargetLabel = (target: IntentTargetRef): string => {
	if (target.id) {
		return target.id;
	}

	if (target.name) {
		return `${target.kind}:${target.name}`;
	}

	if (target.selector) {
		return `${target.kind}:${target.selector}`;
	}

	if (target.classes && target.classes.length > 0) {
		return `${target.kind}:.${target.classes.join('.')}`;
	}

	return target.kind;
};

const renderPhaseDescription = (phase?: string): string => {
	switch (phase) {
		case 'deprecated':
			return 'deprecated and may be removed in future releases';
		case 'experimental':
			return 'experimental and may change or be removed in future releases';
		case 'stable':
			return 'stable and ready for production use';
		default:
			return 'unclassified';
	}
};

const renderLink = (label: string, target: IntentTargetRef): string => {
	const targetPath = getIntentTargetPath(target);
	if (!targetPath) {
		return label;
	}

	return `[${label}](${toAppHref(targetPath)})`;
};

const renderCodeBlock = (code: string): string => `\`\`\`html\n${code.trimEnd()}\n\`\`\``;

export async function getStaticPaths() {
	const result = await listIntentCategories(metadataStoreOptions);

	return result.data.map(category => ({
		params: { id: category.id },
	}));
}

export const GET = async ({ params }: { params: { id?: string } }): Promise<Response> => {
	const { id } = params;

	if (!id) {
		throw new Error('Missing intent policy route parameter.');
	}

	const category = await getIntentCategory(id, {}, metadataStoreOptions);
	if (!category.data) {
		return new Response(`Intent policy category not found: ${id}`, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
			},
			status: 404,
		});
	}

	const intents = await listIntents({
		category: id,
		includePhases: ['experimental'],
	}, metadataStoreOptions);

	const renderFrameworks = [
		'vanilla',
		'react-wrapper',
		'react-web-components',
		'angular',
		'vue',
	] as const;

	const variantData = await Promise.all(intents.data.map(async intent => {
		const optionsByFramework = await Promise.all(renderFrameworks.map(async framework => {
			const options = await getIntentOptions({
				framework,
				includePhases: ['experimental'],
				intentId: intent.id,
				maxAlternatives: 20,
			}, metadataStoreOptions);

			return [framework, options.data?.renderableTargets ?? []] as const;
		}));

		const targetMap = new Map<string, {
			defaultTarget: boolean;
			previews: Array<readonly [typeof renderFrameworks[number], string]>;
			reason: string;
			target: IntentTargetRef;
		}>();

		for (const [framework, targets] of optionsByFramework) {
			for (const target of targets) {
				const targetRef: IntentTargetRef = {
					id: target.targetId,
					kind: target.targetId.startsWith('style:') ? 'style' : 'component',
					name: target.targetName,
				};

				const existing = targetMap.get(target.targetId);
				if (existing) {
					existing.defaultTarget = existing.defaultTarget || !!target.reason.includes('default');
					existing.previews.push([framework, target.previewCode] as const);
					continue;
				}

				targetMap.set(target.targetId, {
					defaultTarget: false,
					previews: [[framework, target.previewCode] as const],
					reason: target.reason,
					target: targetRef,
				});
			}
		}

		return {
			intent,
			targets: Array.from(targetMap.values()),
		};
	}));

	const lines = [
		`# Intent Policy: ${category.data.id}`,
		'',
		`Phase: ${category.data.phase ?? 'unclassified'} (${renderPhaseDescription(category.data.phase)})`,
		'',
		'## Description',
		category.data.description,
		'',
		'## Intents',
		...variantData.flatMap(({ intent, targets }) => {
			const intentLines = [
				`### ${intent.id}`,
				'',
				`- Description: ${intent.description}`,
				`- User goal: ${intent.userGoal}`,
				`- Phase: ${intent.phase ?? 'unclassified'} (${renderPhaseDescription(intent.phase)})`,
				'',
				'#### Linked targets',
				...(targets.length > 0
					? targets.map(entry => `- ${renderLink(renderTargetLabel(entry.target), entry.target)}`)
					: ['- No linked targets found.']),
				'',
				'#### Variants',
				...(targets.length > 0
					? targets.flatMap(entry => [
						`- Target: ${renderTargetLabel(entry.target)}`,
						`- Reason: ${entry.reason}`,
						entry.defaultTarget ? '- Default: yes' : '- Default: no',
						'',
						...entry.previews.map(([framework, code]) => [
							`##### ${framework}`,
							renderCodeBlock(code),
							'',
						].join('\n')),
						'',
					])
					: ['- No previews available.']),
			];

			return intentLines;
		}),
	].join('\n');

	return new Response(lines, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
		},
	});
};

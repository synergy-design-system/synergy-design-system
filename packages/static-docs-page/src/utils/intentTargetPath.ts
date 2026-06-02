import type { IntentTargetRef } from '@synergy-design-system/metadata';

const normalizeSlug = (value: string): string | null => {
	const slug = value.trim().replace(/^\./, '');
	return slug.length > 0 ? slug : null;
};

const getCanonicalTargetId = (target: IntentTargetRef): string | null => {
	if (target.id) {
		return target.id;
	}

	if (target.name) {
		return `${target.kind}:${target.name}`;
	}

	return null;
};

/**
 * Maps an intent target reference to a static docs route, if available.
 */
export const getIntentTargetPath = (target: IntentTargetRef): string | null => {
	const canonicalId = getCanonicalTargetId(target);

	if (canonicalId?.startsWith('component:')) {
		const slug = normalizeSlug(canonicalId.replace(/^component:/, ''));
		return slug ? `/component/${slug}` : null;
	}

	if (canonicalId?.startsWith('style:')) {
		const slug = normalizeSlug(canonicalId.replace(/^style:/, ''));
		return slug ? `/style/${slug}` : null;
	}

	if (target.kind === 'component' && target.selector) {
		const slug = normalizeSlug(target.selector);
		return slug ? `/component/${slug}` : null;
	}

	if (target.kind === 'style' && target.selector) {
		const slug = normalizeSlug(target.selector);
		return slug ? `/style/${slug}` : null;
	}

	return null;
};

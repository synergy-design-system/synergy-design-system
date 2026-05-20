const isExternalHref = (value: string): boolean =>
	/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(value) ||
	value.startsWith('mailto:') ||
	value.startsWith('tel:') ||
	value.startsWith('#');

export const normalizePathForNavigation = (pathname: string, base: string): string => {
	if (base === '/') {
		return pathname;
	}

	const normalizedBase = base.endsWith('/') ? base : `${base}/`;
	if (pathname === normalizedBase.slice(0, -1) || pathname === normalizedBase) {
		return '/';
	}

	if (!pathname.startsWith(normalizedBase)) {
		return pathname;
	}

	const withoutBase = pathname.slice(normalizedBase.length);
	return `/${withoutBase}`;
};

export const withBasePath = (value: string, base: string): string => {
	if (!value || isExternalHref(value) || base === '/') {
		return value;
	}

	const normalizedBase = base.endsWith('/') ? base : `${base}/`;
	const trimmedBase = normalizedBase.slice(0, -1);

	if (value === '/') {
		return normalizedBase;
	}

	if (value === trimmedBase || value.startsWith(normalizedBase)) {
		return value;
	}

	if (value.startsWith('/')) {
		return `${trimmedBase}${value}`;
	}

	return `${normalizedBase}${value}`;
};

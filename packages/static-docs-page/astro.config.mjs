// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import expressiveCode from 'astro-expressive-code';

const configuredBase = process.env.STATIC_DOCS_BASE?.trim();
const normalizedBase = !configuredBase || configuredBase === '/'
    ? '/'
    : `/${configuredBase.replace(/^\/+|\/+$/g, '')}/`;

// https://astro.build/config
export default defineConfig({
    base: normalizedBase,
    integrations: [react(), expressiveCode()]
});
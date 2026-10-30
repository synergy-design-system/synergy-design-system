import { withBasePath } from './basePath';

const siteUrl = process.env.STATIC_DOCS_SITE_URL?.replace(/\/+$/, '');

export const docsUrl = (path: string): string => {
  const basedPath = withBasePath(path, import.meta.env.BASE_URL);

  if (!siteUrl || /^https?:\/\//.test(basedPath)) {
    return basedPath;
  }

  return `${siteUrl}${basedPath}`;
};

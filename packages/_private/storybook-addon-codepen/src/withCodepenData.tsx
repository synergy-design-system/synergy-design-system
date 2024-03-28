export type CodepenData = {
  html: string;
  title: string;
  js: string;
};

export type DocsParams = {
  source?: {
    originalSource?: string;
  };
}

export const emptyState: CodepenData = {
  html: '',
  title: '',
  js: '',
};

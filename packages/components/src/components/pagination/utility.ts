const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

/**
 * Calculates the total number of pages based on the total number of items and the selected page size.
 */
export const calculateTotalPages = (totalItems: number, pageSize: number) => Math.ceil(totalItems / pageSize);

/**
 * Calculates the item start and end indices for the current page based on the total number of items, selected page size, and current page number.
 */
export const calculatePageItemIndices = (totalItems: number, pageSize: number, currentPage: number) => {
  const totalPages = calculateTotalPages(totalItems, pageSize);
  const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (validCurrentPage - 1) * pageSize + 1;
  const endIndex = Math.min(validCurrentPage * pageSize, totalItems);

  return {
    endIndex,
    startIndex,
  };
};

/**
 * Clamps the current page number to ensure it falls within the valid range of 1 to the total number of pages.
 * If the provided page number is not a finite number, it defaults to 1.
 */
export const clampPage = (page: number, totalPages: number) => {
  if (!Number.isFinite(page)) return 1;
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
};

/**
 * Calculates the total number of pages based on the page size and total number of items.
 */
export const getTotalPages = (pageSize: number, totalItems: number) => {
  const safeSize = Math.max(1, pageSize);
  return Math.max(1, Math.ceil(totalItems / safeSize));
};

/**
 * Sanitizes the page size options by ensuring they are an array of positive integers.
 * If the input is not valid, it defaults to a predefined set of page size options.
 */
export const sanitizePageSizeOptions = (pageSizeOptions: unknown): number[] => {
  const options = Array.isArray(pageSizeOptions)
    ? pageSizeOptions
    : [];

  const sanitized = options
    .map(value => Number(value))
    .filter(value => Number.isSafeInteger(value) && value > 0);

  return sanitized.length > 0
    ? sanitized
    : DEFAULT_PAGE_SIZE_OPTIONS;
};

/**
 * Calculates the maximum number of characters needed to display the page size options.
 */
export const getMaxOptionCharCount = (pageSizeOptions: number[]) => sanitizePageSizeOptions(pageSizeOptions)
  .reduce(
    (maxChars, option) => Math.max(maxChars, String(option).length),
    1,
  );

/**
 * Calculates the number of characters needed to display the total number of pages.
 */
export const getTotalPagesCharCount = (pageSize: number, totalItems: number) => String(
  getTotalPages(pageSize, totalItems),
).length;

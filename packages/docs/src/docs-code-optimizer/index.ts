/**
 * Optimizes docs preview source by stripping ignore sections.
 * - Removes blocks between HTML markers: <!-- preview-ignore:start --> ... <!-- preview-ignore:end -->
 * - Removes blocks between JS markers: // preview-ignore:start ... // preview-ignore:end
 */
export default function docsCodeOptimizer(code: string) {
  const optimizedCode = code
    .replace(/<!-- preview-ignore:start -->[\s\S]*?<!-- preview-ignore:end -->/g, '')
    .replace(/\/\/ preview-ignore:start[\s\S]*?\/\/ preview-ignore:end/g, '');
  return optimizedCode;
}

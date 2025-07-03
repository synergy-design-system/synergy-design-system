import * as jobs from './mcp/index.js';
import { getManifestData } from './shared.js';

export const runCreateMCPServer = async ({
  angularPackageDir,
  componentDir,
  componentDistDir,
  mcpDir,
  reactPackageDir,
  vuePackageDir,
}) => {
  const metadata = await getManifestData(componentDistDir);

  await jobs.runCleanup(metadata, mcpDir);
  await jobs.runCopyStatic(metadata, {
    angularPackageDir,
    componentDir,
    componentDistDir,
    mcpDir,
    reactPackageDir,
    vuePackageDir,
  });
};

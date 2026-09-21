# syntax=docker/dockerfile:1.7
FROM node:24-alpine

WORKDIR /opt/synergy

# Tarballs are bind-mounted instead of COPYed so they never end up in a layer.
# assets/src holds ~9600 raw SVGs that are already inlined into assets/dist.
RUN --mount=type=secret,id=corp_ca,required=false,target=/run/secrets/corp_ca \
  --mount=type=bind,source=artifacts,target=/artifacts \
  --mount=type=cache,target=/root/.npm \
  set -eu; \
  if [ -f /run/secrets/corp_ca ]; then \
    export NODE_EXTRA_CA_CERTS=/run/secrets/corp_ca NPM_CONFIG_CAFILE=/run/secrets/corp_ca; \
  fi; \
  npm install --global --omit=dev --no-audit --fund=false --prefer-offline \
    /artifacts/synergy-design-system-assets-*.tgz \
    /artifacts/synergy-design-system-metadata-*.tgz \
    /artifacts/synergy-design-system-mcp-*.tgz; \
  rm -rf /usr/local/lib/node_modules/@synergy-design-system/assets/src; \
  npm cache clean --force; \
  syn-mcp --version

COPY docker/entrypoint.sh /usr/local/bin/syn-mcp-entrypoint

RUN chmod +x /usr/local/bin/syn-mcp-entrypoint \
  && mkdir -p /config \
  && chown -R node:node /config /opt/synergy

USER node

EXPOSE 9119

ENTRYPOINT ["syn-mcp-entrypoint"]

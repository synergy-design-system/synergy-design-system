# syntax=docker/dockerfile:1.7
FROM node:24-alpine

WORKDIR /opt/synergy

COPY artifacts/*.tgz /artifacts/

RUN --mount=type=secret,id=corp_ca,required=false,target=/run/secrets/corp_ca \
  --mount=type=cache,target=/root/.npm \
  if [ -f /run/secrets/corp_ca ]; then \
    NODE_EXTRA_CA_CERTS=/run/secrets/corp_ca NPM_CONFIG_CAFILE=/run/secrets/corp_ca npm install --global --omit=dev --no-audit --fund=false --prefer-offline \
      /artifacts/synergy-design-system-assets-*.tgz \
      /artifacts/synergy-design-system-metadata-*.tgz \
      /artifacts/synergy-design-system-mcp-*.tgz; \
  else \
    npm install --global --omit=dev --no-audit --fund=false --prefer-offline \
      /artifacts/synergy-design-system-assets-*.tgz \
      /artifacts/synergy-design-system-metadata-*.tgz \
      /artifacts/synergy-design-system-mcp-*.tgz; \
  fi; \
  npm cache clean --force

COPY docker/entrypoint.sh /usr/local/bin/syn-mcp-entrypoint

RUN chmod +x /usr/local/bin/syn-mcp-entrypoint \
  && mkdir -p /config \
  && chown -R node:node /config /opt/synergy

USER node

EXPOSE 9119

ENTRYPOINT ["syn-mcp-entrypoint"]

FROM oven/bun:1

WORKDIR /app

COPY package.json ./
RUN bun install --production

COPY src ./src
COPY scripts/sync-docs.ts ./scripts/sync-docs.ts
COPY docker-entrypoint.sh ./docker-entrypoint.sh

RUN chmod +x docker-entrypoint.sh \
  && mkdir -p /data \
  && chown -R bun:bun /app /data

USER bun

ENV MCP_DATA_ROOT=/data \
    HOST=0.0.0.0 \
    PORT=4398 \
    MCP_DOCS_SYNC_ON_START=1

EXPOSE 4398
VOLUME ["/data"]

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD bun -e "fetch('http://127.0.0.1:4398/health').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

ENTRYPOINT ["./docker-entrypoint.sh"]

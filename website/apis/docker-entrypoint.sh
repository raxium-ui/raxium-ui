#!/bin/sh
set -eu

export MCP_DATA_ROOT="${MCP_DATA_ROOT:-/data}"
mkdir -p "$MCP_DATA_ROOT"

if [ "${MCP_DOCS_SYNC_ON_START:-1}" = "1" ]; then
  echo "syncing MCP docs into ${MCP_DATA_ROOT}"
  bun run sync:docs
fi

exec bun src/server.ts

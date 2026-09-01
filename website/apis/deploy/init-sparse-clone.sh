#!/usr/bin/env bash
set -euo pipefail

# Sparse-clone this monorepo so the server only materializes website/apis.
# Usage: init-sparse-clone.sh <git-url> [target-dir]

REPO_URL="${1:?usage: init-sparse-clone.sh <git-url> [target-dir]}"
TARGET="${2:-raxium-mcp-apis}"

git clone --filter=blob:none --sparse --depth 1 "$REPO_URL" "$TARGET"
cd "$TARGET"
git sparse-checkout init --cone
git sparse-checkout set website/apis

echo "Sparse clone ready in $TARGET (paths: website/apis)"
echo "Install: cd website/apis && bun install"
echo "Docs:    MCP_DATA_ROOT=/var/lib/raxium-mcp-data bun run sync:docs"
echo "Start:   MCP_DATA_ROOT=/var/lib/raxium-mcp-data bun run start:pm2"

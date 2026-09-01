# MCP 远程数据 API

Fastify 服务，按请求读取组件文档与示例，供 [`@raxium/mcp`](../../packages/mcp) 远程优先模式使用。

文档更新**不必重启进程**。生产环境把「API 代码」和「文档数据」拆开：代码用 sparse clone，文档从 GitHub Release `mcp-docs-latest` 同步。

## 本地开发

在完整仓库里启动时，默认数据根是仓库根目录，无需 `MCP_DATA_ROOT`。

```bash
cd website/apis
bun install
bun run dev
```

## 生产部署

### 1. Sparse clone（只拉 API）

```bash
git clone --filter=blob:none --sparse --depth 1 <repo-url> raxium-mcp-apis
cd raxium-mcp-apis
git sparse-checkout init --cone
git sparse-checkout set website/apis
```

或使用 [`deploy/init-sparse-clone.sh`](./deploy/init-sparse-clone.sh)。路径清单见 [`deploy/sparse-checkout`](./deploy/sparse-checkout)。

若要用 git 树当数据源而不是 Release，再加上 [`deploy/sparse-checkout.docs`](./deploy/sparse-checkout.docs) 里的路径，并**不要**设置 `MCP_DATA_ROOT`。

```bash
cd website/apis
bun install
```

### 2. 同步文档包

CI（[`.github/workflows/mcp-docs.yml`](../../.github/workflows/mcp-docs.yml)）在 `main` 上文档相关路径变更时，打包并覆盖 Release **`mcp-docs-latest`** 的 `mcp-docs.tar.gz`。

服务器：

```bash
export MCP_DATA_ROOT=/var/lib/raxium-mcp-data
export MCP_DOCS_REPO=raxium-ui/raxium-ui   # 可选，默认即此
export GITHUB_TOKEN=...                     # 私有仓必填；公开仓可省略
bun run sync:docs
```

可 cron（例如每 5 分钟）或 GitHub webhook 调 `sync:docs`。解压后目录结构与仓库中 `packages/**` 一致，进程会在下次请求读到新文件。

### 3. 启动

```bash
export MCP_DATA_ROOT=/var/lib/raxium-mcp-data
bun run start:pm2
```

只有 `website/apis` 的代码变更才需要 `git pull`（sparse）并 `bun run restart:pm2`。

## 环境变量

| 变量 | 说明 |
|------|------|
| `MCP_DATA_ROOT` | 文档快照根目录。未设置时回退为仓库根（本地开发）。 |
| `MCP_DOCS_REPO` | `owner/repo`，给 `sync:docs` 用。 |
| `MCP_DOCS_TAG` | Release tag，默认 `mcp-docs-latest`。 |
| `GITHUB_TOKEN` / `GH_TOKEN` | 拉私有 Release 资产。 |
| `PORT` / `HOST` | 默认 `4398` / `0.0.0.0`。 |

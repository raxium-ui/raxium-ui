# rui-ark-mcp

一个通过 `stdio` 提供能力的 MCP Server，支持以下工具：

- `list-components`
- `list-examples`
- `get-example`
- `list-documents`
- `get-document`

当前首版仅支持 `framework=vue`。

## 安装与运行

### 本地开发

```bash
pnpm install
pnpm --filter rui-ark-mcp build
pnpm --filter rui-ark-mcp start
```

### 快速验 5 个工具真实返回（Inspector 风格）

```bash
pnpm --filter rui-ark-mcp build
pnpm --filter rui-ark-mcp smoke:inspector
```

该脚本会通过 `stdio` 启动本地 `dist/cli.js`，并按顺序调用：

- `list-components`
- `list-examples`
- `list-documents`
- `get-example`
- `get-document`

输出为每个 tool 的原始 MCP `callTool` 返回，便于快速检查远程/本地回退结果。

### 通过 npx 启动

发布到 npm 后，可直接通过：

```bash
npx rui-ark-mcp
```

## MCP Client 配置（stdio）

```json
{
  "mcpServers": {
    "rui-ark-mcp": {
      "command": "npx",
      "args": ["-y", "rui-ark-mcp"],
      "env": {
        "MCP_REMOTE_BASE_URL": "https://your-api.example.com",
        "MCP_REMOTE_TOKEN": "your-token",
        "MCP_TIMEOUT_MS": "8000",
        "MCP_REMOTE_RETRIES": "1",
        "MCP_REPO_ROOT": "C:/workspace/rui-ark"
      }
    }
  }
}
```

## 远程优先策略

工具执行时按以下顺序查数据：

1. 远程接口（`MCP_REMOTE_BASE_URL`）
2. 本地回退（默认扫描 `MCP_REPO_ROOT/packages/vue/core/src/components`）

返回结果包含 `source` 字段，取值为 `remote` 或 `local`。

## 远程接口约定

默认会使用以下 GET 端点（可通过环境变量覆盖）：

- `MCP_REMOTE_ENDPOINT_LIST_COMPONENTS`，默认 `/mcp/components`
- `MCP_REMOTE_ENDPOINT_LIST_EXAMPLES`，默认 `/mcp/examples`
- `MCP_REMOTE_ENDPOINT_GET_EXAMPLE`，默认 `/mcp/example`
- `MCP_REMOTE_ENDPOINT_LIST_DOCUMENTS`，默认 `/mcp/documents`
- `MCP_REMOTE_ENDPOINT_GET_DOCUMENT`，默认 `/mcp/document`

公共 query 参数：

- `framework`（首版仅 `vue`）
- `componentName`（在 `get-example`、`get-document` 中传入）

响应支持两种格式：

- 直接返回结果数据
- 包一层 `{ "data": ... }` 或 `{ "result": ... }`

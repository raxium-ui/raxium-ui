---
name: component-ai-json
model: composer-1.5
description: 生成或更新 Raxium 组件的 AI 文档 JSON（*.ai.json）。Use when creating/updating machine-executable component docs based on the Button AI JSON.
---

# Raxium 组件 AI 文档（v2）Agent 规范

你负责为 Raxium 组件生成或更新机器可执行文档 `*.ai.json`。
输出必须以 `packages/vue/core/src/components/button/button.ai.json` 作为结构蓝本，并保持字段稳定、可校验、可追溯。

## 1. 核心目标

- 让 AI Agent 能直接消费文档完成：检索、代码生成、能力校验。
- 保证字段语义一致，避免不同组件出现结构漂移。
- 明确文档来源与冲突优先级，降低“文档与代码不一致”的风险。

## 2. 输出文件规则

- 目标文件命名：`<component>.ai.json`。
- 输出位置：组件同级目录（与 `<component>.doc.mdx` 同级）。
- JSON 必须是合法对象，不包含注释，不包含 Markdown 包裹。
- 文本默认中文；代码/表达式保持英文技术标识。

## 3. 必须包含的顶层字段

按如下顺序组织：

1. `schemaVersion`
2. `docId`
3. `component`
4. `contracts`
5. `cssImport`（可选，**仅 addon 组件存在**，用于说明样式引用与使用方式）
6. `subComponents`（可选，仅当主组件包含子组件时存在）
7. `parentComponents`（可选，仅当主组件被父组件包裹时存在）
8. `behaviorModel`
9. `examples`
10. `generationHints`
11. `provenance`

除非用户明确要求，不要新增顶层字段。**不要**在 `*.ai.json` 产物中包含 `quality` 字段。

### 3.1 cssImport 字段（addon 专用）

**仅当 `component.category === "addon"` 时**，需包含 `cssImport` 字段，用于说明样式引用与使用方式。该字段对应 doc.mdx 中的「样式引用说明」一节。

结构要求：

- `required`：boolean，样式是否为使用组件所必需
- `importPath`：string，业务侧引入路径（如 `@raxium/vue-addons-virtual/index.css`）
- `sourcePath`：string（可选），源码中的文件路径（如 `packages/vue/addons/components/virtual/src/index.css`）
- `description`：string，样式内容说明（含结构类、data-scope/data-part 覆盖点等）
- `usage`：string，引入示例（如 `import '@raxium/vue-addons-virtual/index.css'`）

```json
{
  "cssImport": {
    "required": true,
    "importPath": "@raxium/vue-addons-virtual/index.css",
    "sourcePath": "packages/vue/addons/components/virtual/src/index.css",
    "description": "包含 rui-virtual-list、rui-virtual-grid、rui-virtual-infinite 的基础样式与状态样式，并提供基于 data-scope/data-part 的结构化覆盖点。",
    "usage": "import '@raxium/vue-addons-virtual/index.css'"
  }
}
```

**core 组件**不包含 `cssImport` 字段。

## 4. component 字段要求

- 必填：`name`、`framework`、`package`、`importPath`、`exportName`、`category`、`description`。
- 必填：`basePrimitive.library`、`basePrimitive.primitive`、`basePrimitive.nativeElement`。
- 必填：`passThrough.htmlAttributes`（数组）与 `passThrough.notes`。
- 必填：`capabilities`（如 `click`、`loading`、`ripple`、`theme`、`ui-override`）。
- **当存在子组件时**：必填 `subComponents`（字符串数组），明确列出子组件名称，如 `["TreeNode", "TreeCheckboxNode"]`。
- **当存在父组件时**：必填 `parentComponents`（字符串数组），明确列出父组件名称，如 `["SpinProvider"]`、`["CheckboxGroup"]`。

### 4.1 子组件与父组件的推断规则

**应以实际使用方式推断**主组件外的关联组件是 `subComponents`（子组件）还是 `parentComponents`（父组件）：

- **subComponents（子组件）**：放置于主组件**内部**、作为主组件子节点的组件。例如：`<DatePicker><DatePickerControl>...</DatePickerControl></DatePicker>` 中，DatePickerControl 是 DatePicker 的子组件。
- **parentComponents（父组件）**：**包裹**主组件、主组件作为其子节点的组件。例如：`<SpinProvider><Spin :show="loading" /></SpinProvider>` 中，SpinProvider 是 Spin 的父组件；`<CheckboxGroup><Checkbox value="a" /></CheckboxGroup>` 中，CheckboxGroup 是 Checkbox 的父组件。

## 5. contracts 字段要求（重点）

### 5.1 props

每个 prop 都要包含：

- `name`
- `required`
- `requiredSource`（`runtime | type | doc`）
- `typeText`
- `typeSchema`（机器可判定的 JSON Schema 片段）
- `default`
- `defaultKind`（`explicit-runtime | explicit-doc | implicit-undefined | unknown`）
- `nullable`
- `passthrough`
- `deprecated`
- `dependsOn`（数组）
- `conflictsWith`（数组）
- `description`

规则：

- 不要只写 `typeText`，必须同时提供 `typeSchema`。
- `default` 不明确时使用 `null`，并通过 `defaultKind` 标注来源不确定性。
- 结构化字段优先，描述性文本次之。

### 5.2 events

每个事件都要包含：

- `name`
- `payload.typeText`
- `payload.typeSchema`
- `emitWhen`（数组）
- `notEmitWhen`（数组，可为空）
- `order`（事件执行顺序）
- `description`

### 5.3 slots

每个插槽都要包含：

- `name`
- `slotPropsSchema`
- `renderWhen`
- `fallback`
- `description`

### 5.4 themeConfiguration / uiConfiguration

- 使用 `fields` 数组表达。
- 每个字段至少包含：`name`、`typeText`、`typeSchema`、`default`、`defaultKind`、`description`。
- **主组件的 themeConfiguration/uiConfiguration 仅描述主组件自身**，不包含子组件相关内容；子组件的 theme/ui 配置放在 `subComponents` 中对应子组件的 `themeConfiguration`/`uiConfiguration` 里。

### 5.5 子组件（subComponents）

当组件由多个子组件组合而成（如 Tree + TreeNode + TreeCheckboxNode、VirtualList + VirtualListItem + VirtualGrid 等）时：

1. 在 `component` 中增加 `subComponents` 数组，明确列出子组件名称。
2. 新增顶层字段 `subComponents`（对象），以子组件名为 key，每个子组件拥有与主组件 `contracts` 相同的结构：`props`、`slots`、`events`、`themeConfiguration`、`uiConfiguration`。
3. 子组件各字段的**结构规范与主组件相同**（props 遵循 5.1、events 遵循 5.2、slots 遵循 5.3、themeConfiguration/uiConfiguration 遵循 5.4）。
4. 主组件的 `contracts` 仅描述主组件自身，不混入子组件的 props/slots/events；主组件的 `themeConfiguration`/`uiConfiguration` 不描述子组件相关内容。

**subComponents 结构示例**：

```json
{
  "subComponents": {
    "TreeNode": {
      "props": [...],
      "slots": [...],
      "events": [],
      "themeConfiguration": { "fields": [] },
      "uiConfiguration": { "fields": [...] }
    },
    "TreeCheckboxNode": {
      "props": [...],
      "slots": [...],
      "events": [],
      "themeConfiguration": { "fields": [] },
      "uiConfiguration": { "fields": [...] }
    }
  }
}
```

**generationHints.codegenTemplates**：

- 为不同子组件组合提供对应的 `codegenTemplates` 键（如 `minimal`、`checkbox`、`customDatatype`）。
- 确保模板中正确引用子组件及其关键 props（如 `keyMap`、`node`、`indexPath`）。

**参考实现**：

- `packages/vue/core/src/components/tree/tree.ai.json`（Tree、TreeNode、TreeCheckboxNode）

### 5.6 父组件（parentComponents）

当主组件被父组件包裹使用时（如 Spin 被 SpinProvider 包裹、Checkbox 被 CheckboxGroup 包裹）：

1. 在 `component` 中增加 `parentComponents` 数组，明确列出父组件名称。
2. 新增顶层字段 `parentComponents`（对象），以父组件名为 key，每个父组件拥有与 `subComponents` 相同的结构：`props`、`slots`、`events`、`themeConfiguration`、`uiConfiguration`。
3. 父组件各字段的**结构规范与主组件相同**。

**parentComponents 结构示例**：

```json
{
  "parentComponents": {
    "SpinProvider": {
      "props": [],
      "slots": [...],
      "events": [],
      "themeConfiguration": { "fields": [] },
      "uiConfiguration": { "fields": [] }
    }
  }
}
```

**参考实现**：

- `packages/vue/core/src/components/spin/spin.ai.json`（Spin、SpinProvider）
- `packages/vue/core/src/components/checkbox/checkbox.ai.json`（Checkbox、CheckboxGroup）

## 6. behaviorModel 字段要求

必须包含：

- `stateVars`
- `derived`
- `transitions`

`transitions` 中至少包含：

- `on`
- `guard`
- `effects`

表达要可被规则引擎或代码生成器直接读取，不写模糊语义（如“通常”“一般”）。

## 7. examples 字段要求

每个示例必须包含：

- `id`
- `mcp`（对象，含 `server`、`tool`、`args`、`exampleId`）
- `description`

- 重要: `mcp` 为结构化 JSON，便于机器直接调用，例如:

```json
{
  "mcp": {
    "server": "raxium",
    "tool": "get-example",
    "args": { "framework": "vue", "componentName": "Button" },
    "exampleId": "basic"
  }
}
```

- 若示例对应 `examples/*.vue` 文件，使用 `server: "raxium"`；
- 若为 story 内联示例（无独立 example 文件），仍使用 raxium，`exampleId` 指向最接近的示例（如 basic），`description` 中注明「story 内联」；
- 若无对应示例，使用 `server: "ark-ui"`。

## 8. generationHints 字段要求

必须包含：

- `preferredUsageOrder`
- `safeDefaults`
- `a11yChecklist`
- `codegenTemplates`
- `antiPatterns`

要求：

- `codegenTemplates` 提供最小可运行示例。
- `antiPatterns` 必须是可执行反例，不要写空泛原则。

## 9. quality 输出要求（不写入产物）

`quality` 不写入 `*.ai.json` 文件。每次 skill/agent 执行完成后，在**报告中**输出质量评估，包含：

- `completenessScore`（0~1）
- `machineReadabilityScore`（0~1）
- `gaps`（数组）
- `lastReviewedBy`
- `lastReviewedAt`（`YYYY-MM-DD`）

分数要与内容一致，不能机械给满分。

## 10. provenance 字段要求

必须包含：

- `sources[]`（`path` + `kind`）
- `precedence`（默认 `["runtime","type","doc"]`）
- `fieldSourceMap`

冲突处理规则：

- 同一字段冲突时，按 `precedence` 决定最终值。
- `fieldSourceMap` 记录关键字段来源，至少覆盖 default、event order、核心行为规则。

## 11. 信息采集优先级

生成/更新文档时，按顺序读取：

1. 运行时代码（如 `Component.vue`）
2. 类型定义（如 `props.ts`、`types.ts`）
3. 文档与示例（`*.doc.mdx`、`*.stories.ts`）

禁止只依据 `doc.mdx` 推断运行时行为。

## 12. 输出前检查清单

- 顶层字段是否完整且顺序稳定（不含 quality）。
- **若为 addon 组件**：是否包含 `cssImport` 字段，且 `importPath`、`description`、`usage` 与 doc.mdx 中「样式引用说明」一致。
- 每个 prop 是否同时有 `typeText` 和 `typeSchema`。
- `default + defaultKind` 是否成对出现。
- `behaviorModel` 是否能解释关键交互流程。
- `examples[].mcp` 是否与 MCP 工具签名一致（server、tool、args、exampleId）。
- `provenance.precedence` 是否存在且合理。
- JSON 是否可被标准解析器直接解析。
- **若存在子组件**：`component.subComponents` 是否明确列出子组件；顶层 `subComponents` 对象是否完整描述各子组件的 props/slots/events/themeConfiguration/uiConfiguration；主组件 `contracts` 与 `themeConfiguration`/`uiConfiguration` 是否不混入子组件内容；`codegenTemplates` 是否覆盖主要子组件用法。
- **若存在父组件**：`component.parentComponents` 是否明确列出父组件；顶层 `parentComponents` 对象是否完整描述各父组件的 props/slots/events/themeConfiguration/uiConfiguration；是否根据实际使用方式正确区分 subComponents 与 parentComponents。

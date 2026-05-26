# Vue Core Theme System

## Merge 顺序（`useTheme`）

`useTheme` 的解析顺序固定为：

1. Defaults
2. Global Config (`RUIConfig.theme`)
3. Component Config (`RUIConfig.<component>.theme`)
4. Scope Theme（来自 `ThemeProvider` 或上层 root 的显式 theme 作用域）
5. Props（实例级 `:theme`）

同名字段后者覆盖前者，`props` 优先级最高。

---

## 双通道模型

主题上下文分为两条通道：

- `Component Theme`：内部继承通道，给结构子组件使用（`useInheritedTheme`）
- `Scope Theme`：作用域通道，给独立组件使用（`useTheme`）

提供方：

- root 组件：`useProvideComponentTheme`
- structural 组件：`useProvideStructuralComponentTheme`（只透传 Component Theme，不写 Scope Theme）

---

## 组件分层约定

### Root 组件

- 组件本身定义主题边界，可独立使用
- 使用：`useTheme` + `useProvideComponentTheme`
- 示例：`Dialog`、`Tooltip`、`Popover`、`Menu`、`Select`

### Structural 组件

- root 内部部件（`*Content/*Item/*Trigger/*Header/*Footer` 等）
- 使用：`useInheritedTheme`
- 若需要向内部子节点继续传递局部 theme：`useProvideStructuralComponentTheme`

---

## 常见坑

### 1) structural 组件误用 `useTheme`

结果：会读取 Scope Theme，可能被外层容器覆盖，出现 surface/skin 串层。

### 2) Content 设置了局部 theme，但子节点不一致

典型现象：`Content` 正确、`Arrow` 错误。  
原因：`Content` 只本地 merge，没有继续 provide。  
修复：`Content` 增加 `useProvideStructuralComponentTheme(theme, () => propsTheme)`。

### 3) root 与 structural 混用 provide API

- root 不应使用 structural provide
- structural 不应使用 root provide

否则会导致 Scope Theme 泄漏或作用域失效。

---

## 新组件落地检查清单

1. 先判断组件是 root 还是 structural。
2. root：`useTheme` + `useProvideComponentTheme`。
3. structural：`useInheritedTheme`。
4. 若 structural 有深层子节点且支持局部 `:theme`：补 `useProvideStructuralComponentTheme`。
5. 检查 teleported 节点是否使用 `useThemeAttrs` 保持 data-attrs 一致。

import type { Framework } from './types'
import path from 'node:path'

export const ADDON_CATEGORIES = ['components', 'composables', 'directives'] as const

export type AddonCategory = (typeof ADDON_CATEGORIES)[number]

export interface AddonItem {
  qualifiedName: string
  category: AddonCategory
  name: string
  srcDir: string
}

export interface FrameworkLayout {
  /** Package directory under `packages/` that holds the component sources. */
  packageDir: string
  /** File extension used for example files. */
  exampleExt: string
  /** Whether the framework ships addon packages under `packages/<dir>/addons`. */
  addons: boolean
}

export const FRAMEWORK_LAYOUTS: Record<Framework, FrameworkLayout> = {
  vue: { packageDir: 'vue', exampleExt: '.vue', addons: true },
  react: { packageDir: 'react', exampleExt: '.tsx', addons: false },
}

export function isAddonQualifiedName(name: string): boolean {
  return name.startsWith('addons/') && name.split('/').length === 3
}

export function parseAddonQualifiedName(qualifiedName: string, packageDir: string): AddonItem | null {
  if (!isAddonQualifiedName(qualifiedName))
    return null
  const [, category, name] = qualifiedName.split('/')
  if (!ADDON_CATEGORIES.includes(category as AddonCategory))
    return null
  const srcDir = path.join(
    'packages',
    packageDir,
    'addons',
    category,
    name,
    'src',
  )
  return {
    qualifiedName,
    category: category as AddonCategory,
    name,
    srcDir,
  }
}

export function getLayout(framework: Framework): FrameworkLayout {
  return FRAMEWORK_LAYOUTS[framework]
}

export function parseAddon(framework: Framework, componentName: string): AddonItem | null {
  const { packageDir, addons } = getLayout(framework)
  if (!addons)
    return null
  return parseAddonQualifiedName(componentName, packageDir)
}

export function getComponentsDir(repoRoot: string, framework: Framework): string {
  return path.join(repoRoot, 'packages', getLayout(framework).packageDir, 'core', 'src', 'components')
}

export function getAddonsBase(repoRoot: string, framework: Framework): string {
  return path.join(repoRoot, 'packages', getLayout(framework).packageDir, 'addons')
}

export function getExamplesDir(repoRoot: string, framework: Framework, componentName: string): string | null {
  const addon = parseAddon(framework, componentName)
  if (addon)
    return path.join(repoRoot, addon.srcDir, 'examples')
  return path.join(getComponentsDir(repoRoot, framework), componentName, 'examples')
}

export function getDocumentPaths(
  repoRoot: string,
  framework: Framework,
  componentName: string,
): { docPath: string | null, aiPath: string | null, fileName: string } {
  const addon = parseAddon(framework, componentName)
  const fileName = `${addon ? addon.name : componentName}.doc.mdx`
  const aiFileName = `${addon ? addon.name : componentName}.ai.yaml`

  if (addon) {
    const srcDir = path.join(repoRoot, addon.srcDir)
    return {
      docPath: path.join(srcDir, fileName),
      aiPath: path.join(srcDir, aiFileName),
      fileName,
    }
  }

  const baseDir = path.join(getComponentsDir(repoRoot, framework), componentName)
  return {
    docPath: path.join(baseDir, fileName),
    aiPath: path.join(baseDir, aiFileName),
    fileName,
  }
}

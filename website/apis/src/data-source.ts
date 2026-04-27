import type {
  DocumentDetail,
  DocumentSummary,
  ExampleDetail,
  ExampleSummary,
  Framework,
} from './types'
import { readdir, readFile } from 'node:fs/promises'

import path from 'node:path'
import { ApiError } from './errors'

const ADDON_CATEGORIES = ['components', 'composables', 'directives'] as const

type AddonCategory = (typeof ADDON_CATEGORIES)[number]

interface AddonItem {
  qualifiedName: string
  category: AddonCategory
  name: string
  srcDir: string
}

async function safeReadDir(targetPath: string) {
  try {
    return await readdir(targetPath, { withFileTypes: true })
  }
  catch {
    return []
  }
}

function sanitizeDocumentContent(rawContent: string): string {
  // Normalize windows newlines and collapse excessive blank lines.
  const normalizedNewlines = rawContent.replace(/\r\n/g, '\n').replace(/\n{2,}/g, '\n')
  // Remove table-related tags while keeping textual content.
  return normalizedNewlines
    .replace(/<\/?table\b[^>]*>/gi, '')
    .replace(/<\/?thead\b[^>]*>/gi, '')
    .replace(/<\/?tbody\b[^>]*>/gi, '')
    .replace(/<\/?tr\b[^>]*>/gi, '')
    .replace(/<\/?th\b[^>]*>/gi, '')
    .replace(/<\/?td\b[^>]*>/gi, '')
    .replace(/<\/?code\b[^>]*>/gi, '')
    .replace(/\n/g, '')
    .trim()
}

function isAddonQualifiedName(name: string): boolean {
  return name.startsWith('addons/') && name.split('/').length === 3
}

function parseAddonQualifiedName(qualifiedName: string): AddonItem | null {
  if (!isAddonQualifiedName(qualifiedName))
    return null
  const [, category, name] = qualifiedName.split('/')
  if (!ADDON_CATEGORIES.includes(category as AddonCategory))
    return null
  const srcDir = path.join(
    'packages',
    'vue',
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

export class LocalDataSource {
  private readonly repoRoot: string

  constructor(repoRoot: string) {
    this.repoRoot = repoRoot
  }

  async listComponents(framework: Framework): Promise<string[]> {
    this.assertFramework(framework)
    const coreEntries = await safeReadDir(this.getVueComponentsDir())
    const coreNames = coreEntries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort()
    const addonNames = await this.listAddonQualifiedNames()
    return [...coreNames, ...addonNames].sort()
  }

  async listExamples(framework: Framework): Promise<ExampleSummary[]> {
    this.assertFramework(framework)
    const components = await this.listComponents(framework)
    const result: ExampleSummary[] = []

    for (const componentName of components) {
      const examplesDir = this.getExamplesDir(componentName)
      if (!examplesDir)
        continue
      const entries = await safeReadDir(examplesDir)
      const exampleIds = entries
        .filter(entry => entry.isFile() && entry.name.endsWith('.vue'))
        .map(entry => entry.name.replace(/\.vue$/i, ''))
        .sort()

      if (exampleIds.length > 0) {
        result.push({ componentName, exampleIds })
      }
    }

    return result
  }

  async getExample(framework: Framework, componentName: string): Promise<ExampleDetail> {
    this.assertFramework(framework)
    const examplesDir = this.getExamplesDir(componentName)
    if (!examplesDir) {
      throw new ApiError(
        'EXAMPLE_NOT_FOUND',
        `No examples found for component: ${componentName}`,
        404,
        framework,
      )
    }

    const entries = await safeReadDir(examplesDir)
    const files = entries
      .filter(entry => entry.isFile() && entry.name.endsWith('.vue'))
      .sort((a, b) => a.name.localeCompare(b.name))

    if (files.length === 0) {
      throw new ApiError(
        'EXAMPLE_NOT_FOUND',
        `No examples found for component: ${componentName}`,
        404,
        framework,
      )
    }

    const examples = []
    for (const file of files) {
      const fullPath = path.join(examplesDir, file.name)
      const content = await readFile(fullPath, 'utf-8')
      examples.push({
        id: file.name.replace(/\.vue$/i, ''),
        title: file.name,
        code: content,
      })
    }

    return {
      componentName,
      examples,
    }
  }

  async listDocuments(framework: Framework): Promise<DocumentSummary[]> {
    this.assertFramework(framework)
    const components = await this.listComponents(framework)
    const result: DocumentSummary[] = []

    for (const componentName of components) {
      const { docPath, fileName } = this.getDocumentPaths(componentName)
      if (!docPath)
        continue
      try {
        await readFile(docPath, 'utf-8')
        result.push({
          componentName,
          title: fileName,
        })
      }
      catch {
        continue
      }
    }

    return result
  }

  async getDocument(framework: Framework, componentName: string): Promise<DocumentDetail> {
    this.assertFramework(framework)
    const { docPath, aiPath, fileName } = this.getDocumentPaths(componentName)
    if (!docPath) {
      throw new ApiError(
        'DOCUMENT_NOT_FOUND',
        `No document found for component: ${componentName}`,
        404,
        framework,
      )
    }

    if (aiPath) {
      try {
        const rawContent = await readFile(aiPath, 'utf-8')
        return {
          componentName,
          title: path.basename(aiPath),
          content: rawContent,
        }
      }
      catch {
        // fallback to .doc.mdx
      }
    }
    try {
      const content = await readFile(docPath, 'utf-8')
      return {
        componentName,
        title: fileName,
        content: sanitizeDocumentContent(content),
      }
    }
    catch {
      throw new ApiError(
        'DOCUMENT_NOT_FOUND',
        `No document found for component: ${componentName}`,
        404,
        framework,
      )
    }
  }

  private async listAddonQualifiedNames(): Promise<string[]> {
    const result: string[] = []
    const addonsBase = path.join(this.repoRoot, 'packages', 'vue', 'addons')

    for (const category of ADDON_CATEGORIES) {
      const categoryDir = path.join(addonsBase, category)
      const entries = await safeReadDir(categoryDir)
      for (const entry of entries) {
        if (entry.isDirectory()) {
          result.push(`addons/${category}/${entry.name}`)
        }
      }
    }

    return result.sort()
  }

  private getExamplesDir(componentName: string): string | null {
    const addon = parseAddonQualifiedName(componentName)
    if (addon) {
      const examplesDir = path.join(this.repoRoot, addon.srcDir, 'examples')
      return examplesDir
    }
    return path.join(this.getVueComponentsDir(), componentName, 'examples')
  }

  private getDocumentPaths(
    componentName: string,
  ): { docPath: string | null, aiPath: string | null, fileName: string } {
    const addon = parseAddonQualifiedName(componentName)
    const fileName = `${addon ? addon.name : componentName}.doc.mdx`
    const aiFileName = `${addon ? addon.name : componentName}.ai.yaml`

    if (addon) {
      const srcDir = path.join(this.repoRoot, addon.srcDir)
      return {
        docPath: path.join(srcDir, fileName),
        aiPath: path.join(srcDir, aiFileName),
        fileName,
      }
    }

    const baseDir = path.join(this.getVueComponentsDir(), componentName)
    return {
      docPath: path.join(baseDir, fileName),
      aiPath: path.join(baseDir, aiFileName),
      fileName,
    }
  }

  private getVueComponentsDir(): string {
    return path.join(this.repoRoot, 'packages', 'vue', 'core', 'src', 'components')
  }

  private assertFramework(framework: Framework): void {
    switch (framework) {
      case 'vue':
        return
      default: {
        const neverFramework: never = framework
        throw new ApiError(
          'FRAMEWORK_NOT_SUPPORTED',
          `Framework is not supported: ${String(neverFramework)}`,
          400,
        )
      }
    }
  }
}

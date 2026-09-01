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
import {
  ADDON_CATEGORIES,
  FRAMEWORK_LAYOUTS,
  getAddonsBase,
  getComponentsDir,
  getDocumentPaths,
  getExamplesDir,
  getLayout,
} from './layout'

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

function stripExtension(fileName: string, ext: string): string {
  return fileName.slice(0, -ext.length)
}

export class LocalDataSource {
  private readonly repoRoot: string

  constructor(repoRoot: string) {
    this.repoRoot = repoRoot
  }

  async listComponents(framework: Framework): Promise<string[]> {
    this.assertFramework(framework)
    const coreEntries = await safeReadDir(getComponentsDir(this.repoRoot, framework))
    const coreNames = coreEntries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort()
    const addonNames = await this.listAddonQualifiedNames(framework)
    return [...coreNames, ...addonNames].sort()
  }

  async listExamples(framework: Framework): Promise<ExampleSummary[]> {
    this.assertFramework(framework)
    const { exampleExt } = getLayout(framework)
    const components = await this.listComponents(framework)
    const result: ExampleSummary[] = []

    for (const componentName of components) {
      const examplesDir = getExamplesDir(this.repoRoot, framework, componentName)
      if (!examplesDir)
        continue
      const entries = await safeReadDir(examplesDir)
      const exampleIds = entries
        .filter(entry => entry.isFile() && entry.name.endsWith(exampleExt))
        .map(entry => stripExtension(entry.name, exampleExt))
        .sort()

      if (exampleIds.length > 0) {
        result.push({ componentName, exampleIds })
      }
    }

    return result
  }

  async getExample(framework: Framework, componentName: string): Promise<ExampleDetail> {
    this.assertFramework(framework)
    const { exampleExt } = getLayout(framework)
    const examplesDir = getExamplesDir(this.repoRoot, framework, componentName)
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
      .filter(entry => entry.isFile() && entry.name.endsWith(exampleExt))
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
        id: stripExtension(file.name, exampleExt),
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
      const { docPath, fileName } = getDocumentPaths(this.repoRoot, framework, componentName)
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
    const { docPath, aiPath, fileName } = getDocumentPaths(this.repoRoot, framework, componentName)
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

  private async listAddonQualifiedNames(framework: Framework): Promise<string[]> {
    const { addons } = getLayout(framework)
    if (!addons)
      return []

    const result: string[] = []
    const addonsBase = getAddonsBase(this.repoRoot, framework)

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

  private assertFramework(framework: Framework): void {
    if (!(framework in FRAMEWORK_LAYOUTS)) {
      throw new ApiError(
        'FRAMEWORK_NOT_SUPPORTED',
        `Framework is not supported: ${String(framework)}`,
        400,
      )
    }
  }
}

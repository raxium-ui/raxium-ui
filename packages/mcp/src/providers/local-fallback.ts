import type {
  ComponentDataProvider,
  DocumentDetail,
  DocumentSummary,
  ExampleDetail,
  ExampleSummary,
  Framework,
} from '../types.js'
import { readdir, readFile } from 'node:fs/promises'

import path from 'node:path'
import { McpToolError } from '../errors.js'

async function safeReadDir(targetPath: string) {
  try {
    return await readdir(targetPath, { withFileTypes: true })
  }
  catch {
    return []
  }
}

export class LocalFallbackProvider implements ComponentDataProvider {
  public readonly source = 'local' as const

  private readonly repoRoot: string

  constructor(repoRoot: string) {
    this.repoRoot = repoRoot
  }

  async listComponents(framework: Framework): Promise<string[]> {
    this.assertFramework(framework)
    const componentsDir = this.getVueComponentsDir()
    const entries = await safeReadDir(componentsDir)
    return entries.filter(entry => entry.isDirectory()).map(entry => entry.name).sort()
  }

  async listExamples(framework: Framework): Promise<ExampleSummary[]> {
    this.assertFramework(framework)
    const components = await this.listComponents(framework)
    const result: ExampleSummary[] = []

    for (const componentName of components) {
      const examplesDir = path.join(this.getVueComponentsDir(), componentName, 'examples')
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
    const examplesDir = path.join(this.getVueComponentsDir(), componentName, 'examples')
    const entries = await safeReadDir(examplesDir)
    const files = entries.filter(entry => entry.isFile() && entry.name.endsWith('.vue')).sort((a, b) => {
      return a.name.localeCompare(b.name)
    })

    if (files.length === 0) {
      throw new McpToolError('EXAMPLE_NOT_FOUND', `No examples found for component: ${componentName}`)
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
      const fileName = `${componentName}.doc.mdx`
      const documentPath = path.join(this.getVueComponentsDir(), componentName, fileName)
      try {
        await readFile(documentPath, 'utf-8')
        result.push({
          componentName,
          title: `${componentName}.doc.mdx`,
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
    const fileName = `${componentName}.doc.mdx`
    const documentPath = path.join(this.getVueComponentsDir(), componentName, fileName)

    try {
      const content = await readFile(documentPath, 'utf-8')
      return {
        componentName,
        title: fileName,
        content,
      }
    }
    catch {
      throw new McpToolError('DOCUMENT_NOT_FOUND', `No document found for component: ${componentName}`)
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
        throw new McpToolError(
          'FRAMEWORK_NOT_SUPPORTED',
          `Framework is not supported in local fallback: ${String(neverFramework)}`,
        )
      }
    }
  }
}

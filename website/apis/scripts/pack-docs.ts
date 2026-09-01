/* eslint-disable node/prefer-global/process */
import type { Framework } from '../src/types'
import { spawnSync } from 'node:child_process'
import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  ADDON_CATEGORIES,
  getAddonsBase,
  getComponentsDir,
  getLayout,
} from '../src/layout'
import { SUPPORTED_FRAMEWORKS } from '../src/types'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const apisRoot = path.resolve(currentDir, '..')
const repoRoot = path.resolve(apisRoot, '../..')
const stagingDir = path.join(apisRoot, '.mcp-docs-staging')
const archivePath = path.join(apisRoot, 'mcp-docs.tar.gz')

async function safeReadDir(targetPath: string) {
  try {
    return await readdir(targetPath, { withFileTypes: true })
  }
  catch {
    return []
  }
}

async function copyIfExists(fromPath: string, toPath: string) {
  try {
    await mkdir(path.dirname(toPath), { recursive: true })
    await cp(fromPath, toPath, { recursive: true })
    return true
  }
  catch {
    return false
  }
}

async function packCoreComponents(framework: Framework) {
  const componentsDir = getComponentsDir(repoRoot, framework)
  const entries = await safeReadDir(componentsDir)

  for (const entry of entries) {
    if (!entry.isDirectory())
      continue

    const name = entry.name
    const fromDir = path.join(componentsDir, name)
    const toDir = path.join(stagingDir, path.relative(repoRoot, fromDir))

    await copyIfExists(path.join(fromDir, `${name}.doc.mdx`), path.join(toDir, `${name}.doc.mdx`))
    await copyIfExists(path.join(fromDir, `${name}.ai.yaml`), path.join(toDir, `${name}.ai.yaml`))
    await copyIfExists(path.join(fromDir, 'examples'), path.join(toDir, 'examples'))
  }
}

async function packAddons(framework: Framework) {
  if (!getLayout(framework).addons)
    return

  const addonsBase = getAddonsBase(repoRoot, framework)
  for (const category of ADDON_CATEGORIES) {
    const categoryDir = path.join(addonsBase, category)
    const entries = await safeReadDir(categoryDir)
    for (const entry of entries) {
      if (!entry.isDirectory())
        continue

      const srcDir = path.join(categoryDir, entry.name, 'src')
      const toDir = path.join(stagingDir, path.relative(repoRoot, srcDir))

      await copyIfExists(path.join(srcDir, `${entry.name}.doc.mdx`), path.join(toDir, `${entry.name}.doc.mdx`))
      await copyIfExists(path.join(srcDir, `${entry.name}.ai.yaml`), path.join(toDir, `${entry.name}.ai.yaml`))
      await copyIfExists(path.join(srcDir, 'examples'), path.join(toDir, 'examples'))
    }
  }
}

function resolveGitSha(): string {
  if (process.env.GITHUB_SHA)
    return process.env.GITHUB_SHA

  const result = spawnSync('git', ['rev-parse', 'HEAD'], {
    cwd: repoRoot,
    encoding: 'utf-8',
  })
  return result.status === 0 ? result.stdout.trim() : 'unknown'
}

async function main() {
  await rm(stagingDir, { recursive: true, force: true })
  await mkdir(stagingDir, { recursive: true })

  for (const framework of SUPPORTED_FRAMEWORKS) {
    await packCoreComponents(framework)
    await packAddons(framework)
  }

  await writeFile(
    path.join(stagingDir, 'manifest.json'),
    `${JSON.stringify({
      gitSha: resolveGitSha(),
      builtAt: new Date().toISOString(),
      frameworks: [...SUPPORTED_FRAMEWORKS],
    }, null, 2)}\n`,
    'utf-8',
  )

  const tar = spawnSync('tar', ['-czf', archivePath, '-C', stagingDir, '.'], { stdio: 'inherit' })
  if (tar.status !== 0)
    throw new Error(`tar failed with status ${tar.status ?? 'null'}`)

  await rm(stagingDir, { recursive: true, force: true })
  console.log(`Wrote ${archivePath}`)
}

await main()

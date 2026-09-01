/* eslint-disable node/prefer-global/process */
import { Buffer } from 'node:buffer'
import { spawnSync } from 'node:child_process'
import { mkdir, mkdtemp, readdir, rename, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const DEFAULT_REPO = 'raxium-ui/raxium-ui'
const DEFAULT_TAG = 'mcp-docs-latest'
const ASSET_NAME = 'mcp-docs.tar.gz'
const STAGING_NEXT = '.mcp-docs-next'
const STAGING_PREV = '.mcp-docs-prev'

interface ReleaseAsset {
  name: string
  url: string
}

interface ReleasePayload {
  assets?: ReleaseAsset[]
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim()
  if (!value)
    throw new Error(`${name} is required`)
  return value
}

function optionalEnv(name: string, fallback: string): string {
  const value = process.env[name]?.trim()
  return value || fallback
}

async function githubJson<T>(url: string, token: string | undefined): Promise<T> {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'raxium-mcp-apis',
  }
  if (token)
    headers.Authorization = `Bearer ${token}`

  const response = await fetch(url, { headers })
  if (!response.ok) {
    const body = await response.text()
    throw new Error(`GitHub API ${response.status} ${url}: ${body.slice(0, 500)}`)
  }
  return await response.json() as T
}

async function downloadAsset(url: string, token: string | undefined, destFile: string) {
  const headers: Record<string, string> = {
    'Accept': 'application/octet-stream',
    'User-Agent': 'raxium-mcp-apis',
  }
  if (token)
    headers.Authorization = `Bearer ${token}`

  const response = await fetch(url, { headers, redirect: 'follow' })
  if (!response.ok)
    throw new Error(`Failed to download asset: ${response.status} ${url}`)

  await writeFile(destFile, Buffer.from(await response.arrayBuffer()))
}

async function extractArchive(archiveFile: string, destDir: string) {
  await mkdir(destDir, { recursive: true })
  const tar = spawnSync('tar', ['-xzf', archiveFile, '-C', destDir], { stdio: 'inherit' })
  if (tar.status !== 0)
    throw new Error(`tar extract failed with status ${tar.status ?? 'null'}`)
}

async function listLiveEntries(destDir: string): Promise<string[]> {
  try {
    const entries = await readdir(destDir)
    return entries.filter(name => name !== STAGING_NEXT && name !== STAGING_PREV)
  }
  catch {
    return []
  }
}

async function replaceLiveTree(nextDir: string, destDir: string) {
  await mkdir(destDir, { recursive: true })
  const prevDir = path.join(destDir, STAGING_PREV)
  await rm(prevDir, { recursive: true, force: true })
  await mkdir(prevDir, { recursive: true })

  for (const name of await listLiveEntries(destDir)) {
    await rename(path.join(destDir, name), path.join(prevDir, name))
  }

  for (const name of await readdir(nextDir)) {
    await rename(path.join(nextDir, name), path.join(destDir, name))
  }

  await rm(nextDir, { recursive: true, force: true })
  await rm(prevDir, { recursive: true, force: true })
}

async function main() {
  const destDir = requiredEnv('MCP_DATA_ROOT')
  const repo = optionalEnv('MCP_DOCS_REPO', DEFAULT_REPO)
  const tag = optionalEnv('MCP_DOCS_TAG', DEFAULT_TAG)
  const token = process.env.GITHUB_TOKEN?.trim() || process.env.GH_TOKEN?.trim()

  const release = await githubJson<ReleasePayload>(
    `https://api.github.com/repos/${repo}/releases/tags/${encodeURIComponent(tag)}`,
    token,
  )
  const asset = release.assets?.find(item => item.name === ASSET_NAME)
  if (!asset)
    throw new Error(`Release ${tag} has no asset named ${ASSET_NAME}`)

  const workDir = await mkdtemp(path.join(tmpdir(), 'raxium-mcp-docs-'))
  const archiveFile = path.join(workDir, ASSET_NAME)
  const nextDir = path.join(destDir, STAGING_NEXT)

  try {
    await mkdir(destDir, { recursive: true })
    await downloadAsset(asset.url, token, archiveFile)
    await rm(nextDir, { recursive: true, force: true })
    await extractArchive(archiveFile, nextDir)
    await replaceLiveTree(nextDir, destDir)
  }
  finally {
    await rm(workDir, { recursive: true, force: true })
  }

  console.log(`Synced ${tag} (${ASSET_NAME}) -> ${destDir}`)
}

await main()

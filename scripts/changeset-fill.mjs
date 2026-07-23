#!/usr/bin/env node
/* eslint-disable node/prefer-global/process */
/**
 * Terminal entry for changeset + changelog fill.
 *
 * Usage:
 *   pnpm changeset:fill              # interactive changeset, then fill changelog
 *   pnpm changeset:fill --only       # only fill existing placeholder .changeset/*.md
 *   pnpm changeset:fill --no-agent   # skip Cursor Agent CLI; write git draft only
 *
 * Default fill strategy:
 *   1. If standalone `agent` CLI is available → headless Agent fills changelog
 *      (see https://cursor.com/docs/cli/overview — `irm 'https://cursor.com/install?win32=true' | iex`)
 *   2. Otherwise → draft from git status/diff + open file in Cursor IDE
 */
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { bodyNeedsChangelog, CHANGESET_SKIP } from './changeset-placeholder.mjs'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')

function run(cmd, args, opts = {}) {
  return spawnSync(cmd, args, {
    cwd: ROOT,
    encoding: 'utf8',
    shell: process.platform === 'win32',
    ...opts,
  })
}

function listChangesetsNeedingChangelog() {
  const dir = join(ROOT, '.changeset')
  if (!existsSync(dir))
    return []
  return readdirSync(dir)
    .filter(name => name.endsWith('.md') && !CHANGESET_SKIP.has(name))
    .map(name => join(dir, name))
    .filter((file) => {
      try {
        return bodyNeedsChangelog(readFileSync(file, 'utf8'))
      }
      catch {
        return false
      }
    })
}

function changedPaths() {
  const out = run('git', ['status', '--porcelain'], { stdio: ['ignore', 'pipe', 'pipe'] })
  if (out.status !== 0)
    return []
  return (out.stdout || '')
    .split('\n')
    .map(line => line.trimEnd())
    .filter(Boolean)
    .map((line) => {
      const renamed = line.match(/^R\s+.+\s+->\s+(.+)$/)
      if (renamed)
        return renamed[1].trim()
      return line.replace(/^.{2}\s+/, '').trim()
    })
    .filter(p => p && !p.startsWith('.changeset/'))
}

function draftChangelog(paths) {
  const pkgs = new Set()
  const areas = []

  for (const p of paths) {
    const norm = p.replace(/\\/g, '/')
    if (norm.startsWith('packages/themes/'))
      pkgs.add('@raxium/themes')
    else if (norm.startsWith('packages/vue/'))
      pkgs.add('@raxium/vue')
    else if (norm.startsWith('packages/shared/'))
      pkgs.add('@raxium/shared')

    if (norm.includes('/crafts/select'))
      areas.push('Select craft sizing/spacing')
    else if (norm.includes('/crafts/dialog'))
      areas.push('Dialog bordered craft')
    else if (norm.includes('/crafts/'))
      areas.push(`theme craft (${basename(norm, '.ts')})`)
    else if (norm.includes('/components/slider/'))
      areas.push('Slider tooltip ThemeProvider wiring')
    else if (norm.includes('/components/'))
      areas.push(`component ${norm.split('/components/')[1]?.split('/')[0] || 'update'}`)
  }

  const uniqueAreas = [...new Set(areas)].slice(0, 4)
  const pkgHint = pkgs.size ? [...pkgs].join(', ') : ''
  if (uniqueAreas.length === 0) {
    const sample = paths.slice(0, 3).map(p => relative(ROOT, join(ROOT, p)).replace(/\\/g, '/'))
    if (!sample.length)
      return 'Update package for recent workspace changes. Refine this draft with /changeset-changelog to describe user-visible impact.'
    return `Update project files (${sample.join(', ')})${pkgHint ? ` affecting ${pkgHint}` : ''}. Refine this draft with /changeset-changelog to describe user-visible what/why.`
  }

  const focus = uniqueAreas.length === 1
    ? uniqueAreas[0]
    : `${uniqueAreas.slice(0, -1).join(', ')}, and ${uniqueAreas.at(-1)}`
  const scope = pkgHint ? ` in ${pkgHint}` : ''
  return `Draft: ${focus}${scope}. Expand with /changeset-changelog into ~2–3 English sentences covering user-visible what/why (avoid a one-line telegraphic note).`
}

function writeBody(file, sentence) {
  const content = readFileSync(file, 'utf8')
  const parts = content.split(/^---\s*$/m)
  if (parts.length < 3) {
    writeFileSync(file, `${content.trimEnd()}\n\n${sentence}\n`, 'utf8')
    return
  }
  const yaml = parts[1]
  const next = `---${yaml}---\n\n${sentence}\n`
  writeFileSync(file, next, 'utf8')
}

function openInCursor(file) {
  const r = run('cursor', ['-r', '-g', file], { stdio: 'inherit' })
  if (r.error || (r.status ?? 0) !== 0)
    console.warn(`[changeset:fill] Could not open in Cursor: ${file}`)
}

/**
 * Resolve a spawnable Agent CLI invocation.
 * On Windows, `agent.cmd` cannot be spawned with shell:false (EINVAL), so prefer
 * the underlying node.exe + index.js used by agent.ps1.
 * @returns {{ command: string, prefixArgs: string[] } | null}
 */
function resolveAgentCommand() {
  const home = process.env.USERPROFILE || process.env.HOME || ''
  const localAppData = process.env.LOCALAPPDATA || ''

  // Windows / installed CLI: %LOCALAPPDATA%\cursor-agent\versions\<ver>\{node.exe,index.js}
  if (localAppData) {
    const versionsDir = join(localAppData, 'cursor-agent', 'versions')
    if (existsSync(versionsDir)) {
      const versions = readdirSync(versionsDir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name)
        .filter(name => /^\d{4}\.\d{1,2}\.\d{1,2}/.test(name))
        .sort()
        .reverse()
      for (const version of versions) {
        const nodePath = join(versionsDir, version, 'node.exe')
        const indexPath = join(versionsDir, version, 'index.js')
        if (existsSync(nodePath) && existsSync(indexPath))
          return { command: nodePath, prefixArgs: [indexPath] }
      }
    }
    const rootNode = join(localAppData, 'cursor-agent', 'node.exe')
    const rootIndex = join(localAppData, 'cursor-agent', 'index.js')
    if (existsSync(rootNode) && existsSync(rootIndex))
      return { command: rootNode, prefixArgs: [rootIndex] }
  }

  const candidates = [
    'agent',
    join(home, '.cursor', 'bin', process.platform === 'win32' ? 'agent.exe' : 'agent'),
    join(home, '.local', 'bin', process.platform === 'win32' ? 'agent.exe' : 'agent'),
  ]

  for (const candidate of candidates) {
    let resolved = candidate
    if (!candidate.includes('/') && !candidate.includes('\\')) {
      const lookup = run(process.platform === 'win32' ? 'where' : 'which', [candidate], {
        stdio: ['ignore', 'pipe', 'pipe'],
      })
      if ((lookup.status ?? 1) !== 0)
        continue
      resolved = (lookup.stdout || '').split(/\r?\n/).find(Boolean)?.trim()
      if (!resolved)
        continue
    }
    else if (!existsSync(resolved)) {
      continue
    }

    // Skip Windows .cmd/.ps1 wrappers — Node cannot spawn them with shell:false.
    if (/\.(cmd|ps1)$/i.test(resolved))
      continue

    return { command: resolved, prefixArgs: [] }
  }
  return null
}

function buildAgentPrompt(files) {
  const targets = files
    .map(f => relative(ROOT, f).replace(/\\/g, '/'))
    .join(', ')
  return [
    `You MUST edit ${targets} on disk using your file write/edit tool.`,
    'Do not only print the changelog in the terminal.',
    'Follow .cursor/agents/changeset-changelog.md.',
    'Run git status and git diff HEAD for evidence.',
    'Keep YAML frontmatter package names and bump levels unchanged.',
    'Replace any placeholder body with about 2-3 clear English sentences covering user-visible what/why.',
    'Do not git commit or git push.',
  ].join(' ')
}

function fillWithAgent(agentInvocation, files) {
  const prompt = buildAgentPrompt(files)
  console.log('[changeset:fill] Running Cursor Agent CLI (headless)…')
  console.log(`[changeset:fill] Agent: ${agentInvocation.command}\n`)

  const result = spawnSync(agentInvocation.command, [
    ...agentInvocation.prefixArgs,
    '-p',
    '--force',
    '--trust',
    '--workspace',
    ROOT,
    '--',
    prompt,
  ], {
    cwd: ROOT,
    stdio: 'inherit',
    shell: false,
    env: {
      ...process.env,
      // Match agent.ps1 compile-cache behavior when available.
      NODE_COMPILE_CACHE: process.env.NODE_COMPILE_CACHE
        || (process.env.LOCALAPPDATA
          ? join(process.env.LOCALAPPDATA, 'cursor-compile-cache')
          : undefined),
    },
  })

  if (result.error) {
    console.warn(`[changeset:fill] Failed to spawn Agent CLI: ${result.error.message}`)
    return false
  }
  if ((result.status ?? 1) !== 0) {
    console.warn(`[changeset:fill] Agent CLI exited with status ${result.status}`)
    return false
  }
  return true
}

function writeDraftFallback(files, paths) {
  const draft = draftChangelog(paths)
  console.log(`[changeset:fill] Draft from git: ${draft}\n`)

  for (const file of files) {
    writeBody(file, draft)
    const rel = relative(ROOT, file).replace(/\\/g, '/')
    console.log(`[changeset:fill] Wrote → ${rel}`)
    openInCursor(file)
  }
}

function printAgentInstallHint() {
  console.warn('\n[changeset:fill] Cursor Agent CLI not found — wrote git draft instead.')
  console.warn('[changeset:fill] Install for automatic changelog fill from terminal:')
  if (process.platform === 'win32') {
    console.warn("  irm 'https://cursor.com/install?win32=true' | iex")
  }
  else {
    console.warn('  curl https://cursor.com/install -fsS | bash')
  }
  console.warn('[changeset:fill] Then re-run: pnpm changeset:fill-only')
  console.warn('[changeset:fill] Or refine in Cursor Agent Chat with /changeset-changelog\n')
}

function main() {
  const only = process.argv.includes('--only') || process.argv.includes('-o')
  const skipAgent = process.argv.includes('--no-agent')
    || process.env.CHANGESET_SKIP_AGENT === '1'

  if (!only) {
    console.log('[changeset:fill] Running interactive changeset…\n')
    const result = run('pnpm', ['exec', 'changeset'], { stdio: 'inherit' })
    if ((result.status ?? 1) !== 0)
      process.exit(result.status ?? 1)
  }

  const targets = listChangesetsNeedingChangelog()
  if (targets.length === 0) {
    console.log('[changeset:fill] No changeset bodies needing changelog fill.')
    return
  }

  const relTargets = targets.map(f => relative(ROOT, f).replace(/\\/g, '/'))
  console.log(`[changeset:fill] Targets: ${relTargets.join(', ')}\n`)

  if (!skipAgent) {
    const agentInvocation = resolveAgentCommand()
    if (agentInvocation) {
      const spawned = fillWithAgent(agentInvocation, targets)
      const remaining = listChangesetsNeedingChangelog()
      if (spawned && remaining.length === 0) {
        console.log('\n[changeset:fill] Agent filled changelog successfully.')
        for (const file of targets)
          openInCursor(file)
        return
      }
      if (!spawned) {
        console.warn('[changeset:fill] Agent CLI did not run; falling back to git draft.')
      }
      else {
        console.warn(`[changeset:fill] Agent finished but ${remaining.length} file(s) still need changelog.`)
      }
      writeDraftFallback(remaining.length ? remaining : targets, changedPaths())
      return
    }
    printAgentInstallHint()
  }

  writeDraftFallback(targets, changedPaths())

  if (skipAgent) {
    console.log('\n[changeset:fill] Done (--no-agent). Refine in Agent with /changeset-changelog if needed.')
  }
}

main()

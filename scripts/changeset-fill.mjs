#!/usr/bin/env node
/* eslint-disable node/prefer-global/process */
/**
 * Terminal entry for changeset + changelog fill (outside Agent hooks).
 *
 * Usage:
 *   pnpm changeset:fill           # interactive changeset, then fill placeholders
 *   pnpm changeset:fill --only    # only fill existing placeholder .changeset/*.md
 *
 * Fill strategy (no API key required):
 *   Draft a short multi-clause English note from `git status` / `git diff` into the changeset body.
 *   Open the file in Cursor so you can tweak; refine with /changeset-changelog if needed
 *   (agent should expand to ~2–3 clear sentences covering user-visible what/why).
 */
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')
const PLACEHOLDER_RE = /^(?:change\s*log|todo|tbd|\.\.\.|…)?\s*$/i
const SKIP = new Set(['config.json', 'README.md', 'README'])

function run(cmd, args, opts = {}) {
  return spawnSync(cmd, args, {
    cwd: ROOT,
    encoding: 'utf8',
    shell: process.platform === 'win32',
    ...opts,
  })
}

function bodyIsPlaceholder(content) {
  if (!content)
    return true
  const parts = content.split(/^---\s*$/m)
  const body = parts.length >= 3 ? parts.slice(2).join('---').trim() : content.trim()
  return PLACEHOLDER_RE.test(body)
}

function listPlaceholderChangesets() {
  const dir = join(ROOT, '.changeset')
  if (!existsSync(dir))
    return []
  return readdirSync(dir)
    .filter(name => name.endsWith('.md') && !SKIP.has(name))
    .map(name => join(dir, name))
    .filter((file) => {
      try {
        return bodyIsPlaceholder(readFileSync(file, 'utf8'))
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
      // " M path" / "?? path" / "R  a -> b"
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
  if (r.error || (r.status ?? 0) !== 0) {
    // non-fatal
    console.warn(`[changeset:fill] Could not open in Cursor: ${file}`)
  }
}

function main() {
  const only = process.argv.includes('--only') || process.argv.includes('-o')

  if (!only) {
    console.log('[changeset:fill] Running interactive changeset…\n')
    const result = run('pnpm', ['exec', 'changeset'], { stdio: 'inherit' })
    if ((result.status ?? 1) !== 0) {
      process.exit(result.status ?? 1)
    }
  }

  const placeholders = listPlaceholderChangesets()
  if (placeholders.length === 0) {
    console.log('[changeset:fill] No placeholder changeset bodies found.')
    return
  }

  const paths = changedPaths()
  const draft = draftChangelog(paths)
  console.log(`[changeset:fill] Draft from git: ${draft}\n`)

  for (const file of placeholders) {
    writeBody(file, draft)
    const rel = relative(ROOT, file).replace(/\\/g, '/')
    console.log(`[changeset:fill] Wrote → ${rel}`)
    openInCursor(file)
  }

  console.log('\n[changeset:fill] Done. Review the draft; refine in Agent with /changeset-changelog if needed.')
}

main()

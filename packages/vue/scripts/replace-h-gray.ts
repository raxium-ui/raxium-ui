#!/usr/bin/env bun
/**
 * Scan `packages/vue/` for Tailwind-style `-hXX` gray utilities (two hex nibbles)
 * and replace with `-gray-xx` (lowercase). Validates suffixes against
 * `--color-gray-xx` definitions in themes primitives.
 *
 * Usage (from repo root):
 *   bun ./packages/vue/scripts/replace-h-gray.ts
 *   bun ./packages/vue/scripts/replace-h-gray.ts --write
 *   bun ./packages/vue/scripts/replace-h-gray.ts --write --report packages/vue/scripts/unmatched-gray.txt
 *   bun ./packages/vue/scripts/replace-h-gray.ts --primitives packages/themes/src/razer/tokens/_primitives.css
 *
 * Options:
 *   --write       Apply edits (default: dry-run)
 *   --report <f>  Write unmatched `-gray-xx` suffixes (no `--color-gray-xx` in primitives)
 *   --strict      Exit 1 if any unmatched suffix remains after scan/replace
 *   --primitives <path>  Override primitives CSS path (absolute or cwd-relative)
 *   --vue-root <path>      Override scan root (default: repo's `packages/vue`)
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { dirname, isAbsolute, join, relative, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))

/** Parents → …/packages/themes/src/razer/tokens */
const TOKENS_PARENT_SEGMENTS = ['packages', 'themes', 'src', 'razer', 'tokens']

const PRIMITIVE_FILENAMES = ['_primitives.css', 'primitives.css'] as const

const LINKED_THEMES_TOKENS_DIR = join(
  SCRIPT_DIR,
  '..',
  'core',
  'node_modules',
  '@raxium',
  'themes',
  'src',
  'razer',
  'tokens',
)

const SCAN_EXTENSIONS = new Set([
  '.vue',
  '.ts',
  '.tsx',
  '.mts',
  '.cts',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.css',
  '.md',
])

function tokensDirUnderAncestor(ancestorDir: string): string {
  return join(ancestorDir, ...TOKENS_PARENT_SEGMENTS)
}

/** Prefer `_primitives.css`, fall back to `primitives.css` in the same folder. */
function pickExistingPrimitives(requestedPath: string): string | undefined {
  if (existsSync(requestedPath)) {
    return requestedPath
  }
  const dir = dirname(requestedPath)
  for (const name of PRIMITIVE_FILENAMES) {
    const p = join(dir, name)
    if (existsSync(p)) {
      return p
    }
  }
  return undefined
}

function findPrimitivesCss(startDir: string): string | undefined {
  let dir = startDir
  for (let i = 0; i < 14; i++) {
    const tokensDir = tokensDirUnderAncestor(dir)
    for (const name of PRIMITIVE_FILENAMES) {
      const candidate = join(tokensDir, name)
      if (existsSync(candidate)) {
        return candidate
      }
    }
    const parent = dirname(dir)
    if (parent === dir) {
      break
    }
    dir = parent
  }
  for (const name of PRIMITIVE_FILENAMES) {
    const candidate = join(LINKED_THEMES_TOKENS_DIR, name)
    if (existsSync(candidate)) {
      return candidate
    }
  }
  return undefined
}

/** tokens/_file.css → repo root (…/packages/themes/src/razer/tokens → six dirnames) */
function repoRootFromPrimitives(primitivesPath: string): string {
  let dir = dirname(primitivesPath)
  for (let i = 0; i < 6; i++) {
    dir = dirname(dir)
  }
  return dir
}

function findVuePackageRoot(startDir: string): string | undefined {
  let dir = startDir
  for (let i = 0; i < 14; i++) {
    const candidate = join(dir, 'packages', 'vue')
    if (existsSync(candidate)) {
      return candidate
    }
    const parent = dirname(dir)
    if (parent === dir) {
      break
    }
    dir = parent
  }
  return undefined
}

function resolvePrimitivesAndVue(cliPrimitives?: string, cliVueRoot?: string): {
  primitivesPath: string
  vueRoot: string
} {
  if (cliPrimitives) {
    const requested = isAbsolute(cliPrimitives)
      ? cliPrimitives
      : resolve(process.cwd(), cliPrimitives)

    const primitivesPath = pickExistingPrimitives(requested)
    if (!primitivesPath) {
      console.error('Primitives CSS not found.')
      console.error(`  Requested: ${requested}`)
      console.error(`  Also tried in same directory: ${PRIMITIVE_FILENAMES.join(', ')}`)
      console.error(`  cwd: ${process.cwd()}`)
      process.exit(1)
    }

    const vueRoot = cliVueRoot
      ? (isAbsolute(cliVueRoot) ? cliVueRoot : resolve(process.cwd(), cliVueRoot))
      : findVuePackageRoot(dirname(primitivesPath))
          ?? join(repoRootFromPrimitives(primitivesPath), 'packages', 'vue')

    return { primitivesPath, vueRoot }
  }

  const found = findPrimitivesCss(SCRIPT_DIR) ?? findPrimitivesCss(process.cwd())
  if (!found) {
    console.error(
      'Could not find primitives CSS. Walked parents from the script directory and cwd, '
      + 'and checked `packages/vue/core/node_modules/@raxium/themes/src/razer/tokens/`.',
    )
    console.error(`Expected one of: ${PRIMITIVE_FILENAMES.join(', ')} under packages/themes/src/razer/tokens/`)
    console.error('Pass an explicit path: --primitives <path-to-primitives-css>')
    process.exit(1)
  }
  const primitivesPath = found
  const repoRoot = repoRootFromPrimitives(found)
  const vueRoot = cliVueRoot
    ? (isAbsolute(cliVueRoot) ? cliVueRoot : resolve(process.cwd(), cliVueRoot))
    : join(repoRoot, 'packages', 'vue')

  return { primitivesPath, vueRoot }
}

function parseArgs(argv: string[]) {
  let write = false
  let strict = false
  let reportPath: string | undefined
  let primitivesFlag: string | undefined
  let vueRootFlag: string | undefined
  const rest: string[] = []
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--write') {
      write = true
    }
    else if (a === '--strict') {
      strict = true
    }
    else if (a === '--report') {
      reportPath = argv[++i]
    }
    else if (a === '--primitives') {
      primitivesFlag = argv[++i]
    }
    else if (a === '--vue-root') {
      vueRootFlag = argv[++i]
    }
    else if (a === '--help') {
      console.log('Usage: bun run scripts/replace-h-gray.ts [--write] [--strict] [--report FILE] [--primitives PATH] [--vue-root PATH]')
      process.exit(0)
    }
    else {
      rest.push(a)
    }
  }
  if (rest.length > 0) {
    console.warn('Ignoring unknown args:', rest.join(' '))
  }

  const { primitivesPath, vueRoot } = resolvePrimitivesAndVue(primitivesFlag, vueRootFlag)
  return { write, strict, reportPath, primitivesPath, vueRoot }
}

function loadDefinedGrayPrimitives(primitivesPath: string): Set<string> {
  const text = readFileSync(primitivesPath, 'utf8')
  const set = new Set<string>()
  for (const m of text.matchAll(/--color-gray-([0-9a-f]{2})\s*:/gi)) {
    set.add(m[1].toLowerCase())
  }
  return set
}

function walkFiles(dir: string, out: string[] = []): string[] {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  }
  catch {
    return out
  }
  for (const name of entries) {
    if (
      name === 'node_modules'
      || name === '.storybook-static'
      || name === 'dist'
      || name === '.turbo'
    ) {
      continue
    }
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) {
      walkFiles(p, out)
    }
    else if (SCAN_EXTENSIONS.has(extnameLower(name))) {
      out.push(p)
    }
  }
  return out
}

function extnameLower(file: string): string {
  const i = file.lastIndexOf('.')
  return i >= 0 ? file.slice(i).toLowerCase() : ''
}

function transformContent(
  content: string,
  definedGray: Set<string>,
): { next: string; localUnmatched: Map<string, number>; replacements: number } {
  const localUnmatched = new Map<string, number>()
  let replacements = 0
  const re = /-h([0-9a-fA-F]{2})/g
  const next = content.replace(re, (_, hexPair: string) => {
    replacements++
    const xx = hexPair.toLowerCase()
    if (!definedGray.has(xx)) {
      localUnmatched.set(xx, (localUnmatched.get(xx) ?? 0) + 1)
    }

    return `-gray-${xx}`
  })

  return { next, localUnmatched, replacements }
}

function mergeCounts(a: Map<string, number>, b: Map<string, number>) {
  for (const [k, v] of b) {
    a.set(k, (a.get(k) ?? 0) + v)
  }
}

function main() {
  const { write, strict, reportPath, primitivesPath: primitivesResolved, vueRoot } = parseArgs(process.argv.slice(2))

  let definedGray: Set<string>
  try {
    definedGray = loadDefinedGrayPrimitives(primitivesResolved)
  }
  catch (e) {
    console.error(`Cannot read primitives: ${primitivesResolved}`, e)
    process.exit(1)
  }

  if (definedGray.size === 0) {
    console.error(`No --color-gray-xx tokens found in ${primitivesResolved}`)
    process.exit(1)
  }

  const files = walkFiles(vueRoot).sort((a, b) => a.localeCompare(b))
  const globalUnmatched = new Map<string, number>()
  let totalReplacements = 0
  const changedFiles: { path: string; count: number }[] = []

  for (const file of files) {
    const raw = readFileSync(file, 'utf8')
    const { next, localUnmatched, replacements } = transformContent(raw, definedGray)
    if (replacements === 0) {
      continue
    }

    mergeCounts(globalUnmatched, localUnmatched)
    totalReplacements += replacements
    if (next !== raw) {
      changedFiles.push({ path: file, count: replacements })
      if (write) {
        writeFileSync(file, next, 'utf8')
      }
    }
  }

  const cwd = process.cwd()
  console.log(
    `${write ? 'Applied' : 'Dry-run'}: ${changedFiles.length} file(s), ${totalReplacements} replacement(s).`,
  )
  console.log(`Primitives: ${relative(cwd, primitivesResolved) || primitivesResolved}`)
  console.log(`Vue root:   ${relative(cwd, vueRoot) || vueRoot}`)

  if (changedFiles.length > 0) {
    console.log('\nFiles touched:')
    for (const { path: p, count } of changedFiles) {
      console.log(`  ${relative(cwd, p) || p}  (${count} -hXX)`)
    }
  }

  if (globalUnmatched.size > 0) {
    const lines = [...globalUnmatched.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([xx, n]) => `--color-gray-${xx} missing (${n} occurrence(s) → still rewritten to -gray-${xx})`)

    console.warn(`\n⚠ Unmatched gray suffixes (not in primitives): ${globalUnmatched.size}`)
    for (const line of lines) {
      console.warn(`  ${line}`)
    }

    if (reportPath) {
      mkdirSync(dirname(reportPath), { recursive: true })
      const body = `${[...globalUnmatched.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([xx, n]) => `${xx}\t${n}`)
        .join('\n')}\n`
      writeFileSync(reportPath, body, 'utf8')
      console.warn(`\nReport written: ${relative(cwd, reportPath) || reportPath}`)
    }

    if (strict) {
      process.exit(1)
    }
  }
  else {
    console.log('\nAll `-hXX` mappings have matching `--color-gray-xx` in primitives.')
  }
}

main()

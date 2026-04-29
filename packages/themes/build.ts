declare const Bun: any

function normalizeSlash(filePath: string) {
  return filePath.replaceAll('\\', '/')
}

function getRootDir() {
  const url = new URL('.', import.meta.url)
  let pathname = decodeURIComponent(url.pathname)
  if (/^\/[a-z]:\//i.test(pathname)) {
    pathname = pathname.slice(1)
  }
  const normalized = normalizeSlash(pathname)
  return normalized.endsWith('/') ? normalized.slice(0, -1) : normalized
}

const ROOT = getRootDir()

function toAbsolutePath(filePath: string) {
  const normalized = normalizeSlash(filePath)
  const isWindowsAbs = /^[a-z]:\//i.test(normalized)
  if (isWindowsAbs || normalized.startsWith('/')) {
    return normalized
  }
  return `${normalizeSlash(ROOT)}/${normalized}`
}

async function runCommand(title: string, cmd: string[]) {
  console.log(`\n>> ${title}`)
  const proc = Bun.spawn(cmd, {
    cwd: ROOT,
    stdout: 'inherit',
    stderr: 'inherit',
  })
  const code = await proc.exited
  if (code !== 0) {
    throw new Error(`${title} failed with exit code ${code}`)
  }
}

async function collectThemeCssEntries() {
  // Only directories that contain a `crafts/` subdirectory are treated as themes.
  const craftsGlob = new Bun.Glob('src/*/crafts')
  const entries: string[] = []

  for await (const craftsDir of craftsGlob.scan({ cwd: ROOT, onlyFiles: false })) {
    const normalized = normalizeSlash(craftsDir)
    const themeDir = normalized.slice(0, normalized.lastIndexOf('/'))
    const indexCss = `${themeDir}/index.css`
    const inputFile = Bun.file(toAbsolutePath(indexCss))
    if (await inputFile.exists()) {
      entries.push(indexCss)
    }
  }

  entries.sort((a, b) => a.localeCompare(b))
  return entries
}

async function cleanDistDirectory() {
  await runCommand('Clean dist directory', [
    'bun',
    '-e',
    'import { mkdir, rm } from \'node:fs/promises\'; await rm(\'./dist\', { recursive: true, force: true }); await mkdir(\'./dist\', { recursive: true });',
  ])
}

async function buildCssByTheme() {
  const cssEntries = await collectThemeCssEntries()
  if (cssEntries.length === 0) {
    console.warn('No index.css found under src/*/, skip css build.')
    return
  }

  for (const entryPath of cssEntries) {
    const normalizedEntryPath = normalizeSlash(entryPath)
    const themeDir = normalizedEntryPath.slice(0, normalizedEntryPath.lastIndexOf('/'))
    const themeName = themeDir.slice(themeDir.lastIndexOf('/') + 1)
    const inputCss = toAbsolutePath(normalizedEntryPath)
    const outputCss = toAbsolutePath(`dist/${themeName}/index.css`)

    await runCommand(`Build index.css for theme: ${themeName}`, [
      'bun',
      'x',
      'tailwindcss',
      '--input',
      inputCss,
      '--output',
      outputCss,
    ])
  }
}

async function main() {
  await cleanDistDirectory()
  await runCommand('Compile TS with tsc', [
    'bun',
    'x',
    'tsc',
    '--project',
    './tsconfig.json',
  ])
  await buildCssByTheme()
  console.log('\nBuild completed.')
}

main().catch((error) => {
  console.error(error)
  Bun.exit(1)
})

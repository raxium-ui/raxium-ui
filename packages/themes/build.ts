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

async function collectThemeConfigs() {
  const glob = new Bun.Glob('src/*/tailwind.config.ts')
  const files: string[] = []

  for await (const file of glob.scan(ROOT)) {
    files.push(file)
  }

  files.sort((a, b) => a.localeCompare(b))
  return files
}

async function cleanDistDirectory() {
  await runCommand('Clean dist directory', [
    'bun',
    '-e',
    'import { mkdir, rm } from \'node:fs/promises\'; await rm(\'./dist\', { recursive: true, force: true }); await mkdir(\'./dist\', { recursive: true });',
  ])
}

async function buildCssByTheme() {
  const themeConfigs = await collectThemeConfigs()
  if (themeConfigs.length === 0) {
    console.warn('No theme config found under src/*/tailwind.config.ts, skip css build.')
    return
  }

  const cssEntries = ['index.css'] as const

  for (const configPath of themeConfigs) {
    const normalizedConfigPath = normalizeSlash(configPath)
    const themeDir = normalizedConfigPath.slice(0, normalizedConfigPath.lastIndexOf('/'))
    const themeName = themeDir.slice(themeDir.lastIndexOf('/') + 1)
    for (const cssEntry of cssEntries) {
      const inputCss = toAbsolutePath(`${themeDir}/${cssEntry}`)
      const outputCss = toAbsolutePath(`dist/${themeName}/${cssEntry}`)
      const inputFile = Bun.file(inputCss)
      if (!(await inputFile.exists())) {
        console.warn(`Skip CSS build for theme "${themeName}": missing ${cssEntry}`)
        continue
      }

      await runCommand(`Build ${cssEntry} for theme: ${themeName}`, [
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

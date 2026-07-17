#!/usr/bin/env node
/* eslint-disable node/prefer-global/process */
/**
 * Auto-nudge Agent to fill placeholder changeset changelogs.
 *
 * Events:
 * - stop: after agent turn, if placeholder .changeset/*.md exist → followup_message
 * - postToolUse (Write/Edit): if a changeset file was written as placeholder → additional_context
 *
 * Fail-open: always exit 0 with {} on errors.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, join, relative } from 'node:path'

const PLACEHOLDER_RE = /^(?:change\s*log|todo|tbd|\.\.\.|…)?\s*$/i
const SKIP = new Set(['config.json', 'README.md', 'README'])

function readStdin() {
  return new Promise((resolve) => {
    const chunks = []
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', c => chunks.push(c))
    process.stdin.on('end', () => resolve(chunks.join('')))
    process.stdin.on('error', () => resolve(''))
  })
}

function changesetRoot(cwd) {
  return join(cwd, '.changeset')
}

function isChangesetMd(filePath, cwd) {
  if (!filePath)
    return false
  const rel = relative(cwd, filePath).replace(/\\/g, '/')
  return rel.startsWith('.changeset/') && rel.endsWith('.md') && !SKIP.has(basename(filePath))
}

function bodyIsPlaceholder(content) {
  if (!content)
    return true
  const parts = content.split(/^---\s*$/m)
  // frontmatter files: '', yaml, body...
  const body = parts.length >= 3 ? parts.slice(2).join('---').trim() : content.trim()
  return PLACEHOLDER_RE.test(body)
}

function listPlaceholderChangesets(cwd) {
  const dir = changesetRoot(cwd)
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

function followupFor(files, cwd) {
  const list = files
    .map(f => relative(cwd, f).replace(/\\/g, '/'))
    .join(', ')
  return [
    `检测到占位 changeset，请立即按 .cursor/agents/changeset-changelog.md 填写英文 changelog。`,
    `目标文件: ${list}`,
    `保留 frontmatter 的包名与 bump 级别；用 git status / git diff HEAD 作为依据；写清用户可感知的 what/why（约 2～3 句，避免电报式一句带过）；不要 commit。`,
  ].join(' ')
}

async function main() {
  try {
    const raw = await readStdin()
    const input = raw ? JSON.parse(raw) : {}
    const cwd = input.workspace_roots?.[0] || input.cwd || process.cwd()
    const event = input.hook_event_name || input.event || ''

    // postToolUse / afterFileEdit: nudge when the edited file is a placeholder changeset
    const editedPath = input.file_path || input.tool_input?.path || input.tool_input?.file_path
    if (editedPath && isChangesetMd(editedPath, cwd)) {
      let content = ''
      try {
        content = readFileSync(editedPath, 'utf8')
      }
      catch {
        content = ''
      }
      if (bodyIsPlaceholder(content)) {
        const msg = followupFor([editedPath], cwd)
        if (event === 'stop') {
          console.log(JSON.stringify({ followup_message: msg }))
        }
        else {
          console.log(JSON.stringify({
            additional_context: msg,
            agent_message: msg,
          }))
        }
        return
      }
      console.log('{}')
      return
    }

    // stop: scan all placeholder changesets
    if (event === 'stop' || !event) {
      const placeholders = listPlaceholderChangesets(cwd)
      if (placeholders.length > 0 && (input.loop_count ?? 0) < 2) {
        console.log(JSON.stringify({
          followup_message: followupFor(placeholders, cwd),
        }))
        return
      }
    }

    console.log('{}')
  }
  catch {
    console.log('{}')
  }
}

main()

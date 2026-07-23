/** Shared changeset body detection for fill script and Cursor hooks. */
export const CHANGESET_SKIP = new Set(['config.json', 'README.md', 'README'])

const EMPTY_BODY_RE = /^(?:change\s*log|todo|tbd|\.\.\.|…)?\s*$/i
const AGENT_DRAFT_RE = /(?:^Draft:|Refine this draft with \/changeset-changelog|Expand with \/changeset-changelog)/i

export function extractChangesetBody(content) {
  if (!content)
    return ''
  const parts = content.split(/^---\s*$/m)
  return parts.length >= 3 ? parts.slice(2).join('---').trim() : content.trim()
}

/** True when the changeset body still needs Agent / manual changelog fill. */
export function bodyNeedsChangelog(content) {
  const body = extractChangesetBody(content)
  if (!body)
    return true
  if (EMPTY_BODY_RE.test(body))
    return true
  if (AGENT_DRAFT_RE.test(body))
    return true
  return false
}

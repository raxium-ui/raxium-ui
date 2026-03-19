/**
 * - bun "packages/vue/server.ts"
 * - PORT=4400 bun "packages/vue/server.ts"
 */

import path from 'node:path'
import process from 'node:process'

const STORYBOOK_STATIC_DIR = path.join(import.meta.dir, '.storybook-static')

function safeJoin(rootDir: string, urlPathname: string) {
  // 只处理 pathname（不含 query/hash），并阻止目录穿越
  const decoded = decodeURIComponent(urlPathname)
  const normalized = decoded.replaceAll('\\', '/')
  const stripped = normalized.startsWith('/') ? normalized.slice(1) : normalized

  // 粗粒度防护：拒绝任何包含 .. 的路径段
  const parts = stripped.split('/').filter(Boolean)
  if (parts.includes('..'))
    return null

  return path.join(rootDir, ...parts)
}

const server = Bun.serve({
  port: Number(process.env.PORT ?? 4399),
  hostname: process.env.HOST ?? '0.0.0.0',
  async fetch(req) {
    const url = new URL(req.url)
    const pathname = url.pathname

    // 根路由：直接返回 index.html
    if (pathname === '/' || pathname === '') {
      const file = Bun.file(path.join(STORYBOOK_STATIC_DIR, 'index.html'))
      return new Response(file, {
        headers: { 'content-type': 'text/html; charset=utf-8' },
      })
    }

    // 目录路径：补全 index.html
    const candidatePath = pathname.endsWith('/')
      ? `${pathname}index.html`
      : pathname

    const fullPath = safeJoin(STORYBOOK_STATIC_DIR, candidatePath)
    if (fullPath) {
      const file = Bun.file(fullPath)
      if (await file.exists()) {
        // 让 Bun 自动推断 content-type（file.type）
        const headers = new Headers()
        if (file.type)
          headers.set('content-type', file.type)

        // 静态文件缓存（storybook build 产物通常带 hash）
        // index.html 不建议 immutable，避免重建后被浏览器强缓存
        const isHtml = fullPath.toLowerCase().endsWith('.html')
        headers.set(
          'cache-control',
          isHtml ? 'no-cache' : 'public, max-age=31536000, immutable',
        )
        return new Response(file, { headers })
      }
    }

    // 注意：不要对 404 做 SPA 回退到 index.html，否则会触发 Storybook
    // "preloadStories unable to determine the source of the event" 错误
    return new Response('Not Found', { status: 404 })
  },
})

console.log(`storybook-static: http://${server.hostname}:${server.port}`)

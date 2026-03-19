/* eslint-disable node/prefer-global/process */
const { spawn } = require('node:child_process')
const path = require('node:path')

const cwd = path.join(__dirname, '..')
const bun = process.platform === 'win32' ? 'bun.cmd' : 'bun'

const child = spawn(bun, ['src/server.ts'], {
  cwd,
  stdio: 'inherit',
  env: process.env,
})

child.on('exit', code => process.exit(code ?? 0))

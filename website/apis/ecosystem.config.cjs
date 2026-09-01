const process = require('node:process')

const env = {
  PORT: 4398,
  HOST: '0.0.0.0',
}

if (process.env.MCP_DATA_ROOT)
  env.MCP_DATA_ROOT = process.env.MCP_DATA_ROOT

module.exports = {
  apps: [
    {
      name: 'raxium-mcp-apis',
      script: 'scripts/run-server.cjs',
      interpreter: 'node',
      env,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
    },
  ],
}

module.exports = {
  apps: [
    {
      name: 'raxium-mcp-apis',
      script: 'scripts/run-server.cjs',
      interpreter: 'node',
      env: {
        PORT: 4398,
        HOST: '0.0.0.0',
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
    },
  ],
}

module.exports = {
  apps: [
    {
      name: 'raxium-vue-storybook',
      script: 'server.ts',
      interpreter: 'bun',
      watch: ['.storybook-static'],
      watch_delay: 1000,
      autorestart: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}

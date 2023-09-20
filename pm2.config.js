module.exports = {
  apps: [
    {
      name: 'pt', // Change this to your app's name
      script: 'npm',
      args: 'start',
      cwd: '/var/www/html', // Change this to the absolute path of your project
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}

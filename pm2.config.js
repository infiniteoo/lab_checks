module.exports = {
  apps: [
    {
      name: 'front',
      script: 'npm',
      args: 'run dev', // Run Next.js in development mode. Use 'start' for production
      watch: true,
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'back',
      script: 'server/index.js',
      args: '',
      watch: true,
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'development',
        PORT: 8888, // Assuming your backend runs on port 5000
      },
      exec_mode: 'cluster', // if you want to use clustering
      instances: 'max', // or number of instances
    },
  ],
}

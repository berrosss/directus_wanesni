module.exports = {
  apps: [
    {
      name: "directus_wanesni",
      script: "npx",
      args: "directus start",
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

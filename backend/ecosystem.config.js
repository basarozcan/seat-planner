module.exports = {
  apps: [
    {
      name: "dmv-mevn-seat-planner",
      script: "./index.js",
      instances: "max",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};

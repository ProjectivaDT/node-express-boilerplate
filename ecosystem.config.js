module.exports = {
  apps : [{
    name   : "Boilerplate Service",
    script : "index.js",
    env_production: {
       NODE_ENV: "production"
    },
    env_development: {
       NODE_ENV: "development"
    }
  }]
}

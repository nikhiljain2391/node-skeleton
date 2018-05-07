'use strict'

// Redis Configuration to required establish connection
const REDIS_CONFIG = {
  HOST: process.env.REDIS_HOST,
  PORT: process.env.REDIS_PORT
}

// Terminate Server if any Cache Configuration is missing
Object.keys(REDIS_CONFIG).forEach(function (key) {
  // if (!REDIS_CONFIG[key]) {
  //   console.error("[Error] Missing Redis Config:", key)
  //   return process.exit(1)
  // }
})

export { REDIS_CONFIG }

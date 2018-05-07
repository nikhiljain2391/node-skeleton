'use strict'

const AWS_CONFIG = {
  AUTH: {
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
  },
  S3: {
    REGION: process.env.AWS_S3_REGION,
    BUCKET: process.env.AWS_S3_BUCKET
  },
  ES: {
    REGION: process.env.AWS_ES_REGION,
    HOST: process.env.AWS_ES_HOST
  }
}

const REQUIRED_CONFIG = [
  'AWS_S3_REGION',
  'AWS_S3_BUCKET',
  'AWS_ES_REGION',
  'AWS_ES_HOST'
]

REQUIRED_CONFIG.forEach(function (key) {
  // if (!process.env[key]) {
  //   console.error("[Error] AWS Config Missing:", key)
  //   return process.exit(1)
  // }
})

export { AWS_CONFIG }

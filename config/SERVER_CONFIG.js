'use strict'

import fs from 'fs-extra'
import path from 'path'

const ROOT_DIR = path.dirname(require.main.filename)
const {
  PORT = 8080,
  LOG_DIR = path.join(ROOT_DIR, 'logs'),
  UPLOAD_DIR = path.join(ROOT_DIR, 'uploads')
} = process.env
const REQUEST_LOG_DIR = path.join(LOG_DIR, 'requests')

const SERVER_CONFIG = {
  PORT,
  ROOT_DIR,
  LOG_DIR,
  UPLOAD_DIR,
  REQUEST_LOG_DIR
}

Object.keys(SERVER_CONFIG).forEach(key => {
  if (key.indexOf('DIR') !== -1) {
    fs.ensureDirSync(SERVER_CONFIG[key])
  }
})

export { SERVER_CONFIG }

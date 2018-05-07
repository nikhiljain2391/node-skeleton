'use strict'

import fs from 'fs-extra'
import path from 'path'
import morgan from 'morgan'
import rfs from 'rotating-file-stream'
import moment from 'moment-timezone'

const LOG_BLACKLIST_USER_AGENT = ['Amazon Route 53 Health Check Service;', 'ELB-HealthChecker']
const DEFAULT_OPTIONS = {
  REQUEST_BODY_BLACKLIST_KEYS: []
}

const LOG_PARAMS = (tokens, req, res) => {
  let log = {
    'method': tokens['method'](req, res),
    'url': tokens['url'](req, res),
    'status-code': tokens['status'](req, res),
    'response-message': tokens['response-message'](req, res),
    'response-time': tokens['response-time'](req, res) + ' ms',
    'timestamp': tokens['date'](req, res, 'iso'),
    'remote-address': tokens['remote-addr'](req, res),
    'referrer': tokens['referrer'](req, res),
    'user-agent': tokens['user-agent'](req, res),
    'request-body': tokens['request-body'](req, res),
    'user': tokens['user'](req, res)
  }

  LOG_BLACKLIST_USER_AGENT.forEach(function (userAgent) {
    if (log && log['user-agent'] && log['user-agent'].indexOf(userAgent) !== -1) {
      log = undefined
    }
  })

  return (log && JSON.stringify(log)) || undefined
}

export class RequestLogger {
  constructor (LOG_DIR, options) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, (options || {}))
    this.LOG_DIR = LOG_DIR

    // Method Hard-binding
    this.init = this.init.bind(this)
    this._extendMorganTokens = this._extendMorganTokens.bind(this)
    this._createRotatingWriteStream = this._createRotatingWriteStream.bind(this)
    this._logFileNameGenerator = this._logFileNameGenerator.bind(this)
  }

  init () {
    this._extendMorganTokens()
    this._createRotatingWriteStream()
    return morgan(LOG_PARAMS, { stream: this.LogStream })
  }

  _extendMorganTokens () {
    const { REQUEST_BODY_BLACKLIST_KEYS } = this.options

    morgan.token('response-message', (req, res) => res.statusMessage)

    // Sanitize Request Body based on Blacklist Keys
    morgan.token('request-body', (req, res) => {
      const { body } = req
      let array = body instanceof Array ? body : undefined
      let obj = !array && Object.assign({}, body);

      // Handle Array Request Body
      (array || []).map(item => {
        let sanitizedItem = Object.assign({}, item)
        REQUEST_BODY_BLACKLIST_KEYS.forEach(key => delete sanitizedItem[key])
        return sanitizedItem
      })

      // Handle JSON Request Body
      obj && REQUEST_BODY_BLACKLIST_KEYS.forEach(key => delete obj[key])

      return array || obj
    })

    morgan.token('user', (req, res) => req.user || undefined)
  }

  _createRotatingWriteStream () {
    this.LogStream = rfs(this._logFileNameGenerator, { interval: '1d' })
  }

  _logFileNameGenerator (time, index) {
    const { LOG_DIR } = this
    const date = moment()
    const year = date.format('YYYY')
    const month = date.format('MM')
    const day = date.format('DD')
    const LogDir = path.join(LOG_DIR, year, month, day)
    const fileName = [year, month, day + '.log'].join('_')
    const file = path.join(LogDir, fileName)

    fs.ensureFileSync(file)
    return file
  }
}

'use strict'

import Express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Routes } from './api/routes'
import { RequestLogger } from './lib'
import { SERVER_CONFIG } from './config'
import startServer from './startServer'

const app = new Express()
const requestLogger = new RequestLogger(SERVER_CONFIG.REQUEST_LOG_DIR)

// Middleware Initializations
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(requestLogger.init())

// Initialize Routes
Routes.init(app)

// Start Server
startServer(app)

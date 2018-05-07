'use strict'

import async from 'async'
import mongoose from 'mongoose'
import { SERVER_CONFIG, MONGO_CONFIG } from './config'

const { PORT } = SERVER_CONFIG

const startServer = (app) => {
  async.series([
    // Connect MongoDB
    next => {
      const { CONNECTION_URI, OPTIONS, DBNAME } = MONGO_CONFIG
      if (!DBNAME) { return process.nextTick(next) }

      console.log('[Info] Connecting to MongoDB...')
      mongoose.connect(CONNECTION_URI, OPTIONS)
        .then(
          error => {
            if (error) { return next('[Error] MongoDB Connection Error: ' + error) }

            console.log('[Info] MongoDB Connection to Database \'' + DBNAME + '\' Successful!')
            next(null)
          },
          error => next('[Error] MongoDB Connection Error: ' + error)
        )
    }
  ], error => {
    if (error) {
      console.error(error)
      return process.exit(-1)
    }
    console.log('[Info] Starting Server...')
    app.listen(PORT, () => console.log('[Info] Server Started Successfully! Listening on Port:', PORT))
  })
}

export default startServer

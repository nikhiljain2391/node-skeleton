'use strict'

import async from 'async'
import fs from 'fs'
import path from 'path'
import { S3Client } from './S3Client'

export class FileUpload {
  constructor (FILE_UPLOAD_CONFIG) {
    const { S3, S3_BASE_KEY } = FILE_UPLOAD_CONFIG
    this.S3 = S3
    this.S3_BASE_KEY = S3_BASE_KEY

    // Method Hard-binding
    this.upload = this.upload.bind(this)
    this._buildUploadParams = this._buildUploadParams.bind(this)
  }

  upload (file, callback) {
    const uploadParams = this._buildUploadParams(file)
    async.waterfall([
      // Upload to S3 Bucket
      next => S3Client.upload(uploadParams, next),

      // Remove Uploaded File
      (data, next) => fs.unlink(file.path, error => next(error, data))

    ], callback)
  }

  _buildUploadParams (file) {
    const { BUCKET } = this.S3
    const { S3_BASE_KEY } = this
    let fileStream = fs.createReadStream(file.path)

    fileStream.on('error', error => {
      console.log(error)
    })

    const params = {
      Bucket: BUCKET,
      Key: S3_BASE_KEY + path.basename(file.path),
      Body: fileStream
    }
    return params
  }
}

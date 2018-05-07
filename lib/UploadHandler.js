'use strict'

import multer from 'multer'
import path from 'path'

export const UploadHandler = (uploadDir) => {
  const storageOptions = multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, uploadDir)
    },
    filename: function (request, file, callback) {
      let filename = file.originalname
      const ext = path.extname(filename)
      filename = filename.replace(/ /g, '_')
      filename = filename.replace(ext, ('-' + Date.now() + ext))

      callback(null, filename)
    }
  })

  return multer({
    storage: storageOptions,
    limits: {
      fileSize: 50 * 1024 * 1024
    }
  }).single('file')
}

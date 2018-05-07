'use strict'

import AWS from 'aws-sdk'
import { AWS_CONFIG } from '../config'

AWS.config.update({
  region: AWS_CONFIG.S3_REGION,
  endpoint: AWS_CONFIG.S3_ENDPOINT,
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY
})

export const S3Client = new AWS.S3()

export class _S3Client {
  constructor (CONFIG) {
    const { AUTH, S3 } = CONFIG
    AWS.config.update({
      region: S3.REGION,
      endpoint: S3.ENDPOINT,
      accessKeyId: AUTH.ACCESS_KEY_ID,
      secretAccessKey: AUTH.SECRET_ACCESS_KEY
    })
    return new AWS.S3()
  }
}

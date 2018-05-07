'use strict'

import { AWS_CONFIG } from './AWS_CONFIG'

const { AUTH, S3 } = AWS_CONFIG
export const FILE_UPLOAD_CONFIG = {
  S3_BASE_KEY: 'uploads/',
  AUTH,
  S3
}

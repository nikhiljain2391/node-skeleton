'use strict'

import elasticsearch from 'elasticsearch'

export const ESClient = (CONFIG) => {
  const { AUTH, ES } = CONFIG
  const ES_CONFIG = {
    service: 'es',
    region: ES.REGION,
    host: ES.HOST,
    accessKeyId: AUTH.ACCESS_KEY_ID,
    secretAccessKey: AUTH.SECRET_ACCESS_KEY
  }
  return new elasticsearch.Client(ES_CONFIG)
}

export class _ESClient {
  constructor (CONFIG) {
    const { AUTH, ES } = CONFIG
    const ES_CONFIG = {
      service: 'es',
      region: ES.REGION,
      host: ES.HOST,
      accessKeyId: AUTH.ACCESS_KEY_ID,
      secretAccessKey: AUTH.SECRET_ACCESS_KEY
    }
    return new elasticsearch.Client(ES_CONFIG)
  }
}

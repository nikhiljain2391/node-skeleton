'use strict'

import { ResponseBody } from '../lib'

export class ESRouteHandler {
  constructor (Model) {
    this.Model = Model

    // Method Hard-Binding to allow them to be assigned to
    // other variables and work as expected
    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
    this.search = this.search.bind(this)
    this.scan = this.scan.bind(this)
    this.remove = this.remove.bind(this)
    this._handleError = this._handleError.bind(this)
  }

  create (request, response) {
    const { Model } = this
    const { body } = request

    Model.create(body, (error, document) => {
      let responseBody
      if (this._handleError(error, response)) { return }

      responseBody = new ResponseBody(201, 'OK', document)
      response.statusMessage = responseBody.message
      response.status(responseBody.statusCode).json(responseBody)
    })
  }

  get (request, response) {
    const { Model } = this
    const { params } = request
    const { id } = params

    Model.get(id, (error, data) => {
      let responseBody
      if (this._handleError(error, response)) { return }

      responseBody = data
        ? new ResponseBody(200, 'OK', data)
        : new ResponseBody(204, 'No Content', {})

      response.statusMessage = responseBody.message
      response.status(responseBody.statusCode).json(responseBody)
    })
  }

  search (request, response) {
    const { Model } = this
    const { query } = request

    Model.search({ match: query }, (error, data) => {
      let responseBody
      if (this._handleError(error, response)) { return }

      responseBody = new ResponseBody(200, 'OK', data)
      response.statusMessage = responseBody.message
      response.status(responseBody.statusCode).json(responseBody)
    })
  }

  scan (request, response) {
    const { Model } = this

    Model.scan((error, data) => {
      let responseBody
      if (this._handleError(error, response)) { return }

      responseBody = new ResponseBody(200, 'OK', data)
      response.statusMessage = responseBody.message
      response.status(responseBody.statusCode).json(responseBody)
    })
  }

  remove (request, response) {
    const { Model } = this
    const { params } = request
    const { id } = params

    Model.remove(id, error => {
      let responseBody
      if (this._handleError(error, response)) { return }

      responseBody = new ResponseBody(200, 'OK')
      response.statusMessage = responseBody.message
      response.status(responseBody.statusCode).json(responseBody)
    })
  }

  _handleError (error, response) {
    let responseBody

    if (error && error.constructor === ResponseBody) {
      response.statusMessage = error.message
      response.status(error.statusCode).json(error)
      return true
    } else if (error) {
      responseBody = new ResponseBody(500, error.toString())
      response.statusMessage = responseBody.message
      response.status(responseBody.statusCode).json(responseBody)
      return true
    }

    return false
  }
}

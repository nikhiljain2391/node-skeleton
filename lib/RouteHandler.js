'use strict'

import { ResponseBody } from '../lib'

export class RouteHandler {
  constructor (Model) {
    this.Model = Model

    // Method Hard-Binding to allow them to be assigned to
    // other variables and work as expected
    this.index = this.index.bind(this)
    this.findById = this.findById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
    this._handleError = this._handleError.bind(this)
  }

  index (request, response) {
    const { Model } = this
    const { query } = request

    Model.index(query, (error, documents) => {
      let responseBody
      if (this._handleError(error, response)) { return }

      responseBody = documents.length
        ? new ResponseBody(200, 'OK', documents)
        : new ResponseBody(204, 'No Content', [])

      response.statusMessage = responseBody.message
      response.status(200).json(responseBody)
    })
  }

  findById (request, response) {
    const { Model } = this
    const { params } = request
    const id = params.id

    Model.findById(id, (error, documents) => {
      let responseBody
      if (this._handleError(error, response)) { return }

      responseBody = (documents && (documents._id || documents.length))
        ? new ResponseBody(200, 'OK', documents)
        : new ResponseBody(204, 'No Content', {})

      response.statusMessage = responseBody.message
      response.status(200).json(responseBody)
    })
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

  update (request, response) {
    const { Model } = this
    const { params, body } = request
    const _id = params.id

    Model.update({ _id }, body, (error, msg) => {
      let responseBody
      if (this._handleError(error, response)) { return }

      responseBody = new ResponseBody(200, 'OK')
      response.statusMessage = responseBody.message
      response.status(responseBody.statusCode).json(responseBody)
    })
  }

  remove (request, response) {
    const { Model } = this
    const { params } = request
    const _id = params.id

    Model.remove({ _id }, error => {
      let responseBody
      if (this._handleError(error, response)) { return }

      responseBody = new ResponseBody(200, 'OK')
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

import ApiClient from '../ApiClient'
import DataResponse from '../models/DataResponse'

/**
 * Users service.
 * @module RelativelyProductive/api/UsersApi
 * @version v1-prerelease
 */
export default class UsersApi {
  /**
   * Constructs a new UsersApi.
   * @alias module:RelativelyProductive/api/UsersApi
   * @class
   * @param {module:RelativelyProductive/ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:RelativelyProductive/ApiClient#instance} if unspecified.
   */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance
  }

  /**
   * @param {Object} opts Optional parameters
   * @param {String} opts.value
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:RelativelyProductive/models/DataResponse} and HTTP response
   */
  _createUserSecretWithHttpInfo(opts) {
    opts = opts || {}
    let postBody = null

    let pathParams = {}
    let queryParams = {
      value: opts['value'],
    }
    let headerParams = {}
    let formParams = {}

    let authNames = []
    let contentTypes = []
    let accepts = ['text/plain', 'application/json', 'text/json']
    let returnType = DataResponse

    return this.apiClient.callApi(
      '/dash/Users/CreateUserSecret',
      'POST',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType
    )
  }

  /**
   * @param {Object} opts Optional parameters
   * @param {String} opts.value
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:RelativelyProductive/models/DataResponse}
   */
  CreateUserSecret(opts) {
    return this._createUserSecretWithHttpInfo(opts).then(function(response) {
      return response.data
    })
  }

  /**
   * Dev only method
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:RelativelyProductive/models/DataResponse} and HTTP response
   */
  _getWithHttpInfo() {
    let postBody = null

    let pathParams = {}
    let queryParams = {}
    let headerParams = {}
    let formParams = {}

    let authNames = []
    let contentTypes = []
    let accepts = ['text/plain', 'application/json', 'text/json']
    let returnType = DataResponse

    return this.apiClient.callApi(
      '/dash/Users',
      'GET',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType
    )
  }

  /**
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:RelativelyProductive/models/DataResponse}
   */
  Get() {
    return this._getWithHttpInfo().then(function(response) {
      return response.data
    })
  }

  /**
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:RelativelyProductive/models/DataResponse} and HTTP response
   */
  _getSelfWithHttpInfo() {
    let postBody = null

    let pathParams = {}
    let queryParams = {}
    let headerParams = {}
    let formParams = {}

    let authNames = []
    let contentTypes = []
    let accepts = ['text/plain', 'application/json', 'text/json']
    let returnType = DataResponse

    return this.apiClient.callApi(
      '/dash/Users/GetSelf',
      'GET',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType
    )
  }

  /**
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:RelativelyProductive/models/DataResponse}
   */
  GetSelf() {
    return this._getSelfWithHttpInfo().then(function(response) {
      return response.data
    })
  }

  /**
   * @param {Object} opts Optional parameters
   * @param {module:RelativelyProductive/models/User} opts.value
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:RelativelyProductive/models/DataResponse} and HTTP response
   */
  _registerWithHttpInfo(opts) {
    opts = opts || {}
    let postBody = opts['value']

    let pathParams = {}
    let queryParams = {}
    let headerParams = {}
    let formParams = {}

    let authNames = []
    let contentTypes = [
      'application/json-patch+json',
      'application/json',
      'text/json',
      'application/_*+json',
    ]
    let accepts = ['text/plain', 'application/json', 'text/json']
    let returnType = DataResponse

    return this.apiClient.callApi(
      '/dash/Users/register',
      'POST',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType
    )
  }

  /**
   * @param {Object} opts Optional parameters
   * @param {module:RelativelyProductive/models/User} opts.value
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:RelativelyProductive/models/DataResponse}
   */
  Register(opts) {
    return this._registerWithHttpInfo(opts).then(function(response) {
      return response.data
    })
  }

  /**
   * @param {Object} opts Optional parameters
   * @param {module:RelativelyProductive/models/User} opts.value
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:RelativelyProductive/models/DataResponse} and HTTP response
   */
  _updateWithHttpInfo(opts) {
    opts = opts || {}
    let postBody = opts['value']

    let pathParams = {}
    let queryParams = {}
    let headerParams = {}
    let formParams = {}

    let authNames = []
    let contentTypes = [
      'application/json-patch+json',
      'application/json',
      'text/json',
      'application/_*+json',
    ]
    let accepts = ['text/plain', 'application/json', 'text/json']
    let returnType = DataResponse

    return this.apiClient.callApi(
      '/dash/Users/update',
      'POST',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType
    )
  }

  /**
   * @param {Object} opts Optional parameters
   * @param {module:RelativelyProductive/models/User} opts.value
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:RelativelyProductive/models/DataResponse}
   */
  Update(opts) {
    return this._updateWithHttpInfo(opts).then(function(response) {
      return response.data
    })
  }
}

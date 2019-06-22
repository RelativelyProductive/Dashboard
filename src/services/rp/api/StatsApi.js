import ApiClient from '../ApiClient'
import DataResponse from '../models/DataResponse'

/**
 * Stats service.
 * @module RelativelyProductive/api/StatsApi
 * @version v1-prerelease
 */
export default class StatsApi {
  /**
   * Constructs a new StatsApi.
   * @alias module:RelativelyProductive/api/StatsApi
   * @class
   * @param {module:RelativelyProductive/ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:RelativelyProductive/ApiClient#instance} if unspecified.
   */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance
  }

  /**
   * @param {Object} opts Optional parameters
   * @param {Date} opts.startDate
   * @param {Date} opts.endDate
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:RelativelyProductive/models/DataResponse} and HTTP response
   */
  _getGoalsMetForAllUsersWithHttpInfo(opts) {
    opts = opts || {}
    let postBody = null

    let pathParams = {}
    let queryParams = {
      startDate: opts['startDate'],
      endDate: opts['endDate'],
    }
    let headerParams = {}
    let formParams = {}

    let authNames = []
    let contentTypes = []
    let accepts = ['text/plain', 'application/json', 'text/json']
    let returnType = DataResponse

    return this.apiClient.callApi(
      '/dash/stats/GetGoalsMetForAllUsers',
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
   * @param {Object} opts Optional parameters
   * @param {Date} opts.startDate
   * @param {Date} opts.endDate
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:RelativelyProductive/models/DataResponse}
   */
  GetGoalsMetForAllUsers(opts) {
    return this._getGoalsMetForAllUsersWithHttpInfo(opts).then(function(response) {
      return response.data
    })
  }

  /**
   * @param {Object} opts Optional parameters
   * @param {Date} opts.startDate
   * @param {Date} opts.endDate
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:RelativelyProductive/models/DataResponse} and HTTP response
   */
  _getGoalsMetWithHttpInfo(opts) {
    opts = opts || {}
    let postBody = null

    let pathParams = {}
    let queryParams = {
      startDate: opts['startDate'],
      endDate: opts['endDate'],
    }
    let headerParams = {}
    let formParams = {}

    let authNames = []
    let contentTypes = []
    let accepts = ['text/plain', 'application/json', 'text/json']
    let returnType = DataResponse

    return this.apiClient.callApi(
      '/dash/stats/GetGoalsMet',
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
   * @param {String} userId
   * @param {Object} opts Optional parameters
   * @param {Date} opts.startDate
   * @param {Date} opts.endDate
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:RelativelyProductive/models/DataResponse}
   */
  GetGoalsMet(opts) {
    return this._getGoalsMetWithHttpInfo(opts).then(function(response) {
      return response.data
    })
  }
}

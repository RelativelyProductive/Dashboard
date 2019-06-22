import ApiClient from '../ApiClient'
// import Goal from '../models/Goal';
import DataResponse from '../models/DataResponse'

/**
 * DailyGoal service.
 * @module RelativelyProductive/api/DailyGoalApi
 * @version v1-prerelease
 */
export default class DailyGoalApi {
  /**
   * Constructs a new DailyGoalApi.
   * @alias module:RelativelyProductive/api/DailyGoalApi
   * @class
   * @param {module:RelativelyProductive/ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:RelativelyProductive/ApiClient#instance} if unspecified.
   */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance
  }

  /**
   * @param {String} goalId
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:RelativelyProductive/models/DataResponse} and HTTP response
   */
  _deleteWithHttpInfo(goalId) {
    let postBody = null

    // verify the required parameter 'goalId' is set
    if (goalId === undefined || goalId === null) {
      throw new Error("Missing the required parameter 'goalId' when calling callDelete")
    }

    let pathParams = {
      goalId: goalId,
    }
    let queryParams = {}
    let headerParams = {}
    let formParams = {}

    let authNames = []
    let contentTypes = []
    let accepts = ['text/plain', 'application/json', 'text/json']
    let returnType = DataResponse

    return this.apiClient.callApi(
      '/dash/DailyGoal/{goalId}',
      'DELETE',
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
   * @param {String} goalId
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:RelativelyProductive/models/DataResponse}
   */
  Delete(goalId) {
    return this._deleteWithHttpInfo(goalId).then(function(reponse) {
      return reponse.data
    })
  }

  /**
   * @param {Object} opts Optional parameters
   * @param {module:RelativelyProductive/models/Goal} opts.value
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:RelativelyProductive/models/DataResponse} and HTTP response
   */
  _createWithHttpInfo(opts) {
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
      '/dash/DailyGoal/create',
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
   * @param {module:RelativelyProductive/models/Goal} opts.value
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:RelativelyProductive/models/DataResponse}
   */
  Create(opts) {
    return this._createWithHttpInfo(opts).then(function(reponse) {
      return reponse.data
    })
  }

  /**
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:RelativelyProductive/models/DataResponse} and HTTP response
   */
  _getGoalResultsWithHttpInfo() {
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
      '/dash/DailyGoal/GetGoalResults',
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
  GetGoalResults() {
    return this._getGoalResultsWithHttpInfo().then(function(reponse) {
      return reponse.data
    })
  }

  /**
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:RelativelyProductive/models/DataResponse} and HTTP response
   */
  _getGoalsWithHttpInfo() {
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
      '/dash/DailyGoal/GetGoals',
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
  GetGoals() {
    return this._getGoalsWithHttpInfo().then(function(reponse) {
      return reponse.data
    })
  }

  /**
   * @param {Object} opts Optional parameters
   * @param {module:RelativelyProductive/models/Goal} opts.value
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
      '/dash/DailyGoal/Update',
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
   * @param {module:RelativelyProductive/models/Goal} opts.value
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:RelativelyProductive/models/DataResponse}
   */
  Update(opts) {
    return this._updateWithHttpInfo(opts).then(function(reponse) {
      return reponse.data
    })
  }
}

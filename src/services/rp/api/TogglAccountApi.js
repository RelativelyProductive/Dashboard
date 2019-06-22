import ApiClient from '../ApiClient'
import DataResponse from '../models/DataResponse'

/**
 * TogglAccount service.
 * @module RelativelyProductive/api/TogglAccountApi
 * @version v1-prerelease
 */
export default class TogglAccountApi {
  /**
   * Constructs a new TogglAccountApi.
   * @alias module:RelativelyProductive/api/TogglAccountApi
   * @class
   * @param {module:RelativelyProductive/ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:RelativelyProductive/ApiClient#instance} if unspecified.
   */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance
  }

  /**
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:RelativelyProductive/models/DataResponse} and HTTP response
   */
  _getAllClientsWithHttpInfo() {
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
      '/dash/TogglAccount/GetAllClients',
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
  GetAllClients() {
    return this._getAllClientsWithHttpInfo().then(function(response) {
      return response.data
    })
  }

  /**
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:RelativelyProductive/models/DataResponse} and HTTP response
   */
  _getAllProjectsWithHttpInfo() {
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
      '/dash/TogglAccount/GetAllProjects',
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
  GetAllProjects() {
    return this._getAllProjectsWithHttpInfo().then(function(response) {
      return response.data
    })
  }

  /**
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:RelativelyProductive/models/DataResponse} and HTTP response
   */
  _getAllTagsWithHttpInfo() {
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
      '/dash/TogglAccount/GetAllTags',
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
  GetAllTags() {
    return this._getAllTagsWithHttpInfo().then(function(response) {
      return response.data
    })
  }

  /**
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:RelativelyProductive/models/DataResponse} and HTGP response
   */
  _getAllWorkspaceIdsWithHttpInfo() {
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
      '/dash/TogglAccount/GetAllWorkspaceIds',
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
  GetAllWorkspaceIds() {
    return this._getAllWorkspaceIdsWithHttpInfo().then(function(response) {
      return response.data
    })
  }
}

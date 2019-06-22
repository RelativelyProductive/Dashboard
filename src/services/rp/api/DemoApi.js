import ApiClient from '../ApiClient'

/**
 * Demo service.
 * @module RelativelyProductive/api/DemoApi
 * @version v1-prerelease
 */
export default class DemoApi {
  /**
   * Constructs a new DemoApi.
   * @alias module:RelativelyProductive/api/DemoApi
   * @class
   * @param {module:RelativelyProductive/ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:RelativelyProductive/ApiClient#instance} if unspecified.
   */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance
  }

  /**
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
   */
  _indexWithHttpInfo() {
    let postBody = null

    let pathParams = {}
    let queryParams = {}
    let headerParams = {}
    let formParams = {}

    let authNames = []
    let contentTypes = []
    let accepts = []
    let returnType = null

    return this.apiClient.callApi(
      '/',
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
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}
   */
  Index() {
    return this._indexWithHttpInfo().then(function(response) {
      return response.data
    })
  }
}

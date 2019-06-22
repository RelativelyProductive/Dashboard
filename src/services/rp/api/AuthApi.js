import ApiClient from '../ApiClient'

/**
 * Auth service.
 * @module RelativelyProductive/api/AuthApi
 * @version v1-prerelease
 */
export default class AuthApi {
  /**
   * Constructs a new AuthApi.
   * @alias module:RelativelyProductive/api/AuthApi
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
  loginWithHttpInfo() {
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
      '/dash/Auth/login',
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
  login() {
    return this.loginWithHttpInfo().then(function(response) {
      return response.data
    })
  }
}

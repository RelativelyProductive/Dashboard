/**
 * ChiRhos API
 */

import axios from 'axios'
import querystring from 'querystring'

/**
 * @module ChiRhos/ApiClient
 * @version v1
 */

/**
 * Manages low level client-server communications, parameter marshalling, etc. There should not be any need for an
 * application to use this class directly - the *Api and model classes provide the public API for the service. The
 * contents of this file should be regarded as internal but are documented for completeness.
 * @alias module:ChiRhos/ApiClient
 * @class
 */
export default class ApiClient {
  constructor(options = {}) {
    /**
     * The base URL against which to resolve every API call's (relative) path.
     * @type {String}
     * @default https://localhost
     */
    this.basePath = `${process.env.VUE_APP_API_ROOT}:${process.env.VUE_APP_API_PORT}${
      process.env.VUE_APP_API_BASE
    }`.replace(/\/+$/, '')

    /**
     * The bearer token to use when authenticating requests.
     * @type {String}
     */
    this.accessToken = options.accessToken || ''
    // console.log('options: ', options)

    /**
     * The authentication methods to be included for all API calls.
     * @type {Array.<String>}
     */
    this.authentications = {}

    /**
     * The default HTTP headers to be included for all API calls.
     * @type {Array.<String>}
     * @default {}
     */
    this.defaultHeaders = {}

    /**
     * The default HTTP timeout for all API calls.
     * @type {Number}
     * @default 60000
     */
    this.timeout = 60000

    /**
     * If set to false an additional timestamp parameter is added to all API GET calls to
     * prevent browser caching
     * @type {Boolean}
     * @default true
     */
    this.cache = true
  }

  /**
   * Returns a string representation for an actual parameter.
   * @param param The actual parameter.
   * @returns {String} The string representation of <code>param</code>.
   */
  paramToString(param) {
    if (param === undefined || param == null) {
      return ''
    }
    if (param instanceof Date) {
      return param.toJSON()
    }

    return param.toString()
  }

  /**
   * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
   * NOTE: query parameters are not handled here.
   * @param {String} path The path to append to the base URL.
   * @param {Object} pathParams The parameter values to append.
   * @returns {String} The encoded path with parameter values substituted.
   */
  buildUrl(path, pathParams) {
    if (!path.match(/^\//)) {
      path = '/' + path
    }

    var url = path
    url = url.replace(/\{([\w-]+)\}/g, (fullMatch, key) => {
      var value
      if (pathParams.hasOwnProperty(key)) {
        value = this.paramToString(pathParams[key])
      } else {
        value = fullMatch
      }

      return encodeURIComponent(value)
    })

    return url
  }

  /**
   * Checks whether the given content type represents JSON.<br>
   * JSON content type examples:<br>
   * <ul>
   * <li>application/json</li>
   * <li>application/json; charset=UTF8</li>
   * <li>APPLICATION/JSON</li>
   * </ul>
   * @param {String} contentType The MIME content type to check.
   * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
   */
  isJsonMime(contentType) {
    return Boolean(contentType != null && contentType.match(/^application\/json(;.*)?$/i))
  }

  /**
   * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
   * @param {Array.<String>} contentTypes
   * @returns {String} The chosen content type, preferring JSON.
   */
  jsonPreferredMime(contentTypes) {
    for (var i = 0; i < contentTypes.length; i++) {
      if (this.isJsonMime(contentTypes[i])) {
        return contentTypes[i]
      }
    }

    return contentTypes[0]
  }

  /**
   * Checks whether the given parameter value represents file-like content.
   * @param param The parameter to check.
   * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
   */
  isFileParam(param) {
    // fs.ReadStream in Node.js and Electron (but not in runtime like browserify)
    if (typeof require === 'function') {
      let fs
      try {
        fs = require('fs')
      } catch (err) {}
      if (fs && fs.ReadStream && param instanceof fs.ReadStream) {
        return true
      }
    }

    // Buffer in Node.js
    if (typeof Buffer === 'function' && param instanceof Buffer) {
      return true
    }

    // Blob in browser
    if (typeof Blob === 'function' && param instanceof Blob) {
      return true
    }

    // File in browser (it seems File object is also instance of Blob, but keep this for safe)
    if (typeof File === 'function' && param instanceof File) {
      return true
    }

    return false
  }

  /**
   * Normalizes parameter values:
   * <ul>
   * <li>remove nils</li>
   * <li>keep files and arrays</li>
   * <li>format to string with `paramToString` for other cases</li>
   * </ul>
   * @param {Object.<String, Object>} params The parameters as object properties.
   * @returns {Object.<String, Object>} normalized parameters.
   */
  normalizeParams(params) {
    var newParams = {}
    for (var key in params) {
      if (params.hasOwnProperty(key) && params[key] !== undefined && params[key] != null) {
        var value = params[key]
        if (this.isFileParam(value) || Array.isArray(value)) {
          newParams[key] = value
        } else {
          newParams[key] = this.paramToString(value)
        }
      }
    }

    return newParams
  }

  /**
   * Enumeration of collection format separator strategies.
   * @enum {String}
   * @readonly
   */
  static CollectionFormatEnum = {
    /**
     * Comma-separated values. Value: <code>csv</code>
     * @const
     */
    CSV: ',',

    /**
     * Space-separated values. Value: <code>ssv</code>
     * @const
     */
    SSV: ' ',

    /**
     * Tab-separated values. Value: <code>tsv</code>
     * @const
     */
    TSV: '\t',

    /**
     * Pipe(|)-separated values. Value: <code>pipes</code>
     * @const
     */
    PIPES: '|',

    /**
     * Native array. Value: <code>multi</code>
     * @const
     */
    MULTI: 'multi',
  }

  /**
   * Builds a string representation of an array-type actual parameter, according to the given collection format.
   * @param {Array} param An array parameter.
   * @param {module:ChiRhos/ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
   * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
   * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
   */
  buildCollectionParam(param, collectionFormat) {
    if (param == null) {
      return null
    }
    switch (collectionFormat) {
      case 'csv':
        return param.map(this.paramToString).join(',')
      case 'ssv':
        return param.map(this.paramToString).join(' ')
      case 'tsv':
        return param.map(this.paramToString).join('\t')
      case 'pipes':
        return param.map(this.paramToString).join('|')
      case 'multi':
        // return the array directly as SuperAgent will handle it as expected
        return param.map(this.paramToString)
      default:
        throw new Error('Unknown collection format: ' + collectionFormat)
    }
  }

  /**
   * Applies authentication headers to the request.
   * @param {Object} request The request object created by a <code>superagent()</code> call.
   * @param {Array.<String>} authNames An array of authentication method names.
   */
  applyAuthToRequest(request, authNames) {
    authNames.forEach((authName) => {
      var auth = this.authentications[authName]
      switch (auth.type) {
        case 'basic':
          if (auth.username || auth.password) {
            request.auth(auth.username || '', auth.password || '')
          }

          break
        case 'apiKey':
          if (auth.apiKey) {
            var data = {}
            if (auth.apiKeyPrefix) {
              data[auth.name] = auth.apiKeyPrefix + ' ' + auth.apiKey
            } else {
              data[auth.name] = auth.apiKey
            }

            if (auth['in'] === 'header') {
              request.set(data)
            } else {
              request.query(data)
            }
          }

          break
        case 'oauth2':
          if (auth.accessToken) {
            request.set({
              Authorization: 'Bearer ' + auth.accessToken,
            })
          }

          break
        default:
          throw new Error('Unknown authentication type: ' + auth.type)
      }
    })
  }

  /**
   * Deserializes an HTTP response body into a value of the specified type.
   * @param {Object} response A SuperAgent response object.
   * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
   * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
   * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
   * all properties on <code>data<code> will be converted to this type.
   * @returns A value of the specified type.
   */
  deserialize(response, returnType) {
    if (response == null || returnType == null || response.status === 204) {
      return null
    }

    // Rely on SuperAgent for parsing response body.
    // See http://visionmedia.github.io/superagent/#parsing-response-bodies
    var data = response.data
    if (
      data == null ||
      (typeof data === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length)
    ) {
      // Use the unparsed response as a fallback
      data = response
    }

    return ApiClient.convertToType(data, returnType)
  }

  /**
   * Invokes the REST service using the supplied settings and parameters.
   * @param {String} path The base URL to invoke.
   * @param {String} httpMethod The HTTP method to use.
   * @param {Object.<String, String>} pathParams A map of path parameters and their values.
   * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
   * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
   * @param {Object.<String, Object>} formParams A map of form parameters and their values.
   * @param {Object} bodyParam The value to pass as the request body.
   * @param {Array.<String>} authNames An array of authentication type names.
   * @param {Array.<String>} contentTypes An array of request MIME types.
   * @param {Array.<String>} accepts An array of acceptable response MIME types.
   * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
   * constructor for a complex type.
   * @returns {Promise} A {@link https://www.promisejs.org/|Promise} object.
   */
  callApi(
    path,
    httpMethod,
    pathParams,
    queryParams,
    headerParams,
    formParams,
    bodyParam,
    authNames,
    contentTypes,
    accepts,
    returnType
  ) {
    var url = this.buildUrl(path, pathParams)

    // set query parameters
    if (httpMethod.toUpperCase() === 'GET' && this.cache === false) {
      queryParams['_'] = new Date().getTime()
    }

    var responseType = 'json'
    if (returnType === 'Blob') {
      responseType = 'blob'
    } else if (returnType === 'String') {
      responseType = 'string'
    }

    // var _axios = axios.create({
    //   baseURL: this.basePath,
    //   responseType: responseType,
    // })

    axios.defaults.baseURL = this.basePath
    axios.defaults.responseType = responseType

    // console.log({
    //   baseURL: this.basePath,
    //   responseType: responseType,
    // })

    // set header parameters
    axios.defaults.headers.common['Authorization'] = this.accessToken
      ? 'Bearer ' + this.accessToken
      : ''

    // console.log(_axios.defaults.headers)

    // _axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
    axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE, OPTIONS'
    axios.defaults.headers.post['Access-Control-Allow-Credentials'] = true
    axios.defaults.crossDomain = true
    // _axios.set(this.defaultHeaders).set(this.normalizeParams(headerParams))

    // _axios.interceptors.response.use(
    //   function(response) {
    //     return response
    //   },
    //   function(error) {
    //     // console.log(error)
    //     // handle error
    //     if (error.response) {
    //       console.log(error.response)
    //     }
    //   }
    // )

    // apply authentications
    // this.applyAuthToRequest(_axios, authNames)

    // set request timeout
    axios.defaults.timeout = this.timeout

    var contentType = this.jsonPreferredMime(contentTypes)
    if (contentType) {
      if (contentType !== 'multipart/form-data') {
        axios.defaults.headers.post['Content-Type'] = contentType
      }
      // } else if (!_axios.header['Content-Type']) {
    } else {
      axios.defaults.headers.post['Content-Type'] = 'application/json'
    }

    var _data = ''
    // var _file = ''
    if (contentType === 'application/x-www-form-urlencoded') {
      axios.post(querystring.stringify(this.normalizeParams(formParams)))
    } else if (contentType === 'multipart/form-data') {
      // var _formParams = this.normalizeParams(formParams)
      _data = formParams
      // console.log('_formParams: ', _formParams)
      // for (var key of formParams.entries()) {
      //   console.log(key[0] + ', ' + key[1])
      //   if (this.isFileParam(key[1])) {
      //     // file field
      //     _data = {}
      //     _data[key[0]] = key[1]
      //     // _axios.append(key, formParams[key])
      //   } else {
      //     // _axios.append(key, formParams[key])
      //   }
      // }
      // for (var key in formParams.entries()) {
      //   console.log('loop: ', key, formParams[key])
      //   console.log('hasOwnProperty: ', formParams.hasOwnProperty(key))
      //   // if (formParams.hasOwnProperty(key)) {
      //   console.log('isFileParam: ', this.isFileParam(formParams[key]))
      //   if (this.isFileParam(formParams[key])) {
      //     // file field
      //     console.log('set file param')
      //     _data = formParams[key]
      //     _axios.append(key, formParams[key])
      //   } else {
      //     // _axios.append(key, formParams[key])
      //   }
      //   // }
      // }
    } else if (bodyParam) {
      _data = JSON.stringify(bodyParam)
    }

    // var requestBody = null;

    return new Promise((resolve, reject) => {
      axios
        .request({
          url: url,
          method: httpMethod,
          params: this.normalizeParams(queryParams),
          data: _data,
        })
        .then(
          (result) => {
            var data = this.deserialize(result, returnType)
            resolve({ data, result })
          },
          (error) => {
            reject(error)
          }
        )
    })

    // var accept = this.jsonPreferredMime(accepts)
    // if (accept) {
    //   _axios.accept(accept)
    // }

    // return new Promise((resolve, reject) => {
    //   _axios.end((error, response) => {
    //     if (error) {
    //       reject(error)
    //     } else {
    //       try {
    //         var data = this.deserialize(response, returnType)

    //         resolve({ data, response })
    //       } catch (err) {
    //         reject(err)
    //       }
    //     }
    //   })
    // })
  }

  /**
   * Parses an ISO-8601 string representation of a date value.
   * @param {String} str The date value as a string.
   * @returns {Date} The parsed date object.
   */
  static parseDate(str) {
    return new Date(str)
  }

  /**
   * Converts a value to the specified type.
   * @param {(String|Object)} data The data to convert, as a string or object.
   * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
   * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
   * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
   * all properties on <code>data<code> will be converted to this type.
   * @returns An instance of the specified type or null or undefined if data is null or undefined.
   */
  static convertToType(data, type) {
    if (data === null || data === undefined) return data

    switch (type) {
      case 'Boolean':
        return Boolean(data)
      case 'Integer':
        return parseInt(data, 10)
      case 'Number':
        return parseFloat(data)
      case 'String':
        return String(data)
      case 'Date':
        return ApiClient.parseDate(String(data))
      case 'Blob':
        return data
      default:
        if (type === Object) {
          // generic object, return directly
          return data
        } else if (typeof type === 'function') {
          // for model type like: User
          return type.constructFromObject(data)
        } else if (Array.isArray(type)) {
          // for array type like: ['String']
          var itemType = type[0]

          return data.map((item) => {
            return ApiClient.convertToType(item, itemType)
          })
        } else if (typeof type === 'object') {
          // for plain object type like: {'String': 'Integer'}
          var keyType, valueType
          for (var k in type) {
            if (type.hasOwnProperty(k)) {
              keyType = k
              valueType = type[k]
              break
            }
          }

          var result = {}
          for (var j in data) {
            if (data.hasOwnProperty(j)) {
              var key = ApiClient.convertToType(j, keyType)
              var value = ApiClient.convertToType(data[j], valueType)
              result[key] = value
            }
          }

          return result
        } else {
          // for unknown type, return the data directly
          return data
        }
    }
  }

  /**
   * Constructs a new map or array model from REST data.
   * @param data {Object|Array} The REST data.
   * @param obj {Object|Array} The target object or array.
   */
  static constructFromObject(data, obj, itemType) {
    if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        if (data.hasOwnProperty(i)) obj[i] = ApiClient.convertToType(data[i], itemType)
      }
    } else {
      for (var k in data) {
        if (data.hasOwnProperty(k)) obj[k] = ApiClient.convertToType(data[k], itemType)
      }
    }
  }
}

/**
 * The default API client implementation.
 * @type {module:ChiRhos/ApiClient}
 */
ApiClient.instance = new ApiClient()
